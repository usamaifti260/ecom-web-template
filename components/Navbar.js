import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

import navlogo from '@/public/assets/sofasphere_dark_logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSofasSubmenuOpen, setIsSofasSubmenuOpen] = useState(false);
  const [isMobileSofasOpen, setIsMobileSofasOpen] = useState(false);
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
    setIsMobileSofasOpen(false); // Close submenu when main menu closes
  };

  const toggleMobileSofasSubmenu = () => {
    setIsMobileSofasOpen(!isMobileSofasOpen);
  };

  const sofaCategories = [
    { 
      name: '2 SEATER SOFAS', 
      href: '/category/sofas',
      image: 'https://ukfurnish.com/cdn/shop/files/ByronjumboWithBG.png?v=1734012725&width=823'
    },
    { 
      name: '3+2 SOFAS', 
      href: '/category/sofas',
      image: 'https://ukfurnish.com/cdn/shop/files/ashwen.jpg?v=1734101500&width=823'
    },
    { 
      name: 'U-SHAPE SOFAS', 
      href: '/category/sofas',
      image: 'https://ukfurnish.com/cdn/shop/files/Silver.jpg?v=1733923420&width=823'
    },
    { 
      name: '3 SEATER SOFAS', 
      href: '/category/sofas',
      image: 'https://ukfurnish.com/cdn/shop/files/ByronJumbowithBG_aa6cd838-8011-4932-bcfb-f06eefbb3595.png?v=1734012760&width=823'
    },
    { 
      name: 'CORNER SOFAS', 
      href: '/category/sofas',
      image: 'https://ukfurnish.com/cdn/shop/files/AlaskasofawithBG.jpg?v=1734012460&width=823'
    }
  ];

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'BEDS', href: '/category/beds' },
    { name: 'SOFAS', href: '/category/sofas', hasSubmenu: true },
    { name: 'WARDROBE', href: '/category/wardrobe' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT', href: '/contact' }
  ];



  return (
    <>
      {/* Header Bar with Contact Info */}
      <div className="bg-[#222222] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+44 7448 960712</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@sofasphere.co.uk</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-300">Follow Us:</span>
              <div className="flex items-center space-x-3">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        {/* Single Row Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Mobile Menu Button - Left side */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-[#222222] hover:text-gray-600 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo - Left */}

            <Link href="/" className="flex items-center">
              {/* <Image src={logo.src} alt="Sofasphere Logo" width={60} height={60} /> */}
             <div className="flex items-center justify-center text-center">
              <div className="mr-2">
                <Image src={navlogo} alt="Sofasphere Logo" width={50} height={50} />
              </div>
              <div className="text-xl sm:text-2xl lg:text-2xl font-bold tracking-wide">
                <span className="text-[#222222]">
                  SOFA
                </span>
                <span className="text-gray-600 ml-1 sm:ml-2 font-light">SPHERE</span>
              </div>
              </div>
            </Link>

            {/* Navigation Links - Center (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.hasSubmenu ? (
                    <button
                      onMouseEnter={() => setIsSofasSubmenuOpen(true)}
                      onMouseLeave={() => setIsSofasSubmenuOpen(false)}
                      className="text-[#222222] hover:text-gray-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-50 flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#222222] hover:text-gray-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-50"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center space-x-3">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative text-[#222222] hover:text-gray-600 transition-colors duration-300 p-2"
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
                className="relative bg-[#222222] hover:bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                <span className="hidden sm:inline font-medium text-sm">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Full Width Submenu for SOFAS */}
        <div 
          className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isSofasSubmenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onMouseEnter={() => setIsSofasSubmenuOpen(true)}
          onMouseLeave={() => setIsSofasSubmenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sofaCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-w-3 aspect-h-2 relative h-32">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-medium text-[#222222] group-hover:text-gray-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 lg:hidden ${
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
                <span className="text-[#222222]">
                  SOFA
                </span>
                <span className="text-gray-600 ml-2">SPHERE</span>
              </div>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-[#222222] transition-colors duration-200"
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
                        onClick={toggleMobileSofasSubmenu}
                        className="w-full flex justify-between items-center px-4 py-3 text-[#222222] hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <span>{link.name}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMobileSofasOpen ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mobile Submenu for SOFAS */}
                      <div className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                        isMobileSofasOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        {sofaCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#222222] hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileSofasOpen(false);
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
                      className="block px-4 py-3 text-[#222222] hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <Link 
                href="/wishlist" 
                className="block px-4 py-3 text-[#222222] hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 transform ${
        showBottomNav ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="grid grid-cols-4 h-16">
          {/* Home */}
          <Link 
            href="/"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
              router.pathname === '/' 
                ? 'text-[#222222] bg-gray-50' 
                : 'text-gray-500 hover:text-[#222222] hover:bg-gray-50'
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
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
              router.pathname === '/shop' 
                ? 'text-[#222222] bg-gray-50' 
                : 'text-gray-500 hover:text-[#222222] hover:bg-gray-50'
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
            className={`relative flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
              router.pathname === '/wishlist' 
                ? 'text-[#222222] bg-gray-50' 
                : 'text-gray-500 hover:text-[#222222] hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Wishlist</span>
          </Link>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-[#222222] hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
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