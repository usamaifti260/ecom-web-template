import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Marakish</title>
        <meta name="description" content="Get in touch with Marakish for all your cleaning product needs. Contact us for orders, bulk inquiries, and support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/alhafiz_logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Contact />
        <Footer />
      </div>
    </>
  );
} 