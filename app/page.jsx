import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Hero from "@/components/homes/home-1/Hero";
import Collections from "@/components/homes/fashion-classyCove/Collections";
import Products from "@/components/homes/fashion-chicHaven-02/Products";
import Banner from "@/components/homes/home-pickleball/Banner";
import BannerCollection from "@/components/homes/home-1/BannerCollection";
import Products1 from "@/components/homes/sock/Products1";
import NewsLetter from "@/components/homes/jewelry-02/NewsLetter";
import Features from "@/components/common/Features";
import { isWooConfigured } from "@/lib/woocommerce";
import { getHomeCategoryBlocks, getHomeFeatured, getHomeNewArrivals } from "@/lib/woocommerce/home";
import {
  resolveEditorialBlocks,
  HOME_FEATURED_COUNT,
  HOME_FEATURED_MIN,
  HOME_HERO_SLIDES,
  HOME_REASSURANCE,
  HOME_UNIVERSE_KEYS,
  HOME_NEW_ARRIVALS_COUNT,
} from "@/lib/woocommerce/home-config";
import "@/styles/home.scss";

export const metadata = {
  title: "Fragrance",
  description: "Boutique lifestyle : sneakers, parfums, vêtements, sacs et accessoires.",
};

export const revalidate = 300;

const UNAVAILABLE = "Le catalogue est momentanément indisponible.";

// Accueil : Hero > Homme/Femme/Unisexe > Nouveautes > Types > Selection > Newsletter > Reassurance.
// Produits et categories viennent de WooCommerce ; l'echec d'une section n'empeche pas les autres.
export default async function HomePage() {
  const configured = isWooConfigured();
  const [categoryBlocks, arrivals] = await Promise.all([
    getHomeCategoryBlocks(),
    configured
      ? getHomeNewArrivals(HOME_NEW_ARRIVALS_COUNT).then(
          (products) => ({ products }),
          () => ({ products: [], error: UNAVAILABLE })
        )
      : Promise.resolve({ products: [], error: "Catalogue non connecté." }),
  ]);
  const featured = configured
    ? await getHomeFeatured({
        count: HOME_FEATURED_COUNT,
        min: HOME_FEATURED_MIN,
        exclude: arrivals.products.map((p) => p.id),
      }).then(
        (r) => ({ products: r.products }),
        () => ({ products: [], error: UNAVAILABLE })
      )
    : { products: [] };

  const universes = categoryBlocks.types.filter((b) => HOME_UNIVERSE_KEYS.includes(b.key));

  return (
    <>
      <Topbar />
      <Header1 />
      <Hero slides={HOME_HERO_SLIDES} className="hm-hero" />
      <Collections
        className="hm-collections"
        btnClass="tf-btn btn-fill btn-white"
        btnIcon
        title="Pour lui, pour elle"
        subtitle="Choisissez votre univers."
        items={categoryBlocks.audiences.map((b) => ({
          id: b.key,
          imgSrc: b.image,
          alt: b.label,
          title: b.label,
          desc: `${b.count} produit${b.count > 1 ? "s" : ""}`,
          btnText: "Découvrir",
          href: b.href,
        }))}
      />
      <Products
        className="hm-arrivals"
        parentClass="flat-spacing"
        title="Nouveautés"
        subtitle="Les dernières arrivées en boutique."
        href="/shop"
        linkLabel="VOIR TOUT"
        wooProducts={arrivals.products}
        error={arrivals.error}
      />
      <Collections
        className={`hm-collections hm-collections--grid hm-collections--n${universes.length}`}
        btnClass="tf-btn btn-fill btn-white"
        btnIcon
        title="Explorer par univers"
        subtitle=""
        items={universes.map((b) => ({
          id: b.key,
          imgSrc: b.image,
          alt: b.label,
          title: b.label,
          desc: `${b.count} produit${b.count > 1 ? "s" : ""}`,
          btnText: "Découvrir",
          href: b.href,
        }))}
      />
      <BannerCollection
        className="hm-editorial"
        items={resolveEditorialBlocks(categoryBlocks.types).map((b) => ({
          id: b.key,
          imgSrc: b.image,
          alt: b.title,
          title: b.title,
          desc: b.text,
          btnText: "DÉCOUVRIR",
          href: b.href,
        }))}
      />
      <Banner
        className="hm-brand"
        imgSrc="/images/banner/banner-shop.jpg"
        label="NOTRE UNIVERS"
        title="Une sélection pensée pour votre style."
        text="Fragrance réunit une sélection de parfums, accessoires et essentiels lifestyle choisis pour leur style et leur caractère."
        btnText="DÉCOUVRIR LA BOUTIQUE"
        href="/shop"
      />
      <Products1
        className="hm-featured"
        parentClass="flat-spacing"
        title="Sélection du moment"
        subtitle=""
        href="/shop"
        linkLabel="VOIR LA BOUTIQUE"
        wooProducts={featured.products}
        error={featured.error}
      />
      <NewsLetter
        live
        className="hm-newsletter"
        title="Rejoignez l'univers Fragrance"
        text="Nouveautés, sélections et offres directement dans votre boîte mail."
        placeholder="Votre adresse e-mail"
        btnLabel="S'INSCRIRE"
      />
      <Features
        className="hm-reassurance"
        parentClass="flat-spacing-9"
        items={HOME_REASSURANCE}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 4, spaceBetween: 15 },
        }}
      />
      <Footer1 />
    </>
  );
}
