'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClientProducts, fetchClientCategories } from '@/lib/fetchProducts';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import { useNotification } from '@/lib/NotificationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SizeSelectionPopup from '@/components/SizeSelectionPopup';

export default function CategoryPage({ products, category, allCategories }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showCartNotification } = useNotification();
  
  const [addingToCart, setAddingToCart] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sizePopup, setSizePopup] = useState({ isOpen: false, product: null });
  const [selectedColors, setSelectedColors] = useState({});
  const [visibleProducts, setVisibleProducts] = useState(9); // Show 9 products initially
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  // Get unique brands and price range from products
  const brands = [...new Set(products.map(product => product.brand))];
  const minPrice = Math.min(...products.map(product => product.price));
  const maxPrice = Math.max(...products.map(product => product.price));

  // Format price for Pakistani Rupees
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Handle color selection
  const handleColorSelect = (productId, colorIndex) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: colorIndex
    }));
  };

  // Get current image for a product
  const getCurrentImage = (product) => {
    const productId = product.id;
    const selectedColorIndex = selectedColors[productId];
    
    // If a color is selected, show the corresponding gallery image
    if (selectedColorIndex !== undefined && product.gallery && product.gallery[selectedColorIndex]) {
      return product.gallery[selectedColorIndex];
    }
    
    // Default to main product image
    return product.image;
  };

  // Handle add to cart - always show size selection popup for configuration
  const handleAddToCart = async (product) => {
    // Always show the configuration popup to allow users to customize their product
    setSizePopup({ isOpen: true, product });
  };

  // Close size popup
  const closeSizePopup = () => {
    setSizePopup({ isOpen: false, product: null });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showCartNotification(product, null, 1, 'removed from wishlist');
    } else {
      addToWishlist(product);
      showCartNotification(product, null, 1, 'added to wishlist');
    }
  };

  // Handle filtering and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Apply stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sale filter
    if (onSaleOnly) {
      filtered = filtered.filter(product => product.onSale);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting: new items first, then by rating
        filtered.sort((a, b) => {
          if (a.isNew !== b.isNew) return b.isNew - a.isNew;
          return b.rating - a.rating;
        });
    }
    
    setFilteredProducts(filtered);
  }, [sortBy, products, priceRange, selectedBrands, inStockOnly, onSaleOnly]);

  // Handle brand filter toggle
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Load more products
  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 9);
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('default');
  };

  // Get category display name
  const getCategoryDisplayName = (slug) => {
    // Handle special categories
    if (slug === 'new-arrivals') return 'New Arrivals';
    if (slug === 'on-sale') return 'On Sale';
    
    // For regular categories, find the proper name from allCategories
    const foundCategory = allCategories.find(cat => cat.slug === slug);
    if (foundCategory) {
      return foundCategory.name;
    }
    
    // Fallback: convert slug to title case
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const categoryDisplayName = getCategoryDisplayName(category);

  // Product Card Component (matching Products.js styling)
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[5/5] overflow-hidden cursor-pointer lg:h-[480px] w-full">
          {/* Sale Badge */}
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold z-20 rounded">
              SALE
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistToggle(product);
            }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full transition-all duration-300 z-20 flex items-center justify-center ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick View Button - Desktop Only */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-12 w-8 h-8 bg-white text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 z-20 flex items-center justify-center opacity-0 lg:group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          <div className="relative w-full h-full bg-white group">
            {/* Default image */}
            <Image
              src={getCurrentImage(product)}
              alt={product.name}
              fill
              className={`object-contain object-top transition-opacity duration-300 ${
                selectedColors[product.id] !== undefined 
                  ? 'opacity-100' // Always visible when color is selected
                  : 'opacity-100 group-hover:opacity-0' // Fade on hover when no color selected
              }`}
            />

            {/* Hover image - show hoverimage if available and no color selected */}
            {product.hoverimage && selectedColors[product.id] === undefined && (
              <Image
                src={product.hoverimage}
                alt={product.name}
                fill
                className="object-contain object-top transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
        </div>
      </Link>

      {/* Product Info - Slides up on hover (Desktop) */}
      <div className="relative">
        {/* Desktop: Sliding Content */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-white transition-all duration-300 lg:translate-y-0 lg:group-hover:-translate-y-16 z-10">
          <div className="p-4 text-center">
            {/* Brand Name */}
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">{product.brand}</p>
            
            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <h4 className="font-normal text-xl mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer">
                {product.name}
              </h4>
            </Link>

            {/* Price */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-xl font-normal text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.onSale && (
                <span className="text-sm text-gray-500 line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center justify-center space-x-1">
                {product.colors.map((color, index) => {
                  const getColorClass = (colorName) => {
                    const colorMap = {
                      'Gray': 'bg-gray-400',
                      'Mink': 'bg-amber-200',
                      'Black': 'bg-black',
                      'White': 'bg-white border-2 border-gray-300',
                      'Brown': 'bg-amber-800',
                      'Blue': 'bg-blue-500',
                      'Navy': 'bg-blue-900',
                      'Red': 'bg-red-500',
                      'Green': 'bg-green-500',
                      'Beige': 'bg-amber-100',
                      'Cream': 'bg-yellow-50',
                      'Sky': 'bg-sky-300',
                      'Turquoise': 'bg-teal-400',
                      'Steel': 'bg-slate-500',
                      "Camel": "bg-amber-500",
                      "Silver": "bg-gray-500",
                      "Dark Blue": "bg-blue-900",
                      "Coal": "bg-gray-800",
                      "Gold": "bg-yellow-500",
                      "Pearl": "bg-gray-200",
                      "Midnight": "bg-gray-900",
                      "Mustard": "bg-amber-500",
                      "Teal": "bg-teal-400",
                      "Green": "bg-green-500",
                      "Red": "bg-red-500"

                    };
                    return colorMap[colorName] || 'bg-gray-400';
                  };

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleColorSelect(product.id, index);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${
                        selectedColors[product.id] === index 
                          ? 'ring-2 ring-gray-600 ring-offset-1' 
                          : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                      }`}
                      title={color}
                      type="button"
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Shows on hover (Desktop only) */}
        <div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-white lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:transform lg:translate-y-16 lg:group-hover:translate-y-0 p-4 lg:z-20">
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-3 px-4 rounded font-bold text-sm transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
                : 'bg-[#222222] hover:bg-black text-white'
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>

        {/* Mobile/Tablet: Static Content (Always Visible) */}
        <div className="lg:hidden py-4 px-2 text-center">
          {/* Brand Name */}
          <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-medium">UK FURNISH</p>
          
          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h4 className="font-normal text-base mb-2 text-gray-800 hover:text-amber-600 leading-tight transition-colors duration-200 cursor-pointer">
              {product.name}
            </h4>
          </Link>

          {/* Price */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-lg font-normal text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.onSale && (
              <span className="text-sm text-gray-500 line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Options - Mobile */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-center space-x-1 mb-3">
              {product.colors.map((color, index) => {
                const getColorClass = (colorName) => {
                  const colorMap = {
                    'Gray': 'bg-gray-400',
                    'Mink': 'bg-amber-200',
                    'Black': 'bg-black',
                    'White': 'bg-white border-2 border-gray-300',
                    'Brown': 'bg-amber-800',
                    'Blue': 'bg-blue-500',
                    'Navy': 'bg-blue-900',
                    'Red': 'bg-red-500',
                    'Green': 'bg-green-500',
                    'Beige': 'bg-amber-100',
                    'Cream': 'bg-yellow-50',
                    'Sky': 'bg-sky-300',
                    'Turquoise': 'bg-teal-400',
                    'Steel': 'bg-slate-500',
                    "Camel": "bg-amber-500",
                    "Silver": "bg-gray-500",
                    "Dark Blue": "bg-blue-900",
                    "Coal": "bg-gray-800",
                    "Gold": "bg-yellow-500",
                    "Pearl": "bg-gray-200",
                    "Midnight": "bg-gray-900",
                    "Mustard": "bg-amber-500",
                    "Teal": "bg-teal-400",
                    "Green": "bg-green-500",
                    "Red": "bg-red-500"
                  };
                  return colorMap[colorName] || 'bg-gray-400';
                };

                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleColorSelect(product.id, index);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`w-5 h-5 rounded-full border transition-all duration-200 ${getColorClass(color)} ${
                      selectedColors[product.id] === index 
                        ? 'ring-2 ring-gray-600 ring-offset-1' 
                        : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
                    }`}
                    title={color}
                    type="button"
                  />
                );
              })}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-2 px-3 rounded font-bold text-xs transition-all duration-200 flex items-center justify-center ${
              addingToCart[product.id]
                ? 'bg-green-500 text-white'
                : 'bg-[#222222] hover:bg-black text-white'
            }`}
            disabled={addingToCart[product.id]}
          >
            {addingToCart[product.id] ? (
              <>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const productsToShow = filteredProducts.slice(0, visibleProducts);

  return (
    <>
      <Head>
        <title>{categoryDisplayName} - Sofa Sphere</title>
        <meta name="description" content={`Browse our ${categoryDisplayName.toLowerCase()} furniture collection. Premium furniture and sofas with elegant designs and superior quality.`} />
        <meta name="keywords" content={`${categoryDisplayName}, furniture, sofas, comfort sofa, home furniture, premium furniture`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/sofasphere_dark_logo.png" type="image/png" sizes="32x32" />
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
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} in this collection
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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-80 xl:w-96">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-300 hover:border-yellow-500 transition-all duration-200"
                >
                  <span className="font-medium">Filters</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Filter Panel */}
              <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Price Range</h4>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formatPrice(minPrice)}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                        <span>{formatPrice(maxPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Brands */}
                  {brands.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Brands</h4>
                      <div className="space-y-3">
                        {brands.map((brand) => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => handleBrandToggle(brand)}
                              className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                            />
                            <span className="ml-3 text-sm text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Categories</h4>
                    <div className="space-y-2">
                      {allCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                            cat.slug === category
                              ? 'bg-yellow-100 text-yellow-800 font-medium'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Availability</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                          className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">In Stock Only</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={onSaleOnly}
                          onChange={(e) => setOnSaleOnly(e.target.checked)}
                          className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">On Sale Only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Options */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <p className="text-gray-600">
                  Showing {Math.min(visibleProducts, filteredProducts.length)} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
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
              {productsToShow.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-6 md:gap-6 mb-12">
                    {productsToShow.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {visibleProducts < filteredProducts.length && (
                    <div className="text-center">
                      <button
                        onClick={handleLoadMore}
                        className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Load More Products
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🛋️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Try adjusting your filters or browse our other categories.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
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
    // Fetch both products and categories to get all possible paths
    const [products, categories] = await Promise.all([
      fetchClientProducts('comfortsofaproductsschema'),
      fetchClientCategories('comfortsofacategoriesschema')
    ]);
    
    // Get categories from both sources to ensure we don't miss any
    const productCategories = [...new Set(products.map(product => product.category))];
    const dashboardCategories = categories.map(cat => cat.categoryname);
    
    // Combine and deduplicate categories
    const allCategories = [...new Set([...productCategories, ...dashboardCategories])];
    
    // Create category slugs
    const categoryPaths = allCategories.map(category => {
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
      fallback: false // Enable fallback for new categories added after build
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [
        { params: { slug: 'new-arrivals' } },
        { params: { slug: 'on-sale' } }
      ],
      fallback: false // Still enable fallback even if fetching fails
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    // Fetch both products and categories
    const [allProducts, allCategories] = await Promise.all([
      fetchClientProducts('comfortsofaproductsschema'),
      fetchClientCategories('comfortsofacategoriesschema')
    ]);
    
    const { slug } = params;
    
    let products = [];
    let category = slug;

    // Filter products based on category slug
    if (slug === 'new-arrivals') {
      products = allProducts.filter(product => product.isNew);
    } else if (slug === 'on-sale') {
      products = allProducts.filter(product => product.onSale);
    } else {
      // Dynamic category matching: convert slug back to category name
      const slugToCategoryName = (slug) => {
        // First, try to find exact match from dashboard categories
        const dashboardCategory = allCategories.find(cat => 
          cat.categoryname.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (dashboardCategory) {
          return dashboardCategory.categoryname;
        }
        
        // Fallback: convert slug to title case for backward compatibility
        return slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      };
      
      const categoryName = slugToCategoryName(slug);
      products = allProducts.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    // Get all categories for navigation (from both products and dashboard)
    const productCategories = [...new Set(allProducts.map(product => product.category))];
    const dashboardCategoryNames = allCategories.map(cat => cat.categoryname);
    const combinedCategories = [...new Set([...productCategories, ...dashboardCategoryNames])];
    
    const categoriesForNavigation = combinedCategories.map(cat => {
      let slug = cat.toLowerCase().replace(/\s+/g, '-');
      return {
        name: cat,
        slug: slug
      };
    });

    return {
      props: {
        products,
        category,
        allCategories: categoriesForNavigation
      }
    };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return {
      notFound: true
    };
  }
} 