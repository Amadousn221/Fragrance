import "./styles/style.scss";
import { useEffect, useState } from "react";

import Context from "@/context/Context";
import CartModal from "@/components/modals/CartModal";
import QuickView from "@/components/modals/QuickView";
import QuickAdd from "@/components/modals/QuickAdd";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import NewsLetterModal from "@/components/modals/NewsLetterModal";
import SearchModal from "@/components/modals/SearchModal";
import SizeGuide from "@/components/modals/SizeGuide";
import Wishlist from "@/components/modals/Wishlist";
import DemoModal from "@/components/modals/DemoModal";
import Categories from "@/components/modals/Categories";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages";
import HomeFashionElegentNestPage from "./pages/homes/home-fashion-eleganceNest";
import HomeFashionMainPage from "./pages/homes/home-fashion-main";
import HomeFashionTrendsetPage from "./pages/homes/home-fashion-trendset";
import HomeFashionVoguelingPage from "./pages/homes/home-fashion-vogueLing";
import HomeFashionElegantAbodePage from "./pages/homes/home-fashion-elegantAbode";
import HomeFashionGlamdwellPage from "./pages/homes/home-fashion-glamDwell";
import HomeFashionClassyCovePage from "./pages/homes/home-fashion-classyCove";
import HomeFashionChicHavenPage from "./pages/homes/home-fashion-chicHaven";
import HomeFashionChicHavenPage2 from "./pages/homes/home-fashion-chicHaven-02";
import HomeFashionTiktokPage from "./pages/homes/home-fashion-tiktok";
import HomeFasionLuxelivingPage from "./pages/homes/home-fashion-luxeLiving";
import HomeFashionModernRetreatPage from "./pages/homes/home-fashion-modernRetreat";
import HomeBeautyPage from "./pages/homes/home-beauty";
import HomeSkincarePage from "./pages/homes/home-skincare";
import HomeCosmeticPage from "./pages/homes/home-cosmetic";
import HomeDecorPage from "./pages/homes/home-decor";
import HomeFurniturePage from "./pages/homes/home-furniture";
import HomeJeweleryPage1 from "./pages/homes/home-jewelry-01";
import HomeJeweleryPage2 from "./pages/homes/home-jewelry-02";
import HomeActivemearPage from "./pages/homes/home-activewear";
import HomeOrganicPage from "./pages/homes/home-organic";
import HomeSockPage from "./pages/homes/home-sock";
import HomeCampingPage from "./pages/homes/home-camping";
import HomeElectronicPage from "./pages/homes/home-electronic";
import HomePetStorePage from "./pages/homes/home-pet-store";
import ShopDefaultGridPage from "./pages/products/shop-default-grid";
import ShopDefaultListPage from "./pages/products/shop-default-list";
import ShopFullwidthListPage from "./pages/products/shop-fullwidth-list";
import ShopFullwidthGridPage from "./pages/products/shop-fullwidth-grid";
import ShopLeftSidebarPage from "./pages/products/shop-left-sidebar";
import ShopRightSidebarPage from "./pages/products/shop-right-sidebar";
import ShopFilterDropdownPage from "./pages/products/shop-filter-dropdown";
import ShopFilterCanvasPage from "./pages/products/shop-filter-canvas";
import ShopCategoriesTopPage1 from "./pages/products/shop-categories-top";
import ShopCategoriesTopPag2 from "./pages/products/shop-categories-top-02";
import ShopCollectionPage from "./pages/products/shop-collection";
import ShopBreadcumbImgPage from "./pages/products/shop-breadcrumb-img";
import ShopBreadcumbLeftPage from "./pages/products/shop-breadcrumb-left";
import ShopBreadcumbBackgroundPage from "./pages/products/shop-breadcrumb-background";
import ShopLoadButtonPage from "./pages/products/shop-load-button";
import ShopPaginationPage from "./pages/products/shop-pagination";
import ShopInfinateScrollingPage from "./pages/products/shop-infinite-scrolling";
import ProductStylePage1 from "./pages/products/product-style-01";
import ProductStylePage2 from "./pages/products/product-style-02";
import ProductStylePage3 from "./pages/products/product-style-03";
import ProductStylePage4 from "./pages/products/product-style-04";
import ProductStylePage5 from "./pages/products/product-style-05";
import ProductStylePage6 from "./pages/products/product-style-06";
import ProductStylePage7 from "./pages/products/product-style-07";
import WishListPage from "./pages/other-pages/wish-list";
import SearchResultPage from "./pages/products/search-result";
import ShopingCartPage from "./pages/products/shopping-cart";
import LoginPage from "./pages/other-pages/login";
import ForgotPasswordPage from "./pages/other-pages/forget-password";
import OrderTrackingPage from "./pages/other-pages/order-tracking";
import MyAccountPage from "./pages/my-account/my-account";
import ProductDetailPage from "./pages/productDetails/product-detail";
import ProductGridPage1 from "./pages/productDetails/product-grid-1";
import ProductGridPage2 from "./pages/productDetails/product-grid-2";
import ProductStackedPage from "./pages/productDetails/product-stacked";
import ProductRighrThumbnailPage from "./pages/productDetails/product-right-thumbnails";
import ProductBottomThumbnailPage from "./pages/productDetails/product-bottom-thumbnails";
import ProductDescriptionAccordionPage from "./pages/productDetails/product-description-accordion";
import ProductDescriptionListPage from "./pages/productDetails/product-description-list";
import ProductDescriptionMenutabPage from "./pages/productDetails/product-description-menutab";
import ProductDescriptionFullwidthPage from "./pages/productDetails/product-description-fullwidth";
import ProductFixedProcePage from "./pages/productDetails/product-fixed-price";
import ProductFixedScrollPage from "./pages/productDetails/product-fixed-scroll";
import ProductSwatchColorPage from "./pages/productDetails/product-swatch-color";
import ProductSwatchRoundedPage from "./pages/productDetails/product-swatch-rounded";
import ProductSwatchRoundedColorPage from "./pages/productDetails/product-swatch-rounded-color";
import ProductSwatchImagePage from "./pages/productDetails/product-swatch-image";
import ProductSwatchRoundedImagePage from "./pages/productDetails/product-swatch-rounded-image";
import ProductSwatchDropdownPage from "./pages/productDetails/product-swatch-dropdown";
import ProductSwatchDropdownColorPage from "./pages/productDetails/product-swatch-dropdown-color";
import ProductFrequentlyBoughtTogetherPage1 from "./pages/productDetails/product-frequently-bought-together";
import ProductFrequentlyBoughtTogetherPage2 from "./pages/productDetails/product-frequently-bought-together-02";
import ProductUpSellPage from "./pages/productDetails/product-up-sell";
import ProductPreorderPage from "./pages/productDetails/product-pre-order";
import ProductGroupedPage from "./pages/productDetails/product-grouped";
import ProductCustomerNotePage from "./pages/productDetails/product-customer-note";
import ProductOutOfStockPage from "./pages/productDetails/product-out-of-stock";
import ProductPickupAvailablePage from "./pages/productDetails/product-pickup-available";
import ProductVariablePage from "./pages/productDetails/product-variable";
import ProductDealsPage from "./pages/productDetails/product-deals";
import ProductWithDiscountPage from "./pages/productDetails/product-with-discount";
import ProductExternalPage from "./pages/productDetails/product-external";
import ProductSubscribeSavePage from "./pages/productDetails/product-subscribe-save";
import BlogDefaultPage from "./pages/blogs/blog-default";
import BlogListPage from "./pages/blogs/blog-list";
import BlogGridPage from "./pages/blogs/blog-grid";
import BlogDetailsPage1 from "./pages/blogs/blog-detail";
import BlogDetailsPage2 from "./pages/blogs/blog-detail-02";
import AboutUsPage from "./pages/other-pages/about-us";
import StorelistPage from "./pages/other-pages/store-list";
import StorelistPage2 from "./pages/other-pages/store-list-02";
import ContactPage from "./pages/other-pages/contact";
import ContactPage2 from "./pages/other-pages/contact-02";
import PageNotFoundPage from "./pages/not-found";
import FAQSPage from "./pages/other-pages/FAQs";
import TermsOfUsePage from "./pages/other-pages/term-of-use";
import CommingSoonPage from "./pages/other-pages/coming-soon";
import CustomerFeedbackPage from "./pages/other-pages/customer-feedback";
import WOW from "@/utlis/wow";
import CompareProductsPage from "./pages/other-pages/compare-products";
import HomePickleballPage from "./pages/homes/home-pickleball";
import HomeSock02Page from "./pages/homes/home-sock-2";
import HomeBookstorePage from "./pages/homes/home-bookstore";
import HomeBabyPage from "./pages/homes/home-baby";
import HomeElectronicsStorePage from "./pages/homes/home-electronics-store";
import HomeSneakerPage from "./pages/homes/home-sneaker";
import HomeGamingPage from "./pages/homes/home-gaming";
import RtlToggler from "./components/common/RtlToggler";
import ProductDetailPageBuyxGetY from "./pages/productDetails/product-buyx-gety";
import ProductDetailPageDealsGrid from "./pages/productDetails/product-deals-grid";
import AccountSidebar from "./components/modals/AccountSidebar";
function App() {
  const { pathname } = useLocation();
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
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <>
      <Context>
        <div id="wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route
                path="home-fashion-eleganceNest"
                element={<HomeFashionElegentNestPage />}
              />
              <Route
                path="home-fashion-main"
                element={<HomeFashionMainPage />}
              />
              <Route
                path="home-fashion-trendset"
                element={<HomeFashionTrendsetPage />}
              />
              <Route
                path="home-fashion-vogueLing"
                element={<HomeFashionVoguelingPage />}
              />
              <Route
                path="home-fashion-elegantAbode"
                element={<HomeFashionElegantAbodePage />}
              />
              <Route
                path="home-fashion-glamDwell"
                element={<HomeFashionGlamdwellPage />}
              />
              <Route
                path="home-fashion-classyCove"
                element={<HomeFashionClassyCovePage />}
              />
              <Route
                path="home-fashion-chicHaven"
                element={<HomeFashionChicHavenPage />}
              />
              <Route
                path="home-fashion-chicHaven-02"
                element={<HomeFashionChicHavenPage2 />}
              />
              <Route
                path="home-fashion-tiktok"
                element={<HomeFashionTiktokPage />}
              />
              <Route
                path="home-fashion-luxeLiving"
                element={<HomeFasionLuxelivingPage />}
              />
              <Route
                path="home-fashion-modernRetreat"
                element={<HomeFashionModernRetreatPage />}
              />
              <Route path="home-beauty" element={<HomeBeautyPage />} />
              <Route path="home-skincare" element={<HomeSkincarePage />} />
              <Route path="home-cosmetic" element={<HomeCosmeticPage />} />
              <Route path="home-decor" element={<HomeDecorPage />} />
              <Route path="home-furniture" element={<HomeFurniturePage />} />
              <Route path="home-jewelry-01" element={<HomeJeweleryPage1 />} />
              <Route path="home-jewelry-02" element={<HomeJeweleryPage2 />} />
              <Route path="home-activewear" element={<HomeActivemearPage />} />
              <Route path="home-organic" element={<HomeOrganicPage />} />
              <Route path="home-sock" element={<HomeSockPage />} />
              <Route path="home-camping" element={<HomeCampingPage />} />
              <Route path="home-electronic" element={<HomeElectronicPage />} />
              <Route path="home-pet-store" element={<HomePetStorePage />} />

              <Route path="home-pickleball" element={<HomePickleballPage />} />
              <Route path="home-sock-2" element={<HomeSock02Page />} />
              <Route path="home-bookstore" element={<HomeBookstorePage />} />
              <Route path="home-baby" element={<HomeBabyPage />} />
              <Route
                path="home-electronics-store"
                element={<HomeElectronicsStorePage />}
              />
              <Route path="home-sneaker" element={<HomeSneakerPage />} />
              <Route path="home-gaming" element={<HomeGamingPage />} />

              <Route
                path="shop-default-grid"
                element={<ShopDefaultGridPage />}
              />
              <Route
                path="shop-default-list"
                element={<ShopDefaultListPage />}
              />
              <Route
                path="shop-fullwidth-list"
                element={<ShopFullwidthListPage />}
              />
              <Route
                path="shop-fullwidth-grid"
                element={<ShopFullwidthGridPage />}
              />
              <Route
                path="shop-left-sidebar"
                element={<ShopLeftSidebarPage />}
              />
              <Route
                path="shop-right-sidebar"
                element={<ShopRightSidebarPage />}
              />
              <Route
                path="shop-filter-dropdown"
                element={<ShopFilterDropdownPage />}
              />
              <Route
                path="shop-filter-canvas"
                element={<ShopFilterCanvasPage />}
              />
              <Route
                path="shop-categories-top"
                element={<ShopCategoriesTopPage1 />}
              />
              <Route
                path="shop-categories-top-02"
                element={<ShopCategoriesTopPag2 />}
              />
              <Route path="shop-collection" element={<ShopCollectionPage />} />
              <Route
                path="shop-breadcrumb-img"
                element={<ShopBreadcumbImgPage />}
              />
              <Route
                path="shop-breadcrumb-left"
                element={<ShopBreadcumbLeftPage />}
              />
              <Route
                path="shop-breadcrumb-background"
                element={<ShopBreadcumbBackgroundPage />}
              />
              <Route path="shop-load-button" element={<ShopLoadButtonPage />} />
              <Route path="shop-pagination" element={<ShopPaginationPage />} />
              <Route
                path="shop-infinite-scrolling"
                element={<ShopInfinateScrollingPage />}
              />
              <Route path="product-style-01" element={<ProductStylePage1 />} />
              <Route path="product-style-02" element={<ProductStylePage2 />} />
              <Route path="product-style-03" element={<ProductStylePage3 />} />
              <Route path="product-style-04" element={<ProductStylePage4 />} />
              <Route path="product-style-05" element={<ProductStylePage5 />} />
              <Route path="product-style-06" element={<ProductStylePage6 />} />
              <Route path="product-style-07" element={<ProductStylePage7 />} />
              <Route path="wish-list" element={<WishListPage />} />
              <Route
                path="compare-products"
                element={<CompareProductsPage />}
              />
              <Route path="search-result" element={<SearchResultPage />} />
              <Route path="shopping-cart" element={<ShopingCartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forget-password" element={<ForgotPasswordPage />} />
              <Route path="order-tracking" element={<OrderTrackingPage />} />
              <Route path="my-account" element={<MyAccountPage />} />

              <Route
                path="product-detail/:id"
                element={<ProductDetailPage />}
              />
              <Route path="product-grid-1/:id" element={<ProductGridPage1 />} />
              <Route path="product-grid-2/:id" element={<ProductGridPage2 />} />
              <Route
                path="product-stacked/:id"
                element={<ProductStackedPage />}
              />
              <Route
                path="product-right-thumbnails/:id"
                element={<ProductRighrThumbnailPage />}
              />
              <Route
                path="product-bottom-thumbnails/:id"
                element={<ProductBottomThumbnailPage />}
              />
              <Route
                path="product-description-accordion/:id"
                element={<ProductDescriptionAccordionPage />}
              />
              <Route
                path="product-description-list/:id"
                element={<ProductDescriptionListPage />}
              />
              <Route
                path="product-description-menutab/:id"
                element={<ProductDescriptionMenutabPage />}
              />
              <Route
                path="product-description-fullwidth/:id"
                element={<ProductDescriptionFullwidthPage />}
              />
              <Route
                path="product-fixed-price/:id"
                element={<ProductFixedProcePage />}
              />
              <Route
                path="product-fixed-scroll/:id"
                element={<ProductFixedScrollPage />}
              />

              <Route
                path="product-swatch-color/:id"
                element={<ProductSwatchColorPage />}
              />
              <Route
                path="product-swatch-rounded/:id"
                element={<ProductSwatchRoundedPage />}
              />
              <Route
                path="product-swatch-rounded-color/:id"
                element={<ProductSwatchRoundedColorPage />}
              />
              <Route
                path="product-swatch-image/:id"
                element={<ProductSwatchImagePage />}
              />
              <Route
                path="product-swatch-rounded-image/:id"
                element={<ProductSwatchRoundedImagePage />}
              />
              <Route
                path="product-swatch-dropdown/:id"
                element={<ProductSwatchDropdownPage />}
              />
              <Route
                path="product-swatch-dropdown-color/:id"
                element={<ProductSwatchDropdownColorPage />}
              />

              <Route
                path="product-frequently-bought-together/:id"
                element={<ProductFrequentlyBoughtTogetherPage1 />}
              />
              <Route
                path="product-frequently-bought-together-02/:id"
                element={<ProductFrequentlyBoughtTogetherPage2 />}
              />
              <Route
                path="product-up-sell/:id"
                element={<ProductUpSellPage />}
              />
              <Route
                path="product-pre-order/:id"
                element={<ProductPreorderPage />}
              />
              <Route
                path="product-grouped/:id"
                element={<ProductGroupedPage />}
              />
              <Route
                path="product-customer-note/:id"
                element={<ProductCustomerNotePage />}
              />
              <Route
                path="product-out-of-stock/:id"
                element={<ProductOutOfStockPage />}
              />
              <Route
                path="product-pickup-available/:id"
                element={<ProductPickupAvailablePage />}
              />
              <Route
                path="product-variable/:id"
                element={<ProductVariablePage />}
              />
              <Route path="product-deals/:id" element={<ProductDealsPage />} />
              <Route
                path="product-with-discount/:id"
                element={<ProductWithDiscountPage />}
              />
              <Route
                path="product-external/:id"
                element={<ProductExternalPage />}
              />
              <Route
                path="product-subscribe-save/:id"
                element={<ProductSubscribeSavePage />}
              />
              <Route
                path="product-buyx-gety/:id"
                element={<ProductDetailPageBuyxGetY />}
              />
              <Route
                path="product-deals-grid/:id"
                element={<ProductDetailPageDealsGrid />}
              />

              <Route path="blog-default" element={<BlogDefaultPage />} />
              <Route path="blog-list" element={<BlogListPage />} />
              <Route path="blog-grid" element={<BlogGridPage />} />
              <Route path="blog-detail/:id" element={<BlogDetailsPage1 />} />
              <Route path="blog-detail-02/:id" element={<BlogDetailsPage2 />} />
              <Route path="about-us" element={<AboutUsPage />} />
              <Route path="store-list" element={<StorelistPage />} />
              <Route path="store-list-02" element={<StorelistPage2 />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="contact-02" element={<ContactPage2 />} />
              <Route path="404" element={<PageNotFoundPage />} />
              <Route path="FAQs" element={<FAQSPage />} />
              <Route path="term-of-use" element={<TermsOfUsePage />} />
              <Route path="coming-soon" element={<CommingSoonPage />} />
              <Route
                path="customer-feedback"
                element={<CustomerFeedbackPage />}
              />
              <Route path="*" element={<PageNotFoundPage />} />
            </Route>
          </Routes>
        </div>
        <CartModal />
        <QuickView />
        <QuickAdd />
        <Compare />
        <MobileMenu />

        <NewsLetterModal />
        <SearchModal />
        <SizeGuide />
        <Wishlist />
        <DemoModal />
        <Categories />
        <RtlToggler />
        <AccountSidebar />
      </Context>
    </>
  );
}

export default App;
