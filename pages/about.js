import Head from 'next/head';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Fork & Knife Fast Food</title>
        <meta name="description" content="Learn about Fork & Knife Fast Food's mission to provide delicious fast food that satisfies your taste. Crafting perfect food since 2025." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <About />
        <Footer />
      </div>
    </>
  );
} 