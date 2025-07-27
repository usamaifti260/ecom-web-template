import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-10 px-4 py-2 rounded-full">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                  ✨ About Us
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Precision Engineering Since
                <span className="text-blue-600"> Day One</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                At <span className="text-blue-600 font-semibold">BHATTI INDUSTRIES</span>,
                we believe that every surgical instrument should combine precision engineering with uncompromising quality.
                Our passion is manufacturing premium surgical instruments and medical equipment that healthcare professionals trust.
                From our signature general surgery instruments and cardiovascular tools to specialized orthopedic, dental, and ENT equipment,
                every piece is crafted with precision and attention to detail using German stainless steel and ISO 13485 certified processes.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose BHATTI INDUSTRIES?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Medical Grade Quality</h4>
                    <p className="text-sm text-gray-600">German stainless steel and precision engineering for lasting performance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">ISO 13485 Certified</h4>
                    <p className="text-sm text-gray-600">International quality standards with rigorous manufacturing processes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚕️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Complete Range</h4>
                    <p className="text-sm text-gray-600">General, cardiovascular, orthopedic, dental, ENT, and neurosurgery instruments</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🇵🇰</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Made in Sialkot</h4>
                    <p className="text-sm text-gray-600">Proudly manufactured in Pakistan's surgical instruments capital</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="/shop"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🏥 Shop Instruments
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                📞 Contact Us
              </a>
            </div>
          </div>

          {/* Right Content - Brand Visual & Stats */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              {/* Brand Visual */}
              <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">⚕️</div>
                  <div className="text-white font-bold text-xl">
                    <span className="text-white">BHATTI</span>
                  </div>
                  <div className="text-white text-sm opacity-90 mt-2">INDUSTRIES</div>
                  <div className="text-white text-xs opacity-75 mt-1">Premium Surgical Instruments & Medical Equipment</div>
                </div>
                {/* Floating Medical Icons */}
                <div className="absolute top-4 left-4 text-2xl animate-bounce">🔬</div>
                <div className="absolute top-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🏥</div>
                <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🩺</div>
                <div className="absolute bottom-4 right-4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>💉</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Healthcare Partners</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Surgical Instruments</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">ISO Certified</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Brand Story Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🏆 Your Trusted Medical Equipment Partner
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              At BHATTI INDUSTRIES, we understand that surgical instruments are critical tools that save lives and improve patient outcomes.
              Our carefully engineered collection of premium medical equipment brings together the finest precision manufacturing with
              international quality standards to support healthcare professionals worldwide.
              <br /><br />
              <span className="font-semibold">From general surgery and cardiovascular instruments to orthopedic, dental, ENT, and neurosurgery tools</span> –
              we offer the complete range of premium surgical instruments and medical equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0331-0422676"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>📞 Call Now: 0331-0422676</span>
              </a>
              <a
                href="mailto:info@bhattiindustries.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
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