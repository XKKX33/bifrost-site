import type { Metadata } from "next";
import { AppChrome } from "@/components/chrome";
import { getUi } from "@/content/i18n";
import "./globals.css";

const ui = getUi("zh");

export const metadata: Metadata = {
  title: {
    default: ui.meta.title,
    template: `%s · ${ui.brand}`,
  },
  description: ui.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
