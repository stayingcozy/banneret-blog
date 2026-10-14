import Link from "next/link";
import { site } from "@site";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import { Projects, Profile, FindMe } from "@/components/HomeSections";

export default function Home() {
  const posts = getAllPosts();
  const shown = posts.slice(0, site.homepagePostCount);

  return (
    <div className="container">
      <Projects />

      <section className="home-section">
        <h2 className="section-title">writing</h2>
        <PostList posts={shown} />
        {posts.length > 0 && (
          <p className="more-link">
            <Link href="/articles/">all articles →</Link>
          </p>
        )}
      </section>

      <Profile />
      <FindMe />
    </div>
  );
}
