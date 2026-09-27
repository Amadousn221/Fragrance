# Fragrance — Architecture Modave React + WordPress/WooCommerce

Version 1.0 — 27 septembre 2026

Auteur : ChatGPT, en reprise des tâches initialement attribuées à Claude Opus.

Statut : architecture proposée et audit statique terminés ; aucune installation, aucun build et aucune commande réelle effectués. Ce document complète FRAGRANCE_CADRAGE_ET_RELAIS_CLAUDE_OPUS.md, version métier 1.3. Il ne transforme pas ses hypothèses commerciales en décisions utilisateur.

## 1. Décision d’architecture

Utiliser le code Modave React/Vite fourni pour la boutique publique et l’administration native WordPress/WooCommerce pour gérer l’activité. Garder une seule source de vérité commerciale : WooCommerce.

Le thème Modave WordPress, Elementor, Modave Core, Next.js et un dashboard maison ne sont pas nécessaires à cette architecture. Un thème WordPress standard peut rester actif pour le fonctionnement natif et les éventuelles pages de paiement de repli.

| Partie | Fonction |
|---|---|
| React 19 + Vite | Interface issue du template, catalogue, panier, formulaire de commande |
| React Router | Routes publiques françaises et navigation |
| WordPress | Tableau de bord, médias, pages éditoriales sélectionnées |
| WooCommerce | Produits, variantes, prix, frais, commandes, disponibilité déclarée |
| Store API | Interface commerciale entre React et WooCommerce |
| Extension projet `fragrance-commerce` | Quartiers, règle de livraison, données complémentaires, affichage administrateur et protections métier |
| Paiement | Mode activé dans WooCommerce et intégration vérifiée avant utilisation |

Les modifications visuelles restent dans le projet React. Ajouter ou modifier un produit se fait dans WooCommerce. Les textes des pages définies comme administrables se modifient dans WordPress. Le tableau de bord ne devient pas un éditeur visuel de tous les composants React.

## 2. Résultat de l’audit du paquet

Source : modavereact-10.rar, dossier modave-package/modavereact. Inspection locale des sources et du verrouillage npm ; le paquet n’a pas été exécuté. Aucun diagnostic global de vulnérabilités ni vérification de licence n’est prétendu.

| Élément vérifié | Résultat | Conséquence |
|---|---|---|
| package.json et package-lock.json | React 19.0.0, React DOM 19.0.0, React Router 7.2.0, Vite 6.2.0, Axios 1.8.1 dans le lockfile | Versions réellement verrouillées à examiner avant installation, sans mise à jour majeure aveugle |
| Scripts | dev/build/preview via Vite | Aucun serveur Next.js |
| src/main.jsx | BrowserRouter et StrictMode | Configurer le routage serveur et vérifier les effets au montage |
| src/App.jsx | Nombreuses démos et imports directs | Réduire aux seules pages choisies ; chargement différé des routes lourdes |
| src/data/products.js | Produits de démonstration | À remplacer sur les routes de production |
| Références aux données locales | 173 fichiers JSX importent data/products | Ne pas convertir 173 écrans ; isoler le petit ensemble effectivement utilisé |
| src/context/Context.jsx | Panier calculé depuis les objets locaux et persisté dans localStorage | Le prix local ne doit pas devenir le prix accepté par le serveur |
| Favoris/comparaison | Éléments initiaux [1,2,3] | Retirer les contenus préremplis ; différer ces fonctions |
| src/components/otherPages/Checkout.jsx | Formulaires annulant la soumission via preventDefault | UI à raccorder, pas un checkout opérationnel |
| src/App.jsx | Aucune occurrence checkout dans le fichier inspecté | Une page Checkout existe mais sa route doit être explicitement ajoutée |
| Login.jsx | Formulaire annulant sa soumission | Ne pas présenter un compte client fonctionnel |
| ProductDetailPage | Produit inconnu remplacé par allProducts[0] | Corriger : vrai état introuvable, jamais un autre parfum |
| MetaComponent.jsx | Retourne un fragment vide ; code de métadonnées commenté | Titres et descriptions par page non produits par ce composant |
| App.jsx, scroll | Utilise header.classList sans contrôle de null dans un handler | Protéger les routes sans header |
| vercel.json | Réécriture générale vers / | Ne pas la recopier sur les URLs d’administration/API ; traiter les vrais 404 |
| Vite config | Alias @ vers src, SCSS | Réutilisable sans refonte du socle |

Le Context lit puis écrit le stockage via des effets : vérifier l’initialisation sous StrictMode et les données JSON corrompues. Ce risque est inféré du code, pas reproduit à l’exécution.

Démos réellement présentes : home-cosmetic, home-beauty et home-skincare, entre autres. Base de travail retenue pour l’étude : home-cosmetic, car elle assemble déjà Header1, Hero, collections et produits. Ce choix est structurel ; le rendu visuel reste à vérifier au lancement local.

Supprimer du périmètre publié : démos alternatives, comparateur, tailles vestimentaires, faux avis, compteurs de visiteurs, promotions fictives, galerie sociale non alimentée, faux compte client et blogs de démonstration.

## 3. Déploiement proposé

### Topologie principale : même origine, WordPress en sous-répertoire

Proposition à confirmer avec les capacités de l’hébergement :

- `https://[domaine]/` : build statique React.
- `https://[domaine]/gestion/` : installation WordPress.
- `https://[domaine]/gestion/wp-admin/` : administration.
- `https://[domaine]/gestion/wp-json/` : API.
- Médias : URLs réellement retournées par WordPress.

Le même domaine évite une configuration CORS interdomaines pour le parcours principal. Cette topologie n’est pas une installation déjà réalisée.

Les règles Apache/Nginx doivent traiter `/gestion/`, ses fichiers et ses routes PHP avant le fallback React. Ne jamais servir index.html en réponse à une URL API. Conserver les permaliens WordPress fonctionnels et vérifier WP_HOME/WP_SITEURL pour cette installation, sans remplacer leur configuration à l’aveugle.

Si l’hébergement ne permet pas ce montage proprement : WordPress sur un sous-domaine et frontend sur le domaine public. Cette alternative demande une politique CORS limitée au frontend, l’exposition du header Cart-Token et la vérification des redirects de paiement. Pas de wildcard utilisé comme substitut à une politique d’accès.

### Exploitation

- Construire avec Node sur la machine de développement ou une CI ; publier `dist` atomiquement.
- PHP et base de données hébergent WordPress ; aucun Node permanent requis pour servir le build statique retenu.
- HTTPS partout ; sauvegarde de base, médias, extension projet et configuration.
- Préproduction distincte, accès restreint, paiements de test et emails de test.
- Ne pas mettre en cache les réponses panier, checkout, confirmation et données client.
- L’API doit rester utilisable par les clients : ne pas mettre une authentification globale devant tout WordPress en production.

## 4. Frontend et composants à garder

Routes proposées :

| URL | Page |
|---|---|
| / | Accueil |
| /boutique | Catalogue |
| /parfum/:slug | Produit |
| /choisir-son-parfum | Guide |
| /notre-boutique | Présentation |
| /livraison-paiement | Conditions pratiques |
| /faq | Questions et retours |
| /contact | Contact |
| /panier | Panier |
| /commande | Checkout |
| /confirmation | Résultat protégé du checkout courant |
| /conditions, /confidentialite | Textes validés |

Organisation cible : `src/services/commerce`, `src/adapters`, `src/features/catalog`, `src/features/cart`, `src/features/checkout`, `src/components`, `src/pages`. Conserver les composants Modave utiles et introduire un adaptateur de données : ne pas faire dépendre chaque carte directement du format brut de WooCommerce.

Interface : français, prix FCFA si le marché XOF est confirmé, boutons lisibles sur mobile, flacons entiers, charte du dossier métier. Le panier montre les montants renvoyés par WooCommerce. Une erreur réseau ne vide pas visuellement le panier comme s’il était réellement vide.

Compte invité en V1. Aucun écran de connexion ou de suivi ne doit afficher des données fictives. Un espace client pourra être ajouté après définition de l’authentification et des accès aux commandes.

## 5. Contrats de données

### Produit public : modèle interne de l’interface

| Champ | Source/règle |
|---|---|
| id, slug, name | Identifiants WooCommerce ; slug pour l’URL publique |
| type | Simple ou variable ; variations explicitement résolues |
| images | URLs et textes alternatifs autorisés |
| shortDescription, description | Contenu validé et HTML nettoyé avant affichage |
| amountMinor, currency, minorUnit | Données monétaires API, sans supposer deux décimales |
| purchasable, inStock | Disponibilité renvoyée ; contrôlée à nouveau à la commande |
| brand, volume, concentration | Attributs documentés de la fiche |
| scentFamily, notes | Seulement si les données sont vérifiées |
| variationId, selectedAttributes | Obligatoires pour une variation achetée |
| publicPath | `/parfum/` + slug, au lieu du permalink WordPress brut |

Conserver les valeurs monétaires en unités mineures ou chaînes numériques contrôlées. Formater selon `currency_minor_unit` ; ne pas diviser systématiquement par 100. Les décimales et la monnaie se configurent côté WooCommerce.

Modèle catalogue : une référence vendable par parfum ; variations pour une vraie différence de format du même produit. Les collections fournisseur ne sont pas à elles seules des produits.

### Données privées

Coût fournisseur, marge, contact fournisseur et notes internes restent privés. Les stocker dans des champs non exposés publiquement, avec droits administrateur/gestionnaire. Tester leur absence dans les réponses publiques, même si un champ porte un préfixe `_`.

### Contenu éditorial

Pages WordPress pour présentation, livraison, FAQ et textes légaux, exposées uniquement si publiées. Les menus, coordonnées publiques et blocs d’accueil peuvent être une configuration publique autorisée de l’extension projet. Ne pas exposer toutes les options WordPress. Les mises en page restent dans React.

## 6. API et panier

Préfixe proposé : `/gestion/wp-json/wc/store/v1`.

| Besoin | Contrat de départ |
|---|---|
| Liste/recherche | GET /products, paramètres contrôlés |
| Produit par slug | GET /products avec filtre slug ; aucun résultat = introuvable |
| Initialisation panier | GET /cart et récupération du Cart-Token |
| Ajouter | POST /cart/add-item, ID/variation et quantité |
| Modifier | POST /cart/update-item avec clé de ligne serveur |
| Supprimer | POST /cart/remove-item |
| Adresse | POST /cart/update-customer |
| Choix livraison | POST /cart/select-shipping-rate, identifiant retourné par le serveur |
| Commander | POST /checkout après validation des données et du total |

Valider les schémas exacts sur la version WooCommerce installée. Ne pas appeler la REST API d’administration avec une clé secrète depuis React.

### Session proposée pour la V1

Conserver le Cart-Token en mémoire et sessionStorage : il survit au rechargement du même onglet, mais la reprise après fermeture n’est pas garantie. C’est une limite explicite de V1. Ne stocker ni adresse ni coordonnées GPS dans le stockage persistant du navigateur.

Le token est un secret de session client, pas une clé d’administration : ne pas le journaliser, l’ajouter aux URLs ou le transmettre à l’analytics. Un autre visiteur doit avoir une session distincte. Une amélioration ultérieure par cookie HttpOnly demande une couche serveur de session explicite ; elle n’est pas incluse gratuitement par Vite.

En cas de session expirée, reconstituer seulement les IDs et quantités si possible, puis recalculer et demander confirmation ; ne jamais restaurer un ancien prix. Sérialiser les mutations panier pour éviter des réponses hors ordre. Suspendre le bouton de commande pendant le traitement.

## 7. Livraison et localisation

### Données côté client

Nom, téléphone, commune, quartier sélectionné, adresse, repère ; instructions et localisation facultatives. E-mail : à garder dans le prototype tant que les exigences du paiement et des reçus ne sont pas établies ; ne pas inventer une fausse adresse pour contourner un champ requis.

Le bouton « Utiliser ma position » se déclenche sur clic. Afficher le point obtenu et demander s’il correspond à l’adresse de livraison. Refus, erreur ou absence de GPS : adresse manuelle toujours utilisable. Une carte interactive payante n’est pas nécessaire en V1 ; lien de carte facultatif ou coordonnées validées suffisent.

### Extension fragrance-commerce

- Table de quartiers administrable avec identifiant stable, commune, libellé, zone et activation.
- Montant de livraison administré côté serveur, jamais accepté du client.
- Méthode de livraison WooCommerce dédiée si le découpage quartier ne correspond pas aux zones natives.
- Transport du quartier via extension documentée de la Store API, validation puis stockage dans la session avant calcul des frais ; ne pas supposer qu’un champ custom apparaît automatiquement dans le calcul.
- Réponse publique limitée à la couverture et aux tarifs utiles.
- Champs commande proposés : `delivery_area_id`, `landmark`, `delivery_instructions`, `latitude`, `longitude`, `location_source` ; coordonnées nulles si non fournies.
- Validation latitude/longitude, longueur des textes et URL cartographique HTTPS autorisée ; aucune récupération serveur d’une URL arbitraire.
- Ajout d’un bloc livraison dans l’administration et d’un lien de carte pour les opérateurs autorisés.
- Lecture/écriture des commandes via les objets CRUD WooCommerce afin de respecter HPOS ; pas de dépendance directe à la table posts pour les commandes.

Les noms de champs ci-dessus sont un contrat de projet à implémenter, pas des champs natifs existants. Tous les chemins de commande actifs doivent appliquer la même validation. Une zone inconnue ne doit jamais obtenir automatiquement une livraison gratuite.

## 8. Paiement et commande

### Choix de départ recommandé

Pour le premier test connecté, utiliser le paiement à la livraison WooCommerce si ce modèle commercial est accepté. Il permet de vérifier le parcours sans attendre un prestataire en ligne. Cela reste une recommandation, pas une décision déjà prise par l’utilisateur.

Pour le paiement en ligne, choisir ensuite le prestataire selon compte marchand, frais, monnaie et compatibilité réelle de son extension avec le checkout headless. Aucun fournisseur de paiement n’est déclaré compatible dans ce dossier sans test. Ne pas afficher des options Apple Pay, PayPal ou carte simplement parce que le template les dessine.

Cible : checkout React. Repli éventuel : checkout WooCommerce natif uniquement si la passerelle l’exige, après spécification du transfert sécurisé panier/session. Ce repli n’est pas implémenté.

### Processus fiable

1. Recharger panier, disponibilité et livraison.
2. Afficher le total serveur et les conditions.
3. Valider les champs et soumettre une fois.
4. Enregistrer le résultat serveur ; en cas de timeout, vérifier le résultat existant avant une nouvelle tentative.
5. Afficher « commande reçue » ou « paiement en attente » selon l’état réel.
6. Vérifier/réserver chez le fournisseur avant achat et promesse finale.
7. Préparer, livrer puis rapprocher l’encaissement.

L’API actuelle documente `expected_total`, permettant de refuser un total devenu différent. Vérifier sa présence dans la version installée ; sinon mettre en place un contrôle équivalent validé côté serveur. Un total fourni par le client ne remplace jamais le calcul serveur.

### Double soumission et confirmation

Prévoir un identifiant de tentative associé à la session et à l’empreinte du panier. L’extension projet doit verrouiller/réconcilier les tentatives concurrentes et réutiliser le résultat d’une tentative déjà traitée. Ce mécanisme est à construire et tester ; ne pas annoncer que WooCommerce garantit arbitrairement l’idempotence d’un header maison.

Après une erreur réseau, ne pas recréer automatiquement une commande. La consultation du résultat doit exiger la preuve de session et un identifiant secret court terme ; un simple numéro de commande ne suffit pas. La page de confirmation est exclue des caches et analytics contenant des données client.

### Statuts

| Dimension | Proposition |
|---|---|
| Paiement | État WooCommerce et preuves de transaction ; ne pas marquer payé pour un simple clic ou retour URL |
| Fournisseur | Champ interne : à vérifier, réservé, acheté, indisponible |
| Livraison | Champ interne : à préparer, confié, livré, incident |
| Encaissement livreur | Non encaissé, collecté, reversé ; montant/date/référence |

Ne pas multiplier les statuts WooCommerce pour toutes ces dimensions. Confirmer le comportement exact de `pending`, `on-hold`, `processing`, `completed`, `cancelled`, `failed`, `refunded` avec la passerelle retenue. Une commande COD peut être en traitement sans avoir été encaissée. Clôturer selon livraison et rapprochement, pas uniquement selon le statut affiché.

## 9. SEO et performance

Corriger MetaComponent : titre, description, canonical, Open Graph par route. Ajouter données structurées produit vérifiées, sans notes ni avis fictifs.

Pour le petit catalogue initial, prévoir un prérendu des pages publiques au build : accueil, guides et produits publiés. Les prix affichés sont ensuite rafraîchis depuis l’API ; les montants de commande restent ceux du serveur. Le mécanisme de prérendu sera choisi au lot SEO après test de compatibilité ; il n’est pas présent dans l’archive.

Déclencher un nouveau build lors des changements de contenu pertinent ; un webhook doit être authentifié et limité. Définir un délai de publication mesuré et une alerte si le build échoue. Si aucun environnement de build automatique n’est disponible au départ, procédure manuelle explicite et publication synchronisée, sans promesse d’instantanéité.

Routes inconnues : vraie réponse HTTP 404 à configurer avec l’hébergement/prérendu. Les URLs valides ouvertes directement doivent fonctionner. Éviter d’indexer le frontend WordPress dupliqué ; ne pas bloquer les médias ou les API nécessaires à React.

Limiter les imports aux composants utilisés, charger les pages secondaires à la demande, dimensionner les images et limiter les sliders/animations. Les performances devront être mesurées sur mobile après intégration ; aucun score Lighthouse n’est prétendu.

## 10. Sécurité et maintenance utiles au projet

- Aucun secret dans les variables VITE_ : leur contenu peut être livré au navigateur.
- Comptes WordPress individuels, droits minimaux et authentification renforcée pour la gestion.
- Nettoyage du HTML venant des contenus ; pas d’injection arbitraire depuis l’API.
- Limitation des abus sur commande/contact et contrôle de l’origine ; CORS ne remplace pas une autorisation métier.
- Notifications de paiement vérifiées selon le prestataire ; duplication supportée.
- Masquer tokens et données personnelles dans les logs ; définir la conservation des coordonnées avec la politique réelle.
- Dépendances du lockfile à auditer avant première installation ; mises à jour par lots, tests puis publication, pas de `force` automatique.
- Sauvegarde avant mise à jour WordPress/WooCommerce ; restauration testée.
- L’archive contient des médias, mais leur présence ne prouve pas leur droit d’usage commercial. Utiliser les photos produits autorisées.

## 11. Plan de réalisation

| Lot | Travail | Preuve de fin |
|---|---|---|
| 0 — Préparation | Valider environnement, source du thème, budget, produits de test et choix opérationnels | Fiche des paramètres, aucune valeur inventée |
| 1 — Socle React | Import versionné, une démo, routes utiles, retrait faux modules, correction erreurs identifiées | Build et navigation locale testés |
| 2 — Connexion verticale | WooCommerce de test, un produit, panier, une zone test, commande COD si retenu | Commande unique visible en administration avec total identique |
| 3 — Catalogue | Adaptateur, variantes, recherche, descriptions et vrais médias | Produit modifié dans WooCommerce reflété dans l’interface |
| 4 — Livraison/paiement | Extension quartiers, localisation, incident et mode de paiement retenu | Cas de succès et échec testés de bout en bout |
| 5 — Marque et SEO | Charte, textes, photos, métadonnées, prérendu, URLs | Contrôle mobile et HTML initial par URL |
| 6 — Recette/pilote | Sauvegardes, commandes réelles limitées et marge observée | Critères du dossier métier remplis |

Ne pas développer tout le frontend avant le lot 2. Ne pas demander les données de tous les parfums pour commencer un prototype privé : un produit clairement identifié comme test suffit, jamais publié comme véritable offre.

### Estimation de charge, non devis

Socle/audit d’exécution : 1–2 jours ; connexion commerciale : 2–4 jours ; livraison et administration spécifique : 1–3 jours ; paiement en ligne : 1–4 jours après choix ; contenu/SEO/recette : 3–5 jours. Ordre de grandeur 8–18 jours de travail technique selon périmètre et difficultés, hors attente fournisseur et création de tous les médias. Aucune promesse de délai calendaire.

## 12. Coûts et décisions financières

| Poste | Situation |
|---|---|
| Template React | Archive disponible ; prix payé, licence et maintenance à confirmer |
| Hébergement frontend/WordPress | Devis selon compte existant ; ne pas supposer un abonnement disponible pour ce projet |
| Domaine | Nom non validé, coût à vérifier au choix |
| Extensions spécifiques | Aucun abonnement tiers imposé dans cette architecture ; développement et maintenance restent un coût |
| Paiement | Prestataire, commissions et frais de reversement non choisis |
| API cartographique | Aucune API payante nécessaire pour la V1 proposée |
| Emails transactionnels | Prestataire/quotas à définir et délivrabilité à tester |
| Build/prérendu | Local ou CI ; coût selon service et volumes choisis |

Le modèle financier commercial du premier dossier reste applicable. Remplacer seulement son budget technique par les postes de cette architecture. Aucune marge réelle ni ROI final ne peut être confirmé sans tarif fournisseur, prix de vente, coût de livraison et acquisition.

## 13. Recette mesurable

1. Un produit inexistant donne un écran introuvable et une réponse adaptée, jamais un produit de remplacement.
2. Un produit sans données essentielles reste non publiable.
3. Le prix manipulé côté navigateur n’affecte pas la commande.
4. La variation choisie correspond exactement à la ligne WooCommerce.
5. Le panier survit au rechargement et les sessions de deux visiteurs ne se mélangent pas.
6. Une réponse API tardive n’écrase pas une modification plus récente du panier.
7. Une zone interdite ne crée pas de livraison gratuite ; un quartier modifié recalcule le total.
8. Refus du GPS : commande possible avec adresse manuelle.
9. Coordonnées présentes dans la commande administrateur, absentes des données publiques et analytics.
10. Double clic, timeout et nouvelle tentative : pas de double commande ou encaissement.
11. Rupture/prix changé avant validation : explication et nouveau total à confirmer.
12. Paiement échoué/en attente : aucun faux succès ; notifications répétées sans effet répété.
13. Écran confirmation impossible à consulter avec le seul numéro d’une autre commande.
14. Une visite directe d’URL produit fonctionne ; routes inconnues correctement traitées.
15. Métadonnées par page présentes dans le HTML initial prérendu ; canonical public unique.
16. Aucun produit, avis, prix, compte ou compteur fictif sur les routes publiées.
17. Aucun secret privilégié détectable dans dist ou les requêtes navigateur.
18. Une restauration de sauvegarde de préproduction est démontrée avant lancement.

Tests automatisés ciblés : adaptateur monétaire, montant livraison, variation, prix côté serveur, isolation panier et répétition checkout. Vérification manuelle des parcours visuels et GPS. Ne pas multiplier les tests qui ne couvrent aucun risque réel.

## 14. Décisions utilisateur encore nécessaires

Elles ne bloquent pas la rédaction technique, mais certaines bloquent une installation ou un lancement réel :

- Hébergement/domaine ou environnement privé autorisé.
- Paiement à la livraison, avant livraison ou les deux.
- Zone de livraison et grille du livreur.
- Tarif fournisseur d’une pièce et procédure de réservation/disponibilité.
- Nom de marque, contenus et photos autorisées.
- Budget maximal et réserve de trésorerie.

Prochaine action proposée : lot 0, puis prototype privé du lot 1 lorsque l’environnement est défini. La construction de la boutique complète attend la préparation commerciale et éditoriale convenue.

## 15. Prompt de réalisation pour Claude Code ou cette session

> Tu implémentes Fragrance à partir de modavereact-10.rar. Lis le cadrage métier 1.3 et cette architecture. Stack : React/Vite existant + WordPress/WooCommerce. Pas de Next.js, Elementor, Modave Core ni dashboard maison.
>
> Commence par inspecter le dossier et les règles locales. Préserve l’archive source et utilise une branche de travail. N’installe aucun logiciel sur un serveur ni ne publie sans environnement autorisé. N’invente pas les accès, la monnaie validée, les tarifs ou les produits réels.
>
> Réalise uniquement le lot demandé. Avant la personnalisation complète, prouve le parcours produit → panier serveur → livraison → commande WooCommerce → confirmation. Les données de test doivent rester privées et explicitement identifiées.
>
> Réutilise les composants Modave utiles, introduis un adaptateur WooCommerce, retire les données fictives des routes livrées et corrige MetaComponent, le produit de repli et la route checkout. Aucun secret dans VITE_. Les prix et frais viennent du serveur. Les champs livraison et la prévention des doubles soumissions nécessitent une implémentation réelle, pas une simulation UI.
>
> Documente les fichiers modifiés, les tests effectivement exécutés, les limites et le lot suivant. Ne prétends pas avoir vérifié un paiement, une compatibilité ou un déploiement sans preuve.

## 16. Références et portée

Fichiers inspectés : package.json, package-lock.json, vite.config.js, vercel.json, src/main.jsx, src/App.jsx, src/context/Context.jsx, Checkout.jsx, Login.jsx, MetaComponent.jsx, page product-detail et pages home-cosmetic/home-beauty. Les noms courts de composants renvoient aux chemins cités dans le tableau d’audit.

Sources officielles consultées le 27 septembre 2026 :

- Cart-Token : https://developer.woocommerce.com/docs/apis/store-api/cart-tokens/
- Panier : https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/cart/
- Catalogue : https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/products/
- Checkout : https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/checkout/
- HPOS et accès aux commandes : https://developer.woocommerce.com/docs/features/orders/high-performance-order-storage/recipe-book/
- Variables Vite : https://vite.dev/guide/env-and-mode

Ces sources étayent les interfaces et précautions indiquées. La topologie, les champs privés, l’extension projet, le choix sessionStorage, le prérendu et les lots sont des propositions d’architecture ; ils ne sont pas présentés comme des fonctionnalités déjà installées.
