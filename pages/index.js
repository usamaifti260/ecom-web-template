import { fetchClientProducts, fetchClientCategories, fetchClientBanners } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Configuration Variables
const SITE_CONFIG = {
  // Business Information
  businessName: 'ALHAFIZ MILK AND SWEETS',
  businessDescription: 'Premium Traditional Sweets & Fresh Milk Products - Authentic taste, quality ingredients, fresh daily preparation. Specializing in Khoya Barfi, Sohan Halwa, and Pure Desi Ghee.',
  businessContact: '03487765824',

  // Schema Slugs
  productsSchemaSlug: 'products_alhafizsweetsandmilk',
  categoriesSchemaSlug: 'categories_alhafizsweetsandmilk',
  bannersSchemaSlug: 'banners_alhafizsweetsandmilk',

  // SEO Meta Data
  seoTitle: 'Premium Traditional Sweets & Fresh Milk Products',
  seoDescription: 'Discover authentic traditional sweets at AlHafiz Milk and Sweets Pakistan. Fresh Khoya Barfi, Sohan Halwa varieties (Sada, Badami, Akhroti, Mix Dry Fruit), Pure Desi Ghee, and farm-fresh milk products. Traditional recipes, quality ingredients, daily fresh preparation.',
  seoKeywords: 'khoya barfi, sohan halwa, desi ghee, traditional sweets, milk products, Pakistani sweets, fresh milk, badami halwa, akhroti halwa, mix dry fruit halwa, silver barfi, gulab jamun, sialkot sweets, authentic taste',

  // Assets
  faviconPath: '/assets/alhafiz_logo.png',
  faviconSize: '32x32'
};

export default function Home({ products, categories, banners, clientInfo }) {
  return (
    <>
      <Head>
        <title>{`${clientInfo?.businessName || SITE_CONFIG.businessName} - ${SITE_CONFIG.seoTitle}`}</title>
        <meta name="description" content={SITE_CONFIG.seoDescription} />
        <meta name="keywords" content={SITE_CONFIG.seoKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={SITE_CONFIG.faviconPath} type="image/png" sizes={SITE_CONFIG.faviconSize} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero banners={banners} />
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
    const [products, categories, banners] = await Promise.all([
      fetchClientProducts(SITE_CONFIG.productsSchemaSlug),
      fetchClientCategories(SITE_CONFIG.categoriesSchemaSlug),
      fetchClientBanners(SITE_CONFIG.bannersSchemaSlug)
    ]);

    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || SITE_CONFIG.businessName,
      description: process.env.BUSINESS_DESCRIPTION || SITE_CONFIG.businessDescription,
      contact: process.env.BUSINESS_CONTACT || SITE_CONFIG.businessContact
    };

    console.log(`Homepage: Successfully fetched ${products.length} products, ${categories.length} categories, and ${banners.length} banners`);

    return {
      props: {
        products,
        categories,
        banners,
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
        banners: [],
        clientInfo: {
          businessName: process.env.BUSINESS_NAME || SITE_CONFIG.businessName,
          description: isDevelopment
            ? 'Development mode - check your data/products.json, data/categories.json, and data/banners.json files'
            : 'Product catalog temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 