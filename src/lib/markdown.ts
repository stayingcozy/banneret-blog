import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Turns a paragraph that contains only an image with a title into a captioned figure:
 *   ![A cat](/img/cat.jpg "My cat, judging me")
 * becomes <figure><img …><figcaption>My cat, judging me</figcaption></figure>
 * Also makes every image lazy-load.
 */
function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties = { ...node.properties, loading: "lazy", decoding: "async" };
      }
      if (node.tagName !== "p") return;
      const kids = node.children.filter((c) => !(c.type === "text" && c.value.trim() === ""));
      if (kids.length !== 1) return;
      const img = kids[0];
      if (img.type !== "element" || img.tagName !== "img") return;
      const title = img.properties?.title;
      if (typeof title !== "string" || !title) return;
      delete img.properties.title;
      node.tagName = "figure";
      node.children = [
        img,
        { type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: title }] },
      ];
    });
  };
}

/** External links open in a new tab. */
function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const href = node.properties?.href;
      if (node.tagName === "a" && typeof href === "string" && /^https?:\/\//.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "noreferrer"];
      }
    });
  };
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["anchor"], ariaLabel: "Link to this section" },
      content: { type: "text", value: "#" },
    })
    // Only highlights fenced blocks that name a language (```ts). Unknown languages are left plain.
    .use(rehypeHighlight, { detect: false })
    .use(rehypeFigures)
    .use(rehypeExternalLinks)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}
