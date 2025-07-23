import { Urbanist } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import NavbarWrapper from "@/components/navbar-wrapper";
import Footer from "@/components/footer";

import "./globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Promised Land",
  description: "Promised Land Orphanage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* Add a global CSS class for gradients directly in globals.css */}
        <div className="gradient-container min-h-screen flex flex-col">
          <ToastProvider />
          <ModalProvider />
          <NavbarWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
