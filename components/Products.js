import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import { useNotification } from '@/lib/NotificationContext';
import SizeSelectionPopup from './SizeSelectionPopup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';

const Products = ({ products = [], categories = [] }) => {
  const [addingToCart, setAddingToCart] = useState({});
  const [screenWidth, setScreenWidth] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizePopup, setSizePopup] = useState({ isOpen: false, product: null });
  const [selectedColors, setSelectedColors] = useState({}); // Track selected color for each product
  const [visibleItems, setVisibleItems] = useState({}); // Track how many items are visible per category
  
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showCartNotification } = useNotification();

  // Initialize visible items for categories
  useEffect(() => {
    const initialVisibleItems = {};
    categories.forEach(category => {
      initialVisibleItems[category.id] = 8; // Start with 8 items per category
    });
    setVisibleItems(initialVisibleItems);
  }, [categories]);

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

  // Filter products for different sections
  const newArrivals = products.filter(product => product.isNew).slice(0, 8); // Limit to 8
  const onSaleProducts = products.filter(product => product.onSale).slice(0, 8); // Limit to 8
  
  // Get products by category name
  const getProductsByCategory = (categoryName) => {
    return products.filter(product => product.category === categoryName);
  };

  // Handle View More for categories
  const handleViewMore = (categoryId) => {
    setVisibleItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] + 8
    }));
  };

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Handle color selection
  const handleColorSelect = (productId, colorIndex) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: colorIndex
    }));
  };

  // Get current image for a product
  const getCurrentImage = (product) => {
    const productId = product.id;
    const selectedColorIndex = selectedColors[productId];
    
    // If a color is selected, show the corresponding gallery image
    if (selectedColorIndex !== undefined && product.gallery && product.gallery[selectedColorIndex]) {
      return product.gallery[selectedColorIndex];
    }
    
    // Default to main product image
    return product.image;
  };



  // Handle add to cart - always show size selection popup for configuration
  const handleAddToCart = async (product) => {
    // Always show the configuration popup to allow users to customize their product
    setSizePopup({ isOpen: true, product });
  };

  // Close size popup
  const closeSizePopup = () => {
    setSizePopup({ isOpen: false, product: null });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showCartNotification(product, null, 1, 'removed from wishlist');
    } else {
      addToWishlist(product);
      showCartNotification(product, null, 1, 'added to wishlist');
    }
  };

  // Product Card Component
  const ProductCard = ({ product, showQuickView = false, isDarkBackground = false }) => (
    <div className={`${isDarkBackground ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative`}>
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[5/5] overflow-hidden cursor-pointer lg:h-[480px] w-full">
          {/* Sale Badge */}
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
              SALE
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistToggle(product);
            }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full transition-all duration-300 z-20 flex items-center justify-center ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick View Button - Desktop Only */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-12 w-8 h-8 bg-white text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 z-20 flex items-center justify-center opacity-0 lg:group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          <div className="relative w-full h-full bg-white group">
            {/* Default image */}
            <Image
              src={getCurrentImage(product)}
              alt={product.name}
              fill
              className={`object-contain object-top transition-opacity duration-300 ${
                selectedColors[product.id] !== undefined 
                  ? 'opacity-100' // Always visible when color is selected
                  : 'opacity-100 group-hover:opacity-0' // Fade on hover when no color selected
              }`}
            />

            {/* Hover image - show hoverimage if available and no color selected */}
            {product.hoverimage && selectedColors[product.id] === undefined && (
              <Image
                src={product.hoverimage}
                alt={product.name}
                fill
                className="object-contain object-top transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            )}

        
          </div>
        </div>
      </Link>

      {/* Product Info - Slides up on hover (Desktop) */}
      <div className="relative">
        {/* Desktop: Sliding Content */}
        <div className={`hidden lg:block absolute bottom-0 left-0 right-0 ${isDarkBackground ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 lg:translate-y-0 lg:group-hover:-translate-y-16 z-10`}>
          <div className="p-4 text-center">
            {/* Brand Name */}
            <p className={`text-xs ${isDarkBackground ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide mb-1 font-medium`}>{product.brand}</p>
            
            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <h4 className={`font-normal text-xl mb-2 ${isDarkBackground ? 'text-gray-200 hover:text-red-400' : 'text-gray-800 hover:text-amber-600'} leading-tight transition-colors duration-200 cursor-pointer`}>
                {product.name}
              </h4>
            </Link>

            {/* Price */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className={`text-xl font-normal ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
                {formatPrice(product.price)}
              </span>
              {product.onSale && (
                <span className={`text-sm ${isDarkBackground ? 'text-gray-400' : 'text-gray-500'} line-through font-light`}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center justify-center space-x-1">
                              {product.colors.map((color, index) => {
                const getColorClass = (colorName) => {
                  const colorMap = {
                    'Gray': 'bg-gray-400',
                    'Mink': 'bg-amber-200',
                    'Black': 'bg-black',
                    'White': 'bg-white border-2 border-gray-300',
                    'Brown': 'bg-amber-800',
                    'Blue': 'bg-blue-500',
                    'Navy': 'bg-blue-900',
                    'Red': 'bg-red-500',
                    'Green': 'bg-green-500',
                    'Beige': 'bg-amber-100',
                    'Cream': 'bg-yellow-50',
                    'Sky': 'bg-sky-300',
                    'Turquoise': 'bg-teal-400',
                    'Steel': 'bg-slate-500',
                    "Camel": "bg-amber-500",
                    "Silver": "bg-gray-500",
                    "Dark Blue": "bg-blue-900"
                  };
                  return colorMap[colorName] || 'bg-gray-400';
                };

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleColorSelect(product.id, index);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${
                        selectedColors[product.id] === index 
                          ? 'ring-2 ring-gray-600 ring-offset-1' 
                          : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                      }`}
                      title={color}
                      type="button"
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Shows on hover (Desktop only) */}
        <div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-white lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:transform lg:translate-y-16 lg:group-hover:translate-y-0 p-4 lg:z-20">
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-3 px-4 rounded font-bold text-sm transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
                : 'bg-[#222222] hover:bg-black text-white'
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>

        {/* Mobile/Tablet: Static Content (Always Visible) */}
        <div className="lg:hidden py-4 px-2 text-center">
          {/* Brand Name */}
          <p className={`text-[10px] ${isDarkBackground ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide mb-1 font-medium`}>UK FURNISH</p>
          
          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h4 className={`font-normal text-base mb-2 ${isDarkBackground ? 'text-gray-200 hover:text-red-400' : 'text-gray-800 hover:text-amber-600'} leading-tight transition-colors duration-200 cursor-pointer`}>
              {product.name}
            </h4>
          </Link>

          {/* Price */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className={`text-lg font-normal ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
              {formatPrice(product.price)}
            </span>
            {product.onSale && (
              <span className={`text-sm ${isDarkBackground ? 'text-gray-400' : 'text-gray-500'} line-through font-light`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Options - Mobile */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-center space-x-1 mb-3">
              {product.colors.map((color, index) => {
                const getColorClass = (colorName) => {
                  const colorMap = {
                    'Gray': 'bg-gray-400',
                    'Mink': 'bg-amber-200',
                    'Black': 'bg-black',
                    'White': 'bg-white border-2 border-gray-300',
                    'Brown': 'bg-amber-800',
                    'Blue': 'bg-blue-500',
                    'Navy': 'bg-blue-900',
                    'Red': 'bg-red-500',
                    'Green': 'bg-green-500',
                    'Beige': 'bg-amber-100',
                    'Cream': 'bg-yellow-50',
                    'Sky': 'bg-sky-300',
                    'Turquoise': 'bg-teal-400',
                    'Steel': 'bg-slate-500',
                    "Camel": "bg-amber-500",
                    "Silver": "bg-gray-500",
                    "Dark Blue": "bg-blue-900"
                  };
                  return colorMap[colorName] || 'bg-gray-400';
                };

                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleColorSelect(product.id, index);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${
                      selectedColors[product.id] === index 
                        ? 'ring-2 ring-gray-600 ring-offset-1' 
                        : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                    }`}
                    title={color}
                    type="button"
                  />
                );
              })}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
                : 'bg-[#222222] hover:bg-black text-white'
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Category Card Component - Updated to use dynamic categories
  const CategoryCard = ({ category }) => {
    // Convert category name to URL slug
    const getCategorySlug = (categoryName) => {
      let slug = categoryName.toLowerCase().replace(/\s+/g, '-');
      if (slug === '1-piece') slug = '1piece';
      if (slug === '2-piece') slug = '2piece';
      if (slug === '3-piece') slug = '3piece';
      if (slug === 'co-ord-set') slug = 'coord';
      if (slug === 'kameez-shalwar-3-piece') slug = 'kameez-shalwar';
      return slug;
    };

    const productsInCategory = getProductsByCategory(category.categoryname);
    const currentVisible = visibleItems[category.id] || 8; // Default to 8 if not set

    return (
      <div key={category.id} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
            Shop Collection
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.categoryname}
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {productsInCategory.length} items available in this collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6 mb-8">
          {productsInCategory.slice(0, currentVisible).map((product) => (
            <ProductCard key={product.id} product={product} showQuickView={true} />
          ))}
        </div>

        {currentVisible < productsInCategory.length && (
          <div className="text-center">
            <button
              onClick={() => handleViewMore(category.id)}
              className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View More {category.categoryname}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Get slides per view for sliders
  const getSlidesPerView = () => {
    if (screenWidth >= 1280) return 4;
    if (screenWidth >= 1024) return 3;
    if (screenWidth >= 768) return 2;
    if (screenWidth >= 480) return 1.5;
    return 1;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Individual Category Sections - Now at the top with grid layout */}
        {categories.map((category, index) => {
          const categoryProducts = getProductsByCategory(category.categoryname);
          if (categoryProducts.length === 0) return null;
          
          // Convert category name to URL slug
          const getCategorySlug = (categoryName) => {
            let slug = categoryName.toLowerCase().replace(/\s+/g, '-');
            if (slug === '1-piece') slug = '1piece';
            if (slug === '2-piece') slug = '2piece';
            if (slug === '3-piece') slug = '3piece';
            if (slug === 'co-ord-set') slug = 'coord';
            if (slug === 'kameez-shalwar-3-piece') slug = 'kameez-shalwar';
            return slug;
          };
          
          const currentVisible = visibleItems[category.id] || 8;
          const productsToShow = categoryProducts.slice(0, currentVisible);
          
          return (
            <div key={category.id} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
                  Shop Collection
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {category.categoryname}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {categoryProducts.length} items available in this collection
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6 mb-8">
                {productsToShow.map((product) => (
                  <ProductCard key={product.id} product={product} showQuickView={true} />
                ))}
              </div>

              {/* Show View More OR View All button based on products loaded */}
              <div className="text-center">
                {currentVisible < categoryProducts.length ? (
                  <button
                    onClick={() => handleViewMore(category.id)}
                    className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View More {category.categoryname}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ) : (
                  <Link 
                    href={`/category/${getCategorySlug(category.categoryname)}`}
                    className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View All {category.categoryname}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* On Sale Section - Full width dark background */}
      <div className="mb-20 bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-4">
              Special Offers
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              On <span className="text-red-400">Sale</span>
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't miss out on these amazing deals and discounts
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[FreeMode, Navigation]}
              spaceBetween={24}
              slidesPerView={getSlidesPerView()}
              freeMode={{
                enabled: true,
                sticky: false,
              }}
              navigation={{
                prevEl: '.onsale-prev',
                nextEl: '.onsale-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 16 },
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="!pb-4"
            >
              {onSaleProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} showQuickView={true} isDarkBackground={true} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="onsale-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="onsale-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/category/on-sale"
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Sale Items
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
              Fresh Collection
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              New <span className="text-yellow-600">Arrivals</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of elegant eastern wear designed for the modern woman
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[FreeMode, Navigation]}
              spaceBetween={24}
              slidesPerView={getSlidesPerView()}
              freeMode={{
                enabled: true,
                sticky: false,
              }}
              navigation={{
                prevEl: '.newarrivals-prev',
                nextEl: '.newarrivals-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 16 },
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="!pb-4"
            >
              {newArrivals.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} showQuickView={true} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="newarrivals-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="newarrivals-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/category/new-arrivals"
              className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All New Arrivals
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👗</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Available</h3>
            <p className="text-gray-600 text-lg">
              Our beautiful collection is being prepared. Check back soon for amazing eastern wear!
            </p>
          </div>
        )}
      </div>

      {/* Size Selection Popup */}
      <SizeSelectionPopup
        product={sizePopup.product}
        isOpen={sizePopup.isOpen}
        onClose={closeSizePopup}
      />
    </section>
  );
};

export default Products; 