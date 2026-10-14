import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="page-title">Not found</h1>
      <p>That page doesn&apos;t exist (or doesn&apos;t anymore).</p>
      <p>
        <Link href="/">← back home</Link>
      </p>
    </div>
  );
}
