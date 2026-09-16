import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${workSans.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/10 selection:text-primary">
        {children}
      </body>
    </html>
  );
}

