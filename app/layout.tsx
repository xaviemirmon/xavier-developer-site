import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/Header";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xavier Mirabelli-Montan ",
  description: "Lead Fullstack Product Engineer based in Brighton, UK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className} suppressHydrationWarning>
        <Analytics />
        <Header />
        {children}
        <footer className={`container`}>
          <p>
            &copy; {new Date(Date.now()).getFullYear()} Xavier Mirabelli-Montan
          </p>
        </footer>
      </body>
    </html>
  );
}
