import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - AlHafiz Milk and Sweets</title>
        <meta name="description" content="Get in touch with AlHafiz Milk and Sweets. We're here to help you find the perfect traditional sweets and milk products. Contact us for sweet orders, bulk inquiries, and support." />
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