import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Voice of Artist - Art Above Chart",
    template: "%s | Voice of Artist",
  },
  description:
    "Voice of Artist (VOA) is a platform where art meets authenticity. Discover emerging artists, their untold stories, and experience music through a cinematic, black-and-white aesthetic that puts art above chart positions.",
  keywords: [
    "voice of artist",
    "emerging artists",
    "music platform",
    "art above chart",
    "independent music",
    "artist stories",
    "music discovery",
    "authentic artists",
    "cinematic music",
    "black and white aesthetic",
  ],
  authors: [{ name: "Voice of Artist Team" }],
  creator: "Voice of Artist",
  publisher: "Voice of Artist",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://voiceofartist.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voice of Artist - Art Above Chart",
    description:
      "Voice of Artist (VOA) is a platform where art meets authenticity. Discover emerging artists, their untold stories, and experience music through a cinematic, black-and-white aesthetic.",
    url: "https://voiceofartist.com",
    siteName: "Voice of Artist",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voice of Artist - Art Above Chart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice of Artist - Art Above Chart",
    description:
      "Voice of Artist (VOA) is a platform where art meets authenticity. Discover emerging artists and their untold stories.",
    images: ["/images/twitter-image.jpg"],
    creator: "@voiceofartist",
  },
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
