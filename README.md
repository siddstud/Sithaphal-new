# Sithaphal Website - Next.js & React

A modern e-commerce website for premium Sithaphal (Custard Apple) built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **E-commerce functionality** with shopping cart
- 🎨 **Modern UI/UX** with Tailwind CSS
- 🌐 **3D Interactive Hero** with Three.js
- 🤖 **AI-powered chatbot** for customer support
- 📱 **Fully responsive** design
- 🔍 **Product filtering** and search
- 🍳 **AI recipe generator**
- 💳 **Secure checkout** process
- 📝 **Blog section** for content marketing

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database**: Supabase (configured)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sithaphal-website
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── CartModal.tsx
│   └── ...
├── context/            # React Context providers
│   └── CartContext.tsx
├── products/           # Products page
│   └── page.tsx
├── auth/              # Authentication page
│   └── page.tsx
├── blog/              # Blog page
│   └── page.tsx
├── globals.css        # Global styles
├── layout.tsx         # Root layout
└── page.tsx          # Home page
```

## Key Components

### CartContext
Manages global cart state with localStorage persistence.

### ProductCard
Displays individual product information with add-to-cart functionality.

### Hero
3D interactive section with rotating Sithaphal model.

### ChatBot
AI-powered customer support with contextual responses.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
