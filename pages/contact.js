import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Fork & Knife Fast Food</title>
        <meta name="description" content="Get in touch with Fork & Knife Fast Food. We're here to help you find the perfect fast food solution. Contact us for product questions, orders, and support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Contact />
        <Footer />
      </div>
    </>
  );
} 