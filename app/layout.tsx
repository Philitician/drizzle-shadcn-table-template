import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drizzle Shadcn Table Template",
  description: "Drizzle Shadcn Table Template",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <NuqsAdapter>
          <Navbar />
          <main className="flex-1">{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center gap-4 p-8">
      <Link href="/" className="text-lg font-semibold">
        Home
      </Link>
      <Link href="/posts">Posts</Link>
    </nav>
  );
}
