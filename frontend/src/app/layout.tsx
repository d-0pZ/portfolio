import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Muneer Ali | DevOps & Software Engineer",
    template: "%s | Muneer Ali"
  },
  description: "DevOps & Software Engineer specializing in cloud infrastructure, CI/CD pipelines, and modern web applications. Building scalable solutions with cutting-edge technology.",
  keywords: ["DevOps", "Software Engineer", "Cloud", "AWS", "Docker", "Kubernetes", "CI/CD", "React", "Next.js"],
  authors: [{ name: "Muneer Ali" }],
  creator: "Muneer Ali",
  metadataBase: new URL('https://m00n-eer.onrender.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://m00n-eer.onrender.com',
    title: 'Muneer Ali | DevOps & Software Engineer',
    description: 'DevOps & Software Engineer specializing in cloud infrastructure and modern web applications.',
    siteName: 'm00n-eer',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Muneer Ali - DevOps & Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muneer Ali | DevOps & Software Engineer',
    description: 'DevOps & Software Engineer specializing in cloud infrastructure and modern web applications.',
    images: ['/og-image.jpg'],
    creator: '@yourusername', // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black`}
      >
        <Navbar />
        <main className="relative">
          {children}
        </main>
        {/* Footer will be added here later */}
      </body>
    </html>
  );
}