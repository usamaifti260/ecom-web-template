import '@/styles/globals.css';
import Head from 'next/head';
import { CartProvider } from '@/lib/CartContext';
import { WishlistProvider } from '@/lib/WishlistContext';
import { NotificationProvider } from '@/lib/NotificationContext';
import Cart from '@/components/Cart';
import Notification from '@/components/Notification';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <NotificationProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
          <Cart />
          <Notification />
          <FloatingWhatsApp />
        </NotificationProvider>
      </WishlistProvider>
    </CartProvider>
  );
} 