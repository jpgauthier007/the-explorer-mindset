import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work",
  description:
    "By Jean-Philippe Gauthier. A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future. Foreword by Sean Downey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-navy-950 text-white antialiased font-body">
        {children}
      </body>
    </html>
  );
}
