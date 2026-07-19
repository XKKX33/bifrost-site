/**
 * Typed UI chrome copy for bilingual BIFROST shell.
 * Page narrative / BIFROST / member resumes land in later tasks.
 */

export type UiNavItem = {
  /** Locale-neutral path, e.g. `/project` (prefix via localePath). */
  href: string;
  label: string;
  index: string;
};

export type UiCopy = {
  /** Brand mark, e.g. BIFROST */
  brand: string;
  /** Short brand claim under logo / hero */
  brandClaim: string;
  /** Supporting line for loader / chrome */
  brandSupport: string;
  nav: UiNavItem[];
  /** Loader sequence tokens (may stay English brand tokens) */
  loaderWords: string[];
  loaderFinal: string;
  language: {
    zhLabel: string;
    enLabel: string;
    switchAria: string;
  };
  meta: {
    title: string;
    description: string;
  };
  common: {
    learnMore: string;
    contactUs: string;
    viewProject: string;
    backToTeam: string;
  };
  /** Stub page H1 labels */
  pages: {
    home: string;
    project: string;
    team: string;
    about: string;
    contact: string;
    memberPlaceholder: string;
  };
};
