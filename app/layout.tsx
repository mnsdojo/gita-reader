import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import BottomNavbar from "@/components/bottom-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: " Gita Reader",
  description: "A comprehensive Bhagavad Gita reader app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen pb-16  overflow-hidden ">
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto py-8 px-4">{children}</div>
            </main>
            <BottomNavbar />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
