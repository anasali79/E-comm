"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (typeof window !== 'undefined') {
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    setIsSubmitting(false)
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
    if (typeof window !== 'undefined') {
      alert('Message sent successfully!')
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute top-1/2 right-10 w-8 h-8 bg-pink-200 dark:bg-pink-800 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Let's Connect</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Get in touch with us for any questions, support, or feedback.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 dark:text-green-300">Online Now</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information with Hover Animations */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Have questions about our products or need assistance? We're here to help!
              </p>
            </div>

            {/* Contact Details with Hover Effects */}
            <div className="space-y-6">
              {[
                { icon: Mail, color: 'blue', title: 'Email', details: ['support@ecommerce.com', 'info@ecommerce.com'] },
                { icon: Phone, color: 'green', title: 'Phone', details: ['+1 (555) 123-4567', '+1 (555) 987-6543'] },
                { icon: MapPin, color: 'purple', title: 'Address', details: ['123 Business Street', 'New York, NY 10001'] },
                { icon: Clock, color: 'orange', title: 'Business Hours', details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday - Sunday: 10:00 AM - 4:00 PM'] }
              ].map((contact, index) => {
                const Icon = contact.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                      hoveredCard === index ? 'bg-white dark:bg-gray-800 shadow-lg' : 'hover:bg-white hover:dark:bg-gray-800'
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 bg-${contact.color}-100 dark:bg-${contact.color}-900 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        hoveredCard === index ? 'scale-110 rotate-6' : ''
                      }`}>
                        <Icon className={`w-6 h-6 text-${contact.color}-600 dark:text-${contact.color}-400`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{contact.title}</h3>
                      {contact.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 dark:text-gray-300">{detail}</p>
                      ))}
                    </div>
                    {hoveredCard === index && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Animated Contact Form */}
          <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 relative overflow-hidden transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Animated Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-indigo-100 dark:from-pink-900 dark:to-indigo-900 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
            
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <span>Send us a Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-500 transition-colors">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg ${
                    isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:-translate-y-1'
                  }`}
                  style={{ backgroundColor: '#40BFFF' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section with Animations */}
        <div className={`mt-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-8 relative overflow-hidden transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full opacity-10 -translate-y-20 translate-x-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-200 to-pink-200 dark:from-indigo-800 dark:to-pink-800 rounded-full opacity-10 translate-y-16 -translate-x-16 animate-bounce" style={{ animationDuration: '4s' }}></div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center space-x-2 mb-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-lg">
              <Star className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Questions</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Check out our FAQ section for quick answers to common questions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: 'Shipping Information',
                  content: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.',
                  icon: '🚚',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Return Policy', 
                  content: 'Easy returns within 30 days of purchase. Items must be in original condition.',
                  icon: '↩️',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Customer Support',
                  content: 'Our support team is available 24/7 to help with any questions or concerns.',
                  icon: '💬',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                        {faq.title}
                      </h3>
                      <div className={`w-12 h-1 bg-gradient-to-r ${faq.color} rounded-full mb-3 group-hover:w-16 transition-all duration-300`}></div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {faq.content}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-blue-500 text-sm font-medium">Learn more →</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Action Elements */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors">24/7 Support Available</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-500 group-hover:animate-bounce" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Live Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}