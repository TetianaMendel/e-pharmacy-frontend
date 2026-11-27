import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Pharmacy",
  description: "Online pharmacy for your health and wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
  {children}

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        fontFamily: "var(--font-family)",
        fontSize: "14px",
        background: "var(--color-white)",
        color: "var(--color-black)",
        borderRadius: "12px",
      },
      success: {
        iconTheme: {
          primary: "var(--color-green)",
          secondary: "var(--color-white)",
        },
      },
    }}
  />
</body>
    </html>
  );
}
