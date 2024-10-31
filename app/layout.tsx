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
    <nav className="flex flex-col items-center gap-2 p-8">
      <Link href="/" className="text-lg font-semibold">
        Home
      </Link>
      <div className="flex gap-4">
        <h3 className="text-sm font-medium">Server-side</h3>
        <Link href="/server/posts">Posts</Link>
        <Link href="/server/authors">Authors</Link>
      </div>
      <div className="flex gap-4">
        <h3 className="text-sm font-medium">Client-side</h3>
        <Link href="/client/posts">Posts</Link>
        <Link href="/client/authors">Authors</Link>
      </div>
    </nav>
  );
}
