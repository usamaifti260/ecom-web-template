import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4">
            Get In Touch
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-red-600">ALHAFIZ</span> MILK & SWEETS
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our traditional sweets? Need help with bulk orders or custom sweet arrangements?
            We're here to help you find the perfect sweets that bring joy to your celebrations with authentic taste and quality ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Call Us Now</h4>
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-red-600">03487765824</p>
                <p className="text-gray-600">Available for sweet orders & inquiries</p>
                <div className="text-sm text-gray-500">
                  <p>📞 Mon-Sat: 9:00 AM - 6:00 PM</p>
                  <p>💬 WhatsApp support available</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Email Us</h4>
              <div className="text-center space-y-2">
                <p className="text-lg font-bold text-red-600">info@alhafizsweetsandmilk.com</p>
                <p className="text-lg font-bold text-red-600">orders@alhafizsweetsandmilk.com</p>
                <p className="text-gray-600">For sweet orders, bulk inquiries & support</p>
                <div className="text-sm text-gray-500">
                  <p>📧 We reply within 24 hours</p>
                  <p>🍯 Custom sweet arrangements welcome</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Visit Our Shop</h4>
              <div className="text-center space-y-2">
                <p className="text-gray-700 font-medium">
                  ALHAFIZ MILK & SWEETS<br />
                  Traditional Sweet Shop<br />
                  Sialkot, Pakistan
                </p>
                <p className="text-sm text-gray-500">
                  📍 Fresh sweets made daily
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h4 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h4>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="khoya-barfi">Khoya Barfi Orders</option>
                    <option value="sohan-halwa">Sohan Halwa Varieties</option>
                    <option value="desi-ghee">Pure Desi Ghee</option>
                    <option value="milk-products">Fresh Milk Products</option>
                    <option value="traditional-sweets">Traditional Sweets</option>
                    <option value="festival-sweets">Festival Sweet Boxes</option>
                    <option value="custom-order">Custom Sweet Orders</option>
                    <option value="bulk-order">Bulk Order Inquiry</option>
                    <option value="gift-boxes">Gift Box Arrangements</option>
                    <option value="wedding-sweets">Wedding Sweet Orders</option>
                    <option value="quality">Quality & Freshness</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    placeholder="Tell us about your sweet requirements, preferred varieties, quantities for your event, or any questions you have about our traditional sweets and milk products..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-transparent border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200"
                    onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })}
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            💌 We'd Love to Hear From You!
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
            Whether you're looking for the perfect traditional sweets for your celebration, need help with bulk orders,
            or want to learn more about our fresh daily preparation and quality ingredients, our team is here to assist you.
            At ALHAFIZ MILK & SWEETS, every customer is family to us.
            <br /><br />
            <span className="font-semibold">✨ From Khoya Barfi and Sohan Halwa to fresh milk products and pure Desi Ghee!</span>
            Discover our complete collection of traditional sweets that combine authentic recipes with quality ingredients
            to bring sweetness and joy to every special moment in your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923487765824"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>💬 WhatsApp: 03487765824</span>
            </a>
            <a
              href="mailto:info@alhafizsweetsandmilk.com"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>📧 Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 