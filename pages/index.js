import { fetchClientProducts, fetchClientCategories } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home({ products, categories, clientInfo }) {
  return (
    <>
      <Head>
        <title>{`${clientInfo?.businessName || 'Hathkari Official'} - Women's Eastern Wear`}</title>
        <meta name="description" content="Discover elegant eastern wear at Hathkari Official. Premium collection of 1 Piece, 2 Piece, 3 Piece, Co-ord Sets, and Kameez Shalwar. Shop authentic women's clothing with modern designs." />
        <meta name="keywords" content="eastern wear, women clothing, 1 piece, 2 piece, 3 piece, co-ord set, kameez shalwar, hathkari official, pakistani clothes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero />
        <Products products={products} categories={categories} />
        <Reviews />
        <Footer /> 
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('Fetching products and categories for homepage...');
    
    // Fetch products and categories at build time
    const productsSchemaSlug = 'hathkariproductsSchema';
    const categoriesSchemaSlug = 'hathkaricategoriesschema';
    
    const [products, categories] = await Promise.all([
      fetchClientProducts(productsSchemaSlug),
      fetchClientCategories(categoriesSchemaSlug)
    ]);
    
    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || 'Hathkari Official',
      description: process.env.BUSINESS_DESCRIPTION || 'Premium Eastern Wear for Women - Elegant designs, authentic quality, modern style.',
      contact: process.env.BUSINESS_CONTACT || '0304-4481181'
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
          businessName: process.env.BUSINESS_NAME || 'Hathkari Official',
          description: isDevelopment 
            ? 'Development mode - check your data/products.json and data/categories.json files' 
            : 'Product catalog temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 