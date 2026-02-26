import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { WebMCPProvider } from "@/components/WebMCPProvider";
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
  metadataBase: new URL("https://theexplorermindset.com"),
  title: "The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work",
  description:
    "By Jean-Philippe Gauthier. A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future. Foreword by Sean Downey.",
  authors: [{ name: "Jean-Philippe Gauthier" }],
  openGraph: {
    title: "The Explorer Mindset",
    description: "A Guide to Growth for Your Life, Family, and Work",
    url: "https://theexplorermindset.com",
    siteName: "The Explorer Mindset",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Explorer Mindset",
    description: "A Guide to Growth for Your Life, Family, and Work",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://theexplorermindset.com",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "The Explorer Mindset",
    subtitle: "A Guide to Growth for Your Life, Family, and Work",
    author: {
      "@type": "Person",
      name: "Jean-Philippe Gauthier",
      url: "https://theexplorermindset.com",
    },
    datePublished: "2026-02-25",
    description:
      "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
    inLanguage: "en",
    genre: ["Self-Help", "Personal Development", "Leadership"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jean-Philippe Gauthier",
    jobTitle: "Author, Leader, Coach",
    description:
      "A seasoned leader, coach, and trusted advisor with a thirty-year career, including more than a decade at Google.",
    url: "https://theexplorermindset.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Explorer Mindset",
    url: "https://theexplorermindset.com",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-navy-950 text-white antialiased font-body">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <WebMCPProvider />
      </body>
    </html>
  );
}
