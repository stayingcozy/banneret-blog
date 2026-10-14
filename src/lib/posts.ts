import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { renderMarkdown } from "./markdown";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 220;

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  readingMinutes: number;
};

export type TocItem = { depth: 2 | 3; text: string; id: string };

export type Post = PostMeta & { html: string; toc: TocItem[] };

type Frontmatter = {
  title?: string;
  date?: string | Date;
  description?: string;
  draft?: boolean;
};

function readFile(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return { data: data as Frontmatter, content };
}

function toIsoDate(d: Frontmatter["date"], slug: string): string {
  if (!d) throw new Error(`Post "${slug}" is missing a date in its frontmatter.`);
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) throw new Error(`Post "${slug}" has an invalid date: ${d}`);
  return date.toISOString().slice(0, 10);
}

/** Strip markdown down to plain text (good enough for excerpts and word counts). */
function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+.*$/gm, " ")
    .replace(/[*_>~|#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(content: string, max = 200): string {
  const text = plainText(content);
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function readingMinutes(content: string): number {
  // Same convention as the reference site: one "word" = 5 characters.
  const chars = plainText(content).length;
  return Math.max(1, Math.round(chars / 5 / WORDS_PER_MINUTE));
}

/** h2/h3 headings, with ids that match what rehype-slug generates. */
function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const items: TocItem[] = [];
  for (const line of withoutCode.split("\n")) {
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = plainText(m[2]) || m[2];
    const id = slugger.slug(text); // slug every heading so duplicates number the same way
    if (depth === 2 || depth === 3) items.push({ depth, text, id });
  }
  return items;
}

function isPublished(data: Frontmatter) {
  return !(data.draft && process.env.NODE_ENV === "production");
}

export function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => isPublished(readFile(slug).data));
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const { data, content } = readFile(slug);
      return {
        slug,
        title: data.title ?? slug,
        date: toIsoDate(data.date, slug),
        excerpt: data.description ?? makeExcerpt(content),
        readingMinutes: readingMinutes(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const { data, content } = readFile(slug);
  return {
    slug,
    title: data.title ?? slug,
    date: toIsoDate(data.date, slug),
    excerpt: data.description ?? makeExcerpt(content),
    readingMinutes: readingMinutes(content),
    html: await renderMarkdown(content),
    toc: extractToc(content),
  };
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "2-digit", year: "numeric" }) {
  // Parse as UTC so the date never shifts a day depending on the build machine's timezone.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}
