import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const services = [
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5a3 3 0 006 0" />
        </svg>
      ),
      title: 'Free Shipping',
      subtitle: 'Free Shipping In UK'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      subtitle: 'Call Us'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Custom Design',
      subtitle: 'Customization Available'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Christmas Deals',
      subtitle: 'Special Offers'
    }
  ];

  // Banner images for sofa store
  const bannerImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvZmF8ZW58MHx8MHx8fDA%3D',
      title: 'Luxury Living Room Sets',
      subtitle: 'Transform your space with premium comfort and style',
      category: 'Living Room Collection',
      offer: 'Up to 40% Off'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Modern Office Furniture',
      subtitle: 'Productive workspace with ergonomic design',
      category: 'Office Collection',
      offer: 'New Arrivals'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1664711942326-2c3351e215e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNvZmF8ZW58MHx8MHx8fDA%3D',
      title: 'Cozy Bedroom Sets',
      subtitle: 'Create your perfect sanctuary for rest and relaxation',
      category: 'Bedroom Collection',
      offer: 'Limited Edition'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 7000); // Change slide every 9 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(0); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <>
      {/* Services Banner Row */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 py-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2 text-center md:text-left">
                <div className="flex-shrink-0 text-[#222222]">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#222222] mb-0.5">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {service.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout with Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide justify-start sm:justify-center py-2">
              {services.map((service, index) => (
                <div key={index} className="flex-shrink-0 flex items-center space-x-2 min-w-[110px]">
                  <div className="flex-shrink-0 text-[#222222]">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-[#222222] mb-0.5 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[10px] text-gray-600 leading-tight">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

            <section className="relative bg-white overflow-hidden">
        {/* Banner Slider */}
        <div 
          className="relative h-[35vh] sm:h-[60vh] md:h-[60vh] lg:h-screen"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
        {bannerImages.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-full text-center">
                  <div className={`space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-1000 delay-300 ${
                    index === currentSlide 
                      ? 'transform translate-x-0 opacity-100' 
                      : 'transform -translate-x-10 opacity-0'
                  }`}>
                    {/* Category Badge */}
                    {/* <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium text-[10px] sm:text-xs md:text-sm shadow-lg animate-pulse">
                      <span className="mr-1">🛋️</span>
                      {banner.category}
                     </div> */}

                    {/* Main Title */}
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white leading-tight">
                      {banner.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed">
                      {banner.subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-6">
              <Link 
                href="/shop"
                        className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-1 w-fit mx-auto"
                      >
                        <span>Shop Now</span>
                        <svg className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
              </Link>
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
                  </div>
                  
                  {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {bannerImages.map((_, index) => (
          <button
                        key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-amber-500 scale-125 shadow-lg' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                      />
                    ))}
                </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 animate-bounce">
        <div className="flex flex-col items-center space-y-1 text-white">
          <span className="text-xs font-medium">Scroll</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 md:top-20 md:right-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-amber-400 bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 md:bottom-40 md:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-amber-300 bg-opacity-10 transform rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>


          </section>

      {/* Deals of the Day Banner */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black py-3 sm:py-4 md:py-6 lg:py-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8 rounded-lg overflow-hidden my-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Animated Text Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
            <div className="animate-pulse">
              <h2 className="text-white font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
                Deals of the Day
              </h2>
            </div>
            {/* Hide this on mobile */}
            <div className="hidden sm:block animate-bounce">
              <span className="text-gray-300 font-medium text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                New Every Day!
              </span>
            </div>
            
            {/* Animated decorative elements */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Animated Shop Now Button */}
          <div className="flex-shrink-0">
            <Link 
              href="/shop"
              className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white hover:text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-full font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-1 sm:space-x-2 animate-pulse"
            >
              <span>Shop Now</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 bg-opacity-20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 bg-opacity-30 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-amber-600 bg-opacity-25 rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-2 right-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 bg-opacity-40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </>
  );
};

export default Hero; 