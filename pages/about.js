import Head from 'next/head';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - AlHafiz Milk and Sweets</title>
        <meta name="description" content="Learn about AlHafiz Milk and Sweets' mission to provide premium traditional sweets and fresh milk products. Authentic recipes and quality ingredients since day one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/alhafiz_logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <About />
        <Footer />
      </div>
    </>
  );
} 