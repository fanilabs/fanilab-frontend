import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toaster from '@/components/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FaniLab - Blockchain Logistics Platform',
  description: 'Decentralized escrow-based logistics and delivery platform powered by Stellar',
  keywords: 'blockchain, logistics, delivery, Stellar, escrow, smart contracts',
  authors: [{ name: 'FaniLab Team' }],
  openGraph: {
    title: 'FaniLab - Blockchain Logistics Platform',
    description: 'Decentralized escrow-based logistics and delivery platform powered by Stellar',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
