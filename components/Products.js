import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
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

  // Filter products for different sections
  const newArrivals = products.filter(product => product.isNew).slice(0, 12);
  const onSaleProducts = products.filter(product => product.onSale).slice(0, 8);
  
  // Get products by category name
  const getProductsByCategory = (categoryName) => {
    return products.filter(product => product.category === categoryName);
  };

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Handle add to cart - show size selection popup
  const handleAddToCart = async (product) => {
    if (product.sizes && product.sizes.length > 0) {
      setSizePopup({ isOpen: true, product });
    } else {
      // For products without sizes, add directly to cart
      setAddingToCart(prev => ({ ...prev, [product.id]: true }));
      
      try {
        addItem(product, null, 1);
        showCartNotification(product, null, 1);
        
        setTimeout(() => {
          setAddingToCart(prev => ({ ...prev, [product.id]: false }));
        }, 800);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        setAddingToCart(prev => ({ ...prev, [product.id]: false }));
      }
    }
  };

  // Close size popup
  const closeSizePopup = () => {
    setSizePopup({ isOpen: false, product: null });
  };

  // Product Card Component
  const ProductCard = ({ product, showQuickView = false }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden cursor-pointer">
          {product.onSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                {product.salepercentage/* || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)*/}% OFF
              </div>
            )}
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              NEW
            </div>
          )}
          <div className="relative w-full h-full bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Quick View Overlay */}
          {showQuickView && (
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                View Details
              </div>
            </div>
          )}
          </div>
        </Link>

        {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        
                  {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h4 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] text-gray-800 leading-tight tracking-wide hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
            {product.name}
          </h4>
        </Link>

        {/* Price */}
        <div className="mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.onSale && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
          className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:scale-105'
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              <span className="hidden sm:inline">Added to Cart!</span>
              <span className="sm:hidden">Added!</span>
              </>
            ) : (
              <>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
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

    return (
      <Link href={`/category/${getCategorySlug(category.categoryname)}`}>
        <div className="relative group cursor-pointer">
          {/* Round container with background image */}
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={category.categorythumbnail}
                alt={category.categoryname}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              {/* Category Name */}
              <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg leading-tight">
                {category.categoryname}
              </h3>
              
              {/* Items Count */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-30">
                <p className="text-white text-sm font-medium">
                  {productsInCategory.length} items
                </p>
              </div>
              
              {/* Hover Effect - Arrow */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Name Below (for better readability on mobile) */}
          <div className="mt-4 text-center sm:hidden">
            <h4 className="font-semibold text-gray-900 text-lg">{category.categoryname}</h4>
            <p className="text-sm text-gray-600 mt-1">{productsInCategory.length} items</p>
          </div>
        </div>
      </Link>
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
        
        {/* New Arrivals Section */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6 mb-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} showQuickView={true} />
            ))}
          </div>

        <div className="text-center">
            <Link 
              href="/category/new-arrivals"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All New Arrivals
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
              Shop by Category
          </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Collections</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections, each designed to celebrate elegance and style
          </p>
        </div>

          <div className="relative">
            <Swiper
              modules={[FreeMode, Navigation]}
              spaceBetween={32}
              slidesPerView={getSlidesPerView()}
              freeMode={{
                enabled: true,
                sticky: false,
              }}
              navigation={{
                prevEl: '.categories-prev',
                nextEl: '.categories-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                480: { slidesPerView: 1.5, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 28 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
                1280: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="!pb-8"
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryCard category={category} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="categories-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="categories-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* On Sale Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4">
              Special Offers
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              On <span className="text-red-600">Sale</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals and discounts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6 mb-8">
            {onSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} showQuickView={true} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/category/on-sale"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Sale Items
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
      </div>

        {/* Individual Category Sections */}
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
          
          return (
            <div key={category.id} className="mb-20">
              <div className="flex items-center justify-between mb-8">
                    <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{category.categoryname}</h3>
                  <p className="text-gray-600">{categoryProducts.length} items available</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* View All Button */}
                    <Link 
                      href={`/category/${getCategorySlug(category.categoryname)}`}
                      className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
                    >
                      View All
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    
                    {/* Navigation Buttons */}
                    <div className="flex space-x-2">
                    <button className={`category-${category.categoryname.replace(/\s+/g, '').toLowerCase()}-prev w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200`}>
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    <button className={`category-${category.categoryname.replace(/\s+/g, '').toLowerCase()}-next w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200`}>
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
              </div>

                <Swiper
                modules={[FreeMode, Navigation]}
                  spaceBetween={24}
                  slidesPerView={getSlidesPerView()}
                  freeMode={{
                    enabled: true,
                    sticky: false,
                  }}
                  navigation={{
                  prevEl: `.category-${category.categoryname.replace(/\s+/g, '').toLowerCase()}-prev`,
                  nextEl: `.category-${category.categoryname.replace(/\s+/g, '').toLowerCase()}-next`,
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
                  {categoryProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                    <ProductCard product={product} showQuickView={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Mobile View All Button */}
                <div className="text-center mt-6 sm:hidden">
                  <Link 
                    href={`/category/${getCategorySlug(category.categoryname)}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View All {category.categoryname}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
            </div>
          );
        })}

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