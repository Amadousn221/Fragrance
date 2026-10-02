"use client";
import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };
  const addProductToCart = (id, qty, isModal = true) => {
    if (!isAddedToCartProducts(id)) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: qty ? qty : 1,
      };
      setCartProducts((pre) => [...pre, item]);
      if (isModal) {
        openCartModal();
      }
    }
  };

  // Ligne panier WooCommerce : meme product_id + meme variation_id => quantite cumulee.
  // `id`, `title`, `imgSrc` conservent la compatibilite avec les composants Modave existants.
  const addWooItem = (line, isModal = true) => {
    const lineId = `${line.product_id}:${line.variation_id ?? 0}`;
    const qty = Math.max(1, Number(line.quantity) || 1);
    setCartProducts((pre) => {
      const found = pre.find((l) => l.lineId === lineId);
      if (found) {
        return pre.map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity + qty } : l));
      }
      return [...pre, { ...line, variation_id: line.variation_id ?? null, quantity: qty, lineId, id: lineId, title: line.name, imgSrc: line.image }];
    });
    if (isModal) openCartModal();
  };

  const setLineQuantity = (lineId, qty) => {
    const n = Math.floor(Number(qty));
    if (!(n >= 1)) return;
    setCartProducts((pre) => pre.map((l) => (l.id == lineId ? { ...l, quantity: n } : l)));
  };

  const removeCartLine = (lineId) => {
    setCartProducts((pre) => pre.filter((l) => l.id != lineId));
  };

  const cartCount = cartProducts.reduce((n, l) => n + l.quantity, 0);

  const updateQuantity = (id, qty) => {
    if (isAddedToCartProducts(id)) {
      let item = cartProducts.filter((elm) => elm.id == id)[0];
      let items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      item.quantity = qty / 1;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };

  // Wishlist locale : entrees { product_id, slug, name, price, image } (vrais IDs WooCommerce).
  // Un id numerique brut (pages demo Modave) reste accepte mais n'est ni affiche ni compte.
  const wishKey = (e) => (typeof e === "object" && e !== null ? e.product_id : e);
  const isAddedtoWishlist = (id) => wishList.some((e) => wishKey(e) == id);

  const addToWishlist = (entry, isModal = true) => {
    if (isAddedtoWishlist(wishKey(entry))) return;
    setWishList((pre) => [...pre, entry]);
    if (isModal) openWistlistModal();
  };

  const removeFromWishlist = (id) => {
    setWishList((pre) => pre.filter((e) => wishKey(e) != id));
  };

  const toggleWishlist = (entry) => {
    if (isAddedtoWishlist(wishKey(entry))) removeFromWishlist(wishKey(entry));
    else addToWishlist(entry);
  };

  const wishlistItems = wishList.filter((e) => typeof e === "object" && e !== null);
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("cartList"));
      // Seules les lignes WooCommerce sont reprises : les anciennes lignes demo Modave sont ignorees.
      const valid = Array.isArray(items) ? items.filter((l) => l && l.product_id && l.lineId) : [];
      if (valid.length) setCartProducts(valid);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      // Les anciens ids demo ([1,2,3]) sont ignores : seules les entrees WooCommerce sont reprises.
      const valid = Array.isArray(items)
        ? items.filter((e) => e && typeof e === "object" && e.product_id)
        : [];
      if (valid.length) setWishList(valid);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    addWooItem,
    setLineQuantity,
    removeCartLine,
    cartCount,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    wishlistItems,
    toggleWishlist,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
