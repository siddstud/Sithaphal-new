'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      rating: 5,
      text: "The best Sithaphal I've ever tasted! The delivery was quick, and the fruits were perfectly ripe."
    },
    {
      name: "Michael Chen",
      role: "Verified Buyer", 
      rating: 5,
      text: "Incredible quality and freshness. The family pack is perfect for our weekly needs."
    },
    {
      name: "Emma Davis",
      role: "Health Enthusiast",
      rating: 5,
      text: "The organic Sithaphal is worth every penny. You can taste the difference in quality."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-playfair text-center mb-12 text-green-800">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4 justify-center">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="text-gray-600 text-center mb-6">
                "{testimonial.text}"
              </p>
              <div className="text-center">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
