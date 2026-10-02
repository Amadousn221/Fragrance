import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Hero from "@/components/homes/home-1/Hero";
import HomeNewArrivals from "@/components/woocommerce/HomeNewArrivals";

export const metadata = {
  title: "Fragrance",
  description: "Boutique lifestyle : sneakers, parfums, vêtements, sacs et accessoires.",
};

export const revalidate = 300;

// Accueil provisoire : Hero + produits reels WooCommerce. La page definitive sera concue dans un lot dedie.
export default function HomePage() {
  return (
    <>
      <Topbar />
      <Header1 />
      <Hero />
      <HomeNewArrivals />
      <Footer1 />
    </>
  );
}
