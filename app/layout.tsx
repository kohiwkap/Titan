import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const displayFont = IBM_Plex_Sans_Thai({
  variable: "--font-display",
  subsets: ["latin", "thai"],
  weight: ["500", "600", "700"],
});

const bodyFont = Noto_Sans_Thai({
  variable: "--font-sans",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.titanq.fyi"),
  title: "Titan",
  description: "Titan's personal website",
  openGraph: {
    title: "Titan",
    description: "Titan's personal website",
    url: "https://www.titanq.fyi",
    siteName: "Titan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan",
    description: "Titan's personal website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
