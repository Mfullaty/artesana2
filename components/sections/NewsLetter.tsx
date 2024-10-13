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
          <div className="bg-secondary-foreground text-primary rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Updated</h2>
            <p className="text-primary text-center mb-6">Subscribe to our newsletter for the latest  products and craft news.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-3 py-2 bg-accent-foreground text-primary border-0 drop-shadow-md  rounded-md focus:outline-none placeholder-primary font-semibold"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-accent-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary transition duration-300"
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
