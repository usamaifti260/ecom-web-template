import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('comfortSofaWishlist');
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('comfortSofaWishlist', JSON.stringify(wishlistItems));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [wishlistItems, isLoaded]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);

    if (!isAlreadyInWishlist) {
      setWishlistItems(prev => [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        hoverimage: product.hoverimage,
        gallery: product.gallery,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        onSale: product.onSale,
        isNew: product.isNew,
        inStock: product.inStock,
        stockLeft: product.stockLeft,
        bestseller: product.bestseller,
        salepercentage: product.salepercentage,
        sizes: product.sizes,
        colors: product.colors,
        rating: product.rating,
        reviews: product.reviews,
        additionalFeatures: product.additionalFeatures,
        features: product.features,
        description: product.description,
        dateAdded: new Date().toISOString()
      }]);
      return true; // Item was added
    }
    return false; // Item was already in wishlist
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Get wishlist count
  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
    isLoaded
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext; 