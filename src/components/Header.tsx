import Link from "next/link";
import { site } from "@site";

export default function Header() {
  return (
    <header className="titlebar">
      <div className="titlebar-inner">
        <Link href="/" className="titlebar-brand">
          <span className="titlebar-mark" aria-hidden="true" />
          {site.title}
        </Link>
        <nav className="titlebar-nav" aria-label="Main">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
