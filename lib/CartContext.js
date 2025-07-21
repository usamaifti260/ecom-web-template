import { createContext, useContext, useReducer, useEffect } from 'react';

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// Helper function to build configuration payload with only valid fields
const buildConfiguration = (product, userSelections = {}) => {
  const config = {};

  console.log('buildConfiguration PRODUCT + USER SELECTIONS', product, userSelections);
  
  // Only add size if product has sizes and user selected one
  if (product.size && Array.isArray(product.size) && product.size.length > 0 && userSelections.size) {
    config.size = userSelections.size;
  }
  
  // Only add color if product has colors and user selected one
  if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && userSelections.color) {
    config.color = userSelections.color;
  }
  
  // Only add dimensions if product has dimensions and user selected one
  if (product.dimensions && Array.isArray(product.dimensions) && product.dimensions.length > 0 && userSelections.dimension) {
    config.dimension = userSelections.dimension;
  }
  
  // Only add orientation if product has orientations and user selected one
  if (product.Orientation && Array.isArray(product.Orientation) && product.Orientation.length > 0 && userSelections.orientation) {
    config.orientation = userSelections.orientation;
  }
  
  // Only add storage if product has storage options and user selected one
  if (product.storage && Array.isArray(product.storage) && product.storage.length > 0 && userSelections.storage) {
    config.storage = userSelections.storage;
  }
  
  // Only add footstool if product supports it and user selected it
  if (product.withFootstool === true) {
    config.includeFootstool = userSelections.includeFootstool;
  }
  
  // Only add sofa bed if product supports it and user selected it
  if (product.sofabedmechanism === true) {
    config.includeSofaBed = userSelections.includeSofaBed;
  }
  
  return config;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      console.log('cartReducer ADD_ITEM', action.payload);
      const existingItem = state.items.find(item => {
        // Check if items have the same ID, selectedSize, and configuration
        const sameId = item.id === action.payload.id;
        const sameSize = item.selectedSize === action.payload.selectedSize;
        const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});
        
        return sameId && sameSize && sameConfig;
      });

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => {
            const sameId = item.id === action.payload.id;
            const sameSize = item.selectedSize === action.payload.selectedSize;
            const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});
            
            return sameId && sameSize && sameConfig
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item;
          })
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => {
          const sameId = item.id === action.payload.id;
          const sameSize = item.selectedSize === action.payload.selectedSize;
          const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});
          
          return !(sameId && sameSize && sameConfig);
        })
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => {
            const sameId = item.id === action.payload.id;
            const sameSize = item.selectedSize === action.payload.selectedSize;
            const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});
            
            return !(sameId && sameSize && sameConfig);
          })
        };
      }

      return {
        ...state,
        items: state.items.map(item => {
          const sameId = item.id === action.payload.id;
          const sameSize = item.selectedSize === action.payload.selectedSize;
          const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});
          
          return sameId && sameSize && sameConfig
            ? { ...item, quantity: action.payload.quantity }
            : item;
        })
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload
      };
    }

    case CART_ACTIONS.TOGGLE_CART: {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  isOpen: false
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('visioncraft-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('visioncraft-cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  // Cart actions
  const addItem = (product, selectedSize = null, quantity = 1, userSelections = {}) => {
    // Build configuration based on product capabilities and user selections
    const selectedConfiguration = buildConfiguration(product, userSelections);
    
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.displayName || product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        brand: product.brand,
        category: product.category,
        selectedSize: selectedSize || product.selectedSize || null,
        availableSizes: product.sizes || [],
        features: product.features || null, // Add features for deal items
        selectedConfiguration: Object.keys(selectedConfiguration).length > 0 ? selectedConfiguration : null,
        quantity
      }
    });
  };

  const removeItem = (id, selectedSize = null, selectedConfiguration = null) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id, selectedSize, selectedConfiguration }
    });
  };

  const updateQuantity = (id, selectedSize = null, quantity, selectedConfiguration = null) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, selectedSize, quantity, selectedConfiguration }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Computed values
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const originalTotalPrice = state.items.reduce((total, item) => 
    total + ((item.originalPrice || item.price) * item.quantity), 0
  );
  const totalSavings = originalTotalPrice - totalPrice;

  const value = {
    // State
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    totalPrice,
    originalTotalPrice,
    totalSavings,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 