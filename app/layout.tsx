import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TradeSqr | Direct Marketplace & Premium Services",
    template: "%s | TradeSqr",
  },
  description:
    "Nigeria's dedicated platform for direct verified car sales, houses, land plots, and specialized professional services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/10 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
