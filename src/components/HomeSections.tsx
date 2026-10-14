import { site } from "@site";

export function Projects() {
  if (site.projects.length === 0) return null;
  return (
    <section className="home-section">
      <h2 className="section-title">what i&apos;m working on</h2>
      <div className="projects">
        {site.projects.map((p) => (
          <a key={p.href} href={p.href} className="project" target="_blank" rel="noopener noreferrer">
            <strong>{p.name}</strong>
            <span>{p.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Profile() {
  const { name, pronouns, photo, bio } = site.profile;
  return (
    <section className="home-section" id="about">
      <div className="profile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} className="profile-photo" width={160} height={160} />
        <div>
          <p className="profile-name">
            {name}
            {pronouns && <> · <strong>{pronouns}</strong></>}
          </p>
          {bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FindMe() {
  if (site.links.length === 0) return null;
  return (
    <section className="home-section">
      <h2 className="section-title">find me</h2>
      <div className="findme">
        {site.links.map((l) => (
          <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
