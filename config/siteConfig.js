/**
 * Site Configuration
 * Centralized configuration for the entire application
 * Update values here to reflect changes across all pages
 */

const SITE_CONFIG = {
    // Environment Variables
    siteId: 'zoha-attire',
    nodeEnv: 'production',
    storageKey: 'zohas-attire-cart',

    // API Configuration
    api: {
        dashboardApiUrl: 'https://web-portal-backend-production.up.railway.app/api/data/website/688e11c3f7a0c2e6597718ac',
        timeout: 30000
    },

    // Schema Slugs for API/Data fetching
    productsSchemaSlug: 'products_zohaattire',
    categoriesSchemaSlug: 'categories_zohaattire',
    bannersSchemaSlug: 'banners_zohaattire',

    // Business Information
    businessName: "Zoha's Attire",
    businessDescription: 'Premium Fashion & Garments - Stylish clothing collection for Men, Women, Baby and Fashion Accessories. Quality garments with trendy designs and affordable prices.',
    businessContact: '0310-3503309',
    businessEmail: 'contact@zohasattire.com', // Add if needed
    businessAddress: '', // Add if needed

    // SEO Meta Data
    seoTitle: 'Premium Fashion & Garments Collection - Latest Trends',
    seoDescription: 'Discover trendy fashion at Zohas Attire Pakistan. Mens wear, Womens clothing, Baby garments, and stylish accessories. Quality fashion, affordable prices, latest trends and designs.',
    seoKeywords: 'fashion, garments, mens wear, womens clothing, baby clothes, accessories, pakistani fashion, trendy clothes, zohas attire, quality garments, affordable fashion',

    // Assets
    faviconPath: '/assets/Zoha_Attire_Logo.png',
    faviconSize: '32x32',
    logoPath: '/assets/Zoha_Attire_Logo.png',

    // Social Media Links (add as needed)
    socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
        whatsapp: '923103503309',
    },

    // Site Settings
    currency: 'PKR',
    currencySymbol: 'Rs.',



    // Page-specific configurations
    pages: {
        home: {
            title: 'Premium Fashion & Garments Collection - Latest Trends',
            description: 'Discover trendy fashion at Zohas Attire Pakistan. Mens wear, Womens clothing, Baby garments, and stylish accessories.',
        },
        shop: {
            title: 'Shop All Products',
            description: 'Browse our complete collection of trendy fashion and garments.',
        },
        about: {
            title: 'About Us',
            description: 'Learn more about Zohas Attire and our commitment to quality fashion.',
        },
        contact: {
            title: 'Contact Us',
            description: 'Get in touch with us for any queries or support.',
        },
        checkout: {
            title: 'Checkout',
            description: 'Complete your purchase securely.',
        },
        wishlist: {
            title: 'My Wishlist',
            description: 'Your saved favorite items.',
        },
        payment: {
            title: 'Payment',
            description: 'Complete your payment for premium fashion & garments',
        },
        orderSuccess: {
            title: 'Order Confirmation',
            description: 'Your order for premium fashion & garments has been confirmed',
        },
        orderFailed: {
            title: 'Order Failed',
            description: 'Order processing failed for your fashion items order',
        },
        category: {
            title: 'Category Products',
            description: 'Browse our collection of fashion items in this category',
        },
        product: {
            title: 'Product Details',
            description: 'View detailed information about this fashion item',
        }
    },

    // Payment & Orders
    payment: {
        supportPhone: '0310-3503309',
        supportHours: '9 AM - 6 PM (Mon-Sat)',
        apiBaseUrl: 'https://web-portal-backend-production.up.railway.app/api/orders/submit',
        apiTimeout: 30000,
        codTitle: 'Cash on Delivery',
        codDescription: 'Pay when you receive your order',
        returnPolicyDays: 7,
        returnPolicyTitle: '7-Day Quality Guarantee'
    },

    // Shipping & Delivery
    shipping: {
        freeShippingThreshold: 5000,
        shippingFee: 250,
        deliveryDays: {
            karachi: '1-2 days',
            lahore: '2-3 days',
            islamabad: '2-3 days',
            other: '3-5 days'
        }
    },

    // Product Features
    productFeatures: {
        badges: {
            new: 'NEW',
            onSale: 'ON SALE',
            bestseller: 'BESTSELLER',
            outOfStock: 'OUT OF STOCK'
        },
        labels: {
            color: 'Variety',
            size: 'Size',
            quantity: 'Quantity',
            addToCart: 'Add to Cart',
            outOfStock: 'Out of Stock'
        }
    },

    // Development settings
    development: {
        fallbackMessage: 'Development mode - check your data files'
    },

    // Production settings
    production: {
        fallbackMessage: 'Service temporarily unavailable'
    }
};

// Helper function to get page-specific meta data
export const getPageMeta = (pageName, customTitle = '', customDescription = '') => {
    const page = SITE_CONFIG.pages[pageName] || {};

    return {
        title: customTitle || `${SITE_CONFIG.businessName} - ${page.title || SITE_CONFIG.seoTitle}`,
        description: customDescription || page.description || SITE_CONFIG.seoDescription,
        keywords: SITE_CONFIG.seoKeywords
    };
};

// Helper function to get business info
export const getBusinessInfo = () => ({
    businessName: SITE_CONFIG.businessName,
    description: SITE_CONFIG.businessDescription,
    contact: SITE_CONFIG.businessContact,
    email: SITE_CONFIG.businessEmail,
    address: SITE_CONFIG.businessAddress,
    whatsapp: SITE_CONFIG.socialMedia.whatsapp
});

// Helper function to get schema slugs
export const getSchemaConfig = () => ({
    productsSchemaSlug: SITE_CONFIG.productsSchemaSlug,
    categoriesSchemaSlug: SITE_CONFIG.categoriesSchemaSlug,
    bannersSchemaSlug: SITE_CONFIG.bannersSchemaSlug
});

// Helper function to check environment
export const isDevelopment = () => SITE_CONFIG.nodeEnv === 'development';
export const isProduction = () => SITE_CONFIG.nodeEnv === 'production';

// Helper function to get environment-specific settings
export const getEnvironmentConfig = () => ({
    siteId: SITE_CONFIG.siteId,
    nodeEnv: SITE_CONFIG.nodeEnv,
    storageKey: SITE_CONFIG.storageKey,
    isDevelopment: isDevelopment(),
    isProduction: isProduction()
});

// Helper function to get API configuration
export const getApiConfig = () => ({
    dashboardApiUrl: SITE_CONFIG.api.dashboardApiUrl,
    timeout: SITE_CONFIG.api.timeout
});

export default SITE_CONFIG;