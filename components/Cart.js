import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Cart = () => {
  const {
    items,
    isOpen,
    itemCount,
    totalPrice,
    originalTotalPrice,
    totalSavings,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart
  } = useCart();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const router = useRouter();

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(0)}`;
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(item.id, item.selectedSize);
    } else {
      updateQuantity(item.id, item.selectedSize, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    
    // Add a small delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Close cart and navigate to checkout
    toggleCart();
    router.push('/checkout');
    
    // Reset loading state after navigation
    setTimeout(() => {
      setIsCheckoutLoading(false);
    }, 100);
  };

  const handleClearCart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      clearCart();
      setIsAnimating(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-[#1F1F1F] to-[#2E2E2E] shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🛒</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Your Order
                </h2>
                <p className="text-sm text-[#C0C0C0]">{itemCount} items</p>
              </div>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-[#2E2E2E] rounded-lg transition-colors duration-200 text-[#C0C0C0] hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-full flex items-center justify-center mb-6">
                  <span className="text-6xl">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Your cart is empty</h3>
                <p className="text-[#C0C0C0] mb-6 text-center">
                  Looks like you haven't added any delicious food yet!<br/>
                  Browse our menu and add your favorites.
                </p>
                <button
                  onClick={toggleCart}
                  className="bg-gradient-to-r from-[#FF0000] to-[#F44336] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#F44336] hover:to-[#FF0000] transition-all duration-300 transform hover:scale-105"
                >
                  🍕 Browse Menu
                </button>
              </div>
            ) : (
              <div className={`p-4 space-y-4 ${isAnimating ? 'opacity-50' : ''}`}>
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.selectedSize}-${index}`} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#2E2E2E] to-[#333333] rounded-xl border border-gray-600">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-xs text-[#C0C0C0]">
                          {item.category}
                        </p>
                        {item.selectedSize && (
                          <>
                            <span className="text-xs text-[#C0C0C0]">•</span>
                            <span className="text-xs text-[#FFCC00] font-medium">
                              {item.selectedSize}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Deal Features - Only show for deals */}
                      {item.category === 'Deals' && item.features && (
                        <div className="mb-2">
                          <div className="bg-[#1F1F1F] rounded-md p-2 border border-gray-600">
                            <p className="text-xs font-medium text-[#FFCC00] mb-1">🎯 Includes:</p>
                            <ul className="space-y-0.5">
                              {item.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="text-xs text-[#C0C0C0] flex items-center">
                                  <span className="text-[#FFCC00] mr-1 text-xs">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm font-semibold text-[#FFCC00]">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200 text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-lg hover:bg-[#FFCC00] hover:border-[#FFCC00] transition-all duration-200 text-white hover:text-[#1F1F1F]"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-20 py-3 rounded-lg transition-all duration-200 border border-red-800 hover:border-red-600"
                  >
                    🗑️ Clear All Items
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer with totals and checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-700 p-4 bg-gradient-to-r from-[#1F1F1F] to-[#2E2E2E]">
              {/* Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Delivery Fee</span>
                  <span className="font-medium text-[#FFCC00]">
                    {totalPrice >= 1000 ? 'FREE' : 'Rs. 150'}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-white">Total</span>
                    <span className="text-base font-semibold text-[#FFCC00]">
                      {formatPrice(totalPrice >= 1000 ? totalPrice : totalPrice + 150)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                    isCheckoutLoading 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#FF0000] to-[#F44336] hover:from-[#F44336] hover:to-[#FF0000]'
                  } text-white`}
                >
                  {isCheckoutLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                <button
                  onClick={toggleCart}
                  disabled={isCheckoutLoading}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isCheckoutLoading 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-transparent border-2 border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#1F1F1F]'
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart; 