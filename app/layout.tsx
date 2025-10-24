import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Walid - Full-Stack Developer | React, Next.js, TypeScript",
  description:
    "Full-stack developer building modern web applications with React, Next.js, and TypeScript. Founder of NeQra Academy, Arabic e-learning platform.",
  keywords: [
    "full-stack developer",
    "react developer",
    "next.js",
    "typescript",
    "web development",
  ],
  authors: [{ name: "Walid" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Walid - Full-Stack Developer",
    description: "Building the future of Arabic e-learning",
    siteName: "Walid Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}