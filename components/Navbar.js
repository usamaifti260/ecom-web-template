import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import Image from 'next/image';

import logo from '@/public/assets/Sofasphere_logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: 'Living Room', href: '/category/living-room' },
    { name: 'Bedroom', href: '/category/bedroom' },
    { name: 'Office', href: '/category/office' },
    { name: 'Dining Room', href: '/category/dining-room' },
    { name: 'Outdoor', href: '/category/outdoor' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      {/* Top Row - Brand and Cart */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Mobile Menu Button - Left side */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-amber-600 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Name - Center */}
            <Link href="/" className="flex items-center justify-center flex-1 md:flex-none">
           {/* Add logo here */}
           {/* <Image src={logo.src} alt="Sofasphere Logo" width={80} height={80} /> */}
           
              <div className="text-lg sm:text-xl md:text-3xl font-bold tracking-wide">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400">
                  SOFA
                </span>
                <span className="text-gray-800 ml-1 sm:ml-2 font-light">SPHERE</span>
              </div>
            </Link>

            {/* Action Buttons - Right side */}
            <div className="flex items-center space-x-2">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative text-gray-700 hover:text-amber-600 transition-colors duration-300 p-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-1 sm:space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                <span className="hidden sm:inline font-medium text-sm sm:text-base">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Categories (Desktop) */}
      <div className="hidden md:block bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 py-3 overflow-x-scroll lg:overflow-x-hidden">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-white"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-white whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
            <Link 
              href="/wishlist" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-white flex items-center space-x-1"
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-white"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 md:hidden ${
        isMenuOpen ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
      }`} onClick={toggleMenu}>
        <div 
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="text-xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                COMFORT
              </span>
              <span className="text-gray-800 ml-2">SOFA</span>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="py-6 px-6 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Categories Section */}
            <div className="py-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4 mb-2">
                Categories
              </h3>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link 
              href="/wishlist" 
              className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 