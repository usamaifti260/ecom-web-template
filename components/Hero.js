import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Banner images for clothing store
  const bannerImages = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Elegant Eastern Wear',
      subtitle: 'Discover timeless beauty in our premium collection',
      category: '3 Piece Collection',
      offer: 'Up to 30% Off'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Stunning Co-ord Sets',
      subtitle: 'Perfect harmony of style and comfort',
      category: 'Co-ord Collection',
      offer: 'New Arrivals'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/do8tgpf80/image/upload/v1752430158/Hathkari_Banner_Img_yp1qkz.jpg',
      title: 'Graceful Kameez Shalwar',
      subtitle: 'Traditional elegance meets modern design',
      category: 'Kameez Shalwar 3 Piece',
      offer: 'Limited Edition'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 9000); // Change slide every 9 seconds
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

  return (
    <section className="relative h-screen bg-white overflow-hidden">
      {/* Banner Slider */}
      <div className="relative h-full">
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
                <div className="max-w-xl lg:max-w-2xl">
                  <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${
                    index === currentSlide 
                      ? 'transform translate-x-0 opacity-100' 
                      : 'transform -translate-x-10 opacity-0'
                  }`}>
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-medium text-xs sm:text-sm shadow-lg animate-pulse">
                      <span className="mr-1 sm:mr-2">✨</span>
                      {banner.category}
            </div>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                      {banner.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                      {banner.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link 
                href="/shop"
                        className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                      >
                        <span>Shop Now</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
              </Link>
              <Link 
                        href="/about"
                        className="group bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-50 text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                      >
                        <span>Learn More</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {bannerImages.map((_, index) => (
          <button
                        key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-yellow-500 scale-125 shadow-lg' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                      />
                    ))}
                </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 animate-bounce">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-white">
          <span className="text-xs sm:text-sm font-medium">Scroll Down</span>
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400 bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 sm:w-24 sm:h-24 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-300 bg-opacity-10 transform rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>
    </section>
  );
};

export default Hero; 