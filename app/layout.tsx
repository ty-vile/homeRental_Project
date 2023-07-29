import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";

export const metadata: Metadata = {
  title: "Holiday Rental App",
  description: "Holiday Rental App",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal isOpen title="Hello" actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
