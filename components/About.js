import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#FF0000] bg-opacity-10 px-4 py-2 rounded-full">
                <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-wide">
                  🍴 About Us
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Crafting Delicious Memories Since 
                <span className="text-[#FFCC00]"> Day One</span>
              </h2>
              
              <p className="text-lg text-[#C0C0C0] leading-relaxed">
                At <span className="text-[#FFCC00] font-semibold">Fork</span> & <span className="text-[#FF0000] font-semibold">Knife</span>, 
                we believe that great food brings people together. Our passion is delivering 
                mouth-watering fast food that satisfies your cravings and brings joy to your day. 
                From our signature wood-fired pizzas to juicy gourmet burgers and authentic shawarma, 
                every bite is crafted with love and the finest ingredients.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Why Choose Fork & Knife?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Fresh Ingredients</h4>
                    <p className="text-sm text-[#C0C0C0]">Premium quality ingredients sourced daily for maximum freshness</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFCC00] to-[#FFB300] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Lightning Fast</h4>
                    <p className="text-sm text-[#C0C0C0]">Hot, fresh food delivered to your door in 30 minutes or less</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFA726] to-[#FF9800] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Great Value</h4>
                    <p className="text-sm text-[#C0C0C0]">Delicious food at unbeatable prices with amazing deals daily</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Made with Love</h4>
                    <p className="text-sm text-[#C0C0C0]">Every dish prepared with care, passion, and family recipes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="/shop"
                className="bg-gradient-to-r from-[#FF0000] to-[#F44336] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#F44336] hover:to-[#FF0000] transition-all duration-300 text-center transform hover:scale-105"
              >
                🛒 Order Now
              </a>
              <a 
                href="/shop"
                className="bg-transparent border-2 border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#1F1F1F] px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                📋 View Menu
              </a>
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#2E2E2E] to-[#1F1F1F] rounded-2xl p-8 shadow-2xl border border-gray-700">
              {/* Restaurant Visual */}
              <div className="w-full h-64 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">🍕</div>
                  <div className="text-white font-bold text-xl">
                    <span className="text-[#FFCC00]">FORK</span> & <span className="text-white">KNIFE</span>
                  </div>
                  <div className="text-white text-sm opacity-90 mt-2">Fast Food Restaurant</div>
                </div>
                {/* Floating Food Icons */}
                <div className="absolute top-4 left-4 text-2xl animate-bounce">🍔</div>
                <div className="absolute top-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌯</div>
                <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🍟</div>
                <div className="absolute bottom-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥤</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#1F1F1F] rounded-xl">
                  <div className="text-3xl font-bold text-[#FFCC00] mb-1">10K+</div>
                  <div className="text-sm text-[#C0C0C0]">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-[#1F1F1F] rounded-xl">
                  <div className="text-3xl font-bold text-[#FF0000] mb-1">100+</div>
                  <div className="text-sm text-[#C0C0C0]">Menu Items</div>
                </div>
                <div className="text-center p-4 bg-[#1F1F1F] rounded-xl">
                  <div className="text-3xl font-bold text-[#FFA726] mb-1">25</div>
                  <div className="text-sm text-[#C0C0C0]">Daily Specials</div>
                </div>
                <div className="text-center p-4 bg-[#1F1F1F] rounded-xl">
                  <div className="text-3xl font-bold text-[#FFCC00] mb-1">24/7</div>
                  <div className="text-sm text-[#C0C0C0]">Service</div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#FFCC00] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#FF0000] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-[#FFA726] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Additional Restaurant Info */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#FF0000] to-[#F44336] rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🏆 Award-Winning Fast Food Experience
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              Recognized as the "Best Fast Food Restaurant" in Lahore for 3 consecutive years. 
              Our commitment to quality, speed, and customer satisfaction has made us the city's favorite food destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0304-4481181"
                className="bg-white text-[#FF0000] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>📞 Call Now: 0304-4481181</span>
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#FF0000] px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>📍 Visit Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 