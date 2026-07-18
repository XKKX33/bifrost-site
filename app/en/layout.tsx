import type { Metadata } from "next";
import { getUi } from "@/content/i18n";

const ui = getUi("en");

export const metadata: Metadata = {
  title: {
    default: ui.meta.title,
    template: `%s · ${ui.brand}`,
  },
  description: ui.meta.description,
};

/**
 * English route segment metadata. Root layout wraps chrome;
 * client chrome resolves locale via localeFromPathname.
 */
export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
