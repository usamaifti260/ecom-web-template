'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClientProducts } from '@/lib/fetchProducts';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

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
  
  // Product configuration options
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [includeFootstool, setIncludeFootstool] = useState(false);
  const [includeSofaBed, setIncludeSofaBed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Initialize configuration options when product is available
  useEffect(() => {
    if (product) {
      // Set defaults only when product first loads or changes
      if (product.dimensions?.length > 0) setSelectedDimension(product.dimensions[0]);
      if (product.Orientation?.length > 0) setSelectedOrientation(product.Orientation[0]);
      if (product.storage?.length > 0) setSelectedStorage(product.storage[0]);
      if (product.size?.length > 0) setSelectedSize(product.size[0]);
      if(product.withFootstool) setIncludeFootstool(false);
      if(product.sofabedmechanism) setIncludeSofaBed(false);
      // Initialize color selection to first color if available
      setSelectedColorIndex(product.colors?.length > 0 ? 0 : null);
      
      // Reset programmatic slide change flag
      programmaticSlideChangeRef.current = false;
    }
  }, [product]);

  // Debug useEffect to track selectedColorIndex changes
  useEffect(() => {
    console.log('ProductDetail - selectedColorIndex changed to:', selectedColorIndex);
  }, [selectedColorIndex]);

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Calculate total price including add-ons
  const calculateTotalPrice = () => {
    let totalPrice = product.price;
    if (includeFootstool) totalPrice += 100;
    if (includeSofaBed) totalPrice += 200;
    return totalPrice;
  };

  // Calculate original price including add-ons
  const calculateOriginalTotalPrice = () => {
    if (!product.onSale) return null;
    let totalPrice = product.originalPrice;
    if (includeFootstool) totalPrice += 100;
    if (includeSofaBed) totalPrice += 200;
    return totalPrice;
  };

  // Get current image - prioritize color selection, then manual selection
  const getCurrentImage = () => {
    if (selectedColorIndex !== null && product.gallery && product.gallery[selectedColorIndex]) {
      return product.gallery[selectedColorIndex];
    }
    return product.gallery[selectedImageIndex];
  };

  // Get current image index for slider
  const getCurrentImageIndex = () => {
    return selectedColorIndex !== null ? selectedColorIndex : selectedImageIndex;
  };

  // Handle color selection
  const handleColorSelect = (colorIndex) => {
    console.log('ProductDetail - Color selected:', {
      colorIndex,
      colorName: product.colors[colorIndex],
      allColors: product.colors,
      currentSelectedColorIndex: selectedColorIndex
    });
    
    setSelectedColorIndex(colorIndex);
    setSelectedImageIndex(colorIndex); // Sync the slider as well
    
    // Set flag to prevent onSlideChange from resetting color selection
    programmaticSlideChangeRef.current = true;
    
    console.log('ProductDetail - After setSelectedColorIndex called with:', colorIndex);
    
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
    console.log('ProductDetail - handleImageSelect called:', {
      index,
      currentSelectedColorIndex: selectedColorIndex,
      programmaticSlideChange: programmaticSlideChangeRef.current,
      hasColors: product.colors?.length > 0
    });
    
    // If this is a programmatic slide change (from color selection), don't reset color selection
    if (programmaticSlideChangeRef.current) {
      console.log('ProductDetail - Skipping color reset because this is a programmatic slide change');
      setSelectedImageIndex(index);
      return;
    }
    
    console.log('ProductDetail - Manual image selection, resetting selectedColorIndex to null');
    setSelectedImageIndex(index);
    setSelectedColorIndex(null); // Reset color selection when manually selecting image
  };

  // Color mapping function
  const getColorClass = (colorName) => {
    const colorMap = {
      'Gray': 'bg-gray-400',
      'Grey': 'bg-gray-400',
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
      'Camel': 'bg-amber-500',
      'Silver': 'bg-gray-500',
      'Dark Blue': 'bg-blue-900'
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  const handleAddToCart = async () => {
    // Check if product has sizes and none is selected
    if (product.size && product.size.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    setAddingToCart(true);
    
    try {
      // Create product configuration object with updated price
      const productConfig = {
        ...product,
        price: calculateTotalPrice(),
        originalPrice: product.onSale ? calculateOriginalTotalPrice() : product.price
      };

      // Prepare user selections for configuration
      const userSelections = {
        size: selectedSize,
        color: product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex !== null ? selectedColorIndex : 0] : null,
        dimension: selectedDimension,
        orientation: selectedOrientation,
        storage: selectedStorage,
        includeFootstool,
        includeSofaBed
      };

      console.log('ProductDetail - Adding to cart:', {
        selectedColorIndex,
        colorName: selectedColorIndex !== null ? product.colors[selectedColorIndex] : null,
        userSelections
      });

      addItem(productConfig, selectedSize, quantity, userSelections);
      showCartNotification(productConfig, selectedSize, quantity);
      
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

  // FAQ data for SOFA SPHERE brand
  const faqData = [
    {
      question: "What is the delivery time for SOFA SPHERE furniture?",
      answer: "We offer free delivery across England. Standard delivery takes 7-14 business days. For custom fabric orders, please allow an additional 2-3 weeks for manufacturing."
    },
    {
      question: "Do you offer a warranty on your furniture?",
      answer: "Yes, all SOFA SPHERE furniture comes with a 2-year manufacturer's warranty covering structural defects and workmanship. This does not cover normal wear and tear or fabric staining."
    },
    {
      question: "Can I customize the fabric and colors?",
      answer: "Absolutely! Most of our furniture is available in custom fabrics. You can choose from our extensive fabric collection or provide your own fabric. Custom orders may take additional time to manufacture."
    },
    {
      question: "What payment options do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, and bank transfers. We also offer Cash on Delivery (COD) for customers in England. Financing options are available for purchases over £500."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all furniture. Items must be in original condition with original packaging. Custom fabric orders are non-returnable unless there's a manufacturing defect. Return shipping costs may apply."
    }
  ];

  return (
    <>
      <Head>
        <title>{product.name} - Comfort Sofa</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.category}, ${product.brand}, furniture, sofas, home furniture, ${product.name}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-yellow-600">Shop</Link>
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
                  {product.gallery.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${product.name} - View ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
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
                  {product.gallery.map((image, index) => (
                    <SwiperSlide key={index}>
                      <button
                        onClick={() => handleImageSelect(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          getCurrentImageIndex() === index 
                            ? 'border-yellow-500 ring-2 ring-yellow-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
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
                <p className="text-sm text-yellow-600 uppercase tracking-wide font-semibold mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                {/* Badges */}
                <div className="flex items-center space-x-2 mb-4">
                  {product.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.onSale && (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                      ON SALE
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                      BESTSELLER
                    </span>
                  )}
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
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
                  <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                  {product.onSale && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(calculateOriginalTotalPrice())}
                    </span>
                  )}
                </div>
                {product.onSale && (
                  <p className="text-sm text-green-600 font-semibold">
                    You save {formatPrice(calculateOriginalTotalPrice() - calculateTotalPrice())} ({Math.round(((calculateOriginalTotalPrice() - calculateTotalPrice()) / calculateOriginalTotalPrice()) * 100)}% off)
                  </p>
                )}
                {(includeFootstool || includeSofaBed) && (
                  <div className="text-sm text-gray-600">
                    <p>Base price: {formatPrice(product.price)}</p>
                    {includeFootstool && <p>+ Footstool: {formatPrice(100)}</p>}
                    {includeSofaBed && <p>+ Sofa Bed Mechanism: {formatPrice(200)}</p>}
                  </div>
                )}
              </div>



              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-base font-semibold text-yellow-800">
                      Selected Color: <span className="text-yellow-900 font-bold">{product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color, index) => (
                      <div key={index} className="relative">
                        <button
                          onClick={() => handleColorSelect(index)}
                          className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${getColorClass(color)} ${
                            (selectedColorIndex !== null ? selectedColorIndex : 0) === index 
                              ? 'ring-3 ring-yellow-500 ring-offset-2 border-yellow-500 transform scale-110' 
                              : 'border-gray-300 hover:ring-2 hover:ring-gray-400 hover:ring-offset-1 hover:scale-105'
                          }`}
                          title={`${color} - Image ${index + 1}`}
                        />
                        {(selectedColorIndex !== null ? selectedColorIndex : 0) === index && (
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Viewing {product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]} variant - Click another color to change
                  </p>
                </div>
              )}

              {/* Dimensions Selection */}
              {product.dimensions && product.dimensions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dimensions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.dimensions.map((dimension) => (
                      <button
                        key={dimension}
                        onClick={() => setSelectedDimension(dimension)}
                        className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 text-sm ${
                          selectedDimension === dimension
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {dimension}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Orientation Selection */}
              {product.Orientation && product.Orientation.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Orientation</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.Orientation.map((orientation) => (
                      <button
                        key={orientation}
                        onClick={() => setSelectedOrientation(orientation)}
                        className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 ${
                          selectedOrientation === orientation
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {orientation}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Selection */}
              {product.storage && product.storage.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Storage Options</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.storage.map((storageOption) => (
                      <button
                        key={storageOption}
                        onClick={() => setSelectedStorage(storageOption)}
                        className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 ${
                          selectedStorage === storageOption
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {storageOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footstool Option */}
              {product.withFootstool && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Footstool</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIncludeFootstool(false)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
                        !includeFootstool
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Not Include Footstool
                    </button>
                    <button
                      onClick={() => setIncludeFootstool(true)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
                        includeFootstool
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <div>Yes Include Footstool</div>
                        <div className="text-xs text-green-600">+{formatPrice(100)}</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Sofa Bed Mechanism Option */}
              {product.sofabedmechanism && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sofa Bed Mechanism</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIncludeSofaBed(false)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
                        !includeSofaBed
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Not Include Sofa Bed Mechanism
                    </button>
                    <button
                      onClick={() => setIncludeSofaBed(true)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
                        includeSofaBed
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <div>Yes Include Sofa Bed</div>
                        <div className="text-xs text-green-600">+{formatPrice(200)}</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.size && product.size.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
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
              {(selectedDimension || selectedOrientation || selectedStorage || includeFootstool || includeSofaBed || (selectedColorIndex !== null)) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Your Configuration:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {selectedColorIndex !== null && <p>• Color: {product.colors[selectedColorIndex]}</p>}
                    {selectedDimension && <p>• Dimensions: {selectedDimension}</p>}
                    {selectedOrientation && <p>• Orientation: {selectedOrientation}</p>}
                    {selectedStorage && <p>• Storage: {selectedStorage}</p>}
                    {includeFootstool && <p>• Footstool: Included (+{formatPrice(100)})</p>}
                    {includeSofaBed && <p>• Sofa Bed Mechanism: Included (+{formatPrice(200)})</p>}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || (product.size && product.size.length > 0 && !selectedSize)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    addingToCart
                      ? 'bg-green-500 text-white'
                      : (product.size && product.size.length > 0 && !selectedSize)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:scale-105 shadow-lg'
                  }`}
                >
                  {addingToCart ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Adding to Cart...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Product Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">In Stock</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-gray-600">30-Day Returns</span>
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
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'description'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'faq'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  FAQ's
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'reviews'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews ({product.reviews})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                      <p>{product.description}</p>
                    </div>
                  </div>
                  
                  {product.additionalFeatures && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Features</h3>
                      <div className="prose max-w-none text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-line">{product.additionalFeatures}</p>
                      </div>
                    </div>
                  )}

                  {/* Product Specifications */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">General Information</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li><strong>Brand:</strong> {product.brand}</li>
                          <li><strong>Category:</strong> {product.category}</li>
                          {product.subcategory && <li><strong>Type:</strong> {product.subcategory}</li>}
                          <li><strong>Stock Left:</strong> {product.stockLeft} units</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {product.isNew && <li>✓ New Arrival</li>}
                          {product.bestseller && <li>✓ Bestseller</li>}
                          {product.withFootstool && <li>✓ Footstool Available</li>}
                          {product.sofabedmechanism && <li>✓ Sofa Bed Mechanism Available</li>}
                          <li>✓ 2 Years Warranty</li>
                          <li>✓ Free Delivery in England</li>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
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
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Still have questions?</h4>
                    <p className="text-yellow-700 text-sm">
                      Contact our customer service team at info@sofasphere.com or call us during business hours. 
                      We're here to help you find the perfect furniture for your home.
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                    
                    {/* Reviews Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                            <span className="text-gray-600">out of 5</span>
                          </div>
                          <p className="text-sm text-gray-600">{product.reviews} total reviews</p>
                        </div>
                        
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                          Write a Review
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
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Reviews Coming Soon</h4>
                      <p className="text-gray-600 max-w-md mx-auto">
                        We're working on collecting customer reviews for this product. 
                        Be the first to share your experience!
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
                <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
                  Recommended for You
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  You May Also <span className="text-yellow-600">Like</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover more furniture pieces from the same collection
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
                    {/* Product Image */}
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="relative aspect-[5/5] overflow-hidden cursor-pointer lg:h-[480px] w-full">
                        {/* Sale Badge */}
                        {relatedProduct.onSale && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
                            SALE
                          </div>
                        )}

                        {/* New Badge */}
                        {relatedProduct.isNew && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
                            NEW
                          </div>
                        )}

                        <div className="relative w-full h-full bg-white group">
                          {/* Default image */}
                          <Image
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            fill
                            className="object-contain object-top transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                          />

                          {/* Hover image - show hoverimage if available */}
                          {relatedProduct.hoverimage && (
                            <Image
                              src={relatedProduct.hoverimage}
                              alt={relatedProduct.name}
                              fill
                              className="object-contain object-top transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            />
                          )}
                        </div>

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                            View Details
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="relative">
                      {/* Desktop: Sliding Content */}
                      <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-white transition-all duration-300 lg:translate-y-0 lg:group-hover:-translate-y-16 z-10">
                        <div className="p-4 text-center">
                          {/* Brand Name */}
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">{relatedProduct.brand}</p>
                          
                          {/* Product Name */}
                          <Link href={`/product/${relatedProduct.id}`}>
                            <h4 className="font-normal text-lg mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer">
                              {relatedProduct.name}
                            </h4>
                          </Link>

                          {/* Price */}
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-lg font-normal text-gray-900">
                              {formatPrice(relatedProduct.price)}
                            </span>
                            {relatedProduct.onSale && (
                              <span className="text-sm text-gray-500 line-through font-light">
                                {formatPrice(relatedProduct.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Color Options */}
                          {relatedProduct.colors && relatedProduct.colors.length > 0 && (
                            <div className="flex items-center justify-center space-x-1">
                              {relatedProduct.colors.slice(0, 4).map((color, index) => {
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
                                    'Camel': 'bg-amber-500',
                                    'Silver': 'bg-gray-500',
                                    'Dark Blue': 'bg-blue-900'
                                  };
                                  return colorMap[colorName] || 'bg-gray-400';
                                };

                                return (
                                  <div
                                    key={index}
                                    className={`w-4 h-4 rounded-full border transition-all duration-200 ${getColorClass(color)} border-gray-300`}
                                    title={color}
                                  />
                                );
                              })}
                              {relatedProduct.colors.length > 4 && (
                                <span className="text-xs text-gray-500 ml-1">+{relatedProduct.colors.length - 4}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button - Shows on hover (Desktop only) */}
                      <div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-white lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:transform lg:translate-y-16 lg:group-hover:translate-y-0 p-4 lg:z-20">
                        <Link href={`/product/${relatedProduct.id}`}>
                          <button className="w-full py-2 px-4 rounded font-bold text-sm transition-all duration-200 flex items-center justify-center bg-[#222222] hover:bg-black text-white">
                            VIEW PRODUCT
                          </button>
                        </Link>
                      </div>

                      {/* Mobile/Tablet: Static Content (Always Visible) */}
                      <div className="lg:hidden py-4 px-2 text-center">
                        {/* Brand Name */}
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-medium">{relatedProduct.brand}</p>
                        
                        {/* Product Name */}
                        <Link href={`/product/${relatedProduct.id}`}>
                          <h4 className="font-normal text-sm mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer line-clamp-2">
                            {relatedProduct.name}
                          </h4>
                        </Link>

                        {/* Price */}
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-base font-normal text-gray-900">
                            {formatPrice(relatedProduct.price)}
                          </span>
                          {relatedProduct.onSale && (
                            <span className="text-sm text-gray-500 line-through font-light">
                              {formatPrice(relatedProduct.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Color Options - Mobile */}
                        {relatedProduct.colors && relatedProduct.colors.length > 0 && (
                          <div className="flex items-center justify-center space-x-1 mb-3">
                            {relatedProduct.colors.slice(0, 4).map((color, index) => {
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
                                  'Camel': 'bg-amber-500',
                                  'Silver': 'bg-gray-500',
                                  'Dark Blue': 'bg-blue-900'
                                };
                                return colorMap[colorName] || 'bg-gray-400';
                              };

                              return (
                                <div
                                  key={index}
                                  className={`w-4 h-4 rounded-full border transition-all duration-200 ${getColorClass(color)} border-gray-300`}
                                  title={color}
                                />
                              );
                            })}
                            {relatedProduct.colors.length > 4 && (
                              <span className="text-xs text-gray-500 ml-1">+{relatedProduct.colors.length - 4}</span>
                            )}
                          </div>
                        )}

                        {/* View Product Button */}
                        <Link href={`/product/${relatedProduct.id}`}>
                          <button className="w-full py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center bg-[#222222] hover:bg-black text-white">
                            VIEW PRODUCT
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
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
    const products = await fetchClientProducts('comfortsofaproductsschema');
    
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
    const products = await fetchClientProducts('comfortsofaproductsschema');
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