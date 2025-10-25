import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Suspense } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title:
    "Профессиональная плазменная резка металла в Екатеринбурге - Ликос",
  description:
    "Высокоточная плазменная резка металла любой сложности. Быстро, качественно, по доступным ценам. Калькулятор стоимости онлайн.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
