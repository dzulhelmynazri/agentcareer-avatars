import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "../index.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Fast, open-source animated & deterministic SVG avatar API based on Bloub, styled for AI agents, users, and bots.",
  icons: {
    icon: "/api/avatar.svg?seed=agentcareer&shape=squircle&color=black",
  },
  keywords: [
    "avatar api",
    "dicebear alternative",
    "svg avatar",
    "animated avatar",
    "agentcareer",
  ],
  title: "Agent Career Avatar API | Deterministic & Animated SVG Avatars",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    lang="en"
  >
    <body className="min-h-full font-sans">
      <NuqsAdapter>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
