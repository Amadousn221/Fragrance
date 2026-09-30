# Fragrance — cadrage, suivi de projet et application Next.js

Fragrance est le nom de travail d'un projet de boutique multimarque de parfums
(Sénégal). Ce dépôt contient le **cadrage métier / l'architecture technique** et
l'**application front-end Next.js** (App Router) à la racine, déployée sur Vercel.

## Application (racine du dépôt)

Basée sur le template **Modave React** (Themesflat), migré de Vite/react-router
vers **Next.js 16 (App Router) + React 19**. Backend e-commerce : WordPress +
WooCommerce (lecture via API, côté serveur uniquement).

- `app/` : routes (pages du template + `shop`, `product/[slug]`, `category/[slug]`, `api/woocommerce/*`)
- `components/`, `context/`, `data/`, `reducer/`, `styles/`, `utlis/` : composants et données du template
- `lib/woocommerce/` : client serveur WooCommerce (produits, slug, catégories, variations, images, prix, stock)
- `public/` : assets, CSS/SCSS du template
- `legacy-vite/` : anciens fichiers Vite conservés pour référence (non utilisés)

### WooCommerce

Copier `.env.example` vers `.env.local` et renseigner (serveur uniquement,
jamais de préfixe `NEXT_PUBLIC_`) :

```
WOOCOMMERCE_URL=
WOOCOMMERCE_CONSUMER_KEY=
WOOCOMMERCE_CONSUMER_SECRET=
```

Sans ces variables, `/shop`, `/category/*` et `/product/*` affichent « Catalogue non connecté ».

### Commandes

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (.next/)
npm run start    # serveur de production
```

### Point de vigilance — licence du template

L'inspection de l'archive `.rar` fournie pour Modave React a révélé, à sa
racine, deux fichiers provenant de **ThemeLock.com**, un site connu pour
redistribuer des thèmes premium « nulled » (piratés), en dehors de toute
licence Envato/ThemeForest achetée. Cette question de licence/provenance
n'est pas encore résolue et doit être clarifiée (licence Envato valide à
présenter, ou remplacement par un template dont la licence est vérifiée)
avant toute publication sur GitHub et tout déploiement en production.

Le dossier `modavereact/` (le template restauré, conservé comme copie de
référence locale) reste explicitement exclu par `.gitignore` et ne doit
jamais être ajouté à ce dépôt.

## Contenu de ce dépôt

| Fichier | Rôle |
|---|---|
| `FRAGRANCE_CADRAGE_ET_RELAIS_CLAUDE_OPUS.md` | Cadrage métier initial : décisions, catalogue fournisseur, modèle commercial, brief technique |
| `FRAGRANCE_02_ARCHITECTURE_MODAVE_REACT_WOOCOMMERCE.md` | Architecture technique proposée (React/Vite + WordPress/WooCommerce) |
| `FRAGRANCE_03_MARQUE_CHARTE_CATALOGUE.md` | Proposition de marque, charte graphique, catalogue initial |
| `FRAGRANCE_04_ACCUEIL_REFERENCE_SILLAGE_STUDIO.md` | Spécification de l'accueil (référence Sillage Studio) |
| `FRAGRANCE_05_FICHES_PRODUITS_ET_RENTABILITE.md` | Fiches produits et modèle de rentabilité |
| `FRAGRANCE_SUIVI_LOT1.md` | Suivi du premier lot de développement technique local |

Aucun de ces documents ne contient de prix public validé, de nom commercial
définitif, ni de secret ou d'identifiant.

## Prochaine étape

1. Clarifier la licence/l'origine du template (preuve d'achat Envato ou
   remplacement par un template aux droits vérifiés).
2. Une fois ce point résolu, publier cette branche sur GitHub et déployer
   sur Vercel.
