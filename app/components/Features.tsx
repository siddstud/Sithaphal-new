'use client'

import Image from 'next/image'

export default function Features() {
  const features = [
    {
      number: "01",
      title: "Premium Quality",
      description: "Hand-picked at peak ripeness to ensure the best taste and nutritional value."
    },
    {
      number: "02", 
      title: "Fast Delivery",
      description: "Same-day delivery to ensure freshness and quality."
    },
    {
      number: "03",
      title: "Satisfaction Guaranteed", 
      description: "100% money-back guarantee if you're not completely satisfied."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-playfair mb-6 text-green-800">
              Why Choose Our Sithaphal?
            </h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <span className="text-green-600 text-2xl font-bold">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://i.imgur.com/8L1pX3S.png"
              alt="Fresh Sithaphal"
              width={600}
              height={400}
              className="rounded-lg shadow-xl w-full hover:shadow-2xl transition-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
