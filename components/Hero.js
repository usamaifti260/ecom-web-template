import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const foodItems = [
    { emoji: '🍔', name: 'Burgers', price: 'From Rs. 250', color: '#FF0000' },
    { emoji: '🍕', name: 'Pizza', price: 'From Rs. 800', color: '#FFCC00' },
    { emoji: '🌯', name: 'Shawarma', price: 'From Rs. 200', color: '#FFA726' },
    { emoji: '🍟', name: 'Fries', price: 'From Rs. 150', color: '#F44336' },
    { emoji: '🥤', name: 'Drinks', price: 'From Rs. 100', color: '#FF0000' },
    { emoji: '🍗', name: 'Chicken', price: 'From Rs. 300', color: '#FFCC00' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#1F1F1F] via-[#2E2E2E] to-[#1F1F1F] text-white min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Food Icons */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🍔</div>
        <div className="absolute top-40 right-20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🍕</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-bounce" style={{ animationDelay: '2s' }}>🌯</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🍟</div>
        <div className="absolute top-60 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥤</div>
        <div className="absolute top-80 right-1/3 text-3xl animate-bounce" style={{ animationDelay: '2.5s' }}>🍗</div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#FF0000] opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#FFCC00] opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-[#FFA726] opacity-10 transform rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 right-1/6 w-20 h-20 bg-[#F44336] opacity-10 transform rotate-45 animate-spin" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Main Headline with Animation */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="text-[#FFCC00] drop-shadow-lg animate-pulse">FORK</span>
                  <span className="text-white"> & </span>
                  <span className="text-[#FF0000] drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>KNIFE</span>
                </h1>
                {/* Decorative underline */}
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#FFCC00] via-[#FF0000] to-[#FFA726] rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C0C0C0] animate-fade-in">
                Fast Food Restaurant
              </h2>
              <div className="flex items-center space-x-2 text-[#FFA726] font-semibold text-lg">
                <span className="animate-ping w-3 h-3 bg-[#FF0000] rounded-full"></span>
                <span>Now Open & Delivering!</span>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-[#C0C0C0] leading-relaxed">
                🔥 <span className="text-[#FFCC00] font-bold">Sizzling Hot</span> delicious fast food delivered to your door!
              </p>
              <p className="text-lg text-[#C0C0C0]">
                Pizza, burgers, shawarma, and more freshly prepared with love.
                <span className="text-[#FFCC00] font-bold block mt-2">
                  🚚 FREE DELIVERY on orders over Rs. 1000
                </span>
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', text: 'Lightning Fast', color: '#FF0000' },
                { icon: '🌟', text: 'Premium Quality', color: '#FFCC00' },
                { icon: '🎯', text: 'Always Fresh', color: '#FFA726' },
                { icon: '💰', text: 'Great Value', color: '#F44336' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[#2E2E2E] rounded-lg border border-[#C0C0C0] border-opacity-20 hover:border-opacity-40 transition-all duration-300 transform hover:scale-105">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-[#C0C0C0] font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link 
                href="/shop"
                className="group relative bg-gradient-to-r from-[#FF0000] to-[#F44336] hover:from-[#F44336] hover:to-[#FF0000] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 text-center shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>🛒 Order Now</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFCC00] to-[#FFA726] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/contact"
                className="group bg-transparent border-3 border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#1F1F1F] px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 text-center shadow-xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>📞 Contact Us</span>
                </span>
              </Link>
            </div>

            {/* Enhanced Contact Info */}
            <div className="pt-8 border-t border-[#C0C0C0] border-opacity-30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F44336] rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#C0C0C0] text-sm">Call us now</div>
                    <div className="text-[#FFCC00] font-bold text-xl">0304-4481181</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1F1F1F]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#C0C0C0] text-sm">Delivery Time</div>
                    <div className="text-[#FFCC00] font-bold text-xl">30-45 min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Visual */}
          <div className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Main Visual Card */}
            <div className="relative">
              {/* Animated Background Circles */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF0000] via-[#FFCC00] to-[#FFA726] rounded-3xl opacity-20 animate-pulse blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-[#F44336] to-[#FF0000] rounded-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Main Content Card */}
              <div className="relative bg-gradient-to-br from-[#2E2E2E] to-[#1F1F1F] rounded-3xl p-8 shadow-2xl border border-[#C0C0C0] border-opacity-30 backdrop-blur-sm">
                {/* Special Offer Header */}
                <div className="text-center space-y-6 mb-8">
                  <div className="inline-block bg-gradient-to-r from-[#FFA726] to-[#FFCC00] text-[#1F1F1F] px-8 py-3 rounded-full font-black text-xl shadow-lg animate-bounce">
                    🎉 SPECIAL OFFER! 🎉
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-[#FF0000]">
                      FREE DELIVERY
                    </h3>
                    <p className="text-2xl text-[#C0C0C0]">
                      On orders over <span className="text-[#FF0000] font-bold text-3xl">Rs. 1000</span>
                    </p>
                  </div>
                </div>

                {/* Rotating Food Items Display */}
                <div className="relative h-64 bg-[#1F1F1F] rounded-2xl overflow-hidden mb-6 border border-[#C0C0C0] border-opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#F44336] opacity-10"></div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center space-y-4 transition-all duration-500 transform">
                      <div className="text-8xl animate-bounce">
                        {foodItems[currentSlide].emoji}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold text-[#FFCC00]">
                          {foodItems[currentSlide].name}
                        </h4>
                        <p className="text-[#C0C0C0] text-lg">
                          {foodItems[currentSlide].price}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {foodItems.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-[#FFCC00] scale-125' : 'bg-[#C0C0C0] opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#FF0000] border-opacity-30 text-center">
                    <div className="text-[#FF0000] text-2xl font-bold">500+</div>
                    <div className="text-[#C0C0C0] text-sm">Happy Customers</div>
                  </div>
                  <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#FFCC00] border-opacity-30 text-center">
                    <div className="text-[#FFCC00] text-2xl font-bold">4.8★</div>
                    <div className="text-[#C0C0C0] text-sm">Average Rating</div>
                  </div>
                  <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#FFA726] border-opacity-30 text-center">
                    <div className="text-[#FFA726] text-2xl font-bold">30min</div>
                    <div className="text-[#C0C0C0] text-sm">Avg Delivery</div>
                  </div>
                  <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#F44336] border-opacity-30 text-center">
                    <div className="text-[#F44336] text-2xl font-bold">24/7</div>
                    <div className="text-[#C0C0C0] text-sm">Service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </section>
  );
};

export default Hero; 