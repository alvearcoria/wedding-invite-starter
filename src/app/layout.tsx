
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from '@/config/site';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const BackgroundPattern = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[-1] text-foreground/10"
  >
    <div 
      className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-repeat"
      style={{ backgroundSize: '80px 80px' }}
    />
  </div>
);


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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <BackgroundPattern />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
