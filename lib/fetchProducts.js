export async function fetchClientProducts(schemaSlug = '') {
  // In development, use static mock data from JSON file
  if (process.env.NODE_ENV === 'production') {
    // console.log('Using static furniture data for development');
    try {
      // Import the JSON data
      const products = await import('../data/products.json');
      const furnitureData = products.default;
      
      // Transform the data to ensure all required properties are present
      const transformedProducts = furnitureData.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        gallery: product.gallery || [product.image], // Use gallery or fallback to main image
        category: product.category,
        brand: product.brand || 'SOFA SPHERE',
        isNew: product.isNew || false,
        onSale: product.onSale || false,
        salepercentage: product.salepercentage || 0,
        size: product.size,
        colors: product.colors || [],
        rating: product.rating || 4.0,
        reviews: product.reviews || 0,
        inStock: product.inStock !== false, // Default to true if not specified
        bestseller: product.bestseller || false,
        hoverimage: product.hoverimage,
        subcategory: product.subcategory,
        dimensions: product.dimensions,
        Orientation: product.Orientation,
        withFootstool: product.withFootstool,
        stockLeft: product.stockLeft,
        sofabedmechanism: product.sofabedmechanism,
        additionalFeatures: product.additionalFeatures,
        // Additional metadata for development
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      console.log(`Loaded ${transformedProducts.length} furniture products from local JSON`);
      return transformedProducts;
    } catch (error) {
      console.error('Error loading local furniture products data:', error);
      // Return empty array if JSON file fails
      return [];
    }
  } 

  // Production mode - use Dashboard API only
  const dashboardApiUrl = process.env.DASHBOARD_API_URL || 'https://web-portal-backend-production.up.railway.app/api/data/website/6877029cb89a602f3ddc1de8';
  
  if (!dashboardApiUrl) {
    throw new Error('DASHBOARD_API_URL environment variable is required for production');
  }

  try {
    console.log(`Fetching from Dashboard API: ${dashboardApiUrl} (schema: ${schemaSlug})`);
    
    const res = await fetch(`${dashboardApiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    
    const response = await res.json();
    
    // Check if the response is successful
    if (!response.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    // Check if we have data
    if (!response.data) {
      console.warn('No data found in API response');
      return [];
    }
    
    // If a specific schema is requested, try to get it
    if (schemaSlug && response.data[schemaSlug]) {
      const schemaData = response.data[schemaSlug];
      if (!schemaData.records) {
        console.warn(`No records found in schema: ${schemaSlug}`);
        return [];
      }
      
      const products = transformRecordsToProducts(schemaData.records);
      console.log(`Fetched ${products.length} products from schema: ${schemaSlug}`);
      return products;
    }
    
    // If no specific schema or schema not found, try to find any schema with records
    const availableSchemas = Object.keys(response.data);
    console.log('Available schemas:', availableSchemas);
    
    for (const schema of availableSchemas) {
      const schemaData = response.data[schema];
      if (schemaData && schemaData.records && schemaData.records.length > 0) {
        const products = transformRecordsToProducts(schemaData.records);
        console.log(`Fetched ${products.length} products from fallback schema: ${schema}`);
        return products;
      }
    }
    
    console.warn('No schemas with records found');
    return [];
    
  } catch (error) {
    console.error('Error fetching client products from dashboard API:', error);
    throw error;
  }
}

// New function to fetch categories
export async function fetchClientCategories(schemaSlug = 'comfortsofacategoriesschema') {
  // In development, use static mock data from JSON file
  if (process.env.NODE_ENV === 'production') {
    // console.log('Using static categories data for development');
    try {
      // Import the JSON data
      const categories = await import('../data/categories.json');
      const categoriesData = categories.default;
      
      // Transform the data to ensure all required properties are present
      const transformedCategories = categoriesData.map(category => ({
        id: category.id,
        categoryname: category.categoryname,
        categorythumbnail: category.categorythumbnail,
        // Additional metadata for development
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      console.log(`Loaded ${transformedCategories.length} categories from local JSON`);
      return transformedCategories;
    } catch (error) {
      console.error('Error loading local categories data:', error);
      // Return empty array if JSON file fails
      return [];
    }
  }  

  // Production mode - use Dashboard API only
  const dashboardApiUrl = process.env.DASHBOARD_API_URL || 'https://web-portal-backend-production.up.railway.app/api/data/website/6877029cb89a602f3ddc1de8';
  
  if (!dashboardApiUrl) {
    throw new Error('DASHBOARD_API_URL environment variable is required for production');
  }

  try {
    console.log(`Fetching categories from Dashboard API: ${dashboardApiUrl} (schema: ${schemaSlug})`);
    
    const res = await fetch(`${dashboardApiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    
    const response = await res.json();
    
    // Check if the response is successful
    if (!response.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    // Check if we have data
    if (!response.data) {
      console.warn('No data found in API response');
      return [];
    }
    
    // If a specific schema is requested, try to get it
    if (schemaSlug && response.data[schemaSlug]) {
      const schemaData = response.data[schemaSlug];
      if (!schemaData.records) {
        console.warn(`No records found in schema: ${schemaSlug}`);
        return [];
      }
      
      const categories = transformRecordsToCategories(schemaData.records);
      console.log(`Fetched ${categories.length} categories from schema: ${schemaSlug}`);
      return categories;
    }
    
    console.warn('Categories schema not found');
    return [];
    
  } catch (error) {
    console.error('Error fetching client categories from dashboard API:', error);
    throw error;
  }
}

// Helper function to transform records to products format
function transformRecordsToProducts(records) {
  return records.map(record => ({
    id: record.data.id,
    name: record.data.name,
    description: record.data.description,
    price: record.data.price,
    originalPrice: record.data.originalPrice,
    image: record.data.image,
    gallery: record.data.gallery,
    category: record.data.category,
    brand: record.data.brand || 'Comfort Sofa',
    isNew: record.data.isNew || false,
    onSale: record.data.onSale || false,
    salepercentage: record.data.salepercentage || 0,
    sizes: record.data.sizes || ['Standard', 'Large', 'XL', 'Custom'],
    colors: record.data.colors || [],
    rating: record.data.rating || 4.0,
    reviews: record.data.reviews || 0,
    inStock: record.data.inStock !== false, // Default to true if not specified
    bestseller: record.data.bestseller || false,
    // Additional metadata
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  }));
}

// Helper function to transform records to categories format
function transformRecordsToCategories(records) {
  return records.map(record => ({
    id: record.data.id,
    categoryname: record.data.categoryname,
    categorythumbnail: record.data.categorythumbnail,
    // Additional metadata
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  }));
}

// Alternative function to get all schemas data
export async function fetchAllSchemas() {
  // In development, return empty object
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: fetchAllSchemas not available');
    return {};
  }

  const dashboardApiUrl = process.env.DASHBOARD_API_URL || 'https://web-portal-backend-production.up.railway.app/api/data/website/6877029cb89a602f3ddc1de8';
  
  if (!dashboardApiUrl) {
    throw new Error('DASHBOARD_API_URL environment variable is required for production');
  }

  try {
    const res = await fetch(`${dashboardApiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch schemas: ${res.status} ${res.statusText}`);
    }
    
    const response = await res.json();
    
    if (!response.success || !response.data) {
      throw new Error('Invalid API response');
    }
    
    return response.data;
    
  } catch (error) {
    console.error('Error fetching all schemas:', error);
    throw error;
  }
}

// Function to get data from a specific schema
export async function fetchSchemaData(schemaSlug) {
  return fetchClientProducts(schemaSlug);
} 