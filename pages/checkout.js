import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, itemCount, updateQuantity, removeItem } = useCart();
  const { showErrorNotification } = useNotification();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Address
    address: '',
    city: '',
    area: '',
    zipCode: '',
    
    // Additional Information
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(0)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(item.id, item.selectedColor);
    } else {
      updateQuantity(item.id, item.selectedColor, newQuantity);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showErrorNotification('Please fill in all required fields correctly');
      return;
    }
    
    if (items.length === 0) {
      showErrorNotification('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Calculate delivery fee
      const deliveryFee = totalPrice >= 1000 ? 0 : 150;
      const finalTotal = totalPrice + deliveryFee;
      
      // Prepare order data
      const orderData = {
        customer: formData,
        items: items,
        summary: {
          subtotal: totalPrice,
          deliveryFee: deliveryFee,
          total: finalTotal,
          itemCount
        },
        paymentMethod: 'COD',
        orderDate: new Date().toISOString()
      };
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store order data in localStorage for the payment page
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
      
      // Redirect to payment page
      router.push('/payment');
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      showErrorNotification('An error occurred during checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  // Redirect to shop if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout - Fork & Knife Fast Food</title>
          <meta name="description" content="Complete your food order" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-[#1F1F1F] to-[#2E2E2E] flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-[#FF0000] to-[#F44336] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Your cart is empty</h1>
            <p className="text-[#C0C0C0] mb-6">Add some delicious food to your cart before checking out.</p>
            <Link href="/shop" className="bg-gradient-to-r from-[#FF0000] to-[#F44336] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#F44336] hover:to-[#FF0000] transition-all duration-300">
              🍕 Browse Menu
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - Fork & Knife Fast Food</title>
        <meta name="description" content="Complete your food order" />
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
              <span className="text-[#FFCC00] font-medium">Checkout</span>
            </nav>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="text-[#FFCC00]">FORK</span> & <span className="text-[#FF0000]">KNIFE</span>
              </h1>
              <p className="text-[#C0C0C0]">Complete your delicious order</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-gradient-to-br from-[#2E2E2E] to-[#333333] rounded-2xl shadow-2xl p-8 border border-gray-600">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">👤</span>
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                          errors.email ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                          errors.phone ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="0304-4481181"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🚚</span>
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                          errors.address ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="123 Food Street"
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                            errors.city ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="Lahore"
                        />
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="area" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                          Area *
                        </label>
                        <input
                          type="text"
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-[#1F1F1F] border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200 ${
                            errors.area ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="Model Town"
                        />
                        {errors.area && <p className="text-red-400 text-xs mt-1">{errors.area}</p>}
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200"
                          placeholder="54000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">📝</span>
                    Additional Information
                  </h3>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-[#C0C0C0] mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00] focus:border-[#FFCC00] transition-all duration-200"
                      placeholder="Any special instructions for your order... (e.g., extra spicy, no onions, etc.)"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
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
                        Processing...
                      </div>
                    ) : (
                      '🚀 Proceed to Payment'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-[#2E2E2E] to-[#333333] rounded-2xl shadow-2xl p-8 border border-gray-600 h-fit">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="text-2xl mr-2">🛒</span>
                Order Summary
              </h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor}-${index}`} className="bg-[#1F1F1F] rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center space-x-4">
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
                        <p className="text-xs text-[#C0C0C0] mb-2">
                          {item.category}
                        </p>
                        
                        {/* Deal Features - Only show for deals */}
                        {item.category === 'Deals' && item.features && (
                          <div className="mt-2 mb-2">
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
                        
                        <p className="text-sm font-semibold text-[#FFCC00]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Subtotal ({itemCount} items)</span>
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

              {/* Payment Method */}
              <div className="mt-6 p-4 bg-gradient-to-r from-[#FF0000] to-[#F44336] rounded-lg">
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm opacity-90">Pay when you receive your order</p>
                  </div>
                </div>
              </div>

              {/* Free Delivery Info */}
              {totalPrice < 1000 && (
                <div className="mt-4 p-3 bg-[#FFCC00] bg-opacity-10 border border-[#FFCC00] rounded-lg">
                  <p className="text-[#FFCC00] text-sm text-center">
                    🚚 Add Rs. {(1000 - totalPrice).toFixed(0)} more for FREE delivery!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
          </>
    );
  } 