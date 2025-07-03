export async function fetchClientProducts(schemaSlug = 'glass-store-schema') {
  // In development, use static mock data from JSON file
  if (process.env.NODE_ENV === 'development') {
    console.log('Using static mock data for development');
    try {
      // Import the JSON data
      const products = await import('../data/products.json');
      return products.default;
    } catch (error) {
      console.error('Error loading local products data:', error);
      // Return empty array if JSON file fails
      return [];
    }
  }

  // Production mode - use Dashboard API only
  const dashboardApiUrl = process.env.DASHBOARD_API_URL;
  
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

// Helper function to transform records to products format
function transformRecordsToProducts(records) {
  return records.map(record => ({
    id: record.data.id,
    name: record.data.name,
    description: record.data.description,
    price: record.data.price,
    originalPrice: record.data.originalPrice,
    image: record.data.image,
    category: record.data.category,
    brand: record.data.brand,
    features: record.data.features || [],
    colors: record.data.colors || [],
    rating: record.data.rating,
    reviews: record.data.reviews,
    inStock: record.data.inStock !== false, // Default to true if not specified
    bestseller: record.data.bestseller || false,
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

  const dashboardApiUrl = process.env.DASHBOARD_API_URL;
  
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