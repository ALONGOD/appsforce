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

export const metadata = {
  title: "Appsforce User Library",
  description: "User management system for Appsforce interview task",
  icons: [{
    rel: 'icon',
    url: 'https://img.icons8.com/color/96/user-male-circle--v1.png',
  }, {
    rel: 'shortcut icon',
    url: 'https://img.icons8.com/color/96/user-male-circle--v1.png',
  }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}