# Fragrance — Accueil inspiré de Sillage Studio

Version 1.0 · 27 septembre 2026 · Spécification avant développement

## 1. Décisions et périmètre

La référence retenue pour l’organisation de l’accueil est [The Sillage Studio](https://thesillagestudio.in/), examinée sur ordinateur le 27 septembre 2026. Ce document précise notre adaptation ; il ne constitue ni une page déjà développée ni un test mobile.

L’architecture technique reste celle du dossier 02 : **Modave React + Vite pour la vitrine, WordPress + WooCommerce pour la gestion**. L’archive auditée n’est pas un projet Next.js. Le nom Fragrance reste un identifiant de travail ; aucun nouveau nom commercial n’est imposé.

Les prescriptions de ce document remplacent les anciennes propositions générales d’accueil des dossiers 01 et 03. Le reste du cadrage commercial, de la charte et de l’architecture demeure applicable.

## 2. Ce que nous reprenons de la référence

L’accueil observé associe un bandeau d’information, une navigation compacte, un grand carrousel éditorial avec flacon dominant et une bande colorée. Il poursuit avec trois cartes de découverte, quatre entrées de navigation, des offres groupées, une explication du format, une comparaison et un accès WhatsApp. L’alternance entre visuels très présents et sections de lecture crée le rythme.

Nous reprenons cette hiérarchie et ces familles de blocs, avec nos propres textes, photos et données. La boutique vend plusieurs marques ; les arguments propres au fabricant de la référence ne décrivent donc pas notre offre.

## 3. Ordre définitif proposé pour l’accueil

| Ordre | Bloc | Contenu prévu | Destination principale |
| --- | --- | --- | --- |
| 1 | Bandeau supérieur | Une information utile confirmée ; à défaut « Découvrez nos marques et collections » | Marques et collections |
| 2 | En-tête | Identité boutique, Parfums, Marques & collections, Guide, Contact ; recherche et panier | Navigation |
| 3 | Grand visuel d’ouverture | Un parfum ou une composition de flacons réels, titre court et deux boutons | Catalogue / collection mise en avant |
| 4 | Ruban de découverte | Noms des marques et collections vérifiés | Pages correspondantes |
| 5 | Trois grandes cartes | Royal Collection, Joyous, Loui Martin, sous réserve de disponibilité confirmée | Trois pages de collection |
| 6 | Quatre portes d’entrée | Tous les parfums, Marques & collections, Notre sélection, Besoin d’un conseil | Catalogue, index, sélection, contact |
| 7 | Bloc éditorial image + texte | Présentation de la boutique multimarque | À propos |
| 8 | Sélection de produits | Quatre produits publiables, prix WooCommerce et statut réel | Fiches produit |
| 9 | Trois repères d’achat | Choisir, vérifier les détails, préparer la livraison | Guide / livraison |
| 10 | Tableau d’aide au choix | Marque, format et prix de produits vérifiés | Fiches produit |
| 11 | Contact WhatsApp | Aide humaine au choix et question sur une référence | Conversation volontaire |
| 12 | Pied de page | Catalogue, aide, informations boutique et politiques | Pages secondaires |

Les cartes par collection permettent de garder les trois grands visuels de découverte sans attribuer arbitrairement un genre aux parfums. Un passage à Homme / Femme / Mixte reste possible lorsque les classifications de chaque référence seront documentées.

## 4. Grand visuel d’ouverture

### Composition

Sur ordinateur : texte à gauche, flacon dominant à droite, avec une zone calme derrière le texte. Fond sombre possible pour ce seul bloc ; le corps de page reste blanc ou ivoire. Les étiquettes restent lisibles et les proportions des flacons fidèles.

Proposition de texte principal :

> **Trouvez le parfum qui vous ressemble.**
>
> Découvrez notre sélection de marques et de collections.
>
> Bouton principal : « Découvrir les parfums »
>
> Bouton secondaire : « Explorer les collections »

Une photographie propre de Royal Collection ou Loui Martin peut porter la première composition, après validation du produit disponible et du droit d’utilisation de l’image. Ne pas intégrer les interfaces WhatsApp des captures dans le visuel final.

Une seule composition suffit au lancement. La structure pourra accueillir jusqu’à trois diapositives lorsque trois visuels de qualité seront disponibles. En cas de carrousel : commande précédente/suivante, indicateur de position et absence de lecture automatique par défaut.

### Déclinaison mobile proposée

Texte et boutons avant le visuel, ou superposition uniquement si le contraste reste suffisant. Pas de titre inclus dans l’image. Le titre et l’action principale doivent apparaître dès le premier écran sur un téléphone courant. Le flacon ne doit jamais couper ou masquer un bouton.

## 5. Contenus des sections

### Ruban

Afficher les appellations effectivement vérifiées sur les emballages : par exemple Royal Collection, Joyous, Loui Martin, Maison Alhambra. Ne pas assimiler automatiquement une collection à une marque. Les libellés issus seulement du catalogue fournisseur restent à contrôler avant publication.

Le ruban peut être statique ; s’il défile, permettre son arrêt et respecter la préférence de réduction des animations.

### Trois cartes de collections

Titre : **Explorez les collections**.

Chaque carte contient un visuel propre, le nom réel et « Découvrir ». Toute la carte est un lien accessible. Conserver le traitement photographique généreux de la référence, avec une petite zone de texte contrastée. Ne pas inventer de portrait client ou de témoignage.

### Quatre portes d’entrée

Titre : **Par où commencer ?**

- **Tous les parfums** — parcourir le catalogue complet.
- **Marques & collections** — retrouver une référence connue.
- **Notre sélection** — découvrir une sélection éditoriale réellement renseignée.
- **Besoin d’un conseil ?** — poser une question avant de choisir.

Aucun badge « meilleure vente » sans données de ventes. Une sélection éditoriale peut exister dès le lancement, mais doit être nommée comme telle.

### Présentation de la boutique

Titre : **Une sélection, plusieurs marques.**

Texte de travail : « Retrouvez les marques et les noms de parfums que vous connaissez, puis explorez de nouvelles références. Chaque fiche rassemble les informations disponibles pour vous aider à choisir. »

Image : composition de plusieurs flacons vendus. Bouton : « Découvrir la boutique ». La page À propos devra décrire le rôle de revendeur, sans présenter les parfums comme des créations propres.

### Produits mis en avant

Titre : **À découvrir**.

Candidats tirés des captures : Royal Collection — Scandal ; Niche Collection — Pink-F ; Kay-ali Collection — Oud Ambrosia ; Loui Martin — Vanilla Powdery. Orthographe finale à confirmer sur les emballages et documents fournisseur.

Une carte affiche : photographie, marque/collection, nom du parfum, contenance vérifiée, prix de vente réel, disponibilité et bouton. Le tarif fournisseur n’est pas le prix public à utiliser automatiquement.

Ce bloc occupe la place commerciale des offres groupées dans la référence. Des lots pourront le compléter une fois leurs coûts et disponibilités établis. Une remise fournisseur à partir de trois pièces ne suffit pas à justifier un lot client rentable.

### Trois repères d’achat

Titre : **Votre prochain parfum, en trois étapes.**

1. **Explorez les références** : cherchez par nom, marque ou collection.
2. **Consultez les détails** : vérifiez le format et les caractéristiques documentées.
3. **Préparez la livraison** : renseignez votre zone, votre adresse et un repère utile.

Les délais annoncés ici devront correspondre au fonctionnement réellement retenu avec le fournisseur et le livreur.

### Tableau d’aide au choix

Titre : **Comparez les détails qui comptent.**

Comparer deux ou trois références réellement vendables : nom, marque, contenance, concentration si documentée, prix et lien produit. Omettre les colonnes insuffisamment renseignées. Masquer ce bloc si moins de deux produits ont des données comparables.

Ne pas comparer notre boutique à des concurrents anonymes avec des affirmations de supériorité. Ne pas généraliser une tenue, une concentration ou une qualité d’authenticité à toute la gamme.

### Contact et pied de page

Bloc de contact : **Un doute entre deux parfums ?** Texte : « Indiquez les références qui vous intéressent ; nous vous aidons à vérifier les informations disponibles. » Bouton : « Nous écrire sur WhatsApp », affiché seulement après configuration du numéro professionnel.

Le pied de page regroupe : Tous les parfums, Marques & collections, À propos, Contact, Livraison, Retours, FAQ, conditions de vente, confidentialité et informations légales adaptées au pays d’activité. Une inscription marketing ne sera ajoutée qu’avec un usage et un traitement des consentements définis.

## 6. Direction visuelle

| Élément | Proposition pour la boutique |
| --- | --- |
| Fond principal | Blanc #FFFFFF et ivoire #F7F4EF |
| Texte | Noir #191919 ; secondaire #595959 |
| Accent | Prune #613A4B, selon la charte du dossier 03 |
| Ouverture | Fond sombre, grandes photographies et titre clair |
| Cartes | Images généreuses, angles légèrement arrondis, bordures discrètes |
| Typographie | Police sans empattement disponible dans le projet ; titres affirmés |
| Espacement | Sections aérées, largeur de lecture contenue |
| Animation | Transitions discrètes, contrôlables et facultatives |

Cette proposition conserve le rythme de la référence avec la sobriété demandée au départ. Le logo, les compositions multicolores et les photographies du site de référence ne deviennent pas des ressources de la boutique.

## 7. Réemploi concret de Modave

Base vérifiée : `src/pages/homes/home-cosmetic/index.jsx`. Les chemins ci-dessous désignent des composants présents/importés dans cette base ; ils restent à adapter, aucune intégration WooCommerce n’est déclarée réalisée.

| Besoin | Base existante sous src/components/ | Adaptation |
| --- | --- | --- |
| Navigation | headers/Header1 | Menu parfum, recherche réelle, panier connecté |
| Ouverture | homes/cosmetic/Hero | Visuels, texte et boutons configurables |
| Ruban | common/MarqueeSection2 | Noms vérifiés, accessibilité du mouvement |
| Trois cartes | homes/cosmetic/Collections | Images et liens des collections |
| Navigation complémentaire | common/Categories | Quatre entrées utiles |
| Présentation | homes/cosmetic/Banner | Image et texte multimarque |
| Produits | common/Products5 | Produits WooCommerce au lieu des données de démonstration |
| Repères d’achat | common/Features | Trois contenus opérationnels exacts |
| Pied de page | footers/Footer1 | Coordonnées et pages réelles |

Le tableau comparatif et le bloc de conseil nécessitent une composition adaptée. Ne pas réutiliser les avis de démonstration de Testimonials2 ni présenter les médias ShopGram4 comme ceux de la boutique.

## 8. Administration et données

WordPress gère les textes et médias d’accueil ; WooCommerce reste la source des produits, variations, tarifs publics et états commerciaux. Prévoir un écran de réglage « Accueil » dans le plugin dédié, avec :

- message du bandeau et lien interne ;
- visuels d’ouverture, texte alternatif, titre et destinations ;
- identifiants des collections et produits mis en avant ;
- texte et image de présentation ;
- produits retenus pour comparaison ;
- numéro WhatsApp professionnel ;
- activation de chaque section facultative.

Ne pas recopier un prix à la main dans le bandeau ou les cartes éditoriales. Les coûts fournisseurs, marges et notes internes restent privés. Une section non renseignée doit être masquée proprement.

## 9. Achat à la commande et livraison

L’accueil ne doit pas laisser croire que tous les parfums sont physiquement stockés par la boutique. Les fiches et le tunnel devront distinguer disponibilité fournisseur confirmée, vérification nécessaire et indisponibilité.

Le parcours détaillé du dossier 02 reste applicable. Avant activation commerciale : décider du moment de confirmation, d’encaissement et d’achat fournisseur, puis définir le traitement d’une rupture. Aucun délai ni livraison gratuite générale n’est validé à ce stade.

Pour la localisation : pays, ville/zone, adresse descriptive, repère et téléphone ; point de carte facultatif avec alternative manuelle. La géolocalisation est déclenchée par le client. Le point facilite la remise du colis ; il ne remplace pas les règles de zone et de tarification. Le suivi en temps réel d’un livreur est un service distinct, hors périmètre de cet accueil.

## 10. Recette prévue avant mise en ligne

- Tous les boutons conduisent vers une destination réelle ; aucun lien de démonstration.
- Le nom du parfum et la marque concordent entre carte, fiche, panier et commande.
- Les produits non publiables ne figurent pas dans les sélections.
- Les prix et disponibilités proviennent de WooCommerce ; une erreur de chargement ne fait pas apparaître un faux prix.
- Vérification proposée à 360, 390, 768 et 1440 px : pas de débordement, texte lisible, zones tactiles suffisantes.
- Navigation clavier, focus visible, textes alternatifs utiles et contrastes vérifiés.
- Image principale optimisée, dimensions réservées ; images secondaires chargées progressivement.
- Aucun avis fictif, remise inventée, compteur de pénurie ou promesse de tenue non documentée.
- Panier et commande testés de bout en bout au stade d’intégration, y compris rupture et échec réseau.

## 11. Suite du travail

Cette étape fixe l’organisation de l’accueil. La préparation suivante consiste à réunir une fiche de données par parfum, les photos propres, les tarifs revendeur unitaires, les zones de livraison et le coût réel d’une commande. Ces éléments permettront de sélectionner les premiers produits, de finaliser leurs fiches et de calculer les marges avant activation des achats.

Restent à confirmer : nom commercial, pays et zone de vente, fournisseur retenu par référence, budget, moyens de paiement, transporteur, délais et prix publics. Leur absence n’empêche pas de préparer les composants et contenus ; elle empêche de présenter une promesse commerciale définitive.

Références : accueil public The Sillage Studio consulté le 27 septembre 2026 ; archive Modave React fournie et auditée ; captures fournisseur transmises dans la conversation ; dossiers Fragrance 01, 02 et 03. Les sections 3 à 11 sont notre proposition d’adaptation.
