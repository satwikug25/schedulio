import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/provider";
import ConvexClientProvider from "./ConvexClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groq Speech-to-Speech",
  description: "Groq Speech-to-Speech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preload" href="chat-bubble-white.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="chat-bubble.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="microphone.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="microphone-white.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={inter.className + " h-full"}>
        <Providers><ConvexClientProvider>{children}</ConvexClientProvider></Providers>
      </body>
    </html>
  );
}
