import { fetchClientProducts } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home({ products, clientInfo }) {
  return (
    <>
      <Head>
        <title>{`${clientInfo?.businessName || 'Fork & Knife'} - Fast Food Restaurant`}</title>
        <meta name="description" content="Delicious fast food delivered to your door! Pizza, burgers, shawarma, and more. Free home delivery on orders over Rs. 1000." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero />
        <Products products={products} />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('Fetching products for homepage...');
    
    // Fetch products at build time - using local JSON for restaurant menu
    const schemaSlug = 'forkandknifemenu';
    const products = await fetchClientProducts(schemaSlug);
    
    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || 'Fork & Knife Fast Food',
      description: process.env.BUSINESS_DESCRIPTION || 'Delicious fast food delivered to your door! Pizza, burgers, shawarma, and more.',
      contact: process.env.BUSINESS_CONTACT || '0304-4481181'
    };

    console.log(`Homepage: Successfully fetched ${products.length} products from local menu`);

    return {
      props: {
        products,
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
        clientInfo: {
          businessName: process.env.BUSINESS_NAME || 'Fork & Knife Fast Food',
          description: isDevelopment 
            ? 'Development mode - check your data/products.json file' 
            : 'Menu temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 