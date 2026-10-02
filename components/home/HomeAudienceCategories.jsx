import Link from "next/link";

// Section 02 : Homme / Femme / Unisexe. Blocs editoriaux (image dominante, texte minimal).
// `blocks` : categories WooCommerce reelles deja resolues (voir lib/woocommerce/home.js).
// Desktop : blocs cote a cote. Mobile : defilement horizontal (scroll-snap, sans JavaScript).
export default function HomeAudienceCategories({ blocks }) {
  if (!blocks.length) return null;
  return (
    <section className="hm-section hm-audience">
      <div className="container">
        <ul className="hm-audience__list" style={{ "--hm-count": blocks.length }}>
          {blocks.map((b, i) => (
            <li key={b.key} className="hm-audience__item">
              <Link href={b.href} className="hm-audience__card" aria-label={b.label}>
                <img
                  src={b.image}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="hm-audience__img"
                />
                <span className="hm-audience__veil" />
                <span className="hm-audience__body">
                  <span className="hm-audience__title">{b.label}</span>
                  <span className="hm-audience__cta">Découvrir</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
