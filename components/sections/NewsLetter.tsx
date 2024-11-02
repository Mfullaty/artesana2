'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 bg-gray-300 rounded flex-grow"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  )
}

export default function NewsLetter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/subscriptions/check', {
          headers: {
            'x-user-email': email
          }
        })
        const data = await response.json()
        setIsSubscribed(data.isSubscribed)
        setShowForm(!data.isSubscribed)
      } catch (error) {
        console.error('Error checking subscription:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSubscription()
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setShowForm(false)
        toast.success('Thank you for subscribing to our newsletter!', {
          duration: 5000,
        })
        setTimeout(() => {
          setShowForm(true)
          setIsSubscribed(false)
        }, 5000) // Hide thank you message and show form again after 5 seconds
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('Failed to subscribe. Please try again.', {
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
      setEmail('')
    }
  }

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary-foreground text-primary rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <SkeletonLoader />
        </div>
      </section>
    )
  }

  if (!showForm) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-primary-foreground text-primary rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        {isSubscribed ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Thank You!</h2>
            <p className="text-primary text-center mb-6">You've already subscribed to our newsletter.</p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Updated</h2>
            <p className="text-primary text-center mb-6">Subscribe to our newsletter for the latest products and craft news.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-3 py-2 bg-accent-foreground text-primary border-0 drop-shadow-md rounded-md focus:outline-none placeholder-primary font-semibold"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-accent-foreground px-6 py-2 rounded-md font-semibold opacity-100 hover:opacity-80 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  )
}