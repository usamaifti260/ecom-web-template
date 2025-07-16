import { useNotification } from '@/lib/NotificationContext';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();
  const { toggleCart } = useCart();

  const handleViewCart = (notificationId) => {
    removeNotification(notificationId);
    toggleCart();
  };

  const handleViewWishlist = (notificationId) => {
    removeNotification(notificationId);
    // Navigate to wishlist page will be handled by Link component
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'cart':
        return (
          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
            </svg>
          </div>
        );
      case 'wishlist':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
          onViewCart={handleViewCart}
          onViewWishlist={handleViewWishlist}
          formatPrice={formatPrice}
          getNotificationIcon={getNotificationIcon}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onRemove, onViewCart, onViewWishlist, formatPrice, getNotificationIcon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const handleViewCart = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onViewCart(notification.id);
    }, 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isRemoving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 max-w-sm">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {notification.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={handleRemove}
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Product details for cart and wishlist notifications */}
            {(notification.type === 'cart' || notification.type === 'wishlist') && notification.product && (
              <div className="mt-3 flex items-center space-x-3">
                <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.product.image}
                    alt={notification.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.product.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      {notification.product.selectedSize && `Size: ${notification.product.selectedSize}`}
                      {notification.product.selectedColor && `Color: ${notification.product.selectedColor}`}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Rs. {notification.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-3 flex space-x-2">
              {notification.type === 'cart' && (
                <button
                  onClick={handleViewCart}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                >
                  View Cart
                </button>
              )}
              {notification.type === 'wishlist' && (
                <Link
                  href="/wishlist"
                  onClick={() => onViewWishlist(notification.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-center"
                >
                  View Wishlist
                </Link>
              )}
              <button
                onClick={handleRemove}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 