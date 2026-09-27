# Fragrance — cadrage et suivi de projet

Fragrance est le nom de travail d'un projet de boutique multimarque de parfums
(Sénégal). Ce dépôt contient le **cadrage métier, l'architecture technique
proposée et le suivi de préparation** ; il ne contient pas de code
d'application.

## Pourquoi pas de code ici ?

Le prototype technique s'appuie sur le template commercial **Modave React**
(Themesflat), fourni au projet sous forme d'archive `.rar`. L'inspection de
cette archive a révélé, à sa racine, deux fichiers provenant de
**ThemeLock.com**, un site connu pour redistribuer des thèmes premium
« nulled » (piratés), en dehors de toute licence Envato/ThemeForest achetée.

En conséquence :
- Le code du template **n'est pas et ne sera pas publié** dans ce dépôt tant
  que sa provenance et ses droits de redistribution ne sont pas clarifiés
  (licence Envato valide à présenter, ou remplacement par un template dont
  la licence est vérifiée).
- Le dossier `modavereact/` (le template restauré, utilisé comme prototype
  privé en local) reste explicitement exclu par `.gitignore` et ne doit
  jamais être ajouté à ce dépôt.
- Le dossier `documentation/` (documentation officielle du thème) est exclu
  pour la même raison.

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

## État du prototype technique

Un prototype privé basé sur Modave React a été préparé **localement**
(non publié) pour valider la structure de l'accueil et des pages. Il reste
strictement local tant que le point de licence ci-dessus n'est pas résolu.
Voir `FRAGRANCE_SUIVI_LOT1.md` pour le détail.

## Prochaine étape

1. Clarifier la licence/l'origine du template (preuve d'achat Envato ou
   remplacement par un template aux droits vérifiés).
2. Une fois ce point résolu, publier le code applicatif dans ce dépôt ou un
   dépôt dédié, avec l'historique Git conservé.
