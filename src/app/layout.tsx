import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header, GoogleTagManager } from '@/components';
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
      <body className={`${inter.className} sky-gradient dark:border-night-sky-mid border-day-sky-mid border-b-2 text-white`}>
        <GoogleTagManager />
        <Header />
        {children}
      </body>
    </html>
  )
}
