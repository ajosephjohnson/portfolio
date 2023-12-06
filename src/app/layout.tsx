import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navigation, GoogleTagManager } from '@/components';
import './globals.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My portfolio for software development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleTagManager />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
