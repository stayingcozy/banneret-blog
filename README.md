# banneret.io

A small, static blog: Next.js + TypeScript + Markdown, hosted on AWS Amplify.

- **Homepage:** title bar → what I'm working on → writing → profile → find me
- **Articles:** `/articles/` (grouped by month) and `/articles/<slug>/`
- **Auto light/dark** theme, table of contents on each post, code highlighting, captioned images
- No accounts, no database, no server: `next build` outputs plain files to `out/`

## Run it locally

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm install` creates `package-lock.json` — commit it so Amplify installs the exact same versions.

## Make it yours

Edit **`site.config.ts`**: site title, accent color, nav links, projects, name, bio, photo and links. Put your photo in `public/` (e.g. `public/me.jpg`) and set `profile.photo: "/me.jpg"`. Replace `src/app/icon.svg` for your own favicon.

## Write a post

Add a file to `content/posts/`. The filename is the URL slug.

```md
---
title: "My new post"
date: 2026-10-20
description: "Optional summary for the post list. If omitted, the first lines are used."
draft: false   # true = visible in `npm run dev` only
---

Your post here. `## Headings` and `### Subheadings` build the table of contents.
```

Images go in `public/images/` and are referenced as `/images/name.png`. Add a quoted title to get a caption: `![alt text](/images/name.png "Caption here")`.

`content/posts/markdown-style-guide.md` shows every supported element; delete it when you're done with it.

## Deploy to Amplify with banneret.io

1. **Push to GitHub.** Create an empty repo, then:
   ```bash
   git init && git add -A && git commit -m "Initial blog"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. **Create the Amplify app.** AWS Console → Amplify → *Create new app* → GitHub → authorize → pick the repo and `main` branch. Amplify reads `amplify.yml` from the repo (build output is `out/`). Save and deploy.
3. **Add a 404 page rule.** In the app: *Hosting → Rewrites and redirects → Manage* and add:
   | Source | Target | Type |
   | ------ | ------ | ---- |
   | `/<*>` | `/404.html` | 404 (Rewrite) |
4. **Attach banneret.io.** *Hosting → Custom domains → Add domain*. Because `banneret.io` is in Route 53 in the same AWS account, it appears in the dropdown. Select it, keep the root and `www` subdomains, and confirm. Amplify creates the DNS records and the SSL certificate for you; it usually takes 15–30 minutes to go green.

The site is then live at https://banneret.io and https://www.banneret.io (`site.config.ts` already has `url: "https://banneret.io"`).

After that, every push to `main` rebuilds and publishes the site.
