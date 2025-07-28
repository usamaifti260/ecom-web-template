import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

import alhafizLogo from '@/public/assets/Alhafiz_logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSweetsSubmenuOpen, setIsSweetsSubmenuOpen] = useState(false);
  const [isMobileSweetsOpen, setIsMobileSweetsOpen] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const toggleBottomNavVisibility = () => {
      // Show bottom nav when user scrolls down 10% of the page
      const scrolled = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrolled / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage > 4) {
        setShowBottomNav(true);
      } else {
        setShowBottomNav(false);
      }
    };

    window.addEventListener('scroll', toggleBottomNavVisibility);

    return () => {
      window.removeEventListener('scroll', toggleBottomNavVisibility);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMobileSweetsOpen(false); // Close submenu when main menu closes
  };

  const toggleMobileSweetsSubmenu = () => {
    setIsMobileSweetsOpen(!isMobileSweetsOpen);
  };

  const sweetsCategories = [
    {
      name: 'Khoya Barfi',
      href: '/category/khoya-barfi',
      image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&auto=format&fit=crop&q=60',
      subcategories: ['Plain Barfi', 'Silver Barfi', 'Kaju Barfi']
    },
    {
      name: 'Sohan Halwa',
      href: '/category/sohan-halwa',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=500&auto=format&fit=crop&q=60',
      subcategories: ['Sada', 'Badami', 'Akhroti', 'Mix Dry Fruit']
    },
    {
      name: 'Desi Ghee',
      href: '/category/desi-ghee',
      image: 'https://images.unsplash.com/photo-1628288309058-4bc21cf48090?w=500&auto=format&fit=crop&q=60',
      subcategories: ['Pure Cow Ghee', 'Buffalo Ghee', 'Mixed Ghee']
    },
    {
      name: 'Milk Products',
      href: '/category/milk-products',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60',
      subcategories: ['Fresh Milk', 'Cream', 'Yogurt']
    },
    {
      name: 'Traditional Sweets',
      href: '/category/traditional-sweets',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60',
      subcategories: ['Gulab Jamun', 'Rasgulla', 'Jalebi']
    }
  ];

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'KHOYA BARFI', href: '/category/khoya-barfi' },
    { name: 'SOHAN HALWA', href: '/category/sohan-halwa' },
    { name: 'ALL SWEETS', href: '/category/all-sweets', hasSubmenu: true },
    { name: 'DESI GHEE', href: '/category/desi-ghee' },
    { name: 'CONTACT', href: '/contact' }
  ];

  return (
    <>
      {/* Header Bar with Contact Info */}
      <div className="bg-yellow-400 text-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Mobile - Show only location */}
            <div className="flex items-center space-x-2 md:hidden">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Sialkot, Pakistan</span>
            </div>

            {/* Desktop - Show all contact info */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>03487765824</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@alhafizsweetsandmilk.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Sialkot, Pakistan</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-700">Follow Us:</span>
              <div className="flex items-center space-x-3">
                <a href="https://www.facebook.com/Alhafizmilkandsweets" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-red-800 shadow-lg sticky top-0 z-50 border-b border-red-900">
        {/* Single Row Navigation */}
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Mobile Menu Button - Left side */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-yellow-200 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo - Left */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center justify-center text-center">
                {/* Logo icon - hidden on mobile */}
                <Image src={alhafizLogo} alt="AlHafiz Logo" className='mr-2 hidden sm:block' width={72} height={72} />
                {/* Logo text - smaller on mobile */}
                <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide">
                  <span className="text-white">
                    ALHAFIZ
                  </span>
                  <span className="text-yellow-200 ml-1 sm:ml-2 font-light">MILK & SWEETS</span>
                </div>
              </div>
            </Link>

            {/* Navigation Links - Center (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, 4).map((link) => (
                <div key={link.name} className="relative">
                  {link.hasSubmenu ? (
                    <button
                      onMouseEnter={() => setIsSweetsSubmenuOpen(true)}
                      onMouseLeave={() => setIsSweetsSubmenuOpen(false)}
                      className="text-white hover:text-yellow-200 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-red-900 flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white hover:text-yellow-200 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-red-900"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center space-x-3">
              {/* Wishlist Button - Hidden on extra small mobile devices */}
              <Link
                href="/wishlist"
                className="relative text-white hover:text-yellow-200 transition-colors duration-300 p-2 hidden sm:block"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative bg-yellow-400 hover:bg-yellow-300 text-red-800 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                <span className="hidden sm:inline font-medium text-sm">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-800 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Full Width Submenu for ALL SWEETS */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 transition-all duration-300 ease-in-out ${isSweetsSubmenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          onMouseEnter={() => setIsSweetsSubmenuOpen(true)}
          onMouseLeave={() => setIsSweetsSubmenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sweetsCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group block bg-red-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-w-3 aspect-h-2 relative h-32">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-medium text-red-800 group-hover:text-red-900 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 lg:hidden ${isMenuOpen ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
          }`} onClick={toggleMenu}>
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="text-xl font-bold">
                <span className="text-red-800">
                  ALHAFIZ
                </span>
                <span className="text-gray-600 ml-2">MILK & SWEETS</span>
              </div>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-red-800 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="py-6 px-6 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasSubmenu ? (
                    <div>
                      <button
                        onClick={toggleMobileSweetsSubmenu}
                        className="w-full flex justify-between items-center px-4 py-3 text-red-800 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <span>{link.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isMobileSweetsOpen ? 'rotate-180' : ''
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Submenu for ALL SWEETS */}
                      <div className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${isMobileSweetsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        {sweetsCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileSweetsOpen(false);
                            }}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-red-800 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/wishlist"
                className="block px-4 py-3 text-red-800 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-yellow-400 text-red-800 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 transform ${showBottomNav ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
        <div className="grid grid-cols-4 h-16">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${router.pathname === '/'
              ? 'text-red-800 bg-red-50'
              : 'text-gray-500 hover:text-red-800 hover:bg-red-50'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </Link>

          {/* Shop */}
          <Link
            href="/shop"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${router.pathname === '/shop'
              ? 'text-red-800 bg-red-50'
              : 'text-gray-500 hover:text-red-800 hover:bg-red-50'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs font-medium">Shop</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`relative flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${router.pathname === '/wishlist'
              ? 'text-red-800 bg-red-50'
              : 'text-gray-500 hover:text-red-800 hover:bg-red-50'
              }`}
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Wishlist</span>
          </Link>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-red-800 hover:bg-red-50 transition-colors duration-200"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Cart</span>
          </button>
        </div>
      </div>

    </>
  );
};

export default Navbar; 