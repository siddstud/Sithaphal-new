# Supabase Backend Integration Guide

## Supabase Setup Guide for Sithaphal Website

Complete backend setup guide for the enhanced Sithaphal e-commerce website with animations and modern UI.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

## Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Integration
GEMINI_API_KEY=your_gemini_api_key

# Payment Integration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Database Schema

Run these SQL commands in your Supabase SQL editor:

### 1. Enable Extensions
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
```

### 2. Create Enhanced Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  variety VARCHAR(100),
  quantity_available INTEGER DEFAULT 0,
  nutritional_info JSONB,
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_products_variety ON products(variety);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_price ON products(price);
```

### 3. Create Enhanced User Profiles Table
```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  date_of_birth DATE,
  phone VARCHAR(20),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. Create Enhanced Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for order numbers
CREATE UNIQUE INDEX idx_orders_order_number ON orders(order_number);
```

### 5. Create Order Items Table
```sql
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can only see order items for their own orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for own orders" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );
```

### 6. Create Enhanced Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  author_avatar TEXT,
  image TEXT,
  category VARCHAR(50),
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blog posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

-- Create indexes
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE UNIQUE INDEX idx_blog_posts_slug ON blog_posts(slug);
```

### 7. Create Reviews Table
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

-- Users can only create/update their own reviews
CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);
```

### 8. Create Wishlist Table
```sql
CREATE TABLE wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Users can only see their own wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" ON wishlist
  FOR ALL USING (auth.uid() = user_id);
```

### 9. Create Functions and Triggers
```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number = 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sequence for order numbers
CREATE SEQUENCE order_number_seq START 1;

-- Add triggers
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON orders
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();
```

### 10. Create Views for Analytics
```sql
-- View for product analytics
CREATE VIEW product_analytics AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.variety,
    p.rating,
    p.review_count,
    COUNT(oi.id) as total_sold,
    SUM(oi.quantity * oi.price) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.status IN ('confirmed', 'shipped', 'delivered')
GROUP BY p.id, p.name, p.price, p.variety, p.rating, p.review_count;
```

## Sample Data

### Insert Enhanced Sample Products
```sql
INSERT INTO products (name, price, image, description, variety, quantity_available, nutritional_info, featured, rating, review_count, tags) VALUES
('Premium Sithaphal', 299.99, 'https://i.imgur.com/8L1pX3S.png', 'Fresh, organic custard apples handpicked from our premium orchards. These are the finest quality fruits with exceptional sweetness and creamy texture.', 'Premium', 50, '{"calories": 94, "protein": 2.1, "carbs": 23.6, "fiber": 4.4, "vitamin_c": 36.3, "potassium": 247, "magnesium": 21}', true, 4.8, 127, ARRAY['premium', 'organic', 'fresh', 'sweet']),

('Organic Sithaphal', 249.99, 'https://i.imgur.com/8L1pX3S.png', 'Certified organic custard apples grown without pesticides or chemical fertilizers. Perfect for health-conscious consumers.', 'Organic', 30, '{"calories": 94, "protein": 2.1, "carbs": 23.6, "fiber": 4.4, "vitamin_c": 36.3, "potassium": 247, "magnesium": 21}', true, 4.6, 89, ARRAY['organic', 'healthy', 'natural', 'certified']),

('Regular Sithaphal', 199.99, 'https://i.imgur.com/8L1pX3S.png', 'High-quality custard apples perfect for daily consumption. Great value for money with excellent taste and nutrition.', 'Regular', 100, '{"calories": 94, "protein": 2.1, "carbs": 23.6, "fiber": 4.4, "vitamin_c": 36.3, "potassium": 247, "magnesium": 21}', false, 4.4, 203, ARRAY['affordable', 'daily', 'nutritious', 'value']);
```

### Insert Enhanced Sample Blog Posts
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, author, author_avatar, image, category, tags, published, featured, reading_time) VALUES
('The Health Benefits of Sithaphal: Nature''s Superfruit', 'health-benefits-sithaphal-superfruit', 'Discover why custard apple is considered one of nature''s most nutritious fruits and how it can boost your health.', 'Custard apple, also known as Sithaphal, is packed with essential nutrients that provide numerous health benefits. Rich in vitamin C, potassium, and dietary fiber, this tropical fruit supports immune function, heart health, and digestive wellness...', 'Dr. Sarah Johnson', 'https://i.pravatar.cc/150?img=1', 'https://i.imgur.com/8L1pX3S.png', 'Health', ARRAY['health', 'nutrition', 'benefits', 'superfruit'], true, true, 5),

('Growing Organic Sithaphal: A Farmer''s Guide', 'growing-organic-sithaphal-farmers-guide', 'Learn about sustainable farming practices that produce the highest quality custard apples without harmful chemicals.', 'Organic farming of custard apples requires careful attention to soil health, natural pest control, and sustainable water management. This comprehensive guide covers everything from soil preparation to harvest...', 'Michael Chen', 'https://i.pravatar.cc/150?img=2', 'https://i.imgur.com/8L1pX3S.png', 'Agriculture', ARRAY['farming', 'organic', 'sustainable', 'agriculture'], true, false, 8),

('5 Delicious Sithaphal Recipes for Summer', 'delicious-sithaphal-recipes-summer', 'Beat the heat with these refreshing custard apple recipes that are perfect for hot summer days.', 'Here are five amazing recipes that showcase the versatility of custard apples. From smoothies to desserts, these recipes will help you enjoy this nutritious fruit in creative ways...', 'Chef Emma Davis', 'https://i.pravatar.cc/150?img=3', 'https://i.imgur.com/8L1pX3S.png', 'Recipes', ARRAY['recipes', 'summer', 'cooking', 'desserts'], true, true, 6);
```

## Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Enable email confirmation
3. Configure redirect URLs:
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs: `http://localhost:3000/auth/callback`
4. Set up Google OAuth (optional):
   - Enable Google provider
   - Add your Google OAuth credentials

## Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create buckets:
   - `product-images` (public)
   - `blog-images` (public)
   - `user-avatars` (public)
3. Set up policies for public read access

## Real-time Features

Enable real-time subscriptions for:
- Order status updates
- Product availability changes
- New blog posts

## Testing Connection

Test your Supabase connection:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` and check the browser console for any connection errors.

## Production Deployment

1. Update environment variables in your hosting platform
2. Set up proper CORS settings in Supabase
3. Configure production redirect URLs
4. Enable database backups
5. Set up monitoring and alerts

Your enhanced Sithaphal website with animations, parallax effects, and Supabase backend is now ready!