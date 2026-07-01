import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Lightfall from "@/components/Lightfall";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibsted = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const martian = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "it's a home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"

    >
      <body className={`${geist.variable} ${schibsted.variable} ${martian.variable} antialiased min-h-screen`}>
        <Navbar />
        <div className="fixed inset-0 -z-10">
          <Lightfall
            colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
            backgroundColor="#000"
            speed={0.1}
            streakCount={1}
            streakWidth={.2}
            streakLength={1}
            glow={.5}
            density={0.6}
            twinkle={1}
            zoom={3}
            backgroundGlow={0.5}
            opacity={1}
            mouseInteraction
            mouseStrength={0.5}
            mouseRadius={1}

          />
        </div>
        {children}</body>

    </html>
  );
}
