import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sony WH-1000XM6',
  description: 'Silence, perfected. Experience the flagship wireless noise cancelling headphones from Sony.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white/90 antialiased`}>
        {children}
      </body>
    </html>
  );
}
