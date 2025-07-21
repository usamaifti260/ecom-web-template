import { fetchClientProducts, fetchClientCategories } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home({ products, categories, clientInfo }) {
  return (
    <>
      <Head>
        <title>{`${clientInfo?.businessName || 'SOFA SPHERE'} - Premium Furniture & Sofas`}</title>
        <meta name="description" content="Discover luxury furniture at SOFA SPHERE. Premium collection of Living Room, Bedroom, Office, Dining Room, and Outdoor furniture. Shop authentic furniture with modern designs and superior comfort." />
        <meta name="keywords" content="furniture, sofas, living room, bedroom, office furniture, dining room, outdoor furniture, comfort sofa, luxury furniture, modern furniture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/sofasphere_dark_logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero />
        <Categories categories={categories} />
        <Products products={products} categories={categories} />
        <Reviews />
        <Footer /> 
        {/* Add bottom padding for mobile navigation bar */}
        <div className="lg:hidden h-16"></div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('Fetching products and categories for homepage...');
    
    // Fetch products and categories at build time
    const productsSchemaSlug = 'comfortsofaproductsschema';
    const categoriesSchemaSlug = 'comfortsofacategoriesschema';

    
    const [products, categories] = await Promise.all([
      fetchClientProducts(productsSchemaSlug),
      fetchClientCategories(categoriesSchemaSlug)
    ]);
    
    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || 'Comfort Sofa',
      description: process.env.BUSINESS_DESCRIPTION || 'Premium Furniture & Sofas - Luxury designs, superior comfort, modern style.',
      contact: process.env.BUSINESS_CONTACT || '0302-8829260'
    };

    console.log(`Homepage: Successfully fetched ${products.length} products and ${categories.length} categories`);

    return {
      props: {
        products,
        categories,
        clientInfo,
      },
      // Pure SSG - no revalidation (compatible with static export)
    };
  } catch (error) {
    console.error('Error in getStaticProps (homepage):', error);
    
    // In development, this might be expected if using local JSON
    // In production, this indicates an API issue
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return {
      props: {
        products: [],
        categories: [],
        clientInfo: {
          businessName: process.env.BUSINESS_NAME || 'Comfort Sofa',
          description: isDevelopment 
            ? 'Development mode - check your data/products.json and data/categories.json files' 
            : 'Product catalog temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 