"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Context from "@/context/Context";
import CartModal from "@/components/modals/CartModal";
import QuickView from "@/components/modals/QuickView";
import QuickAdd from "@/components/modals/QuickAdd";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";
import SizeGuide from "@/components/modals/SizeGuide";
import Wishlist from "@/components/modals/Wishlist";
import Categories from "@/components/modals/Categories";
import AccountSidebar from "@/components/modals/AccountSidebar";
import RtlToggler from "@/components/common/RtlToggler";

// Routes du parcours client reel (WooCommerce). Les modales et outils demo du template (quick view,
// quick add, comparateur, guide des tailles, compte demo, bascule RTL) ne sont pas montes sur ces routes.
const isStorefrontRoute = (p) =>
  p === "/" ||
  p === "/shop" ||
  p === "/shopping-cart" ||
  p === "/wish-list" ||
  p.startsWith("/category/") ||
  p.startsWith("/product/");

export default function AppShell({ children }) {
  const pathname = usePathname();
  const demoTools = !isStorefrontRoute(pathname);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);
  useEffect(() => {
    // wow.js touche window au chargement du module : import cote client uniquement
    import("@/utlis/wow").then(({ default: WOW }) => {
      const wow = new WOW({
        mobile: false,
        live: false,
      });
      wow.init();
    });
  }, [pathname]);
  return (
    <Context>
      <div id="wrapper">{children}</div>
      <CartModal />
      {demoTools && <QuickView />}
      {demoTools && <QuickAdd />}
      {demoTools && <Compare />}
      <MobileMenu />
      <SearchModal />
      {demoTools && <SizeGuide />}
      <Wishlist />
      <Categories />
      {demoTools && <RtlToggler />}
      {demoTools && <AccountSidebar />}
    </Context>
  );
}
