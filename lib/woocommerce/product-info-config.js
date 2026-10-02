// Textes des onglets « Livraison & retours » et « Politique de retour » de la fiche produit.
// A modifier ici : chaque section = { title, paragraphs?: string[], items?: string[] }.
// Volontairement sans delai ni montant : a completer avec les conditions reelles de la boutique.
export const SHIPPING_SECTIONS = [
  {
    title: "Livraison",
    paragraphs: [
      "Les frais et les délais de livraison sont calculés et affichés lors de la validation de la commande, selon votre adresse.",
    ],
  },
  {
    title: "Suivi de commande",
    paragraphs: ["Vous êtes informé de l'expédition de votre commande. Pour toute question, contactez notre service client."],
  },
];

export const RETURN_SECTIONS = [
  {
    title: "Politique de retour",
    paragraphs: [
      "Si votre article ne vous convient pas, contactez-nous après réception : nous vous indiquerons la marche à suivre pour un échange ou un retour.",
    ],
  },
  {
    title: "Conditions",
    items: [
      "Les articles retournés doivent être non portés et dans leur emballage d'origine.",
      "Contactez notre service client avant tout renvoi.",
    ],
  },
];

// Bloc d'aide de la fiche produit (sous le bouton d'achat). A adapter aux conditions reelles de la boutique.
export const VENDOR_NAME = "Fragrance";
export const DELIVERY_ESTIMATE = "Le délai de livraison est indiqué lors de la commande.";
export const RETURN_NOTE = "Retours possibles selon notre politique de retour.";
// Renseignez "address" (et "pickup") pour afficher le bloc « Voir les informations de la boutique ».
export const STORE_INFO = { name: "Fragrance", pickup: "", address: [] };
