# Fragrance — Suivi du premier lot (base exécutable et accueil)

Date : 27 septembre 2026. Rédigé par Claude Code à l'issue du premier lot de
développement. Ce fichier permet de reprendre le travail sans redemander le
contexte déjà acquis.

## 1. Lancer le projet

```
cd modavereact
npm install      # déjà fait ; à relancer si package.json change
npm run dev
```

Adresse locale : **http://localhost:5173/**

Un serveur `npm run dev` a été laissé actif pendant la session de
développement (port 5173). Vérifier qu'aucune autre instance ne tourne avant
d'en relancer un.

Build de production vérifié : `npm run build` (dossier `dist/`, non déployé).

## 2. État du dépôt

- Le projet n'était pas un dépôt Git au début de ce lot. Un dépôt a été
  initialisé dans `modavereact/`.
- Branche `main` : commit unique "Baseline: Modave React/Vite template as
  provided" — le template original tel que fourni, intact.
- Branche de travail actuelle : `lot1-accueil-base`, un commit "Lot 1 : base
  exécutable et accueil Fragrance" au-dessus de la base.
- `node_modules/` et `dist/` restent ignorés (`.gitignore` du template,
  inchangé).

## 3. Constats de l'audit (avant modification)

Confirmés en lisant le code, conformément aux points signalés par l'audit
précédent :

- Panier et catalogue alimentés par `src/data/products.js` (données de mode
  de démonstration) et `localStorage`, prix calculés côté navigateur.
- Aucune route `/checkout` n'existait dans `src/App.jsx` malgré la présence
  du composant `src/components/otherPages/Checkout.jsx`.
- `MetaComponent.jsx` retournait un fragment vide (code commenté) : titres et
  descriptions de page non appliqués.
- `src/pages/productDetails/product-detail/index.jsx` remplaçait un produit
  introuvable par `allProducts[0]` au lieu d'un état "introuvable".
- Favoris et comparateur préremplis (`[1, 2, 3]`) dans `Context.jsx`.
- Aucune intégration WooCommerce réelle (aucune occurrence `woocommerce`,
  `wc/store`, `wc/v3` dans `src`).
- `App.jsx` utilisait `document.querySelector("header").classList` sans
  contrôle de nullité dans le gestionnaire de scroll.
- Le panier (`CartModal.jsx`) affichait une recommandation "You May Also
  Like" avec des produits de mode.
- Le pied de page et le checkout de démonstration exposaient des liens morts
  (`href="#"`), une newsletter connectée à un service externe non autorisé,
  des icônes de paiement (carte, Apple Pay, PayPal) non configurées, et un
  formulaire de carte bancaire complet.

Aucune photo produit, aucune archive `modavereact-10.rar` et aucune capture
fournisseur n'étaient présentes dans le dossier du projet : seuls les cinq
dossiers `FRAGRANCE_*.md` et le dossier `modavereact/` déjà extrait existent.

## 4. Changements principaux de ce lot

### Fondations
- Dépôt Git initialisé, template original préservé sur `main`.
- `npm install` exécuté, `npm run build` et `npm run dev` vérifiés
  fonctionnels.
- Charte graphique appliquée via `public/scss/fragrance.scss` (nouveau
  fichier, chargé après `custom.scss`) : couleurs (`--primary`, `--main`,
  `--secondary`, `--surface`, `--line`), police système, composants propres
  au projet. Les fichiers vendor du template n'ont pas été modifiés pour la
  charte.
- `src/config/siteSettings.js` : réglages centraux (nom de travail, WhatsApp,
  contact, devise) — volontairement vides tant que les vraies valeurs ne sont
  pas fournies.

### Couche de données / séparation visuel-données
- `src/data/fragranceCatalog.js` : les huit candidats du dossier 03/05
  (C01–C08), à l'état brouillon, sans prix ni photo inventés.
- `src/data/fragranceCollections.js` : les cinq marques/collections vues sur
  les emballages.
- `src/services/catalogService.js` : point d'accès unique aux données
  catalogue, actuellement branché sur les fichiers locaux ci-dessus. Conçu
  pour être réécrit contre la Store API WooCommerce sans changer les pages
  qui l'appellent (lot 2).

### Bugs corrigés
- `MetaComponent.jsx` applique réellement `document.title` et la meta
  description.
- Nouvelle page produit (`src/pages/fragrance/ProductPage.jsx`) : un slug
  inconnu affiche un état "introuvable", jamais un autre produit. La page de
  démonstration d'origine a aussi été corrigée par cohérence, bien qu'elle ne
  soit plus routée.
- `App.jsx` : contrôle de nullité ajouté avant `header.classList`.
- Favoris et comparateur retirés du périmètre V1 (au lieu d'être simplement
  vidés) : fonctionnalités différées, conformément au dossier d'architecture.

### En-tête, pied de page, navigation
- `Header1.jsx` / `Nav.jsx` : menu réduit aux pages réelles (Boutique,
  Marques & collections, Choisir son parfum, Notre boutique, Contact) ;
  compte et favoris retirés (achat invité prioritaire) ; logo texte
  provisoire (aucun logo final produit).
- `MobileMenu.jsx`, `ToolbarBottom.jsx` : simplifiés sur le même principe.
- `Footer1.jsx` : newsletter (appel à un service externe non autorisé) et
  icônes de paiement non configurées retirées ; liens réels uniquement
  (`src/data/fragranceFooter.js`) ; coordonnées explicitement "à renseigner".
- `CartModal.jsx`, `SearchModal.jsx` : recommandations et mots-clés de mode
  retirés ; recherche réelle sur le catalogue de brouillon.

### Accueil (dossier 04)
Reconstruit dans l'ordre prescrit : bandeau, en-tête, visuel d'ouverture,
ruban de marques, trois cartes de collection, quatre portes d'entrée,
présentation de la boutique, sélection de produits (état "en préparation"),
trois repères d'achat, tableau de comparaison (masqué tant que moins de deux
produits ont un prix confirmé), contact WhatsApp (masqué tant qu'aucun numéro
n'est configuré), pied de page.

Fichiers : `src/pages/fragrance/HomePage.jsx` et
`src/components/fragrance/home/*.jsx`.

### Routes ajoutées (structure catalogue/collections/fiches)
`/`, `/boutique`, `/parfum/:slug`, `/marques-collections`,
`/collection/:slug`, `/choisir-son-parfum`, `/notre-boutique`,
`/livraison-paiement`, `/faq`, `/contact`, `/panier`, `/commande`,
`/confirmation`, `/conditions`, `/confidentialite`, plus une page 404 réelle.

Le routeur de démonstration du template (plus de 150 routes de démo mode/
beauté/déco, non liées au projet) a été retiré de `App.jsx` : les fichiers
restent dans le dépôt (non supprimés, réutilisables si besoin) mais ne sont
plus importés ni construits, ce qui a réduit le bundle JS principal de
1,94 Mo à 273 Ko et les modules transformés de 944 à 146.

## 5. Ce qui reste simulé ou non connecté (à ne pas présenter comme fini)

- **Aucune connexion WooCommerce.** Le catalogue est un fichier local en
  brouillon. `catalogService.js` est le seul point à modifier au lot 2.
- **Panier et commande non fonctionnels par conception** : aucun produit
  n'est achetable (aucune fiche n'a de prix validé), donc "Ajouter au
  panier" est désactivé partout et le panier reste vide. La page `/commande`
  affiche un formulaire de livraison (nom, téléphone, quartier, adresse)
  mais son bouton de confirmation est désactivé et annoncé comme tel.
- **Formulaire de contact non connecté** : `/contact` affiche un formulaire
  qui n'envoie rien réellement (pas de service e-mail/API configuré) ; un
  message explicite le signale après soumission.
- **WhatsApp non configuré** : `siteSettings.whatsappNumber` est vide, donc
  les boutons WhatsApp affichent un état "à configurer" au lieu d'un lien.
- **Aucune photo produit réelle** : toutes les images sont des emplacements
  provisoires visuellement identifiés ("Photo à venir"), jamais des visuels
  du template de mode.
- **Pages légales, FAQ et livraison** : structurées mais explicitement
  marquées "à compléter" ; aucun contenu n'est inventé.
- **Prérendu/SEO** non mis en place (prévu au dossier 02, lot 5).
- **Vérifications non faites faute d'outil** : aucune vérification visuelle
  dans un navigateur n'a pu être réalisée dans cette session (l'extension
  Chrome de l'environnement n'était pas connectée). Seules ont été vérifiées
  : la compilation de production (`npm run build`, sans erreur), le démarrage
  du serveur de développement, et la réponse HTTP 200 de toutes les routes.
  **Le rendu visuel réel, le mobile et le clavier restent à contrôler dans un
  navigateur avant d'aller plus loin.**

## 6. Données ou accès nécessaires pour le lot suivant

- Accès à un environnement WordPress/WooCommerce de test (ou décision de
  l'installer localement) pour démarrer le lot 2 (dossier 02, section 11).
- Tarif fournisseur à l'unité et confirmation des références C01–C08
  (dossier 05, section 9).
- Photos autorisées d'au moins un produit test.
- Décision sur le mode de paiement de départ (paiement à la livraison
  recommandé par le dossier 02, section 8).
- Numéro WhatsApp professionnel réel (`src/config/siteSettings.js`).
- Nom commercial définitif de la boutique (actuellement "Fragrance", nom de
  travail uniquement).

## 7. À faire immédiatement au prochain lot

1. Ouvrir `http://localhost:5173/` dans un navigateur et contrôler
   visuellement l'accueil, le mobile (360/390/768 px) et la navigation
   clavier — non fait dans cette session faute d'outil de navigateur.
2. Décider de l'environnement WordPress/WooCommerce de test avant de
   commencer le lot 2 (connexion verticale, dossier 02, section 11).
