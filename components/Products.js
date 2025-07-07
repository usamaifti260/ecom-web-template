import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';

const Products = ({ products = [] }) => {
  const [addingToCart, setAddingToCart] = useState({});
  const [screenWidth, setScreenWidth] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showingDetails, setShowingDetails] = useState({});
  
  const { addItem } = useCart();
  const { showCartNotification } = useNotification();

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

  // Pizza size pricing multipliers
  const getSizePricing = (basePrice, size) => {
    const multipliers = {
      'Small 7"': 1.0,
      'Medium 10"': 1.4,
      'Large 13"': 1.8,
      'XL 16"': 2.2
    };
    
    return Math.round(basePrice * (multipliers[size] || 1.0));
  };

  // Get selected size for a product
  const getSelectedSize = (productId) => {
    return selectedSizes[productId] || null;
  };

  // Set selected size for a product
  const setSelectedSize = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  // Get current price based on selected size
  const getCurrentPrice = (product) => {
    if (product.category === 'Pizzas' && product.sizes) {
      const selectedSize = getSelectedSize(product.id);
      if (selectedSize) {
        return getSizePricing(product.price, selectedSize);
      }
      // Default to small size price
      return getSizePricing(product.price, product.sizes[0]);
    }
    return product.price;
  };

  // Get current original price based on selected size
  const getCurrentOriginalPrice = (product) => {
    if (product.category === 'Pizzas' && product.sizes && product.originalPrice) {
      const selectedSize = getSelectedSize(product.id);
      if (selectedSize) {
        return getSizePricing(product.originalPrice, selectedSize);
      }
      // Default to small size price
      return getSizePricing(product.originalPrice, product.sizes[0]);
    }
    return product.originalPrice;
  };

  // Helper function to handle add to cart
  const handleAddToCart = async (product) => {
    // For pizzas, ensure a size is selected
    if (product.category === 'Pizzas' && product.sizes) {
      const selectedSize = getSelectedSize(product.id);
      if (!selectedSize) {
        // Auto-select small size if none selected
        setSelectedSize(product.id, product.sizes[0]);
      }
    }

    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      const selectedSize = getSelectedSize(product.id);
      const currentPrice = getCurrentPrice(product);
      
      // Create product with size information
      const productToAdd = {
        ...product,
        price: currentPrice,
        selectedSize: selectedSize,
        displayName: selectedSize ? `${product.name} (${selectedSize})` : product.name
      };
      
      addItem(productToAdd, selectedSize, 1);
      showCartNotification(productToAdd, selectedSize, 1);
      
      setTimeout(() => {
        setAddingToCart(prev => ({ ...prev, [product.id]: false }));
      }, 800);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Get categories with their products
  const getProductsByCategory = () => {
    const categories = {};

    // Then group by actual categories
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });
    
    return categories;
  };

  const categorizedProducts = getProductsByCategory();

  // Theme configurations for different categories
  const getThemeConfig = (category, index) => {
    // Special theme configurations for specific categories
    if (category === 'Deals') {
      return {
        background: 'bg-gradient-to-br from-[#F44336] to-[#FF0000]',
        titleColor: 'text-white',
        cardBg: 'bg-white',
        cardBorder: 'border-[#F44336] border-opacity-30',
        accentColor: '#F44336'
      };
    }
    
    if (category === 'Burger' || category === 'Burgers') {
      return {
        background: 'bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]',
        titleColor: 'text-[#FFCC00]',
        cardBg: 'bg-[#2E2E2E]',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FFCC00',
        cardTextColor: 'text-white',
        buttonColor: 'bg-[#FFCC00] hover:bg-[#FFB300] text-[#1F1F1F]'
      };
    }
    
    if (category === 'Chicken' || category === 'Fried Chicken') {
      return {
        background: 'bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]',
        titleColor: 'text-[#FFCC00]',
        cardBg: 'bg-[#2E2E2E]',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FFCC00',
        cardTextColor: 'text-white',
        buttonColor: 'bg-[#FFCC00] hover:bg-[#FFB300] text-[#1F1F1F]'
      };
    }
    
    if (category === 'Sandwiches' || category === 'Sandwich') {
      return {
        background: 'bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]',
        titleColor: 'text-[#FFCC00]',
        cardBg: 'bg-[#2E2E2E]',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FFCC00',
        cardTextColor: 'text-white',
        buttonColor: 'bg-[#FFCC00] hover:bg-[#FFB300] text-[#1F1F1F]'
      };
    }
    
    if (category === 'Shawarma' || category === 'Fries') {
      return {
        background: 'bg-white',
        titleColor: 'text-[#1F1F1F]',
        cardBg: 'bg-white',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FF0000',
        cardTextColor: 'text-gray-900',
        buttonColor: 'bg-[#FF0000] hover:bg-[#F44336] text-white'
      };
    }
    
    const themes = [
      {
        background: 'bg-white',
        titleColor: 'text-[#1F1F1F]',
        cardBg: 'bg-white',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FF0000',
        cardTextColor: 'text-gray-900',
        buttonColor: 'bg-[#FF0000] hover:bg-[#F44336] text-white'
      },
      {
        background: 'bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]',
        titleColor: 'text-[#FFCC00]',
        cardBg: 'bg-[#2E2E2E]',
        cardBorder: 'border-[#C0C0C0] border-opacity-20',
        accentColor: '#FFCC00',
        cardTextColor: 'text-white',
        buttonColor: 'bg-[#FFCC00] hover:bg-[#FFB300] text-[#1F1F1F]'
      },
      {
        background: 'bg-gradient-to-br from-[#FF0000] to-[#F44336]',
        titleColor: 'text-white',
        cardBg: 'bg-white bg-opacity-10 backdrop-blur-sm',
        cardBorder: 'border-white border-opacity-20',
        accentColor: '#FFCC00',
        cardTextColor: 'text-white',
        buttonColor: 'bg-[#FFCC00] hover:bg-[#FFB300] text-[#1F1F1F]'
      },
      {
        background: 'bg-gradient-to-br from-[#FFA726] to-[#FFB300]',
        titleColor: 'text-[#1F1F1F]',
        cardBg: 'bg-white',
        cardBorder: 'border-[#1F1F1F] border-opacity-10',
        accentColor: '#FF0000',
        cardTextColor: 'text-gray-900',
        buttonColor: 'bg-[#FF0000] hover:bg-[#F44336] text-white'
      }
    ];
    
    return themes[index % themes.length];
  };

  // Get category emoji
  const getCategoryEmoji = (category) => {
    const emojis = {
      'Deals': '🔥',
      'Pizza': '🍕',
      'Burger': '🍔',
      'Shawarma': '🌯',
      'Chicken': '🍗',
      'Fries': '🍟',
      'Drinks': '🥤',
      'Desserts': '🍰',
      'Appetizers': '🥟',
      'Salads': '🥗'
    };
    return emojis[category] || '🍽️';
  };

  // Toggle deal details
  const toggleDealDetails = (productId) => {
    setShowingDetails(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Render product card with pizza size selection
  const renderProductCard = (product, theme) => {
    const isPizza = product.category === 'Pizzas' && product.sizes;
    const isDeal = product.category === 'Deals';
    const selectedSize = isPizza ? getSelectedSize(product.id) : null;
    const currentPrice = getCurrentPrice(product);
    const currentOriginalPrice = getCurrentOriginalPrice(product);
    const showingDealDetails = showingDetails[product.id];
    
    return (
      <div className={`${theme.cardBg} ${theme.cardBorder} border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}>
        {/* Product Image */}
        <div className="relative h-24 md:h-40 overflow-hidden">
          {product.originalPrice && product.originalPrice > product.price && (
            <div className={`absolute top-1 left-1 md:top-2 md:left-2 ${isDeal ? 'hidden' : 'visible'} bg-[#F44336] text-white px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-bold z-10`}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {/* if isDeal trrue then div bg color will be dark red */}
          <div className={`relative w-full h-full ${isDeal ? 'bg-[#212121]' : 'bg-gray-100'}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`${isDeal ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-300`}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2 md:p-4">
          {/* Product Name */}
          <h4 className={`font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-1 md:line-clamp-2 min-h-[1.25rem] md:min-h-[3.5rem] ${theme.cardTextColor || 'text-gray-900'}`}>
            {product.name}
          </h4>

          {/* Description - Now shown on mobile */}
          <p className={`text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 min-h-[2rem] md:min-h-[2.5rem] ${theme.cardTextColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
            {product.description}
          </p>

          {/* Deal Features - Only show for deals */}
          {isDeal && showingDealDetails && product.features && (
            <div className="mb-3 p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <h5 className={`font-semibold text-sm mb-2 ${theme.cardTextColor || 'text-gray-900'}`}>
                🎯 What's Included:
              </h5>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className={`text-xs md:text-sm flex items-center ${theme.cardTextColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#FFCC00] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pizza Size Selection */}
          {isPizza && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1 md:gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size/* || (!selectedSize && size === product.sizes[0] )*/;
                  const sizePrice = getSizePricing(product.price, size);
                  
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(product.id, size)}
                      className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? `${theme.accentColor === '#FFCC00' ? 'bg-[#FFCC00] text-[#1F1F1F]' : 'bg-[#FF0000] text-white'} shadow-md`
                          : `${theme.cardTextColor === 'text-white' ? 'bg-white bg-opacity-10 text-white hover:bg-opacity-20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} border`
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs md:text-sm">{size.split(' ')[0]}</span>
                        <span className="text-xs font-bold">Rs.{sizePrice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className={`text-sm md:text-xl font-bold ${theme.cardTextColor || 'text-gray-900'}`}>
                {formatPrice(currentPrice)}
              </span>
              {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                <span className={`hidden md:block text-xs md:text-sm line-through ${theme.cardTextColor === 'text-white' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatPrice(currentOriginalPrice)}
                </span>
              )}
            </div>
            {product.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-sm md:text-base">⭐</span>
                <span className={`text-xs md:text-sm font-medium ${theme.cardTextColor === 'text-white' ? 'text-gray-300' : 'text-gray-700'}`}>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Deal Show Details Button - Only for deals */}
          {isDeal && product.features && (
            <button
              onClick={() => toggleDealDetails(product.id)}
              className={`w-full py-2 md:py-2 px-2 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 flex items-center justify-center mb-2 ${
                showingDealDetails
                  ? 'bg-[#FFCC00] text-[#1F1F1F] hover:bg-[#FFB300]'
                  : theme.cardBg === 'bg-white' 
                    ? 'bg-[#FFCC00] text-[#1F1F1F] hover:bg-[#FFB300] border border-[#FFCC00]'
                    : 'bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 border border-white border-opacity-30'
              }`}
            >
              <svg className={`w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 transition-transform duration-200 ${showingDealDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span>{showingDealDetails ? 'Hide Details' : 'Show Details'}</span>
            </button>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-2 md:py-3 px-2 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
                : `${theme.buttonColor || 'bg-[#FF0000] hover:bg-[#F44336] text-white'} transform hover:scale-105`
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden md:inline">Added to Cart!</span>
                <span className="md:hidden">Added!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12M7 13h10m-10 0L5.4 5M7 13l-1.5 6" />
                </svg>
                <span className="hidden md:inline">Add to Cart</span>
                <span className="md:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Get slides per view based on screen width
  const getSlidesPerView = () => {
    if (screenWidth >= 1280) return 4; // xl
    if (screenWidth >= 1024) return 3; // lg
    if (screenWidth >= 768) return 3; // md - increased from 2 to 3
    if (screenWidth >= 480) return 3.5; // sm - increased from 1.2 to make cards narrower
    return 2.2; // sm - increased from 1.2 to make cards narrower
  };

  return (
    <section className="py-16">
      {/* Section Header - Centered with container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-sm font-semibold text-[#FF0000] uppercase tracking-wide mb-4">
            Our Menu
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-4">
            <span className="text-[#FFCC00]">Delicious</span> Food 
            <span className="text-[#FF0000]"> Awaits</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our mouth-watering collection of fast food made with fresh ingredients and served with love.
          </p>
        </div>
      </div>

      {/* Category Sections - Full Width */}
      <div className="space-y-12">
        {Object.entries(categorizedProducts).map(([category, categoryProducts], index) => {
          const theme = getThemeConfig(category, index);
          
          return (
            <div key={category} className={`${theme.background} py-12`}>
              {/* Category Header - Centered with container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                   {/* Dont show emoji on mobile */}
                    <span className="text-4xl hidden md:block">{getCategoryEmoji(category)}</span>
                    <div>
                      <h3 className={`text-3xl font-bold ${theme.titleColor}`}>
                        {category}
                      </h3>
                      <p className={`text-lg ${theme.titleColor} opacity-80`}>
                        {categoryProducts.length} items available
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      className={`swiper-button-prev-${category} w-10 h-10 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center hover:bg-opacity-30 transition-all duration-200`}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-next-${category} w-10 h-10 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center hover:bg-opacity-30 transition-all duration-200`}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Slider - Full Width */}
              <div className="w-full">
                <Swiper
                  modules={[FreeMode, Mousewheel, Navigation]}
                  spaceBetween={24}
                  slidesPerView={getSlidesPerView()}
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
                    prevEl: `.swiper-button-prev-${category}`,
                    nextEl: `.swiper-button-next-${category}`,
                  }}
                  grabCursor={true}
                  watchSlidesProgress={true}
                  centeredSlides={false}
                  slidesOffsetBefore={16}
                  slidesOffsetAfter={16}
                  breakpoints={{
                    320: {
                      slidesPerView: 2.2,
                      spaceBetween: 12,
                      slidesOffsetBefore: 16,
                      slidesOffsetAfter: 16,
                    },
                    480: {
                      slidesPerView: 2.2,
                      spaceBetween: 16,
                      slidesOffsetBefore: 16,
                      slidesOffsetAfter: 16,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 16,
                      slidesOffsetBefore: 24,
                      slidesOffsetAfter: 24,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      slidesOffsetBefore: 32,
                      slidesOffsetAfter: 32,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesOffsetBefore: 40,
                      slidesOffsetAfter: 40,
                    },
                  }}
                  className="!pb-4 w-full"
                >
                  {categoryProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      {renderProductCard(product, theme)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Swipe Hint for Mobile - Centered with container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:hidden">
                <div className="text-center mt-4">
                  <p className={`text-sm ${theme.titleColor} opacity-60`}>
                    Swipe to explore more {category.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Products Message */}
      {Object.keys(categorizedProducts).length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Menu Items Available</h3>
            <p className="text-gray-600 text-lg">
              Our delicious menu is being prepared. Check back soon for mouth-watering options!
            </p>
          </div>
        </div>
      )}

      {/* Call to Action - Centered with container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#FF0000] to-[#F44336] rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Call us directly and we'll help you find the perfect meal!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0304-4481181"
                className="bg-white text-[#FF0000] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Now</span>
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#FF0000] px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products; 