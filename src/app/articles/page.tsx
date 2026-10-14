import type { Metadata } from "next";
import { getAllPosts, formatDate, type PostMeta } from "@/lib/posts";
import PostList from "@/components/PostList";

export const metadata: Metadata = { title: "Articles" };

function groupByMonth(posts: PostMeta[]) {
  const groups = new Map<string, PostMeta[]>();
  for (const p of posts) {
    const key = formatDate(p.date, { month: "long", year: "numeric" });
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  return [...groups.entries()];
}

export default function ArticlesPage() {
  const posts = getAllPosts();
  return (
    <div className="container">
      <h1 className="page-title">Articles</h1>
      {posts.length === 0 && <PostList posts={[]} />}
      {groupByMonth(posts).map(([month, items]) => (
        <section key={month} className="month-group">
          <h2 className="month-label">{month}</h2>
          <PostList posts={items} />
        </section>
      ))}
    </div>
  );
}
