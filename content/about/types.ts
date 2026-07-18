/**
 * About page = brand manifesto (not people).
 * Team page owns members; this owns the bridge thesis + three themes.
 */

export type AboutThemeId = "risk" | "synergy" | "decision";

export type AboutTheme = {
  id: AboutThemeId;
  /** Short theme label, e.g. 风险预警 */
  label: string;
  /** Theme thesis line */
  title: string;
  body: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  /** Opening manifesto paragraph */
  manifesto: string;
  bridge: {
    headline: string;
    body: string;
  };
  themesHeading: string;
  themes: readonly [AboutTheme, AboutTheme, AboutTheme];
  value: {
    headline: string;
    body: string;
  };
  links: {
    project: string;
    team: string;
    contact: string;
  };
};
