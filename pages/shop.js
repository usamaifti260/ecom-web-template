import { fetchClientProducts, fetchClientCategories } from '@/lib/fetchProducts';
import SITE_CONFIG, { getPageMeta, getBusinessInfo, getSchemaConfig, isDevelopment } from '@/config/siteConfig';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

export default function ShopPage({ products, categories, clientInfo }) {
  const pageMeta = getPageMeta('shop');

  return (
    <>
      <Head>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content={pageMeta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={SITE_CONFIG.faviconPath} type="image/png" sizes={SITE_CONFIG.faviconSize} />
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

    const schemaConfig = getSchemaConfig();
    const businessInfo = getBusinessInfo();

    // Fetch products and categories at build time
    const [products, categories] = await Promise.all([
      fetchClientProducts(schemaConfig.productsSchemaSlug),
      fetchClientCategories(schemaConfig.categoriesSchemaSlug)
    ]);

    // Client info from configuration
    const clientInfo = businessInfo;

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
    const isDevMode = isDevelopment();

    return {
      props: {
        products: [],
        categories: [],
        clientInfo: {
          ...getBusinessInfo(),
          description: isDevMode
            ? SITE_CONFIG.development.fallbackMessage + ' - check your data/products.json and data/categories.json files'
            : SITE_CONFIG.production.fallbackMessage
        }
      },
      // Pure SSG - no revalidation
    };
  }
} 