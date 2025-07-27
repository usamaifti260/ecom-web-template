import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
import { processGalleryItems } from '@/lib/mediaUtils';
import MediaViewer from '@/components/MediaViewer';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Configuration Variables
const SIZE_POPUP_CONFIG = {
  // UI Text
  title: 'Configure Product',
  
  // Currency & Pricing
  currency: 'PKR',
  
  // Form Labels
  labels: {
    color: 'Color',
    selectedColor: 'Selected:',
    size: 'Select Size *',
    quantity: 'Quantity',
    totalText: 'Total',
    originalPrice: 'Original price'
  },
  
  // Buttons
  buttons: {
    addToCart: 'Add to Cart',
    cancel: 'Cancel'
  },
  
  // Messages
  messages: {
    selectSize: 'Please select a size',
    colorInstruction: 'Click a color to see the corresponding product image',
    item: 'item',
    items: 'items'
  },
  
  // Slider Settings
  slider: {
    spaceBetween: 10,
    thumbSpaceBetween: 8,
    thumbSlidesPerView: 4,
    transitionDuration: 300
  },
  
  // Color Mappings for UI
  colorClasses: {
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
    'Dark Blue': 'bg-blue-900',
    'Coal': 'bg-gray-800',
    'Gold': 'bg-yellow-500',
    'Pearl': 'bg-gray-200',
    'Midnight': 'bg-gray-900',
    'Mustard': 'bg-amber-500',
    'Teal': 'bg-teal-400'
  },
  
  // Layout
  maxQuantity: 10,
  minQuantity: 1,
  
  // Grid Settings
  sizeGridColumns: 3,
  
  // Delays & Timing
  slideChangeDelay: 100
};

const SizeSelectionPopup = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const programmaticSlideChangeRef = useRef(false);
  
  const { addItem } = useCart();
  const { showCartNotification } = useNotification();

  // Process gallery items to handle both images and videos
  const galleryItems = product ? processGalleryItems(product.gallery) : [];

  // Initialize configuration options when product is available
  useEffect(() => {
    if (product) {
      // Set defaults only when product first loads or changes
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0].size || product.sizes[0]);
      // Initialize color selection - only reset when product changes, not when user selects
      setSelectedColorIndex(product.colors?.length > 0 ? 0 : null);
      
      // Reset other states when product changes
      setSelectedImageIndex(0);
      setQuantity(1);
      programmaticSlideChangeRef.current = false;
    }
  }, [product]);

  const formatPrice = (price) => {
    return `${SIZE_POPUP_CONFIG.currency} ${price.toLocaleString()}`;
  };

  // Get current price based on selected size
  const getCurrentPrice = () => {
    if (!product || !product.sizes || product.sizes.length === 0) return product?.price || 0;
    
    // If sizes are objects with price, find the selected size price
    if (typeof product.sizes[0] === 'object' && product.sizes[0].pricebysize) {
      const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
      return selectedSizeObj ? selectedSizeObj.pricebysize : product.price;
    }
    
    return product.price;
  };

  // Get current image - prioritize color selection, then manual selection
  const getCurrentImage = () => {
    if (!product) return '';
    if (selectedColorIndex !== null && galleryItems[selectedColorIndex]) {
      const item = galleryItems[selectedColorIndex];
      return item.isYouTube ? item.thumbnail : item.url;
    }
    const item = galleryItems[selectedImageIndex];
    return item ? (item.isYouTube ? item.thumbnail : item.url) : (product.image || '');
  };

  // Get current image index for slider
  const getCurrentImageIndex = () => {
    return selectedColorIndex !== null ? selectedColorIndex : selectedImageIndex;
  };

  // Handle color selection
  const handleColorSelect = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setSelectedImageIndex(colorIndex);
    
    // Set flag to prevent onSlideChange from resetting color selection
    programmaticSlideChangeRef.current = true;
    
    // Update both swipers to show the correct slide
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(colorIndex, SIZE_POPUP_CONFIG.slider.transitionDuration);
    }
    if (thumbsSwiper && !thumbsSwiper.destroyed) {
      thumbsSwiper.slideTo(colorIndex, SIZE_POPUP_CONFIG.slider.transitionDuration);
    }
    
    // Reset the flag after a short delay to allow slide change to complete
    setTimeout(() => {
      programmaticSlideChangeRef.current = false;
    }, SIZE_POPUP_CONFIG.slideChangeDelay);
  };

  // Handle manual image selection (from thumbnail clicks or slider navigation)
  const handleImageSelect = (index) => {
    // If this is a programmatic slide change (from color selection), don't reset color selection
    if (programmaticSlideChangeRef.current) {
      setSelectedImageIndex(index);
      return;
    }
    
    setSelectedImageIndex(index);
    setSelectedColorIndex(null); // Reset color selection only for manual image selection
  };

  // Color mapping function
  const getColorClass = (colorName) => {
    return SIZE_POPUP_CONFIG.colorClasses[colorName] || SIZE_POPUP_CONFIG.colorClasses['Gray'];
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      return;
    }

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
    
    // Reset and close
    setSelectedSize(product.sizes?.length > 0 ? (product.sizes[0].size || product.sizes[0]) : '');
    setQuantity(1);
    setSelectedColorIndex(null);
    setSelectedImageIndex(0);
    onClose();
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= SIZE_POPUP_CONFIG.minQuantity && newQuantity <= SIZE_POPUP_CONFIG.maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{SIZE_POPUP_CONFIG.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image Slider */}
                {galleryItems && galleryItems.length > 1 ? (
                  <div className="relative">
                    <Swiper
                      modules={[FreeMode, Navigation, Thumbs]}
                      spaceBetween={SIZE_POPUP_CONFIG.slider.spaceBetween}
                      navigation={{
                        prevEl: '.popup-main-slider-prev',
                        nextEl: '.popup-main-slider-next',
                      }}
                      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                      className="popup-main-slider aspect-square bg-gray-100 rounded-xl overflow-hidden"
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

                    {/* Navigation Arrows */}
                    <button className="popup-main-slider-prev absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="popup-main-slider-next absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <MediaViewer
                    url={getCurrentImage()}
                    alt={product.name}
                    index={0}
                    productName={product.name}
                    aspectRatio="square"
                    className="w-full h-full"
                    priority={true}
                    showPlayButton={galleryItems.length > 0 && galleryItems[0]?.isYouTube}
                  />
                )}

                {/* Thumbnail Slider */}
                {galleryItems && galleryItems.length > 1 && (
                  <div className="relative">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      modules={[FreeMode, Navigation]}
                      spaceBetween={SIZE_POPUP_CONFIG.slider.thumbSpaceBetween}
                      slidesPerView={SIZE_POPUP_CONFIG.slider.thumbSlidesPerView}
                      freeMode={true}
                      watchSlidesProgress={true}
                      className="popup-thumb-slider"
                    >
                      {galleryItems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <button
                            onClick={() => handleImageSelect(index)}
                            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                              getCurrentImageIndex() === index 
                                ? 'border-yellow-500 ring-2 ring-yellow-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Image
                              src={item.isYouTube ? item.thumbnail : item.url}
                              alt={`${product.name} - Thumbnail ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                            {/* Video indicator for thumbnails */}
                            {item.isYouTube && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>

              {/* Right Side - Configuration */}
              <div className="space-y-6">
                {/* Product Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                  
                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text">
                        {formatPrice(getCurrentPrice())}
                      </span>
                      {product.onSale && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{SIZE_POPUP_CONFIG.labels.color}</h4>
                    <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-semibold text-amber-800">
                        {SIZE_POPUP_CONFIG.labels.selectedColor} <span className="text-amber-900">{product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]}</span>
                      </p>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(index)}
                          className={`px-3 py-2 border-2 rounded-lg font-medium transition-all duration-200 text-xs ${
                            (selectedColorIndex !== null ? selectedColorIndex : 0) === index 
                              ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md' 
                              : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50 text-gray-700'
                          }`}
                          title={`${color} - Image ${index + 1}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{SIZE_POPUP_CONFIG.messages.colorInstruction}</p>
                  </div>
                )}



                                  {/* Size Selection */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">{SIZE_POPUP_CONFIG.labels.size}</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {product.sizes.map((sizeItem, index) => {
                          const sizeLabel = typeof sizeItem === 'object' ? sizeItem.size : sizeItem;
                          const sizePrice = typeof sizeItem === 'object' ? sizeItem.pricebysize : null;
                          
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedSize(sizeLabel)}
                              className={`py-2 px-3 rounded-lg border-2 text-xs font-medium transition-all duration-200 text-center ${
                                selectedSize === sizeLabel
                                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div>{sizeLabel}</div>
                              {sizePrice && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatPrice(sizePrice)}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {!selectedSize && product.sizes.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">{SIZE_POPUP_CONFIG.messages.selectSize}</p>
                      )}
                    </div>
                  )}

                {/* Quantity Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">{SIZE_POPUP_CONFIG.labels.quantity}</h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-amber-500 hover:border-amber-500 transition-all duration-200 text-gray-600 hover:text-white"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Total Price Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{SIZE_POPUP_CONFIG.labels.totalText} ({quantity} {quantity > 1 ? SIZE_POPUP_CONFIG.messages.items : SIZE_POPUP_CONFIG.messages.item})</span>
                    <span className="text-lg font-bold text-transparent bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text">
                      {formatPrice(getCurrentPrice() * quantity)}
                    </span>
                  </div>
                  {product.onSale && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{SIZE_POPUP_CONFIG.labels.originalPrice}</span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice * quantity)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      (product.sizes && product.sizes.length > 0 && !selectedSize)
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white'
                    }`}
                  >
                    {SIZE_POPUP_CONFIG.buttons.addToCart}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {SIZE_POPUP_CONFIG.buttons.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeSelectionPopup; 