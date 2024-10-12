import React, { useState } from 'react'

const NewsLetter = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Submitted email:', email)
        setEmail('')
      }
    
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#2c3e50] text-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Updated</h2>
            <p className="text-gray-300 text-center mb-6">Subscribe to our newsletter for the latest  products and craft news.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-3 py-2 bg-[#f8f8f8] text-[#333333] border border-[#c9a55c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a55c]"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#c9a55c] text-[#1a2b4c] px-6 py-2 rounded-md font-semibold hover:bg-[#d4b572] transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
  )
}

export default NewsLetter
