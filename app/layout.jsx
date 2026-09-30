import "@/public/fonts/fonts.css";
import "@/public/fonts/font-icons.css";
import "@/public/css/bootstrap.min.css";
import "@/public/css/swiper-bundle.min.css";
import "@/public/css/animate.css";
import "@/public/css/bootstrap-select.min.css";
import "photoswipe/style.css";
import "react-range-slider-input/dist/style.css";
import "@/public/css/image-compare-viewer.css";
import "@/styles/style.scss";
import AppShell from "@/components/common/AppShell";

export const metadata = {
  title: "Fragrance",
  description: "Boutique lifestyle : sneakers, parfums, vêtements, sacs et accessoires.",
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="preload-wrapper popup-loader">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
