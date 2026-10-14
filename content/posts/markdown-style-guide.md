---
title: "Markdown style guide"
date: 2026-10-12
draft: false
---

A quick tour of everything a post can contain, so you can see how each piece looks. Delete this file whenever you like.

## Text

Regular paragraphs, **bold**, *italic*, ~~strikethrough~~, `inline code`, and [links](https://example.com). External links open in a new tab.

> Blockquotes get an accent bar on the left. Good for quoting someone or calling something out.

## Lists

- Unordered lists
- With a few items
  - And nesting

1. Ordered lists
2. Work too

- [x] Task lists
- [ ] From GitHub-flavored markdown

## Code

Fenced blocks are highlighted when you name the language:

```ts
type Post = { slug: string; title: string; date: string };

export function newest(posts: Post[]): Post | undefined {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];
}
```

```rust
fn main() {
    let greeting = "hello";
    println!("{greeting}, world"); // prints: hello, world
}
```

```bash
npm run dev
```

## Images

Put images in `public/images/` and reference them from the root. Add a title in quotes and it becomes a caption:

![Placeholder avatar](/avatar.svg "This caption comes from the image title.")

## Tables

| Feature | Supported |
| ------- | --------- |
| Tables | yes |
| Footnotes | yes[^1] |
| Raw HTML | yes |

[^1]: Footnotes land at the bottom of the post.

## Headings

### Third-level headings

These show up indented in the table of contents. Fourth-level and below are left out of it to keep it short.
