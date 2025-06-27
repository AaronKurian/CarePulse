import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "CarePulse - Healthcare Patient Management System",
    template: "%s | CarePulse",
  },
  description:
    "CarePulse is a comprehensive healthcare patient management system designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers. Book appointments, manage patient data, and improve healthcare delivery.",
  keywords: [
    "healthcare",
    "patient management",
    "appointment booking",
    "medical records",
    "healthcare software",
    "hospital management",
    "clinic management",
    "patient portal",
    "healthcare technology",
    "medical appointment scheduling",
  ],
  authors: [{ name: "Aaron Kurian Abraham" }],
  creator: "CarePulse",
  publisher: "CarePulse Healthcare",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "CarePulse - Healthcare Patient Management System",
    description:
      "Streamline patient registration, appointment scheduling, and medical records management with CarePulse healthcare management system.",
    siteName: "CarePulse",
    images: [
      {
        url: "/assets/icons/logo-icon.svg",
        width: 1200,
        height: 630,
        alt: "CarePulse Healthcare Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarePulse - Healthcare Patient Management System",
    description:
      "Streamline patient registration, appointment scheduling, and medical records management with CarePulse.",
    images: ["/assets/icons/logo-icon.svg"],
    creator: "@carepulse",
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
  icons: {
    icon: [
      { url: "/assets/icons/logo-icon.svg" },
      { url: "/assets/icons/logo-icon.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/assets/icons/logo-icon.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [{ url: "/assets/icons/logo-icon.svg" }],
    shortcut: "/assets/icons/logo-icon.svg",
  },
  manifest: "/manifest.json",
  category: "healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#131619" />
        <link rel="icon" href="/assets/icons/logo-icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
