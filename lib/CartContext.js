import { createContext, useContext, useReducer, useEffect } from 'react';

// Configuration Variables
const CART_CONFIG = {
  // Local Storage
  storageKey: 'alhafiz-sweetsandmilk-cart',

  // Default Values
  defaultBrand: 'ALHAFIZ MILK AND SWEETS'
};

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// Helper function to clean corrupted cart data
const cleanCartData = (cartItems) => {
  if (!Array.isArray(cartItems)) return [];

  return cartItems.map(item => ({
    ...item,
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || 0,
    originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined
  })).filter(item => item.id && item.name); // Remove items without essential data
};

// Helper function to build configuration payload with only valid fields
const buildConfiguration = (product, userSelections = {}) => {
  const config = {};
  // Only add size if product has sizes and user selected one
  if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && userSelections.size) {
    config.size = userSelections.size;
  }

  // Only add color if product has colors and user selected one
  if (product.colors && Array.isArray(product.colors) && product.colors.length > 0 && userSelections.color) {
    config.color = userSelections.color;
  }

  // Sweet products typically have simple configurations like size and variety
  // Keep the configuration simple for traditional sweets

  return config;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => {
        // Check if items have the same ID and configuration
        const sameId = item.id === action.payload.id;
        const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});

        return sameId && sameConfig;
      });

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => {
            const sameId = item.id === action.payload.id;
            const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});

            return sameId && sameConfig
              ? { ...item, quantity: Number(item.quantity) + Number(action.payload.quantity) }
              : item;
          })
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: Number(action.payload.quantity) || 1 }]
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => {
          const sameId = item.id === action.payload.id;
          const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});

          return !(sameId && sameConfig);
        })
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (Number(action.payload.quantity) <= 0) {
        return {
          ...state,
          items: state.items.filter(item => {
            const sameId = item.id === action.payload.id;
            const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});

            return !(sameId && sameConfig);
          })
        };
      }

      return {
        ...state,
        items: state.items.map(item => {
          const sameId = item.id === action.payload.id;
          const sameConfig = JSON.stringify(item.selectedConfiguration || {}) === JSON.stringify(action.payload.selectedConfiguration || {});

          return sameId && sameConfig
            ? { ...item, quantity: Number(action.payload.quantity) }
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
      const savedCart = localStorage.getItem(CART_CONFIG.storageKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const cleanedCart = cleanCartData(parsedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cleanedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_CONFIG.storageKey, JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  // Cart actions
  const addItem = (product, quantity = 1, userSelections = {}) => {
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
        quantity: Number(quantity),
        selectedConfiguration: Object.keys(selectedConfiguration).length > 0 ? selectedConfiguration : null,
      }
    });
  };

  const removeItem = (id, selectedConfiguration = null) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id, selectedConfiguration }
    });
  };

  const updateQuantity = (id, quantity, selectedConfiguration = null) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity, selectedConfiguration }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Computed values
  const itemCount = state.items.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  const totalPrice = state.items.reduce((total, item) => total + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);
  const originalTotalPrice = state.items.reduce((total, item) =>
    total + (((Number(item.originalPrice) || Number(item.price)) || 0) * (Number(item.quantity) || 0)), 0
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