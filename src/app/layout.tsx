import type { Metadata } from "next";
import "./globals.css";
import { WeatherProvider } from "@/app/context/WeatherContext";
import Header from "@/app/components/Header";
import React from "react";
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: "#0064F9",
  colorScheme: "light",
}

export const metadata: Metadata = {
  title: "WeatherLog",
  description: "Weather data directly fetched from an local private weather station.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "./site.webmanifest",
  authors: {name: "Linus Genz", url: "https://linusgenz.dev"},
  applicationName: "WeatherLog",
  alternates: {
    canonical: "https://weather.linusgenz.dev",
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'WeatherLog',
    description: 'Weather data directly fetched from an local private weather station.',
    url: 'https://weather.linusgenz.dev',
    siteName: 'WeatherLog',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://weather.linusgenz.dev/appIcon.png',
        width: 512,
        height: 512,
        alt: 'WeatherLog App Icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'WeatherLog - Linus Genz',
    description: 'Weather data directly fetched from an local private weather station.',
    images: ['https://weather.linusgenz.dev/appIcon.png'],
  },
  keywords: ['WeatherLog', "Linus Genz", "Weather"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WeatherProvider>
          <Header />
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}
