// tailwind
import "./globals.css";
// react
import type { Metadata } from "next";
// google fonts
import { Nunito } from "next/font/google";
// components
import Navbar from "./components/Navbar/Navbar";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// modals
import RegisterModal from "./components/Modal/RegisterModal";
import LoginModal from "./components/Modal/LoginModal";
import RentModal from "./components/Modal/RentModal";
// server functions
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

export const metadata: Metadata = {
  title: "Holiday Rental App",
  description: "Holiday Rental App",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
