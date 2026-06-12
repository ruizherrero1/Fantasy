import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fantasy Stratos",
  description: "Tu liga fantasy privada, a vuestra manera.",
  applicationName: "Fantasy Stratos",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#07120e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
