'use client';

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>Rest Countries API with color theme swithcer</title>
    </head>
      <body>
        {children}
      </body>
    </html>
  );
}
