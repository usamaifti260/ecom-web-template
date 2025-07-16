'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClientProducts } from '@/lib/fetchProducts';
import { useCart } from '@/lib/CartContext';
import { useNotification } from '@/lib/NotificationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SizeSelectionPopup from '@/components/SizeSelectionPopup';

export default function CategoryPage({ products, category, allCategories }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showCartNotification } = useNotification();
  
  const [addingToCart, setAddingToCart] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sizePopup, setSizePopup] = useState({ isOpen: false, product: null });

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  // Handle category not found
  if (!category || !products) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <Link 
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Handle add to cart - show size selection popup
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

  // Handle sorting
  useEffect(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting: new items first, then by rating
        sorted.sort((a, b) => {
          if (a.isNew !== b.isNew) return b.isNew - a.isNew;
          return b.rating - a.rating;
        });
    }
    
    setFilteredProducts(sorted);
  }, [sortBy, products]);

  // Get category display name
  const getCategoryDisplayName = (slug) => {
    const categoryMap = {
      'living-room': 'Living Room',
      'bedroom': 'Bedroom',
      'office': 'Office',
      'dining-room': 'Dining Room',
      'outdoor': 'Outdoor',
      'new-arrivals': 'New Arrivals',
      'on-sale': 'On Sale'
    };
    return categoryMap[slug] || slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const categoryDisplayName = getCategoryDisplayName(category);

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden cursor-pointer">
          {product.onSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              NEW
            </div>
          )}
          <div className="relative w-full h-full bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              View Details
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        
        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h4 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] text-gray-800 leading-tight tracking-wide hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
            {product.name}
          </h4>
        </Link>

        {/* Price */}
        <div className="mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.onSale && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(product)}
          className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center ${
            addingToCart[product.id]
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:scale-105'
          }`}
          disabled={addingToCart[product.id]}
        >
          {addingToCart[product.id] ? (
            <>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden sm:inline">Added to Cart!</span>
              <span className="sm:hidden">Added!</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{categoryDisplayName} - Comfort Sofa</title>
        <meta name="description" content={`Browse our ${categoryDisplayName.toLowerCase()} furniture collection. Premium furniture and sofas with elegant designs and superior quality.`} />
        <meta name="keywords" content={`${categoryDisplayName}, furniture, sofas, comfort sofa, home furniture, premium furniture`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-yellow-600">Shop</Link>
            <span>/</span>
            <span className="text-gray-900">{categoryDisplayName}</span>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {categoryDisplayName}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {products.length} {products.length === 1 ? 'item' : 'items'} in this collection
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Link 
                href="/shop"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 text-sm font-medium"
              >
                All Products
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                    cat.slug === category
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            
            <div className="flex items-center space-x-4">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="default">Default</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🛋️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
              <p className="text-gray-600 text-lg mb-8">
                We couldn't find any furniture in this category.
              </p>
              <Link 
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>

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

export async function getStaticPaths() {
  try {
    const products = await fetchClientProducts('comfortsofaproductsschema');
    
    // Get unique categories
    const categories = [...new Set(products.map(product => product.category))];
    
    // Create category slugs
    const categoryPaths = categories.map(category => {
      let slug = category.toLowerCase().replace(/\s+/g, '-');
      
      return {
        params: { slug }
      };
    });

    // Add special category paths
    const specialPaths = [
      { params: { slug: 'new-arrivals' } },
      { params: { slug: 'on-sale' } }
    ];

    return {
      paths: [...categoryPaths, ...specialPaths],
      fallback: false
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: false
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const allProducts = await fetchClientProducts('comfortsofaproductsschema');
    const { slug } = params;
    
    let products = [];
    let category = slug;

    // Filter products based on category slug
    if (slug === 'new-arrivals') {
      products = allProducts.filter(product => product.isNew);
    } else if (slug === 'on-sale') {
      products = allProducts.filter(product => product.onSale);
    } else {
      // Map slug to category name
      const categoryMap = {
        'living-room': 'Living Room',
        'bedroom': 'Bedroom',
        'office': 'Office',
        'dining-room': 'Dining Room',
        'outdoor': 'Outdoor'
      };
      
      const categoryName = categoryMap[slug];
      if (categoryName) {
        products = allProducts.filter(product => product.category === categoryName);
      }
    }

    // Get all categories for navigation
    const allCategories = [...new Set(allProducts.map(product => product.category))].map(cat => {
      let slug = cat.toLowerCase().replace(/\s+/g, '-');
      
      return {
        name: cat,
        slug: slug
      };
    });

    if (products.length === 0 && !['new-arrivals', 'on-sale'].includes(slug)) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        products,
        category,
        allCategories
      }
    };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return {
      notFound: true
    };
  }
} 