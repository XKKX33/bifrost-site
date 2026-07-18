import type { AboutContent } from "./types";

/** en About — brand manifesto: Bifrost as decision bridge. */
export const enAbout: AboutContent = {
  eyebrow: "About BIFROST",
  title: "The decision bridge",
  manifesto:
    "BIFROST is not another dashboard name. It names a way of working: connect lagging risk, scattered information, and suspended judgment into one path people can actually walk.",
  bridge: {
    headline: "Why “bridge”",
    body:
      "In Norse myth, Bifröst is the rainbow bridge between realms. We borrow the image: risk signals on one side, ownership and action on the other. Our job is to shorten the distance until it is discussable, collaborative, and reviewable.",
  },
  themesHeading: "Three themes",
  themes: [
    {
      id: "risk",
      label: "Risk early warning",
      title: "See risk earlier",
      body:
        "Anomalies should not wait for the weekly report. We put trust scoring and live signals first: see, then discuss — not only repair after the fact.",
    },
    {
      id: "synergy",
      label: "Information synergy",
      title: "One fact, many roles",
      body:
        "Cross-role friction burns decision windows. We push shared definitions and clear permissions so the same metric stops fighting itself across systems.",
    },
    {
      id: "decision",
      label: "Decision support",
      title: "Turn insight into action",
      body:
        "One-size-fits-all reports rarely land. We wire insight into role views and collaboration tasks — detect, dispose, capture knowledge.",
    },
  ],
  value: {
    headline: "What we believe",
    body:
      "A good decision system does not pile on big screens; it shortens the path from signal to action. BIFROST sits at the edge of data, models, and product engineering — compressing hard problems into judgments that can be debated, owned, and verified.",
  },
  links: {
    project: "View DecisionLoop",
    team: "Meet the team",
    contact: "Contact us",
  },
};
