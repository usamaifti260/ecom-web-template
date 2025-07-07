import '@/styles/globals.css';
import Head from 'next/head';
import { CartProvider } from '@/lib/CartContext';
import { NotificationProvider } from '@/lib/NotificationContext';
import Cart from '@/components/Cart';
import Notification from '@/components/Notification';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <NotificationProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <Cart />
        <Notification />
      </NotificationProvider>
    </CartProvider>
  );
} 