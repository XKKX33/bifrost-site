import type { Locale } from "@/lib/i18n";
import { getUi } from "@/content/i18n";

type LocaleStubProps = {
  locale: Locale;
  /** Key into ui.pages, or raw title override for member slug pages */
  title: string;
  claim?: boolean;
};

/**
 * Thin locale-aware page stub. Full chrome / narrative arrives in later tasks.
 */
export function LocaleStub({ locale, title, claim = false }: LocaleStubProps) {
  const ui = getUi(locale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <p className="font-mono text-xs tracking-[0.35em] text-ink/50 uppercase">
        {locale === "en" ? "EN" : "中文"}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-ink sm:text-7xl">
        {title}
      </h1>
      {claim ? (
        <p className="mt-6 max-w-lg text-center text-base text-ink/70">
          {ui.brandClaim}
        </p>
      ) : null}
      <span
        className="mt-10 h-1 w-24 rounded-full"
        style={{ background: "var(--glacier)" }}
        aria-hidden
      />
    </main>
  );
}
