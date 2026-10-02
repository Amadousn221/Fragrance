import { HOME_REASSURANCE } from "@/lib/woocommerce/home-config";

// Icones lineaires minimalistes (trait fin, couleur du texte).
const ICONS = {
  livraison: (
    <>
      <path d="M2 6h11v9H2z" />
      <path d="M13 9h4l3 3v3h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  paiement: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  service: (
    <>
      <path d="M4 13v-1a8 8 0 0116 0v1" />
      <path d="M4 13h3v5H4zM17 13h3v5h-3z" />
      <path d="M20 18c0 2-2 3-5 3" />
    </>
  ),
  selection: <path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1 5.6L12 15.6 7.1 18.4l1-5.6L4 8.9l5.6-.7z" />,
};

// Section 07 : 4 elements de reassurance. Les textes sont dans lib/woocommerce/home-config.js.
export default function HomeReassurance() {
  return (
    <section className="hm-section hm-reassurance">
      <div className="container">
        <ul className="hm-reassurance__list">
          {HOME_REASSURANCE.map((item) => (
            <li key={item.key} className="hm-reassurance__item">
              <svg
                className="hm-reassurance__icon"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[item.key]}
              </svg>
              <h3 className="hm-reassurance__title">{item.title}</h3>
              <p className="hm-reassurance__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
