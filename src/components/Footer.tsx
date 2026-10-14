import { site } from "@site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>
          © {new Date().getFullYear()} {site.profile.name}
        </span>
        <nav aria-label="Elsewhere">
          {site.links.map((l) => (
            <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
