import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NavbarToggle from "./components/NavBarToggle";
import ThemeSwitcher from "./components/RadixTheme";
import "./globals.css";
import "./theme-config.css";

// const plusJakartaSans = Plus_Jakarta_Sans({
//   variable: "--font-plus-jakarta-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Consumer Portal",
  description:
    "Check updated market prices for essential commodities and ensure fair consumer practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitcher>
          <NavbarToggle>{children}</NavbarToggle>
        </ThemeSwitcher>
        <ToastContainer />
      </body>
    </html>
  );
}
