import Head from 'next/head';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Marakish</title>
        <meta name="description" content="Learn about Marakish's mission to provide premium quality cleaning products. Discover our commitment to powerful formulas and effective cleaning solutions for your home and business." />
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