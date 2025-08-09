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
        {/* Top gradient blur */}
        <div aria-hidden="true" className="gradient-blur-top">
          <div className="gradient-shape-top" />
        </div>

        {/* Bottom gradient blur */}
        <div aria-hidden="true" className="gradient-blur-bottom">
          <div className="gradient-shape-bottom" />
        </div>

        <div className="flex flex-col min-h-screen">
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
