import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Finder Maroc — Trouvez vos affaires | 249 DHS | Livraison COD",
  description: "Le tracker Bluetooth Smart Finder compatible Apple Find My. Retrouvez clés, sac, valise partout au Maroc. 249 DHS — Paiement à la livraison.",
  keywords: "Smart Finder, tracker, bluetooth, Apple Find My, Maroc, COD, AirTag",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=Noto+Kufi+Arabic:wght@400;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
