import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-yellow-500 bg-opacity-10 px-4 py-2 rounded-full">
                <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide">
                  ✨ About Us
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Crafting Premium Furniture Since 
                <span className="text-yellow-600"> Day One</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                At <span className="text-yellow-600 font-semibold">Comfort Sofa</span>, 
                we believe that every home deserves furniture that combines luxury with comfort. 
                Our passion is creating premium furniture that transforms your living space while providing 
                unmatched comfort and style. From our signature living room sets to elegant bedroom collections and 
                modern office furniture, every piece is crafted with precision and attention to detail.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Comfort Sofa?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🛋️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                    <p className="text-sm text-gray-600">Finest materials and craftsmanship for lasting durability</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Modern Designs</h4>
                    <p className="text-sm text-gray-600">Contemporary styles that transform your living space</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">7-Day Returns</h4>
                    <p className="text-sm text-gray-600">Easy return and exchange policy within 7 days of purchase</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Made with Care</h4>
                    <p className="text-sm text-gray-600">Every piece crafted with precision and attention to comfort</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="/shop"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🛍️ Shop Collection
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                📞 Contact Us
              </a>
            </div>
          </div>

          {/* Right Content - Brand Visual & Stats */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              {/* Brand Visual */}
              <div className="w-full h-64 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">🛋️</div>
                  <div className="text-white font-bold text-xl">
                    <span className="text-white">COMFORT</span>
                  </div>
                  <div className="text-white text-sm opacity-90 mt-2">SOFA</div>
                  <div className="text-white text-xs opacity-75 mt-1">Premium Furniture & Sofas</div>
                </div>
                {/* Floating Furniture Icons */}
                <div className="absolute top-4 left-4 text-2xl animate-bounce">🪑</div>
                <div className="absolute top-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🛏️</div>
                <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🪞</div>
                <div className="absolute bottom-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>💡</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Furniture Pieces</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">7</div>
                  <div className="text-sm text-gray-600">Days Return</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-yellow-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Brand Story Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🏆 Your Trusted Furniture Partner
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              At Comfort Sofa, we understand that furniture is more than just pieces in your home – it's about creating 
              spaces that reflect your lifestyle and provide comfort for years to come. Our carefully curated collection of premium furniture brings 
              together the finest craftsmanship with modern designs to transform your living space into a haven of comfort and style.
              <br /><br />
              <span className="font-semibold">We stand behind our quality with a 7-day return and exchange policy</span> – 
              because your satisfaction is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0302-8829260"
                className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>📞 Call Now: 0302-8829260</span>
              </a>
              <a 
                href="mailto:support@comfortsofa.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>📧 Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 