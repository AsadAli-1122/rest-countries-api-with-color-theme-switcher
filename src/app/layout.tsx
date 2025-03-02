"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import Link from "next/link";
import Header from "./components/Header";
import "nprogress/nprogress.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => NProgress.done(), 500); 
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>Rest Countries API with color theme switcher</title>
      </head>
      <body className="min-h-screen relative pb-6">
        <Header />
        {children}
        <div className="attribution mt-8 absolute bottom-0 left-0 right-0">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by <Link href="https://codebyasad.vercel.app/">Asad Ali</Link>
          .
        </div>
      </body>
    </html>
  );
}
