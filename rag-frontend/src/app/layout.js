import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // optional: adjust for sleek weights
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "RAG Demo",
  description: "Minimal sleek UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${geistSans.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
