"use client";
import React from "react";

// Bandeau d'annonce Fragrance : une seule ligne fixe, sans promotion ni compte à rebours.
export default function Topbar6({ bgColor = "bg-blue-2" }) {
  return (
    <div className={`tf-topbar ${bgColor}`} style={{ padding: "8px 0" }}>
      <div className="container">
        <div className="tf-topbar_wrap d-flex align-items-center justify-content-center">
          <p className="text-caption-1 text-white text-center mb-0 text-uppercase">
            Livraison partout au Sénégal
          </p>
        </div>
      </div>
    </div>
  );
}
