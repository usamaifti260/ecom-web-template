import Head from 'next/head';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Sofa Sphere</title>
        <meta name="description" content="Learn about Sofa Sphere's mission to provide premium furniture that transforms your living space. Crafting comfort since 2025." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/sofasphere_dark_logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <About />
        <Footer />
      </div>
    </>
  );
} 