import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';

export default function PaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    // Load order data from localStorage
    try {
      const savedOrder = localStorage.getItem('pendingOrder');
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder));
      } else {
        // Redirect to checkout if no order data
        router.push('/checkout');
      }
    } catch (error) {
      console.error('Error loading order data:', error);
      router.push('/checkout');
    }
  }, [router]);

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(0)}`;
  };

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `FK-${timestamp}-${randomStr}`.toUpperCase();
  };

  const handlePlaceOrder = async () => {
    if (!orderData) {
      showErrorNotification('Order data not found. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Format customer data according to backend expectations
      const customerData = {
        name: `${orderData.customer.firstName} ${orderData.customer.lastName}`.trim(),
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
        city: orderData.customer.city,
        state: orderData.customer.state,
        zipCode: orderData.customer.zipCode,
        country: orderData.customer.country
      };

      // Format products data according to backend expectations
      const products = orderData.items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description || item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category || 'Fast Food',
        features: item.features || [],
        image: item.image || '',
        brand: item.brand || 'Fork & Knife Fast Food',
        rating: item.rating || 0,
        reviews: item.reviews || 0,
        inStock: item.inStock || true,
        bestseller: item.bestseller || false
      }));

      // Calculate totals according to backend expectations
      const subtotal = orderData.summary.subtotal;
      const shipping = orderData.summary.deliveryFee || 0;
      const tax = 0; // No tax for restaurant
      const discount = 0; // No discounts
      const total = subtotal + shipping;

      const totals = {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };

      // Payment info - map frontend values to backend enum values
      // Backend enum: ['cash', 'card', 'bank_transfer', 'paypal', 'stripe', 'other']
      const paymentMethodMap = {
        'COD': 'cash',           // Cash on Delivery -> cash
        'card': 'card',          // Credit/Debit Card -> card
        'paypal': 'paypal'       // PayPal -> paypal
      };
      
      const paymentInfo = {
        method: paymentMethodMap[paymentMethod] || 'cash',
        status: 'pending'
      };

      // Submit order to backend
      const orderPayload = {
        customerData,
        products,
        totals,
        paymentInfo
      };

      console.log('Submitting order to backend:', orderPayload);
      
      // Replace with your actual siteId
      const siteId = process.env.NEXT_PUBLIC_SITE_ID || 'forkandknife';
      
      const response = await axios.post(
        `https://web-portal-backend-production.up.railway.app/api/orders/submit/${siteId}`, 
        orderPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('Order submitted successfully:', response.data);

      // Generate order ID from backend response or fallback
      const orderId = response.data?.orderNumber || generateOrderId();
      
      // Prepare final order data for local storage
      const finalOrder = {
        ...orderData,
        orderId,
        backendOrderId: response.data?.id,
        backendOrderNumber: response.data?.orderNumber,
        status: 'confirmed',
        paymentMethod,
        paymentStatus: 'pending',
        processedAt: new Date().toISOString(),
        backendResponse: response.data,
        totals: totals // Store calculated totals
      };

      // Save order to localStorage for order tracking
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(finalOrder);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Clear pending order
      localStorage.removeItem('pendingOrder');
      
      // Clear cart
      clearCart();
      
      // Show success notification
      showSuccessNotification('Order placed successfully!');
      
      // Redirect to success page
      router.push(`/order-success?orderId=${orderId}`);
      
    } catch (error) {
      console.error('Order submission failed:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      
      let errorMessage = 'Failed to place order. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showErrorNotification(`Order submission failed: ${errorMessage}`);
      
      // For debugging, save failed order attempt
      const failedOrder = {
        ...orderData,
        error: error.response?.data || { message: errorMessage },
        failedAt: new Date().toISOString(),
        paymentMethod
      };
      
      localStorage.setItem('lastFailedOrder', JSON.stringify(failedOrder));
      
      // Redirect to failure page with error reason
      const errorReason = error.response?.status === 400 ? 'address_invalid' : 
                         error.response?.status === 409 ? 'inventory_unavailable' :
                         error.response?.status >= 500 ? 'system_error' : 
                         'payment_failed';
                         
      router.push(`/order-failed?reason=${errorReason}`);
      
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading state while order data is being loaded
  if (!orderData) {
    return (
      <>
        <Head>
          <title>Payment - Fork & Knife Fast Food</title>
          <meta name="description" content="Complete your payment" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCC00] mx-auto mb-4"></div>
            <p className="text-[#C0C0C0]">Loading order details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Payment - Fork & Knife Fast Food</title>
        <meta name="description" content="Complete your payment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-[#C0C0C0] mb-4">
              <Link href="/shop" className="hover:text-[#FFCC00] transition-colors">🍕 Menu</Link>
              <span>→</span>
              <Link href="/checkout" className="hover:text-[#FFCC00] transition-colors">Checkout</Link>
              <span>→</span>
              <span className="text-[#FFCC00] font-medium">Payment</span>
            </nav>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="text-[#FFCC00]">FORK</span> & <span className="text-[#FF0000]">KNIFE</span>
              </h1>
              <p className="text-[#C0C0C0]">Review and confirm your delicious order</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Method */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#2E2E2E] to-[#333333] rounded-2xl shadow-2xl p-8 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="text-2xl mr-2">💳</span>
                  Payment Method
                </h3>
                
                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <div className="border border-[#FFCC00] rounded-lg p-4 bg-gradient-to-r from-[#FF0000] to-[#F44336]">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-4 h-4 text-[#FFCC00] border-white focus:ring-[#FFCC00]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <span className="text-lg">💰</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">Cash on Delivery</p>
                            <p className="text-sm text-white opacity-90">Pay when you receive your order</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-black bg-opacity-20 rounded-lg">
                          <p className="text-sm text-white font-semibold">
                            How it works:
                          </p>
                          <ul className="text-sm text-white opacity-90 mt-1 space-y-1">
                            <li>• Your delicious food will be prepared fresh</li>
                            <li>• Pay the delivery person when your order arrives</li>
                            <li>• Inspect your food before payment</li>
                            <li>• Cash payment only at delivery</li>
                          </ul>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Future payment methods can be added here */}
                  <div className="border border-gray-600 rounded-lg p-4 opacity-50 bg-[#1F1F1F]">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-lg">💳</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-400">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gradient-to-br from-[#2E2E2E] to-[#333333] rounded-2xl shadow-2xl p-8 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="text-2xl mr-2">🚚</span>
                  Delivery Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[#FFCC00]">Customer</p>
                    <p className="text-sm text-white">
                      {orderData.customer.firstName} {orderData.customer.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#FFCC00]">Email</p>
                    <p className="text-sm text-white">{orderData.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#FFCC00]">Phone</p>
                    <p className="text-sm text-white">{orderData.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#FFCC00]">Delivery Address</p>
                    <p className="text-sm text-white">
                      {orderData.customer.address}<br />
                      {orderData.customer.city}, {orderData.customer.area} {orderData.customer.zipCode}
                    </p>
                  </div>
                  {orderData.customer.notes && (
                    <div>
                      <p className="text-sm font-medium text-[#FFCC00]">Order Notes</p>
                      <p className="text-sm text-white">{orderData.customer.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-[#2E2E2E] to-[#333333] rounded-2xl shadow-2xl p-8 border border-gray-600 h-fit">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="text-2xl mr-2">🛒</span>
                Order Summary
              </h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderData.items.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor}-${index}`} className="flex items-center space-x-4 bg-[#1F1F1F] rounded-lg p-4 border border-gray-600">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#C0C0C0]">
                        {item.category}
                      </p>
                      
                      {/* Deal Features - Only show for deals */}
                      {item.category === 'Deals' && item.features && (
                        <div className="mt-1 mb-1">
                          <div className="bg-[#2E2E2E] rounded-md p-2 border border-gray-600">
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
                      
                      <p className="text-xs text-[#C0C0C0]">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#FFCC00]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Subtotal ({orderData.summary.itemCount} items)</span>
                  <span className="font-medium text-white">{formatPrice(orderData.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Delivery Fee</span>
                  <span className="font-medium text-[#FFCC00]">
                    {orderData.summary.deliveryFee === 0 ? 'FREE' : formatPrice(orderData.summary.deliveryFee)}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-white">Total</span>
                    <span className="text-base font-semibold text-[#FFCC00]">{formatPrice(orderData.summary.total)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                    isProcessing
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#FF0000] to-[#F44336] hover:from-[#F44336] hover:to-[#FF0000] transform hover:scale-105'
                  } text-white`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Placing Order...
                    </div>
                  ) : (
                    '🍕 Place Order'
                  )}
                </button>
                
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-[#C0C0C0]">
                  <span className="text-lg">🔒</span>
                  <span>Your order is secure and protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 