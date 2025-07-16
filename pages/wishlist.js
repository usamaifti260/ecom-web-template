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

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    removeFromWishlist(productId);
    if (product) {
      showCartNotification(product, null, 1, 'removed from wishlist');
    }
  };

  // Handle add to cart
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

  return (
    <>
      <Head>
        <title>My Wishlist - Comfort Sofa</title>
        <meta name="description" content="Your saved furniture items at Comfort Sofa. Manage your wishlist and find your favorite products." />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-64 overflow-hidden cursor-pointer">
                      {product.onSale && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                          {product.salepercentage}% OFF
                        </div>
                      )}
                      {product.isNew && !product.onSale && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                          NEW
                        </div>
                      )}
                      
                      {/* Remove from Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFromWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full transition-all duration-300 z-10 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      <div className="relative w-full h-full bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                    
                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                      <h4 className="font-semibold text-base mb-2 line-clamp-2 min-h-[3rem] text-gray-800 leading-tight tracking-wide hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
                        {product.name}
                      </h4>
                    </Link>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text tracking-wide">
                        {formatPrice(product.price)}
                      </span>
                      {product.onSale && product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center ${
                          addingToCart[product.id]
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:scale-105'
                        }`}
                        disabled={addingToCart[product.id]}
                      >
                        {addingToCart[product.id] ? (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Remove from wishlist"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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