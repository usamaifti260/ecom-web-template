import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import { useNotification } from '@/lib/NotificationContext';

// Configuration for the ProductCard component
const PRODUCT_CARD_CONFIG = {
  // Product Display
  maxColorsToShow: 3,
  maxSizesToShow: 3,
  moreItemsText: '+',

  // Currency
  currency: 'PKR',

  // Badges
  badges: {
    sale: 'SALE',
    new: 'NEW',
    bestseller: 'BESTSELLER'
  },

  // Buttons
  buttons: {
    addToCart: 'ADD TO CART',
    addedToCart: 'Added to Cart',
    added: 'Added',
    viewProduct: 'VIEW PRODUCT',
    viewDetails: 'View Details'
  },

  // Messages
  messages: {
    addedToWishlist: 'added to wishlist',
    removedFromWishlist: 'removed from wishlist'
  }
};

const ProductCard = ({
  product,
  isDarkBackground = false,
  onAddToCart,
  onColorSelect,
  selectedColors = {},
  addingToCart = {},
  showQuickView = false,
  variant = 'default', // 'default', 'wishlist', 'related', 'sale-section'
  onRemoveFromWishlist,
  showCartButton = true,
  showWishlistButton = true
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showCartNotification } = useNotification();

  // Determine if this card should use the special sale section styling
  const isInSaleSection = variant === 'sale-section';

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `${PRODUCT_CARD_CONFIG.currency} ${price.toLocaleString()}`;
  };

  // Handle color selection
  const handleColorSelect = (productId, colorIndex) => {
    if (onColorSelect) {
      onColorSelect(productId, colorIndex);
    }
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

  // Handle add to cart
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    if (variant === 'wishlist' && onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showCartNotification(product, null, 1, PRODUCT_CARD_CONFIG.messages.removedFromWishlist);
    } else {
      addToWishlist(product);
      showCartNotification(product, null, 1, PRODUCT_CARD_CONFIG.messages.addedToWishlist);
    }
  };

  // Get color class for color options
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
      'Coal': 'bg-gray-800',
      'Gold': 'bg-yellow-500',
      'Pearl': 'bg-gray-200',
      'Midnight': 'bg-gray-900',
      'Mustard': 'bg-amber-500',
      'Teal': 'bg-teal-400',
      'Tan': 'bg-amber-600',
      'Burgundy': 'bg-red-800',
      'Natural': 'bg-amber-100',
      'Natural White': 'bg-gray-50',
      'Light Brown': 'bg-amber-300',
      'Dark Brown': 'bg-amber-900',
      'Mixed': 'bg-gradient-to-r from-amber-200 to-amber-800',
      'Natural Tones': 'bg-gradient-to-r from-amber-100 to-amber-400'
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  return (
    <div className={`${isInSaleSection
      ? 'bg-red-900 border border-red-800'
      : isDarkBackground
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white'
      } rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative`}>
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[5/5] overflow-hidden cursor-pointer lg:h-[480px] w-full">
          {/* Sale Badge */}
          {product.onSale && (
            <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold z-20 rounded ${isInSaleSection
              ? 'bg-yellow-400 text-red-900'
              : 'bg-red-500 text-white'
              }`}>
              {PRODUCT_CARD_CONFIG.badges.sale}
            </div>
          )}

          {/* New Badge */}
          {product.isNew && variant === 'related' && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
              {PRODUCT_CARD_CONFIG.badges.new}
            </div>
          )}

          {/* Wishlist Button */}
          {showWishlistButton && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistToggle(product);
              }}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full transition-all duration-300 z-20 flex items-center justify-center ${variant === 'wishlist'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : isInWishlist(product.id)
                  ? 'bg-red-500 text-white'
                  : isInSaleSection
                    ? 'bg-yellow-400 text-red-900 hover:bg-yellow-300'
                    : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
            >
              {variant === 'wishlist' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
          )}

          {/* Quick View Button - Desktop Only */}
          {showQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={`absolute top-2 right-12 w-8 h-8 rounded-full transition-all duration-300 z-20 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 ${isInSaleSection
                ? 'bg-yellow-400 text-red-900 hover:bg-yellow-300'
                : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}

          <div className={`relative w-full h-full ${isInSaleSection ? 'bg-red-900' : 'bg-white'} group`}>
            {/* Default image */}
            <Image
              src={getCurrentImage(product)}
              alt={product.name}
              fill
              className={`object-contain object-top transition-opacity duration-300 ${selectedColors[product.id] !== undefined
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

            {/* Quick View Overlay for Related Products */}
            {variant === 'related' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                  {PRODUCT_CARD_CONFIG.buttons.viewDetails}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info - Slides up on hover (Desktop) */}
      <div className="relative">
        {/* Desktop: Sliding Content */}
        <div className={`hidden lg:block absolute bottom-0 left-0 right-0 transition-all duration-300 lg:translate-y-0 lg:group-hover:-translate-y-16 z-10 ${isInSaleSection
          ? 'bg-red-900'
          : isDarkBackground
            ? 'bg-gray-800'
            : 'bg-white'
          }`}>
          <div className="p-4 text-center">
            {/* Brand Name */}
            <p className={`text-xs uppercase tracking-wide mb-1 font-medium ${isInSaleSection
              ? 'text-yellow-300'
              : isDarkBackground
                ? 'text-gray-400'
                : 'text-gray-500'
              }`}>
              {product.brand || 'ALHAFIZ MILK & SWEETS'}
            </p>

            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <h4 className={`font-normal ${variant === 'related' ? 'text-lg' : 'text-xl'} mb-2 leading-tight transition-colors duration-200 cursor-pointer ${isInSaleSection
                ? 'text-yellow-100 hover:text-yellow-200'
                : isDarkBackground
                  ? 'text-gray-200 hover:text-red-400'
                  : 'text-gray-800 hover:text-amber-600'
                }`}>
                {product.name}
              </h4>
            </Link>

            {/* Subcategory */}
            {product.subcategory && variant !== 'related' && (
              <p className={`text-xs mb-2 font-medium ${isInSaleSection
                ? 'text-yellow-400'
                : 'text-amber-600'
                }`}>
                {product.subcategory}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className={`${variant === 'related' ? 'text-lg' : 'text-xl'} font-normal ${isInSaleSection
                ? 'text-yellow-100'
                : isDarkBackground
                  ? 'text-gray-100'
                  : 'text-gray-900'
                }`}>
                {formatPrice(product.price)}
              </span>
              {product.onSale && (
                <span className={`text-sm line-through font-light ${isInSaleSection
                  ? 'text-yellow-300'
                  : isDarkBackground
                    ? 'text-gray-400'
                    : 'text-gray-500'
                  }`}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color or Size Options */}
            {product.colors && product.colors.length > 0 ? (
              <div className="flex items-center justify-center flex-wrap gap-1">
                {variant === 'related' ? (
                  // Related products show color names as text
                  <>
                    {product.colors.slice(0, PRODUCT_CARD_CONFIG.maxColorsToShow).map((color, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded border ${isInSaleSection
                          ? 'bg-yellow-100 text-red-900 border-yellow-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        title={color}
                      >
                        {color}
                      </span>
                    ))}
                    {product.colors.length > PRODUCT_CARD_CONFIG.maxColorsToShow && (
                      <span className={`text-xs ${isInSaleSection
                        ? 'text-yellow-300'
                        : 'text-gray-500'
                        }`}>
                        {PRODUCT_CARD_CONFIG.moreItemsText}{product.colors.length - PRODUCT_CARD_CONFIG.maxColorsToShow}
                      </span>
                    )}
                  </>
                ) : (
                  // Other variants show color buttons or circles
                  <>
                    {product.colors.slice(0, PRODUCT_CARD_CONFIG.maxColorsToShow).map((color, index) => (
                      variant === 'wishlist' ? (
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
                          className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${selectedColors[product.id] === index
                            ? 'ring-2 ring-gray-600 ring-offset-1'
                            : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                            }`}
                          title={color}
                          type="button"
                        />
                      ) : (
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
                          className={`px-2 py-1 border rounded text-xs font-medium transition-all duration-200 ${selectedColors[product.id] === index
                            ? isInSaleSection
                              ? 'border-yellow-400 bg-yellow-100 text-red-900'
                              : 'border-red-500 bg-red-50 text-red-700'
                            : isInSaleSection
                              ? 'border-yellow-300 bg-yellow-50 text-red-800 hover:border-yellow-400 hover:bg-yellow-100'
                              : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-red-300'
                            }`}
                          title={color}
                          type="button"
                        >
                          {color}
                        </button>
                      )
                    ))}
                    {product.colors.length > PRODUCT_CARD_CONFIG.maxColorsToShow && (
                      <span className={`text-xs ${isInSaleSection
                        ? 'text-yellow-300'
                        : 'text-gray-500'
                        }`}>
                        {PRODUCT_CARD_CONFIG.moreItemsText}{product.colors.length - PRODUCT_CARD_CONFIG.maxColorsToShow}
                      </span>
                    )}
                  </>
                )}
              </div>
            ) : product.sizes && product.sizes.length > 0 && variant !== 'related' && (
              <div className="flex items-center justify-center flex-wrap gap-1">
                {product.sizes.slice(0, PRODUCT_CARD_CONFIG.maxSizesToShow).map((sizeItem, index) => {
                  const sizeLabel = typeof sizeItem === 'object' ? sizeItem.size : sizeItem;
                  return (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded border ${isInSaleSection
                        ? 'bg-yellow-100 text-red-900 border-yellow-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      title={sizeLabel}
                    >
                      {sizeLabel}
                    </span>
                  );
                })}
                {product.sizes.length > PRODUCT_CARD_CONFIG.maxSizesToShow && (
                  <span className={`text-xs ${isInSaleSection
                    ? 'text-yellow-300'
                    : 'text-gray-500'
                    }`}>
                    {PRODUCT_CARD_CONFIG.moreItemsText}{product.sizes.length - PRODUCT_CARD_CONFIG.maxSizesToShow}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Shows on hover (Desktop only) */}
        {showCartButton && (
          <div className={`hidden lg:block lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:transform lg:translate-y-16 lg:group-hover:translate-y-0 p-4 lg:z-20 ${isInSaleSection
            ? 'bg-red-900'
            : 'bg-white'
            }`}>
            {variant === 'related' ? (
              <Link href={`/product/${product.id}`}>
                <button className="w-full py-2 px-4 rounded font-bold text-sm transition-all duration-200 flex items-center justify-center bg-red-800 hover:bg-red-900 text-white">
                  {PRODUCT_CARD_CONFIG.buttons.viewProduct}
                </button>
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-4 rounded font-bold text-sm transition-all duration-200 flex items-center justify-center ${addingToCart[product.id]
                  ? 'bg-green-500 text-white'
                  : isInSaleSection
                    ? 'bg-yellow-400 text-red-900 hover:bg-yellow-300'
                    : 'bg-red-800 hover:bg-red-900 text-white'
                  }`}
                disabled={addingToCart[product.id]}
              >
                {addingToCart[product.id] ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {PRODUCT_CARD_CONFIG.buttons.addedToCart}
                  </>
                ) : (
                  PRODUCT_CARD_CONFIG.buttons.addToCart
                )}
              </button>
            )}
          </div>
        )}

        {/* Mobile/Tablet: Static Content (Always Visible) */}
        <div className="lg:hidden py-4 px-2 text-center">
          {/* Brand Name */}
          <p className={`text-[10px] uppercase tracking-wide mb-1 font-medium ${isInSaleSection
            ? 'text-yellow-300'
            : isDarkBackground
              ? 'text-gray-400'
              : 'text-gray-500'
            }`}>
            {product.brand || 'ALHAFIZ MILK & SWEETS'}
          </p>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h4 className={`font-normal text-base mb-2 leading-tight transition-colors duration-200 cursor-pointer ${isInSaleSection
              ? 'text-yellow-100 hover:text-yellow-200'
              : isDarkBackground
                ? 'text-gray-200 hover:text-red-400'
                : 'text-gray-800 hover:text-amber-600'
              }`}>
              {product.name}
            </h4>
          </Link>

          {/* Subcategory - Mobile */}
          {product.subcategory && variant !== 'related' && (
            <p className={`text-xs mb-2 font-medium ${isInSaleSection
              ? 'text-yellow-400'
              : 'text-amber-600'
              }`}>
              {product.subcategory}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className={`text-base font-normal ${isInSaleSection
              ? 'text-yellow-100'
              : isDarkBackground
                ? 'text-gray-100'
                : 'text-gray-900'
              }`}>
              {formatPrice(product.price)}
            </span>
            {product.onSale && variant !== 'default' && (
              <span className={`text-sm line-through font-light ${isInSaleSection
                ? 'text-yellow-300'
                : isDarkBackground
                  ? 'text-gray-400'
                  : 'text-gray-500'
                }`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color or Size Options - Mobile */}
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center justify-center flex-wrap gap-1 mb-3">
              {variant === 'related' ? (
                // Related products show color names
                <>
                  {product.colors.slice(0, PRODUCT_CARD_CONFIG.maxColorsToShow).map((color, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded border ${isInSaleSection
                        ? 'bg-yellow-100 text-red-900 border-yellow-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      title={color}
                    >
                      {color}
                    </span>
                  ))}
                  {product.colors.length > PRODUCT_CARD_CONFIG.maxColorsToShow && (
                    <span className={`text-xs ${isInSaleSection
                      ? 'text-yellow-300'
                      : 'text-gray-500'
                      }`}>
                      {PRODUCT_CARD_CONFIG.moreItemsText}{product.colors.length - PRODUCT_CARD_CONFIG.maxColorsToShow}
                    </span>
                  )}
                </>
              ) : variant === 'wishlist' ? (
                // Wishlist shows color circles
                <>
                  {product.colors.slice(0, PRODUCT_CARD_CONFIG.maxColorsToShow).map((color, index) => (
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
                      className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${selectedColors[product.id] === index
                        ? 'ring-2 ring-gray-600 ring-offset-1'
                        : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                        }`}
                      title={color}
                      type="button"
                    />
                  ))}
                  {product.colors.length > PRODUCT_CARD_CONFIG.maxColorsToShow && (
                    <span className={`text-xs ${isInSaleSection
                      ? 'text-yellow-300'
                      : 'text-gray-500'
                      }`}>
                      {PRODUCT_CARD_CONFIG.moreItemsText}{product.colors.length - PRODUCT_CARD_CONFIG.maxColorsToShow}
                    </span>
                  )}
                </>
              ) : (
                // Default shows color buttons
                <>
                  {product.colors.slice(0, PRODUCT_CARD_CONFIG.maxColorsToShow).map((color, index) => (
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
                      className={`px-2 py-1 border rounded text-xs font-medium transition-all duration-200 ${selectedColors[product.id] === index
                        ? isInSaleSection
                          ? 'border-yellow-400 bg-yellow-100 text-red-900'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : isInSaleSection
                          ? 'border-yellow-300 bg-yellow-50 text-red-800 hover:border-yellow-400 hover:bg-yellow-100'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-red-300'
                        }`}
                      title={color}
                      type="button"
                    >
                      {color}
                    </button>
                  ))}
                  {product.colors.length > PRODUCT_CARD_CONFIG.maxColorsToShow && (
                    <span className={`text-xs ${isInSaleSection
                      ? 'text-yellow-300'
                      : 'text-gray-500'
                      }`}>
                      {PRODUCT_CARD_CONFIG.moreItemsText}{product.colors.length - PRODUCT_CARD_CONFIG.maxColorsToShow}
                    </span>
                  )}
                </>
              )}
            </div>
          ) : product.sizes && product.sizes.length > 0 && variant !== 'related' && (
            <div className="flex items-center justify-center flex-wrap gap-1 mb-3">
              {product.sizes.slice(0, PRODUCT_CARD_CONFIG.maxSizesToShow).map((sizeItem, index) => {
                const sizeLabel = typeof sizeItem === 'object' ? sizeItem.size : sizeItem;
                return (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded border ${isInSaleSection
                      ? 'bg-yellow-100 text-red-900 border-yellow-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    title={sizeLabel}
                  >
                    {sizeLabel}
                  </span>
                );
              })}
              {product.sizes.length > PRODUCT_CARD_CONFIG.maxSizesToShow && (
                <span className={`text-xs ${isInSaleSection
                  ? 'text-yellow-300'
                  : 'text-gray-500'
                  }`}>
                  {PRODUCT_CARD_CONFIG.moreItemsText}{product.sizes.length - PRODUCT_CARD_CONFIG.maxSizesToShow}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {showCartButton && (
            <div className={variant === 'wishlist' ? 'flex space-x-2' : ''}>
              {variant === 'related' ? (
                <Link href={`/product/${product.id}`}>
                  <button className="w-full py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center bg-red-800 hover:bg-red-900 text-white">
                    {PRODUCT_CARD_CONFIG.buttons.viewProduct}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={`${variant === 'wishlist' ? 'flex-1' : 'w-full'} py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center ${addingToCart[product.id]
                    ? 'bg-green-500 text-white'
                    : isInSaleSection
                      ? 'bg-yellow-400 text-red-900 hover:bg-yellow-300'
                      : 'bg-red-800 hover:bg-red-900 text-white'
                    }`}
                  disabled={addingToCart[product.id]}
                >
                  {addingToCart[product.id] ? (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {PRODUCT_CARD_CONFIG.buttons.added}
                    </>
                  ) : (
                    PRODUCT_CARD_CONFIG.buttons.addToCart
                  )}
                </button>
              )}

              {/* Remove Button for Wishlist */}
              {variant === 'wishlist' && (
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                  title="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 