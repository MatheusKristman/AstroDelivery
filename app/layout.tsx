import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Astro Delivery",
  description: "Cadastre e gerencie endereços na Terra e em Marte com uma interface intuitiva e moderna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${gabarito.className} antialiased`}>{children}</body>
    </html>
  );
}
