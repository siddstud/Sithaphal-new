'use client'

import { Heart, CheckCircle, Zap } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Heart,
      title: "Heart-Healthy",
      description: "Rich in antioxidants and minerals that support cardiovascular health and boost immunity."
    },
    {
      icon: CheckCircle,
      title: "100% Organic",
      description: "Naturally grown without pesticides, preserving the authentic taste and nutritional value."
    },
    {
      icon: Zap,
      title: "Energy Boost",
      description: "Natural sugars and vitamins provide sustained energy throughout your day."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-playfair text-center mb-12 text-green-800">
          Nature's Perfect Gift
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  <IconComponent className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-playfair text-center mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
