'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClientProducts } from '@/lib/fetchProducts';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
import { processGalleryItems, isYouTubeVideo, getYouTubeThumbnail } from '@/lib/mediaUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediaViewer from '@/components/MediaViewer';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';

// Configuration Variables
const PRODUCT_DETAIL_CONFIG = {
  // Schema Slugs
  productsSchemaSlug: 'products_alhafizsweetsandmilk',

  // Currency & Pricing
  currency: 'PKR',

  // Page Meta
  siteName: 'AlHafiz Milk and Sweets',
  keywords: 'khoya barfi, sohan halwa, desi ghee, traditional sweets, milk products, Pakistani sweets, fresh milk, badami halwa, akhroti halwa, mix dry fruit halwa, silver barfi, gulab jamun, sialkot sweets, authentic taste',
  defaultTitle: 'AlHafiz Milk and Sweets',

  faviconPath: '/assets/alhafiz_logo.png',
  faviconSize: '32x32',

  // Loading States
  loading: {
    title: 'Loading product details...',
    message: 'Loading product details...'
  },

  // Error States
  notFound: {
    title: 'Product Not Found',
    message: "The product you're looking for doesn't exist or has been removed.",
    buttonText: 'Browse All Products',
    buttonLink: '/shop'
  },

  // Navigation
  breadcrumbs: {
    home: 'Home',
    shop: 'Shop'
  },

  // Product Information
  labels: {
    color: 'Variety',
    selectedColor: 'Selected Variety:',
    size: 'Size',
    quantity: 'Quantity',
    yourSelection: 'Your Selection:',
    addToCart: 'Add to Cart',
    addingToCart: 'Adding to Cart...'
  },

  // Badges
  badges: {
    new: 'NEW',
    onSale: 'ON SALE',
    bestseller: 'BESTSELLER'
  },

  // Pricing
  pricing: {
    youSave: 'You save',
    off: '% off'
  },

  // Product Features
  features: {
    inStock: 'In Stock',
    freeShipping: 'Free Delivery',
    qualityGuaranteed: 'Fresh Daily',
    returns: '7-Day Quality Guarantee'
  },

  // Tabs
  tabs: {
    description: 'Description',
    faq: 'FAQ\'s',
    reviews: 'Reviews'
  },

  // Tab Content
  tabContent: {
    productDescription: 'Product Description',
    additionalFeatures: 'Additional Features',
    specifications: 'Specifications',
    generalInformation: 'General Information',
    features: 'Features',
    faqTitle: 'Frequently Asked Questions',
    faqContact: 'Still have questions?',
    faqContactMessage: 'Contact our customer service team at info@alhafizsweetsandmilk.com or call us at 03487765824. We\'re here to help you find the perfect traditional sweets for your special occasions and daily enjoyment.',
    reviewsTitle: 'Customer Reviews',
    writeReview: 'Write a Review',
    outOfFive: 'out of 5',
    totalReviews: 'total reviews',
    reviewsComingSoon: 'Reviews Coming Soon',
    reviewsComingSoonMessage: 'We\'re working on collecting customer reviews for this product. Be the first to share your experience!'
  },

  // Related Products
  relatedProducts: {
    subtitle: 'Recommended for You',
    title: 'You May Also',
    titleHighlight: 'Like',
    description: 'Discover more traditional sweets from the same collection',
    viewDetails: 'View Details',
    viewProduct: 'VIEW PRODUCT'
  },

  // Slider Settings
  slider: {
    spaceBetween: 10,
    thumbSpaceBetween: 8,
    thumbSlidesPerView: 4,
    thumbSlidesPerViewTablet: 5,
    thumbSlidesPerViewDesktop: 6,
    transitionDuration: 300
  },

  // Layout
  maxQuantity: 10,
  minQuantity: 1,
  sizeGridColumns: 4,

  // Color instruction text
  colorInstruction: 'variant - Click another finish to change',

  // Warranty and delivery info
  warranty: {
    years: 'Quality Guarantee',
    delivery: 'Free Delivery in Pakistan'
  },

  // FAQ Data
  faq: [
    {
      question: "What is the delivery time for AlHafiz Milk and Sweets products?",
      answer: "We offer free delivery across Pakistan. Standard delivery takes 3-5 business days within major cities like Sialkot, Lahore, Karachi, and Islamabad. For remote areas, please allow an additional 2-3 days. Fresh sweets are prepared daily and delivered promptly to maintain quality and taste."
    },
    {
      question: "Do you offer a freshness guarantee on your sweets?",
      answer: "Yes, all AlHafiz Milk and Sweets products come with a 7-day quality guarantee covering freshness and taste. Our sweets are made daily with pure ingredients including fresh milk and premium dry fruits. We ensure the highest standards of hygiene and quality in our preparation."
    },
    {
      question: "Are your sweets made with pure and natural ingredients?",
      answer: "Absolutely! All our traditional sweets are made with 100% pure ingredients - fresh milk, pure desi ghee, premium dry fruits (almonds, pistachios, walnuts), and natural sugar. We source our milk daily from local farms and use traditional recipes passed down through generations."
    },
    {
      question: "What payment options do you accept?",
      answer: "We accept all major credit cards, debit cards, JazzCash, EasyPaisa, and bank transfers. We also offer Cash on Delivery (COD) for customers across Pakistan. Easy installment plans are available for bulk orders over PKR 10,000 for festivals and special occasions."
    },
    {
      question: "What is your return policy for sweets?",
      answer: "We offer a 7-day quality guarantee for all our traditional sweets. Items must be in original condition with original packaging. Due to the perishable nature of sweets, returns are accepted only for quality issues or if the product doesn't meet our freshness standards. Custom orders for festivals are non-returnable unless there's a quality issue."
    }
  ]
};

export default function ProductDetail({ product, relatedProducts }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showCartNotification } = useNotification();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const programmaticSlideChangeRef = useRef(false);

  const [activeTab, setActiveTab] = useState('description');

  // Process gallery items to handle both images and videos
  const galleryItems = product ? processGalleryItems(product.gallery) : [];

  // Initialize configuration options when product is available
  useEffect(() => {
    if (product) {
      // Set defaults only when product first loads or changes
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0].size || product.sizes[0]);
      // Initialize color selection to first color if available
      setSelectedColorIndex(product.colors?.length > 0 ? 0 : null);

      // Reset programmatic slide change flag
      programmaticSlideChangeRef.current = false;
    }
  }, [product]);

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{PRODUCT_DETAIL_CONFIG.loading.message}</p>
        </div>
      </div>
    );
  }

  // Handle product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{PRODUCT_DETAIL_CONFIG.notFound.title}</h1>
            <p className="text-gray-600 mb-8">{PRODUCT_DETAIL_CONFIG.notFound.message}</p>
            <Link
              href={PRODUCT_DETAIL_CONFIG.notFound.buttonLink}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              {PRODUCT_DETAIL_CONFIG.notFound.buttonText}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return `${PRODUCT_DETAIL_CONFIG.currency} ${price.toLocaleString()}`;
  };

  // Get current image - prioritize color selection, then manual selection
  const getCurrentImage = () => {
    if (selectedColorIndex !== null && galleryItems[selectedColorIndex]) {
      const item = galleryItems[selectedColorIndex];
      return item.isYouTube ? item.thumbnail : item.url;
    }
    const item = galleryItems[selectedImageIndex];
    return item ? (item.isYouTube ? item.thumbnail : item.url) : '';
  };

  // Get current image index for slider
  const getCurrentImageIndex = () => {
    return selectedColorIndex !== null ? selectedColorIndex : selectedImageIndex;
  };

  // Handle color selection
  const handleColorSelect = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setSelectedImageIndex(colorIndex); // Sync the slider as well

    // Set flag to prevent onSlideChange from resetting color selection
    programmaticSlideChangeRef.current = true;

    // Update both swipers to show the correct slide
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(colorIndex, 300); // 300ms transition
    }
    if (thumbsSwiper && !thumbsSwiper.destroyed) {
      thumbsSwiper.slideTo(colorIndex, 300); // Sync thumbnail slider too
    }

    // Reset the flag after a short delay to allow slide change to complete
    setTimeout(() => {
      programmaticSlideChangeRef.current = false;
    }, 100);

    // Scroll to top on mobile devices to show the image change
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle manual image selection (from thumbnails or slider)
  const handleImageSelect = (index) => {
    // If this is a programmatic slide change (from color selection), don't reset color selection
    if (programmaticSlideChangeRef.current) {
      setSelectedImageIndex(index);
      return;
    }

    setSelectedImageIndex(index);
    setSelectedColorIndex(null); // Reset color selection when manually selecting image
  };

  // Color mapping function
  const getColorClass = (colorName) => {
    const colorMap = {
      'Silver': 'bg-gray-500',
      'Gold Plated': 'bg-yellow-500',
      'Titanium': 'bg-slate-600',
      'Stainless Steel': 'bg-gray-400',
      'Black Titanium': 'bg-black',
      'Copper': 'bg-orange-600',
      'Chrome': 'bg-gray-300',
      'Blue Titanium': 'bg-blue-500',
      'Rose Gold': 'bg-pink-400',
      'Matte Black': 'bg-gray-800',
      'Polished': 'bg-gray-200',
      'Satin': 'bg-gray-300'
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  // Get current price based on selected size
  const getCurrentPrice = () => {
    if (!product.sizes || product.sizes.length === 0) return product.price;

    // If sizes are objects with price, find the selected size price
    if (typeof product.sizes[0] === 'object' && product.sizes[0].pricebysize) {
      const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
      return selectedSizeObj ? selectedSizeObj.pricebysize : product.price;
    }

    return product.price;
  };

  const handleAddToCart = async () => {
    // Check if product has sizes and none is selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    setAddingToCart(true);

    try {
      // Create product configuration object
      const productConfig = {
        ...product
      };

      // Prepare user selections for configuration
      const userSelections = {
        size: selectedSize,
        color: product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex !== null ? selectedColorIndex : 0] : null
      };

      // Use new addItem signature: addItem(product, quantity, userSelections)
      addItem(productConfig, Number(quantity), userSelections);
      showCartNotification(productConfig, selectedSize, Number(quantity));

      setTimeout(() => {
        setAddingToCart(false);
      }, 800);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // FAQ data for AlHafiz Milk and Sweets brand
  const faqData = PRODUCT_DETAIL_CONFIG.faq;

  return (
    <>
      <Head>
        <title>{product.name} - {PRODUCT_DETAIL_CONFIG.siteName}</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.category}, ${product.brand}, ${PRODUCT_DETAIL_CONFIG.keywords}, ${product.name}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={PRODUCT_DETAIL_CONFIG.faviconPath} type="image/png" sizes={PRODUCT_DETAIL_CONFIG.faviconSize} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-red-600">Shop</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image Slider */}
              <div className="relative">
                <Swiper
                  modules={[FreeMode, Navigation, Thumbs]}
                  spaceBetween={10}
                  navigation={{
                    prevEl: '.main-slider-prev',
                    nextEl: '.main-slider-next',
                  }}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  className="main-slider aspect-square bg-gray-100 rounded-xl overflow-hidden"
                  onSwiper={setMainSwiper}
                  onSlideChange={(swiper) => handleImageSelect(swiper.activeIndex)}
                  initialSlide={getCurrentImageIndex()}
                >
                  {galleryItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <MediaViewer
                        url={item.url}
                        alt={`${product.name} - View ${index + 1}`}
                        index={index}
                        productName={product.name}
                        aspectRatio="square"
                        className="w-full h-full"
                        priority={index === 0}
                        showPlayButton={item.isYouTube}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Arrows for Main Slider */}
                <button className="main-slider-prev absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="main-slider-next absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Slider */}
              <div className="relative">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[FreeMode, Navigation]}
                  spaceBetween={8}
                  slidesPerView={4}
                  freeMode={true}
                  navigation={{
                    prevEl: '.thumb-slider-prev',
                    nextEl: '.thumb-slider-next',
                  }}
                  watchSlidesProgress={true}
                  className="thumb-slider"
                  breakpoints={{
                    640: {
                      slidesPerView: 5,
                    },
                    768: {
                      slidesPerView: 6,
                    },
                  }}
                >
                  {galleryItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <button
                        onClick={() => handleImageSelect(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${getCurrentImageIndex() === index
                          ? 'border-red-500 ring-2 ring-red-200'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <Image
                          src={item.isYouTube ? item.thumbnail : item.url}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                        {/* Video indicator for thumbnails */}
                        {item.isYouTube && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Arrows for Thumbnail Slider */}
                <button className="thumb-slider-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 z-10 hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="thumb-slider-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 z-10 hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Title and Category */}
              <div>
                <p className="text-sm text-red-600 uppercase tracking-wide font-semibold mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Badges */}
                <div className="flex items-center space-x-2 mb-4">
                  {product.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {PRODUCT_DETAIL_CONFIG.badges.new}
                    </span>
                  )}
                  {product.onSale && (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {PRODUCT_DETAIL_CONFIG.badges.onSale}
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {PRODUCT_DETAIL_CONFIG.badges.bestseller}
                    </span>
                  )}
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-600 to-red-500 bg-clip-text">
                    {formatPrice(getCurrentPrice())}
                  </span>
                  {product.onSale && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.onSale && (
                  <p className="text-sm text-green-600 font-semibold">
                    {PRODUCT_DETAIL_CONFIG.pricing.youSave} {formatPrice(product.originalPrice - getCurrentPrice())} ({Math.round(((product.originalPrice - getCurrentPrice()) / product.originalPrice) * 100)}{PRODUCT_DETAIL_CONFIG.pricing.off})
                  </p>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{PRODUCT_DETAIL_CONFIG.labels.color}</h3>
                  <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-base font-semibold text-red-800">
                      {PRODUCT_DETAIL_CONFIG.labels.selectedColor} <span className="text-red-900 font-bold">{product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]}</span>
                    </p>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorSelect(index)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300 text-sm ${(selectedColorIndex !== null ? selectedColorIndex : 0) === index
                          ? 'border-red-500 bg-red-50 text-red-700 shadow-md transform scale-105'
                          : 'border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:scale-102'
                          }`}
                        title={`${color} - Image ${index + 1}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Viewing {product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]} {PRODUCT_DETAIL_CONFIG.colorInstruction}
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{PRODUCT_DETAIL_CONFIG.labels.size}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((sizeItem, index) => {
                      const sizeLabel = typeof sizeItem === 'object' ? sizeItem.size : sizeItem;
                      const sizePrice = typeof sizeItem === 'object' ? sizeItem.pricebysize : null;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(sizeLabel)}
                          className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 text-center ${selectedSize === sizeLabel
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          <div className="text-sm">{sizeLabel}</div>
                          {sizePrice && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formatPrice(sizePrice)}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{PRODUCT_DETAIL_CONFIG.labels.quantity}</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Configuration Summary */}
              {(selectedColorIndex !== null || selectedSize) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{PRODUCT_DETAIL_CONFIG.labels.yourSelection}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {selectedColorIndex !== null && <p>• Finish: {product.colors[selectedColorIndex]}</p>}
                    {selectedSize && <p>• Size: {selectedSize}</p>}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || (product.sizes && product.sizes.length > 0 && !selectedSize)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${addingToCart
                    ? 'bg-green-500 text-white'
                    : (product.sizes && product.sizes.length > 0 && !selectedSize)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white transform hover:scale-105 shadow-lg'
                    }`}
                >
                  {addingToCart ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{PRODUCT_DETAIL_CONFIG.labels.addingToCart}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                      </svg>
                      <span>{PRODUCT_DETAIL_CONFIG.labels.addToCart}</span>
                    </>
                  )}
                </button>

                {/* Product Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{PRODUCT_DETAIL_CONFIG.features.inStock}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-gray-600">{PRODUCT_DETAIL_CONFIG.features.freeShipping}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{PRODUCT_DETAIL_CONFIG.features.qualityGuaranteed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-gray-600">{PRODUCT_DETAIL_CONFIG.features.returns}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'description'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {PRODUCT_DETAIL_CONFIG.tabs.description}
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'faq'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {PRODUCT_DETAIL_CONFIG.tabs.faq}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'reviews'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {PRODUCT_DETAIL_CONFIG.tabs.reviews} ({product.reviews})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{PRODUCT_DETAIL_CONFIG.tabContent.productDescription}</h3>
                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                      <p>{product.description}</p>
                    </div>
                  </div>

                  {product.additionalFeatures && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{PRODUCT_DETAIL_CONFIG.tabContent.additionalFeatures}</h3>
                      <div className="prose max-w-none text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-line">{product.additionalFeatures}</p>
                      </div>
                    </div>
                  )}

                  {/* Product Specifications */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{PRODUCT_DETAIL_CONFIG.tabContent.specifications}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{PRODUCT_DETAIL_CONFIG.tabContent.generalInformation}</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li><strong>Brand:</strong> {product.brand}</li>
                          <li><strong>Category:</strong> {product.category}</li>
                          {product.subcategory && <li><strong>Type:</strong> {product.subcategory}</li>}
                          <li><strong>Stock Left:</strong> {product.stockLeft} units</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{PRODUCT_DETAIL_CONFIG.tabContent.features}</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {product.isNew && <li>✓ New Arrival</li>}
                          {product.bestseller && <li>✓ Bestseller</li>}
                          <li>✓ {PRODUCT_DETAIL_CONFIG.warranty.years}</li>
                          <li>✓ {PRODUCT_DETAIL_CONFIG.warranty.delivery}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{PRODUCT_DETAIL_CONFIG.tabContent.faqTitle}</h3>
                    <div className="space-y-4">
                      {faqData.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">{PRODUCT_DETAIL_CONFIG.tabContent.faqContact}</h4>
                    <p className="text-red-700 text-sm">
                      {PRODUCT_DETAIL_CONFIG.tabContent.faqContactMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{PRODUCT_DETAIL_CONFIG.tabContent.reviewsTitle}</h3>

                    {/* Reviews Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                            <span className="text-gray-600">{PRODUCT_DETAIL_CONFIG.tabContent.outOfFive}</span>
                          </div>
                          <p className="text-sm text-gray-600">{product.reviews} {PRODUCT_DETAIL_CONFIG.tabContent.totalReviews}</p>
                        </div>

                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                          {PRODUCT_DETAIL_CONFIG.tabContent.writeReview}
                        </button>
                      </div>
                    </div>

                    {/* Reviews Coming Soon */}
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7.93-6.44c-.214-1.028-.214-2.088 0-3.116A8.013 8.013 0 013 4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{PRODUCT_DETAIL_CONFIG.tabContent.reviewsComingSoon}</h4>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {PRODUCT_DETAIL_CONFIG.tabContent.reviewsComingSoonMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4">
                  {PRODUCT_DETAIL_CONFIG.relatedProducts.subtitle}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {PRODUCT_DETAIL_CONFIG.relatedProducts.title} <span className="text-red-600">{PRODUCT_DETAIL_CONFIG.relatedProducts.titleHighlight}</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {PRODUCT_DETAIL_CONFIG.relatedProducts.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    variant="related"
                    showCartButton={false}
                    showWishlistButton={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const products = await fetchClientProducts(PRODUCT_DETAIL_CONFIG.productsSchemaSlug);

    const paths = products.map((product) => ({
      params: { id: product.id.toString() }
    }));

    return {
      paths,
      fallback: false // Show 404 for non-existent products
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: false
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const products = await fetchClientProducts(PRODUCT_DETAIL_CONFIG.productsSchemaSlug);
    const product = products.find(p => p.id.toString() === params.id);

    if (!product) {
      return {
        notFound: true
      };
    }

    // Get related products from the same category
    const relatedProducts = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return {
      props: {
        product,
        relatedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true
    };
  }
} 