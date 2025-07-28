import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-red-500 bg-opacity-10 px-4 py-2 rounded-full">
                <span className="text-red-600 text-sm font-semibold uppercase tracking-wide">
                  ✨ About Us
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Traditional Sweetness Since
                <span className="text-red-600"> Day One</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                At <span className="text-red-600 font-semibold">ALHAFIZ MILK AND SWEETS</span>,
                we believe that every sweet should combine traditional taste with uncompromising quality.
                Our passion is creating premium traditional sweets and fresh milk products that families trust and love.
                From our signature Khoya Barfi and authentic Sohan Halwa to pure Desi Ghee and fresh milk products,
                every item is prepared with love and attention using traditional recipes and the finest ingredients.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose ALHAFIZ MILK AND SWEETS?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🍯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fresh Daily Preparation</h4>
                    <p className="text-sm text-gray-600">Made fresh every day using traditional recipes and quality ingredients</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🥛</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pure Milk Products</h4>
                    <p className="text-sm text-gray-600">Farm-fresh milk, cream, and dairy products with authentic taste</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎂</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Complete Sweet Range</h4>
                    <p className="text-sm text-gray-600">Khoya Barfi, Sohan Halwa, Gulab Jamun, and traditional festival sweets</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🇵🇰</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Made in Sialkot</h4>
                    <p className="text-sm text-gray-600">Proudly serving authentic Pakistani sweets and dairy products</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="/shop"
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🍯 Shop Sweets
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                📞 Contact Us
              </a>
            </div>
          </div>

          {/* Right Content - Brand Visual & Stats */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              {/* Brand Visual */}
              <div className="w-full h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">🍯</div>
                  <div className="text-white font-bold text-xl">
                    <span className="text-white">ALHAFIZ</span>
                  </div>
                  <div className="text-white text-sm opacity-90 mt-2">MILK & SWEETS</div>
                  <div className="text-white text-xs opacity-75 mt-1">Premium Traditional Sweets & Fresh Milk Products</div>
                </div>
                {/* Floating Sweet Icons */}
                <div className="absolute top-4 left-4 text-2xl animate-bounce">🥛</div>
                <div className="absolute top-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎂</div>
                <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🍮</div>
                <div className="absolute bottom-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🧈</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Sweet Varieties</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Fresh Daily</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Brand Story Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🏆 Your Trusted Sweet Shop Partner
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              At ALHAFIZ MILK AND SWEETS, we understand that sweets are more than just desserts – they're part of celebrations, traditions, and precious family moments.
              Our carefully crafted collection of premium traditional sweets brings together the finest authentic recipes with
              quality ingredients to create memorable taste experiences for every special occasion.
              <br /><br />
              <span className="font-semibold">From Khoya Barfi and Sohan Halwa to fresh milk products and pure Desi Ghee</span> –
              we offer the complete range of traditional sweets and dairy products for all your celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:03487765824"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>📞 Call Now: 03487765824</span>
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
      </div>
    </section>
  );
};

export default About; 