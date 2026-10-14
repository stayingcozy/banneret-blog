import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.title}` },
  description: site.description,
  openGraph: { siteName: site.title, type: "website" },
};

export const viewport: Viewport = { themeColor: site.accent };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} style={{ "--accent": site.accent } as CSSProperties}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
