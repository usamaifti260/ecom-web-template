import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const SizeSelectionPopup = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const programmaticSlideChangeRef = useRef(false);
  
  // Product configuration options
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [includeFootstool, setIncludeFootstool] = useState(false);
  const [includeSofaBed, setIncludeSofaBed] = useState(false);

  const { addItem } = useCart();
  const { showCartNotification } = useNotification();

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
      // Initialize color selection - only reset when product changes, not when user selects
      setSelectedColorIndex(product.colors?.length > 0 ? 0 : null);
      
      // Reset other states when product changes
      setSelectedImageIndex(0);
      setQuantity(1);
      programmaticSlideChangeRef.current = false;
    }
  }, [product]);

  // Debug useEffect to track selectedColorIndex changes
  useEffect(() => {
    console.log('SizeSelectionPopup - selectedColorIndex changed to:', selectedColorIndex);
  }, [selectedColorIndex]);

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Calculate total price including add-ons
  const calculateTotalPrice = () => {
    if (!product) return 0;
    let totalPrice = product.price;
    if (includeFootstool) totalPrice += 100;
    if (includeSofaBed) totalPrice += 200;
    return totalPrice;
  };

  // Calculate original price including add-ons
  const calculateOriginalTotalPrice = () => {
    if (!product || !product.onSale) return null;
    let totalPrice = product.originalPrice;
    if (includeFootstool) totalPrice += 100;
    if (includeSofaBed) totalPrice += 200;
    return totalPrice;
  };

  // Get current image - prioritize color selection, then manual selection
  const getCurrentImage = () => {
    if (!product) return '';
    if (selectedColorIndex !== null && product.gallery && product.gallery[selectedColorIndex]) {
      return product.gallery[selectedColorIndex];
    }
    return product.gallery ? product.gallery[selectedImageIndex] : product.image;
  };

  // Get current image index for slider
  const getCurrentImageIndex = () => {
    return selectedColorIndex !== null ? selectedColorIndex : selectedImageIndex;
  };

  // Handle color selection
  const handleColorSelect = (colorIndex) => {
    console.log('SizeSelectionPopup - Color selected:', {
      colorIndex,
      colorName: product.colors[colorIndex],
      allColors: product.colors,
      currentSelectedColorIndex: selectedColorIndex
    });
    
    setSelectedColorIndex(colorIndex);
    setSelectedImageIndex(colorIndex);
    
    // Set flag to prevent onSlideChange from resetting color selection
    programmaticSlideChangeRef.current = true;
    
    // Log after state update (this will show in next render)
    console.log('SizeSelectionPopup - After setSelectedColorIndex called with:', colorIndex);
    
    // Update both swipers to show the correct slide
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(colorIndex, 300);
    }
    if (thumbsSwiper && !thumbsSwiper.destroyed) {
      thumbsSwiper.slideTo(colorIndex, 300);
    }
    
    // Reset the flag after a short delay to allow slide change to complete
    setTimeout(() => {
      programmaticSlideChangeRef.current = false;
    }, 100);
  };

  // Handle manual image selection (from thumbnail clicks or slider navigation)
  const handleImageSelect = (index) => {
    console.log('SizeSelectionPopup - handleImageSelect called:', {
      index,
      currentSelectedColorIndex: selectedColorIndex,
      programmaticSlideChange: programmaticSlideChangeRef.current,
      hasColors: product.colors?.length > 0
    });
    
    // If this is a programmatic slide change (from color selection), don't reset color selection
    if (programmaticSlideChangeRef.current) {
      console.log('SizeSelectionPopup - Skipping color reset because this is a programmatic slide change');
      setSelectedImageIndex(index);
      return;
    }
    
    console.log('SizeSelectionPopup - Manual image selection, resetting selectedColorIndex to null');
    setSelectedImageIndex(index);
    setSelectedColorIndex(null); // Reset color selection only for manual image selection
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
      'Dark Blue': 'bg-blue-900',
      'Coal': 'bg-gray-800'
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.size && product.size.length > 0) {
      return;
    }

    console.log('SizeSelectionPopup - handleAddToCart called with state:', {
      selectedColorIndex,
      selectedSize,
      selectedDimension,
      selectedOrientation,
      selectedStorage,
      includeFootstool,
      includeSofaBed,
      productColors: product.colors
    });

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

    console.log('SizeSelectionPopup - Adding to cart:', {
      selectedColorIndex,
      colorName: selectedColorIndex !== null ? product.colors[selectedColorIndex] : null,
      userSelections
    });

    addItem(productConfig, selectedSize, quantity, userSelections);
    showCartNotification(productConfig, selectedSize, quantity);
    
    // Reset and close
    setSelectedSize(product.size?.length > 0 ? product.size[0] : '');
    setQuantity(1);
    setSelectedColorIndex(null);
    setSelectedImageIndex(0);
    setIncludeFootstool(false);
    setIncludeSofaBed(false);
    onClose();
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
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
            <h2 className="text-xl font-bold text-gray-800">Configure Product</h2>
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
                {product.gallery && product.gallery.length > 1 ? (
                  <div className="relative">
                    <Swiper
                      modules={[FreeMode, Navigation, Thumbs]}
                      spaceBetween={10}
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
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src={getCurrentImage()}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Thumbnail Slider */}
                {product.gallery && product.gallery.length > 1 && (
                  <div className="relative">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      modules={[FreeMode, Navigation]}
                      spaceBetween={8}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      className="popup-thumb-slider"
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
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
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
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text">
                        {formatPrice(calculateTotalPrice())}
                      </span>
                      {product.onSale && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(calculateOriginalTotalPrice())}
                        </span>
                      )}
                    </div>
                    {(includeFootstool || includeSofaBed) && (
                      <div className="text-xs text-gray-600">
                        <p>Base: {formatPrice(product.price)}</p>
                        {includeFootstool && <p>+ Footstool: {formatPrice(100)}</p>}
                        {includeSofaBed && <p>+ Sofa Bed: {formatPrice(200)}</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Color</h4>
                    <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-semibold text-yellow-800">
                        Selected: <span className="text-yellow-900">{product.colors[selectedColorIndex !== null ? selectedColorIndex : 0]}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(index)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${getColorClass(color)} ${
                            (selectedColorIndex !== null ? selectedColorIndex : 0) === index 
                              ? 'ring-2 ring-yellow-500 ring-offset-1 border-yellow-500' 
                              : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                          }`}
                          title={`${color} - Image ${index + 1}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Click a color to see the corresponding product image</p>
                  </div>
                )}

                {/* Dimensions */}
                {product.dimensions && product.dimensions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Dimensions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.dimensions.map((dimension) => (
                        <button
                          key={dimension}
                          onClick={() => setSelectedDimension(dimension)}
                          className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
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

                {/* Orientation */}
                {product.Orientation && product.Orientation.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Orientation</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.Orientation.map((orientation) => (
                        <button
                          key={orientation}
                          onClick={() => setSelectedOrientation(orientation)}
                          className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
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

                {/* Storage */}
                {product.storage && product.storage.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Storage Options</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.storage.map((storageOption) => (
                        <button
                          key={storageOption}
                          onClick={() => setSelectedStorage(storageOption)}
                          className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
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
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Footstool</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIncludeFootstool(false)}
                        className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
                          !includeFootstool
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        No Footstool
                      </button>
                      <button
                        onClick={() => setIncludeFootstool(true)}
                        className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
                          includeFootstool
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-center">
                          <div>Include (+£100)</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Sofa Bed Option */}
                {product.sofabedmechanism && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sofa Bed</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIncludeSofaBed(false)}
                        className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
                          !includeSofaBed
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        No Sofa Bed
                      </button>
                      <button
                        onClick={() => setIncludeSofaBed(true)}
                        className={`py-2 px-3 border rounded-lg text-xs font-medium transition-all duration-200 ${
                          includeSofaBed
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-center">
                          <div>Include (+£200)</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.size && product.size.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Select Size *</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {product.size.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && product.size.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">Please select a size</p>
                    )}
                  </div>
                )}

                {/* Quantity Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quantity</h4>
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
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-200 text-gray-600 hover:text-white"
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
                    <span className="text-sm text-gray-600">Total ({quantity} item{quantity > 1 ? 's' : ''})</span>
                    <span className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text">
                      {formatPrice(calculateTotalPrice() * quantity)}
                    </span>
                  </div>
                  {product.onSale && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">Original price</span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(calculateOriginalTotalPrice() * quantity)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.size && product.size.length > 0 && !selectedSize}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      (product.size && product.size.length > 0 && !selectedSize)
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white'
                    }`}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
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