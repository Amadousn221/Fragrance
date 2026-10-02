"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import ToolbarBottom from "../headers/ToolbarBottom";
import ScrollTop from "../common/ScrollTop";
import useCategories from "@/components/woocommerce/useCategories";
import { resolveNavItems } from "@/lib/woocommerce/home-config";
import { footerLinks, socialLinks } from "@/data/footerLinks";
export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}) {
  // Navigation : Boutique + Nouveautes + categories WooCommerce reellement disponibles (comme l'en-tete).
  const navItems = [
    { key: "boutique", label: "Boutique", href: "/shop" },
    ...resolveNavItems(useCategories()),
  ];
  const columns = [
    { heading: "Navigation", items: navItems },
    ...footerLinks
      .map((s) => ({ heading: s.heading, items: s.items.filter((i) => i.ready) }))
      .filter((s) => s.items.length),
  ];

  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, [columns.length]);
  return (
    <>
      <footer
        id="footer"
        className={`footer hm-footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        } `}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="footer-infor">
                    <div className="footer-logo">
                      <Link
                        href={`/`}
                        className="hm-footer__brand fw-semibold text-uppercase"
                        aria-label="Fragrance, accueil"
                      >
                        Fragrance
                      </Link>
                    </div>
                    {socialLinks.length > 0 && (
                      <ul className={`tf-social-icon ${dark ? "style-white" : ""}`}>
                        {socialLinks.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              aria-label={link.label}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className={`icon ${link.iconClass}`} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="footer-menu">
                    {columns.map((section) => (
                      <div className="footer-col-block" key={section.heading}>
                        <div className="footer-heading text-button footer-heading-mobile">
                          {section.heading}
                        </div>
                        <div className="tf-collapse-content">
                          <ul
                            className={`footer-menu-list ${section.items.length > 6 ? "hm-footer__list--wide" : ""}`}
                          >
                            {section.items.map((item) => (
                              <li className="text-caption-1" key={item.key || item.href}>
                                <Link href={item.href} className="footer-menu_item">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="footer-bottom-wrap">
                    <div className="left">
                      <p className="text-caption-1">
                        ©{new Date().getFullYear()} Fragrance. Tous droits réservés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}
