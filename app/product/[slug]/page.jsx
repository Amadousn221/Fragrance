import { notFound } from "next/navigation";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { getProductBySlug, isWooConfigured } from "@/lib/woocommerce";

export const revalidate = 300;

async function load(slug) {
  if (!isWooConfigured()) return { error: "Catalogue non connecté." };
  try {
    const product = await getProductBySlug(slug);
    return product ? { product } : { missing: true };
  } catch {
    return { error: "Le catalogue est momentanément indisponible." };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product } = await load(slug);
  return { title: product ? `${product.title} | Fragrance` : "Produit | Fragrance" };
}

// Page produit WooCommerce minimale : donnees reelles (images, prix, stock, variations).
// La fiche riche du template (Details1) sera branchee sur ces donnees a l'etape suivante.
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { product, error, missing } = await load(slug);
  if (missing) notFound();

  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <PageTitle title={product?.title || "Produit"} trail={[{ href: "/shop", label: "Boutique" }]} />
      {error ? (
        <CatalogNotice>{error}</CatalogNotice>
      ) : (
        <section className="flat-spacing">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {product.images.map((img) => (
                  <img key={img.id} src={img.src} alt={img.alt} className="w-100 mb-3" />
                ))}
              </div>
              <div className="col-md-6">
                <h2 className="mb-3">{product.title}</h2>
                <div className="h4 mb-3">
                  {product.price != null && `${product.price.toFixed(2)} €`}
                  {product.oldPrice && (
                    <span className="text-decoration-line-through ms-2 text-secondary">
                      {product.oldPrice.toFixed(2)} €
                    </span>
                  )}
                </div>
                <p>{product.inStock ? "En stock" : "Rupture de stock"}</p>
                <p>{product.shortDescription}</p>
                {product.variations.length > 0 && (
                  <ul className="list-unstyled">
                    {product.variations.map((v) => (
                      <li key={v.id}>
                        {v.attributes.map((a) => `${a.name} : ${a.option}`).join(", ")} —{" "}
                        {v.price != null ? `${v.price.toFixed(2)} €` : "—"} —{" "}
                        {v.inStock ? "En stock" : "Rupture"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer1 />
    </>
  );
}
