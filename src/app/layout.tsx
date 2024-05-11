import Footer from "@/common/components/footer/footer";
import PlaygroundNavbar from "@/common/components/navbar/playground-navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playground",
  description: "Your games, your stats, your playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PlaygroundNavbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
