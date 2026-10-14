import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getSlugs } from "@/lib/posts";
import { PostMetaLine } from "@/components/PostList";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="article">
      <header className="article-header">
        <h1>{post.title}</h1>
        <PostMetaLine post={post} />
      </header>

      {post.toc.length > 1 && (
        <aside className="toc">
          <details open>
            <summary>Contents</summary>
            <ol>
              {post.toc.map((item) => (
                <li key={item.id} className={item.depth === 3 ? "toc-sub" : undefined}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ol>
          </details>
        </aside>
      )}

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      <footer className="article-footer">
        <Link href="/articles/">← all articles</Link>
      </footer>
    </article>
  );
}
