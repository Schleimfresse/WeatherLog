import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { WeatherProvider } from "@/app/context/WeatherContext";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "WeatherLog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>WeatherLog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <WeatherProvider>
          <Header />
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}
