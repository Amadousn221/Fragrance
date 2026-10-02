import Link from "next/link";
import SectionHeading from "./SectionHeading";

// Section 04 : navigation par type de produit, en mosaique asymetrique (1er bloc dominant).
// Volontairement different de la section Homme/Femme : image sans voile, legende sous l'image, sans bordure.
export default function HomeTypeMosaic({ blocks }) {
  if (!blocks.length) return null;
  return (
    <section className="hm-section hm-section--tint">
      <div className="container">
        <SectionHeading title="Explorer par univers" />
        <ul className="hm-mosaic" data-count={blocks.length}>
          {blocks.map((b) => (
            <li key={b.key} className="hm-mosaic__item">
              <Link href={b.href} className="hm-mosaic__card">
                <span className="hm-mosaic__media">
                  <img src={b.image} alt="" loading="lazy" decoding="async" className="hm-mosaic__img" />
                </span>
                <span className="hm-mosaic__caption">
                  <span className="hm-mosaic__title">{b.label}</span>
                  <span className="hm-link hm-link--quiet">Découvrir</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
