'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Health Benefits of Sithaphal: Nature's Superfruit",
      excerpt: "Discover why custard apple is considered one of nature's most nutritious fruits and how it can boost your health.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      image: "https://i.imgur.com/8L1pX3S.png",
      category: "Health"
    },
    {
      id: 2,
      title: "Growing Organic Sithaphal: A Farmer's Guide",
      excerpt: "Learn about sustainable farming practices that produce the highest quality custard apples without harmful chemicals.",
      author: "Michael Chen",
      date: "2024-01-10",
      image: "https://i.imgur.com/8L1pX3S.png",
      category: "Agriculture"
    },
    {
      id: 3,
      title: "5 Delicious Sithaphal Recipes for Summer",
      excerpt: "Beat the heat with these refreshing custard apple recipes that are perfect for hot summer days.",
      author: "Chef Emma Davis",
      date: "2024-01-05",
      image: "https://i.imgur.com/8L1pX3S.png",
      category: "Recipes"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair text-green-800 mb-4">
              Sithaphal Blog
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest insights about custard apples, from health benefits to delicious recipes and farming tips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-playfair text-gray-800 mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Newsletter Subscription */}
          <div className="mt-16 bg-green-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-playfair mb-4">
              Stay Updated with Our Latest Posts
            </h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on the latest Sithaphal news, recipes, and health tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="submit"
                className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
