import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Hero from "@/components/homes/home-1/Hero";
import HomeAudienceCategories from "@/components/home/HomeAudienceCategories";
import HomeNewArrivals from "@/components/home/HomeNewArrivals";
import HomeTypeSlider from "@/components/home/HomeTypeSlider";
import HomeFeatured from "@/components/home/HomeFeatured";
import NewsletterSection from "@/components/home/NewsletterSection";
import HomeReassurance from "@/components/home/HomeReassurance";
import { isWooConfigured } from "@/lib/woocommerce";
import { getHomeCategoryBlocks, getHomeFeatured, getHomeNewArrivals } from "@/lib/woocommerce/home";
import {
  HOME_FEATURED_COUNT,
  HOME_FEATURED_MIN,
  HOME_HERO_SLIDES,
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

  return (
    <>
      <Topbar />
      <Header1 />
      <Hero slides={HOME_HERO_SLIDES} className="hm-hero" />
      <HomeAudienceCategories blocks={categoryBlocks.audiences} />
      <HomeNewArrivals {...arrivals} />
      <HomeTypeSlider blocks={categoryBlocks.types} />
      <HomeFeatured {...featured} />
      <NewsletterSection />
      <HomeReassurance />
      <Footer1 />
    </>
  );
}
