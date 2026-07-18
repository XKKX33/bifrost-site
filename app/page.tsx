import { HomePage } from "@/components/home";

const locale = "zh" as const;

export default function ZhHomeRoute() {
  return <HomePage locale={locale} />;
}
