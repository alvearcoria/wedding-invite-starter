import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: `${siteConfig.couple.her} & ${siteConfig.couple.him}: Wedding Celebration`,
  description: `Join us for the wedding celebration of ${siteConfig.couple.her} and ${siteConfig.couple.him}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
