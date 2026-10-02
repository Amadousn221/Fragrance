import Link from "next/link";
import SectionHeading from "./SectionHeading";
import ScrollRow from "./ScrollRow";

// Section 04 : "Explorer par univers", slider horizontal premium (defilement natif).
// `blocks` : categories WooCommerce reelles deja resolues, dans l'ordre de HOME_TYPES.
// Les univers sans categorie (ou sans produit publie) ne sont pas affiches.
export default function HomeTypeSlider({ blocks }) {
  if (!blocks.length) return null;
  return (
    <section className="hm-section hm-section--tint">
      <div className="container">
        <SectionHeading title="Explorer par univers" />
        <ScrollRow label="Explorer par univers" nav={blocks.length > 3}>
          {blocks.map((b) => (
            <div key={b.key} className="hm-type__item" role="listitem">
              <Link href={b.href} className="hm-type__card">
                <span className="hm-type__media">
                  <img src={b.image} alt="" loading="lazy" decoding="async" className="hm-type__img" />
                </span>
                <span className="hm-type__caption">
                  <span className="hm-type__title">{b.label}</span>
                  <span className="hm-link hm-link--quiet">Découvrir</span>
                </span>
              </Link>
            </div>
          ))}
        </ScrollRow>
      </div>
    </section>
  );
}
