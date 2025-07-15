import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useNotification } from '@/lib/NotificationContext';

export default function OrderFailedPage() {
  const router = useRouter();
  const { showInfoNotification } = useNotification();
  
  const [reason, setReason] = useState(null);
  const [errorReason, setErrorReason] = useState('unknown');
  const [retryCount, setRetryCount] = useState(0);
  const [failedOrderData, setFailedOrderData] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing router
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !router.isReady) return;
    
    const { reason: queryReason } = router.query;
    setReason(queryReason);
  }, [mounted, router.isReady, router.query]);

  useEffect(() => {
    if (reason) {
      setErrorReason(reason);
    }
    
    // Load failed order data if available
    if (typeof window !== 'undefined') {
      const lastFailedOrder = localStorage.getItem('lastFailedOrder');
      if (lastFailedOrder) {
        try {
          setFailedOrderData(JSON.parse(lastFailedOrder));
        } catch (error) {
          console.error('Error parsing failed order data:', error);
        }
      }
    }
  }, [reason]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getErrorDetails = (reason) => {
    switch (reason) {
      case 'payment_failed':
        return {
          title: 'Payment Failed',
          description: 'There was an issue processing your payment. Please try again.',
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
          suggestions: [
            'Check your payment method details',
            'Ensure you have sufficient funds',
            'Try a different payment method',
            'Contact your bank if the issue persists'
          ]
        };
      case 'inventory_unavailable':
        return {
          title: 'Item Unavailable',
          description: 'One or more items in your order are currently out of stock.',
          icon: (
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          ),
          suggestions: [
            'Remove out-of-stock items from your cart',
            'Choose alternative clothing items',
            'Check back later for restocked items',
            'Contact us for item availability'
          ]
        };
      case 'address_invalid':
        return {
          title: 'Invalid Delivery Address',
          description: 'The delivery address provided could not be verified.',
          icon: (
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          suggestions: [
            'Double-check your delivery address',
            'Ensure you are within our delivery area',
            'Use a verified delivery address',
            'Contact customer support for assistance'
          ]
        };
      case 'system_error':
        return {
          title: 'System Error',
          description: 'A technical error occurred while processing your order.',
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ),
          suggestions: [
            'Please try placing your order again',
            'Clear your browser cache and cookies',
            'Try using a different browser',
            'Contact our technical support team'
          ]
        };
      default:
        return {
          title: 'Order Failed',
          description: 'Unfortunately, we could not process your order at this time.',
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          suggestions: [
            'Please try placing your order again',
            'Check your internet connection',
            'Ensure all information is correct',
            'Contact customer support if needed'
          ]
        };
    }
  };

  const handleRetryOrder = () => {
    setRetryCount(prev => prev + 1);
    showInfoNotification('Redirecting to checkout...');
    
    // Add a small delay to show the notification
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleContactSupport = () => {
    showInfoNotification('Redirecting to contact page...');
    
    setTimeout(() => {
      router.push('/contact');
    }, 1000);
  };

  const errorDetails = getErrorDetails(errorReason);

  return (
    <>
      <Head>
        <title>Order Failed - Hathkari Official</title>
        <meta name="description" content="Order processing failed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Error Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {errorDetails.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{errorDetails.title}</h1>
              <p className="text-lg text-gray-600 mb-4">
                {errorDetails.description}
              </p>
              {retryCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 inline-block">
                  <p className="text-sm text-gray-800">
                    Retry attempts: {retryCount}
                  </p>
                </div>
              )}
            </div>

            {/* Failed Order Details */}
            {failedOrderData && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Customer</p>
                      <p className="text-sm text-gray-600">
                        {failedOrderData.customer?.firstName} {failedOrderData.customer?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-600">{failedOrderData.customer?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Total Amount</p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(failedOrderData.summary?.total || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Payment Method</p>
                      <p className="text-sm text-gray-600">{failedOrderData.paymentMethod || 'COD'}</p>
                    </div>
                  </div>
                  
                  {failedOrderData.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                      <p className="text-sm font-medium text-red-800">Error Details:</p>
                      <p className="text-sm text-red-700 mt-1">
                        {failedOrderData.error.message || 'Unknown error occurred'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Details and Solutions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What can you do?</h3>
              <div className="space-y-3">
                {errorDetails.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-yellow-600">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleRetryOrder}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
                
                <button
                  onClick={handleContactSupport}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Support
                </button>
              </div>
              
              <div className="text-center">
                <Link href="/shop" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  ← Back to Shop
                </Link>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Need More Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-700">support@hathkariofficial.com</p>
                    <p className="text-xs text-gray-600">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-700">0304-4481181</p>
                    <p className="text-xs text-gray-600">Daily 10AM-8PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Visit our{' '}
                <Link href="/contact" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Contact Page
                </Link>
                {' '}for more support options or check our delivery areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 