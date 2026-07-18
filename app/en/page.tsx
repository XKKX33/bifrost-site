import { HomePage } from "@/components/home";

const locale = "en" as const;

export default function EnHomeRoute() {
  return <HomePage locale={locale} />;
}
