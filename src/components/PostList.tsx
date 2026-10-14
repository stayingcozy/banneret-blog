import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostMetaLine({ post }: { post: Pick<PostMeta, "date" | "readingMinutes"> }) {
  return (
    <p className="post-meta">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span title="Estimated reading time, at 220 words per minute">{post.readingMinutes} min</span>
    </p>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/articles/${post.slug}/`} className="post-card">
      <h3>{post.title}</h3>
      <PostMetaLine post={post} />
      <p className="post-excerpt">{post.excerpt}</p>
    </Link>
  );
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return <p className="muted">Nothing here yet. Add a markdown file to content/posts.</p>;
  return (
    <div className="post-list">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
