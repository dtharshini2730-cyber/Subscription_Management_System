import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUBSENSE — Intelligent Subscription & Revenue Management",
  description: "Enterprise subscription, recurring billing, and revenue intelligence platform.",
  icons: {
    icon: "/logo/subsense-icon.png",
    apple: "/logo/subsense-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-ivory text-espresso min-h-screen selection:bg-crimson selection:text-white`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
