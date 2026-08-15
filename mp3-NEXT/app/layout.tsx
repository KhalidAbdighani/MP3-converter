import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MP3 Converter - Convert Video to MP3",
  description:
    "Convert video and audio files to MP3 easily with our free online MP3 converter.",
  keywords: [
    "MP3 Converter",
    "Convert Video to MP3",
    "Audio Converter",
    "Video to Audio",
    "Extract Audio from Video",
    "Free MP3 Converter",
    "Fast Audio Converter"
  ],
  authors: [{ name: "khalidabdighani" }],
  creator: "khalidabdighani",
  publisher: "khalidabdighani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Free MP3 Converter - Convert Video to Audio Fast",
    url: "https://mp-3-converter-six.vercel.app",
    description: "Convert video and audio files to high-quality MP3 online for free with zero limits.",
    siteName: "MP3 Converter",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(
  process.env.NODE_ENV === "production"
    ? "https://mp-3-converter-six.vercel.app"
    : "http://localhost:3000"
),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
