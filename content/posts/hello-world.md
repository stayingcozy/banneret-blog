---
title: "Hello, world"
date: 2026-10-13
description: "The first post: what this site is, and how it's put together."
---

This is the first post on the new site. It's a plain markdown file in `content/posts/`, and the filename (`hello-world.md`) becomes the URL: `/articles/hello-world/`.

## Why a new blog

Mostly to have one place to write things down. Everything here is static: no accounts, no database, no comments. Just pages.

## How it's built

The site is [Next.js](https://nextjs.org) with TypeScript, exported to static HTML and hosted on AWS Amplify. Posts are markdown with a little frontmatter on top.

### Writing a post

Create a file like `content/posts/my-new-post.md`:

```md
---
title: "My new post"
date: 2026-10-20
description: "Optional. Shown in the post list instead of the first lines."
---

Start writing here.
```

Push it to GitHub and Amplify rebuilds the site in a couple of minutes.

### Drafts

Add `draft: true` to the frontmatter and the post shows up when you run `npm run dev` locally, but is left out of the live site.

## That's it

More soon.
