import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/Sofasphere_logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Living Room', href: '/category/living-room' },
    { name: 'Bedroom', href: '/category/bedroom' },
    { name: 'Office', href: '/category/office' },
    { name: 'Dining Room', href: '/category/dining-room' },
    { name: 'Outdoor', href: '/category/outdoor' }
  ];

  const quickLinks = [
    { name: 'New Arrivals', href: '/category/new-arrivals' },
    { name: 'Sale Items', href: '/category/on-sale' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const customerService = [
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Payment Options', href: '/payment-options' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'FAQ', href: '/faq' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Latest Collections
            </h3>
            <p className="text-yellow-100 mb-2 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and furniture design tips.
            </p>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto font-semibold">
              ✨ Plus, enjoy our 7-day return and exchange policy on all purchases!
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/">
              <Image className='mb-4' src={logo.src} alt="Sofasphere Logo" width={160} height={160} />
              </Link>
              {/* <div className="text-2xl font-bold tracking-wide mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
                  SOFA
                </span>
                <span className="text-white ml-2 font-light">SPHERE</span>
              </div> */}
              <p className="text-gray-300 leading-relaxed mb-6">
                Premium Furniture & Sofas. Discover elegant designs, superior quality, and modern style that transforms your home with contemporary comfort.
              </p>
              
              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Modern Furniture Designs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Premium Quality Materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">7-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          {/* <div>
            <h4 className="text-lg font-bold text-white mb-6">Shop Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>👗</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}


          

           {/* Contact Details */}
           <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+44 7448 960712</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">info@sofasphere.co.uk</span>
                  
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">sales@sofasphere.co.uk</span>
                  
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">52 Elm Street Rosewood, Hornchurch, UK</span>
                </div>
                <div className="flex items-center space-x-3 mt-4 p-3 bg-gray-800 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-green-400 font-semibold text-sm">7-Day Return & Exchange</span>
                </div>
              </div>
            </div>


             

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


           {/* Social Media */}
           <div>
              <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-yellow-600 p-3 rounded-full transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-yellow-600 p-3 rounded-full transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-6.541c-.368 0-.735-.122-1.054-.368-.319-.245-.49-.612-.49-1.054s.171-.809.49-1.054c.319-.245.686-.368 1.054-.368s.735.122 1.054.368c.319.245.49.612.49 1.054s-.171.809-.49 1.054c-.319.245-.686.368-1.054.368z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/447448960712" 
                  className="bg-gray-800 hover:bg-yellow-600 p-3 rounded-full transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-yellow-600 p-3 rounded-full transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Stay connected for latest updates, styling tips, and exclusive offers!
              </p>
            </div>

         
        </div>

    

      
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2013 - {currentYear} Sofa Sphere. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 