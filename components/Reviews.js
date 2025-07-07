import { useState, useEffect } from 'react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Navigation, Autoplay } from 'swiper/modules';

const Reviews = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  // Check screen width for responsive behavior
  useEffect(() => {
    const checkScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      checkScreenWidth();
      window.addEventListener('resize', checkScreenWidth);
      return () => window.removeEventListener('resize', checkScreenWidth);
    }
  }, []);

  // Customer reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      rating: 5,
      comment: "Best pizza in town! The delivery was super fast and the food arrived hot. Their chicken tikka pizza is absolutely delicious. Will definitely order again!",
      image: "/reviews/customer1.jpg",
      location: "Lahore",
      orderItems: ["Chicken Tikka Pizza", "Garlic Bread"],
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Muhammad Hassan",
      rating: 5,
      comment: "Fork & Knife never disappoints! Their burgers are juicy and perfectly cooked. The fries are crispy and the portion sizes are generous. Great value for money!",
      image: "/reviews/customer2.jpg",
      location: "Karachi",
      orderItems: ["Beef Burger", "Crispy Fries"],
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Fatima Khan",
      rating: 4,
      comment: "Amazing shawarma! The meat was tender and flavorful. Delivery was on time and the packaging kept everything fresh. Highly recommended for quick meals.",
      image: "/reviews/customer3.jpg",
      location: "Islamabad",
      orderItems: ["Chicken Shawarma", "Cold Drink"],
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Ali Raza",
      rating: 5,
      comment: "Outstanding service and delicious food! The fried chicken was crispy and well-seasoned. Customer service was very friendly and helpful.",
      image: "/reviews/customer4.jpg",
      location: "Rawalpindi",
      orderItems: ["Fried Chicken", "Coleslaw"],
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Ayesha Malik",
      rating: 5,
      comment: "Love their variety! Ordered for a family gathering and everyone was impressed. The food quality is consistent and the prices are reasonable.",
      image: "/reviews/customer5.jpg",
      location: "Faisalabad",
      orderItems: ["Family Deal", "Multiple Items"],
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Usman Sheikh",
      rating: 4,
      comment: "Great taste and quick delivery! The pizza was loaded with toppings and the crust was perfect. Will be ordering more varieties next time.",
      image: "/reviews/customer6.jpg",
      location: "Multan",
      orderItems: ["Pepperoni Pizza", "Garlic Bread"],
      date: "4 days ago"
    }
  ];

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-[#FFCC00]' : 'text-gray-300'} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    return stars;
  };

  // Get slides per view based on screen width
  const getSlidesPerView = () => {
    if (screenWidth >= 1280) return 3; // xl
    if (screenWidth >= 1024) return 2; // lg
    if (screenWidth >= 768) return 2; // md
    return 1.1; // sm
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-[#FFCC00] uppercase tracking-wide mb-4">
            Customer Reviews
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-[#FF0000]">Customers</span> Say
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Don't just take our word for it - hear from our satisfied customers who love our delicious food and excellent service.
          </p>
          
          {/* Overall Rating Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FFCC00] mb-2">4.8</div>
              <div className="flex justify-center mb-1">
                {renderStars(5)}
              </div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF0000] mb-2">500+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FFA726] mb-2">1000+</div>
              <div className="text-sm text-gray-400">Orders Delivered</div>
            </div>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button className="reviews-prev w-12 h-12 rounded-full bg-[#FF0000] hover:bg-[#F44336] text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="reviews-next w-12 h-12 rounded-full bg-[#FF0000] hover:bg-[#F44336] text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <Swiper
            modules={[FreeMode, Mousewheel, Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={getSlidesPerView()}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            freeMode={{
              enabled: true,
              sticky: false,
              momentumRatio: 0.6,
              momentumVelocityRatio: 0.6,
            }}
            mousewheel={{
              forceToAxis: true,
            }}
            navigation={{
              prevEl: '.reviews-prev',
              nextEl: '.reviews-next',
            }}
            grabCursor={true}
            watchSlidesProgress={true}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!pb-4"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  {/* Review Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-[#FF0000] to-[#F44336] flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{review.location}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                  </div>

                  {/* Review Comment */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>

                  {/* Order Items */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-500 mb-2">Ordered:</div>
                    <div className="flex flex-wrap gap-2">
                      {review.orderItems.map((item, index) => (
                        <span
                          key={index}
                          className="bg-[#FFA726] bg-opacity-10 text-[#FF0000] text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      📱 Delivered via App
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

    
      </div>
    </section>
  );
};

export default Reviews; 