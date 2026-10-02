// En-tete de section de l'accueil : titre centre, gras, avec un mot mis en valeur (fond teinte),
// petit trait d'accent arrondi et sous-titre court facultatif.
// `highlight` : mot (ou fin du titre) a mettre en valeur ; ignore s'il n'apparait pas dans `title`.
export default function SectionHeading({ title, highlight, subtitle }) {
  const i = highlight ? title.lastIndexOf(highlight) : -1;
  return (
    <div className="hm-heading">
      <h2 className="hm-heading__title">
        {i >= 0 ? (
          <>
            {title.slice(0, i)}
            <span className="hm-heading__mark">{highlight}</span>
            {title.slice(i + highlight.length)}
          </>
        ) : (
          title
        )}
      </h2>
      <span className="hm-heading__bar" aria-hidden="true" />
      {subtitle && <p className="hm-heading__sub">{subtitle}</p>}
    </div>
  );
}
