import { fetchClientProducts } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

export default function ShopPage({ products, clientInfo }) {
  return (
    <>
      <Head>
        <title>Shop - VisionCraft Eyewear Collection</title>
        <meta name="description" content="Browse our complete collection of premium eyewear. Find the perfect glasses for your style and vision needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Products products={products} />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('Fetching products for shop page...');
    
    // Fetch products at build time - specify the schema for glasses
    const schemaSlug = 'glass-store-schema';
    const products = await fetchClientProducts(schemaSlug);
    
    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || 'VisionCraft',
      description: process.env.BUSINESS_DESCRIPTION || 'Premium eyewear designed to enhance your vision and elevate your style',
      contact: process.env.BUSINESS_CONTACT || null
    };

    console.log(`Shop page: Successfully fetched ${products.length} products from schema: ${schemaSlug}`);

    return {
      props: {
        products,
        clientInfo,
      },
      // Pure SSG - no revalidation (compatible with static export)
    };
  } catch (error) {
    console.error('Error in getStaticProps (shop page):', error);
    
    // In development, this might be expected if using local JSON
    // In production, this indicates an API issue
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return {
      props: {
        products: [],
        clientInfo: {
          businessName: process.env.BUSINESS_NAME || 'VisionCraft',
          description: isDevelopment 
            ? 'Development mode - check your data/products.json file' 
            : 'Product catalog temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 