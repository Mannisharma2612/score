import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBox from "./components/main/SearchBox";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Score",
  description: "For football related information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "black" }} className={inter.className}>
        <div className="bg-black relative">
          <div className="absolute w-full top-0 left-0 bg-gradient-to-b from-black/10 to-black">
            <div className="relative">
              <SearchBox />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
