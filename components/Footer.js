import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold">
                <span className="text-[#FFCC00]">FORK</span>
                <span className="text-white"> & </span>
                <span className="text-[#FF0000]">KNIFE</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Delicious fast food delivered to your door! We've been serving the community with fresh, 
              quality meals since 2020. Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#F44336] transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center hover:bg-[#FFB300] transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5 text-[#1F1F1F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#FFA726] rounded-full flex items-center justify-center hover:bg-[#FF9800] transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#F44336] rounded-full flex items-center justify-center hover:bg-[#D32F2F] transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-400">
              Follow us for daily specials and updates!
            </div>
          </div>

          {/* Menu Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#FFCC00]">Our Menu</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🍕</span><span>Pizza</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🍔</span><span>Burgers</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🌯</span><span>Shawarma</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🍗</span><span>Fried Chicken</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🍟</span><span>Sides & Fries</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🥤</span><span>Beverages</span></Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200 flex items-center space-x-2"><span>🔥</span><span>Daily Deals</span></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#FFCC00]">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">🚚 Home Delivery</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">🏪 Dine-In</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">📦 Takeaway</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">🎉 Catering</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">🎂 Party Orders</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">💼 Corporate Events</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition-colors duration-200">📱 Mobile App</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#FFCC00]">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#FF0000] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="text-white font-semibold">0304-4481181</p>
                  <p className="text-gray-400">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#FF0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-white font-semibold">123 Food Street</p>
                  <p className="text-gray-400">Ali Chowk, D-Block, Tajpura Scheme Lahore</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#FF0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-white font-semibold">11:00 AM - 11:00 PM</p>
                  <p className="text-gray-400">7 Days a Week</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#FF0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-white font-semibold">info@forkandknife.com</p>
                  <p className="text-gray-400">Quick response guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-3 text-[#FFCC00]">Stay Hungry for Updates! 🍕</h4>
              <p className="text-gray-300">Get exclusive deals, new menu items, and special offers delivered straight to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email for delicious deals"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF0000] focus:border-[#FF0000] text-white placeholder-gray-400 transition-colors"
              />
              <button className="bg-[#FF0000] hover:bg-[#F44336] text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 transform hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>&copy; 2025 Fork & Knife Fast Food Restaurant. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-[#FFCC00] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-[#FFCC00] transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-[#FFCC00] transition-colors">Contact</Link>
              </div>
            </div>
            
            {/* Payment Methods */}
            {/* <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-[#FF0000] rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">CASH</span>
                </div>
                <div className="w-10 h-6 bg-[#FFCC00] rounded flex items-center justify-center">
                  <span className="text-xs text-[#1F1F1F] font-bold">JAZZ</span>
                </div>
                <div className="w-10 h-6 bg-[#FFA726] rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">EASY</span>
                </div>
                <div className="w-10 h-6 bg-[#F44336] rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">CARD</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 