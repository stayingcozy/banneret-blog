// ─────────────────────────────────────────────────────────────
// Everything personal lives here. Edit this file, push, done.
// ─────────────────────────────────────────────────────────────

type Link = { label: string; href: string };

export type SiteConfig = {
  title: string;
  url: string;
  description: string;
  accent: string;
  homepagePostCount: number;
  nav: Link[];
  projects: { name: string; label: string; href: string }[];
  profile: { name: string; pronouns: string; photo: string; bio: string[] };
  links: Link[];
};

export const site: SiteConfig = {
  /** Shown in the title bar and browser tab. */
  title: "banneret.io",
  /** Full URL once your Route 53 domain is attached (used for metadata). */
  url: "https://banneret.io",
  description: "Writing about software, how computers work, and whatever else.",

  /** Accent color used for links, the title bar mark and highlights. */
  accent: "#f64c4c",

  /** How many posts to show on the homepage before "all articles →". */
  homepagePostCount: 8,

  /** Title bar links (right side). */
  nav: [
    { label: "articles", href: "/articles/" },
    { label: "about", href: "/#about" },
  ],

  /** "what I'm working on" — small cards with a bold name and a short label. */
  projects: [
    { name: "project one", label: "short description", href: "https://github.com/you/project-one" },
    { name: "project two", label: "what it does", href: "https://github.com/you/project-two" },
    { name: "project three", label: "one-liner", href: "https://example.com" },
  ],

  /** Profile section (bottom of the homepage). */
  profile: {
    name: "Your Name",
    pronouns: "they/them", // set to "" to hide
    photo: "/avatar.svg", // drop your own image in /public and point here
    bio: [
      "A sentence or two about who you are and what you write about.",
      "Something you care about or are focused on this year.",
    ],
  },

  /** "find me" links (also shown in the footer). */
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
    { label: "X", href: "https://x.com/your-handle" },
    { label: "GitHub", href: "https://github.com/your-handle" },
  ],
};
