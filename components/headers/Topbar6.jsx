"use client";
import React from "react";

// Bandeau supérieur Fragrance. Les coordonnées de contact seront ajoutées avec le contenu de marque
// (les anciennes valeurs de démonstration Modave et les sélecteurs de devise/langue démo ont été retirés).
export default function Topbar6({ bgColor = "bg-blue-2" }) {
  return (
    <div className={`tf-topbar ${bgColor}`}>
      <div className="container">
        <div className="tf-topbar_wrap d-flex align-items-center justify-content-center">
          <p className="text-caption-1 text-white mb-0">Bienvenue chez Fragrance</p>
        </div>
      </div>
    </div>
  );
}
