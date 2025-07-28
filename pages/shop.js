import { fetchClientProducts, fetchClientCategories } from '@/lib/fetchProducts';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

const SITE_CONFIG = {
  productsSchemaSlug: 'products_alhafizsweetsandmilk',
  categoriesSchemaSlug: 'categories_alhafizsweetsandmilk',
};

export default function ShopPage({ products, categories, clientInfo }) {
  return (
    <>
      <Head>
        <title>Shop - AlHafiz Milk and Sweets</title>
        <meta name="description" content="Browse our complete collection of premium traditional sweets and fresh milk products. Find the perfect sweets for every occasion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/alhafiz_logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Products products={products} categories={categories} />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('Fetching products and categories for shop page...');

    // Fetch products and categories at build time

    const [products, categories] = await Promise.all([
      fetchClientProducts(SITE_CONFIG.productsSchemaSlug),
      fetchClientCategories(SITE_CONFIG.categoriesSchemaSlug)
    ]);

    // Client info from environment variables
    const clientInfo = {
      businessName: process.env.BUSINESS_NAME || 'Bhatti Industries',
      description: process.env.BUSINESS_DESCRIPTION || 'Premium Surgical Instruments & Medical Equipment - Precision engineering, quality manufacturing, trusted by healthcare professionals worldwide.',
      contact: process.env.BUSINESS_CONTACT || '0321-6801233'
    };

    console.log(`Shop page: Successfully fetched ${products.length} products and ${categories.length} categories`);

    return {
      props: {
        products,
        categories,
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
        categories: [],
        clientInfo: {
          businessName: process.env.BUSINESS_NAME || 'Bhatti Industries',
          description: isDevelopment
            ? 'Development mode - check your data/products.json and data/categories.json files'
            : 'Product catalog temporarily unavailable'
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 