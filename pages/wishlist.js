import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
import SizeSelectionPopup from '@/components/SizeSelectionPopup';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showCartNotification } = useNotification();
  const [addingToCart, setAddingToCart] = useState({});
  const [sizePopup, setSizePopup] = useState({ isOpen: false, product: null });
  const [selectedColors, setSelectedColors] = useState({}); // Track selected color for each product

  // Format price
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

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    removeFromWishlist(productId);
    if (product) {
      showCartNotification(product, null, 1, 'removed from wishlist');
    }
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

  return (
    <>
      <Head>
        <title>My Wishlist - Sofa Sphere</title>
        <meta name="description" content="Your saved furniture items at Sofa Sphere. Manage your wishlist and find your favorite products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  My Wishlist
                </h1>
                <p className="text-gray-600">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
              
              {wishlistItems.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[5/5] overflow-hidden cursor-pointer lg:h-[480px] w-full">
                      {/* Sale Badge */}
                      {product.onSale && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
                          SALE
                        </div>
                      )}

                      {/* Remove from Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFromWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full transition-all duration-300 z-20 flex items-center justify-center hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
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
                    <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-white transition-all duration-300 lg:translate-y-0 lg:group-hover:-translate-y-16 z-10">
                      <div className="p-4 text-center">
                        {/* Brand Name */}
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">{product.brand}</p>
                        
                        {/* Product Name */}
                        <Link href={`/product/${product.id}`}>
                          <h4 className="font-normal text-xl mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer">
                            {product.name}
                          </h4>
                        </Link>

                        {/* Price */}
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-xl font-normal text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.onSale && (
                            <span className="text-sm text-gray-500 line-through font-light">
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
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-medium">UK FURNISH</p>
                      
                      {/* Product Name */}
                      <Link href={`/product/${product.id}`}>
                        <h4 className="font-normal text-base mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer">
                          {product.name}
                        </h4>
                      </Link>

                      {/* Price */}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-lg font-normal text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.onSale && (
                          <span className="text-sm text-gray-500 line-through font-light">
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

                      {/* Action Buttons - Mobile */}
                      <div className="flex space-x-2">
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center ${
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

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                          title="Remove from wishlist"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Wishlist */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h3>
              <p className="text-gray-600 text-lg mb-8">
                Save items you love to your wishlist and come back to them later!
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue Shopping
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Size Selection Popup */}
      <SizeSelectionPopup
        product={sizePopup.product}
        isOpen={sizePopup.isOpen}
        onClose={closeSizePopup}
      />
    </>
  );
} 