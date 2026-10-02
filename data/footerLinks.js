// Pied de page Fragrance. Module pur (aucun secret).
//
// Reseaux sociaux : uniquement ceux reellement utilises. Ajouter { label, href, iconClass } (icone de la police
// du theme : icon-instagram, icon-fb, icon-tiktok, icon-x, icon-youtube, icon-pinterest, icon-whatsapp) avec l'URL
// reelle du compte. Tant que la liste est vide, aucune icone n'est affichee.
export const socialLinks = [];

// Rubriques "Aide" et "Legal". Un lien n'est affiche que lorsque `ready` est a true, c'est-a-dire lorsque la page
// reelle existe (aucune page de demonstration du template n'est reutilisee). Une rubrique sans lien pret est masquee.
export const footerLinks = [
  {
    heading: "Aide",
    items: [
      { label: "Contact", href: "/contact", ready: false },
      { label: "Livraison", href: "/livraison", ready: false },
      { label: "Retours", href: "/retours", ready: false },
      { label: "FAQ", href: "/faq", ready: false },
    ],
  },
  {
    heading: "Légal",
    items: [
      { label: "Mentions légales", href: "/mentions-legales", ready: false },
      { label: "Confidentialité", href: "/confidentialite", ready: false },
      { label: "Conditions générales", href: "/conditions-generales", ready: false },
    ],
  },
];
