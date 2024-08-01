import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReactQueryProvider>
          <body className={`${inter.className}`}>
            <NavBar />
            {children}
          </body>
        </ReactQueryProvider>
      </AuthProvider>
    </html>
  );
}
