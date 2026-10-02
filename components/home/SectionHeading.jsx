import Link from "next/link";

// En-tete de section de l'accueil : titre, sous-titre court facultatif et lien discret.
export default function SectionHeading({ title, subtitle, href, linkLabel }) {
  return (
    <div className="hm-heading">
      <div>
        <h2 className="hm-heading__title">{title}</h2>
        {subtitle && <p className="hm-heading__sub">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="hm-link">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
