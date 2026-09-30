
import React from "react";

import { Link, useLocation } from "react-router-dom";
import { demoItems } from "@/data/menu";

export default function DemoModal() {
  const { pathname } = useLocation();
  return (
    <div className="modal fade modalDemo" id="modalDemo">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="mega-menu">
            <div className="row-demo">
              {demoItems.map((item, index) => (
                <div
                  className={`demo-item ${
                    pathname === item.href ? "active" : ""
                  }`}
                  key={index}
                >
                  <Link to={item.href}>
                    <div className="demo-image position-relative">
                      <img
                        className="lazyload"
                        data-src={item.src}
                        alt={item.alt}
                        src={item.src}
                        width={273}
                        height={300}
                      />
                      {item.label.length > 0 && (
                        <div className="demo-label">
                          {item.label.map((label, labelIndex) => (
                            <span
                              key={labelIndex}
                              className={`demo-${label.toLowerCase()}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="demo-name">{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
