import {
  ClerkProvider
} from '@clerk/nextjs';
import { type Metadata } from 'next';
import { Montserrat, Quicksand } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'Quadient Omnigo',
  description: 'Quadient Omnigo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning className={`${montserrat.variable} ${quicksand.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}