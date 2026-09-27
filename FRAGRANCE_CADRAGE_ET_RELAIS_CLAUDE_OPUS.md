# Projet Fragrance — dossier de préparation e\-commerce

Version 1.3 — 27 septembre 2026 — Modave React/Vite + WordPress/WooCommerce

**Statut : cadrage préparé par ChatGPT, prêt pour revue et architecture par Claude Opus\.**

Fragrance est le nom de travail du projet, pas un nom commercial validé\. Ce document rassemble les décisions acquises, les propositions de travail, les spécifications fonctionnelles et le brief de relais\. Aucun site n’a été installé, aucun nom réservé et aucune configuration externe modifiée\.

## 1\. Décisions acquises et limites

### Décisions de l’utilisateur

- Créer une boutique de parfums en ligne\.
- Acheter au fournisseur seulement après réception d’une commande client\.
- Utiliser le code Modave React fourni pour la boutique publique, puis le relier à WordPress + WooCommerce pour la gestion. Le paquet inspecté utilise Vite, pas Next.js. Le thème WordPress Modave est abandonné pour le frontend.
- Rechercher un rendu minimaliste et propre\.
- Préparer marque, direction artistique, catalogue, finances, livraison et spécifications avant l’installation du site\.
- Ne pas utiliser Claude Design ; personnaliser le template retenu\.
- ChatGPT prépare le dossier ; Claude Opus poursuit les travaux de conception technique ; Claude Code intervient ensuite pour l’implémentation\.

### Hypothèses de travail, non validées

|Sujet         |Hypothèse proposée                              |Validation requise                             |
|--------------|------------------------------------------------|-----------------------------------------------|
|Marché        |Sénégal, démarrage à Dakar                      |Zone commerciale réelle                        |
|Monnaie       |FCFA, code XOF                                  |Confirmation                                   |
|Offre initiale|8 à 12 références vérifiées                     |Disponibilité et économie unitaire             |
|Exploitation  |Confirmation manuelle des commandes             |Capacité quotidienne de l’utilisateur          |
|Livraison     |Tarif par zone, facturé séparément              |Devis et couverture du livreur                 |
|Paiement      |Mode à choisir selon disponibilité et trésorerie|Accord utilisateur et conditions du prestataire|
|Langue        |Français                                        |Besoin éventuel d’autres langues               |

Le budget, les prix de vente, les délais, le fournisseur contractuel, les moyens de paiement, le nom restent ouverts ; Modave React/Vite est retenu comme base de la boutique\. Ne pas convertir ces hypothèses en promesses publiques\.

## 2\. Audit des captures fournisseur

Source : sept captures visibles dans la conversation\. Il s’agit d’annonces, pas de devis négociés ni d’une vérification de stock ou d’authenticité\.

|Collection affichée                             |Lot de 12|Coût unitaire calculé sur le lot|Tarif unitaire affiché dès 3 pièces|Prix d’une pièce affiché|
|------------------------------------------------|--------:|-------------------------------:|----------------------------------:|-----------------------:|
|Royal                                           |45 000 F |3 750 F                         |4 000 F                            |6 000 F                 |
|Joyous                                          |42 000 F |3 500 F                         |3 750 F                            |6 000 F                 |
|Kay-aly                                         |47 000 F |3 916,67 F                      |4 000 F                            |7 000 F                 |
|Niche 50 ml                                     |45 000 F |3 750 F                         |4 000 F                            |6 000 F                 |
|Loui Martin, écrit « lui Martin » dans l’annonce|45 000 F |3 750 F                         |4 000 F                            |6 000 F                 |

Ces cinq fiches affichent NDIARÉ Parfumerie\. La capture Dark Door provient de Salick Parfumerie et annonce 18 000 F, livraison gratuite : ni son tarif revendeur ni la zone couverte ne sont établis\. Les lignes Yara et poudre de musk sont incomplètes dans la vue catalogue ; elles sont exclues des calculs\.

**Règle financière : tant qu’aucun accord revendeur n’est obtenu, calculer l’achat d’une commande d’une pièce à partir du tarif unitaire affiché\.** Les coûts de 3 500 ou 3 750 F calculés à la douzaine ne sont pas des prix unitaires disponibles sans achat du lot\.

### Questions à transmettre au fournisseur

1. Quel prix accordez\-vous à un revendeur pour une seule pièce ?
2. Les trois pièces peuvent\-elles être différentes ? Les lots peuvent\-ils être assortis ?
3. Comment connaître le stock et combien de temps pouvez\-vous réserver un article ?
4. Quels sont les délais et coûts de récupération ou d’envoi ?
5. Pouvez\-vous livrer directement, avec un emballage et un bon sans votre prix de vente ?
6. Quelles références exactes, contenances, concentrations et provenances pouvez\-vous documenter ?
7. Fournissez\-vous facture ou justificatif d’achat ?
8. Que se passe\-t\-il en cas de fuite, casse, erreur, défaut ou refus client ?
9. Pouvons\-nous utiliser vos photos et vidéos commercialement ?
10. Comment êtes\-vous payé et y a\-t\-il un délai de règlement possible ?

Conserver les réponses datées et écrites\. Ne pas confondre accord de retour fournisseur et politique de retour envers le client\.

## 3\. Modèle commercial et positionnement

Le modèle est une vente avec approvisionnement à la commande\. Il ne devient du dropshipping direct que si le fournisseur expédie au client\. Une commande reçue ne constitue pas automatiquement un encaissement ni une disponibilité fournisseur\.

### Positionnement proposé

Une boutique de sélection de parfums accessibles, avec un choix compréhensible, une présentation soignée et une livraison expliquée clairement\.

- Cible de travail : personnes qui cherchent un parfum pour elles\-mêmes ou un cadeau, et veulent être guidées sans vocabulaire compliqué\.
- Valeur : sélection courte, informations précises, photos fidèles, prix total transparent, contact humain\.
- Promesse de travail : « Trouvez le parfum qui vous ressemble\. »
- À éviter : concurrence uniquement par les prix, catalogue fournisseur intégral, promesses de tenue sans preuve, faux avis et fausses urgences\.

### Sélection de lancement

Choisir 8 à 12 références, couvrant plusieurs préférences uniquement si les caractéristiques sont documentées\. Évaluer chaque référence sur disponibilité, marge après frais, qualité observée, informations disponibles et qualité des photos\. Ne pas imposer de quota de familles olfactives si le fournisseur ne peut pas les confirmer\.

Acheter quelques échantillons ou produits de contrôle représente une dépense de validation, même dans un modèle sans stock commercial\. Prévoir ce poste au budget\.

## 4\. Nom de marque et identité éditoriale

### Critères de choix

Nom court, prononçable en français dans le contexte local, facile à écrire et à dicter sur WhatsApp, compatible avec une boutique multimarque et une éventuelle extension à des coffrets\. Éviter toute ressemblance créant une confusion avec les marques revendues\.

### Pistes créatives non vérifiées

|Piste         |Intention                                |Point de vigilance                           |
|--------------|-----------------------------------------|---------------------------------------------|
|Nérova        |Sonorité contemporaine, kunivers sensoriel|Écriture sans accent pour domaine et comptes |
|Sillage Studio|Boutique de sélection éditoriale         |Expression potentiellement déjà utilisée     |
|Maison Nuance |Choix selon goûts et personnalités       |Nom assez générique, disponibilité incertaine|

Préférence créative provisoire : Nérova\. Ce n’est ni une validation de disponibilité, ni une décision de l’utilisateur\. Avant adoption : recherche d’antériorités pertinente au marché visé, domaines, réseaux sociaux et risque de confusion\. Ne pas acheter ni réserver sans choix final\.

### Ton rédactionnel

Clair, chaleureux, précis\. Vouvoiement par défaut proposé\. Phrases courtes\. Décrire ce qui est vérifié ; ne pas inventer de récit de fabrication\. La marque représente une boutique de sélection, pas nécessairement un fabricant\.

Textes de base proposés :

- Titre d’accueil : « Trouvez le parfum qui vous ressemble\. »
- Introduction : « Explorez notre sélection et choisissez selon vos envies\. »
- CTA principal : « Découvrir les parfums »\.
- Aide : « Un doute sur votre choix ? Parlons\-en sur WhatsApp\. »

## 5\. Charte graphique de travail

Cette charte est applicable au template retenu\. Elle n’exige pas de maquettes sur mesure ni de Claude Design\.

|Élément               |Proposition                                                 |
|----------------------|------------------------------------------------------------|
|Fond principal        |Blanc #FFFFFF                                               |
|Fond secondaire       |Ivoire #F7F4EF                                              |
|Texte principal       |Noir doux #191919                                           |
|Texte secondaire      |Gris #595959                                                |
|Accent                |Prune #613A4B                                               |
|Bordures              |Gris clair #E5E1DC                                          |
|Texte sur bouton prune|Blanc #FFFFFF, contraste à contrôler en recette             |
|Typographie           |Pile système sans-serif au départ ; une seule famille suffit|
|Graisses              |400 pour texte, 500/600 pour titres et commandes            |
|Corps mobile          |Base 16 px, interligne 1,5                                  |
|Titres                |H1 environ 32–44 px selon écran ; éviter le gigantisme      |
|Arrondis              |6–10 px, cohérents avec le template                         |
|Espacements           |Échelle 4, 8, 12, 16, 24, 32, 48, 64 px                     |
|Icônes                |Une seule famille, traits cohérents, libellés accessibles   |

Logo initial recommandé : logotype simple basé sur le nom validé, variante sombre et claire, puis favicon lisible\. Le logo final n’est pas produit à ce stade\.

Photos : flacon entier, proportions préservées, fond cohérent, étiquette lisible\. Privilégier un ratio constant pour les cartes et un affichage qui ne coupe pas le produit\. Conserver les couleurs réelles et le packaging\. Les captures d’écran sont des sources de travail, pas des médias finaux de boutique\. Une ambiance générée ne doit pas modifier l’identité du produit ni servir de preuve de ses ingrédients\.

## 6. Architecture retenue : Modave React/Vite + WordPress/WooCommerce

Décision utilisateur : utiliser le code React fourni, puis connecter le dashboard WordPress/WooCommerce. La boutique publique réutilise Modave ; WordPress et WooCommerce assurent le contenu choisi et le moteur commercial. Pas de Claude Design.

### Audit initial de modavereact-10.rar

Inspection statique des fichiers, sans installation des dépendances, lancement du projet ou audit exhaustif de sécurité.

| Élément | Constat |
|---|---|
| Projet | modave-package/modavereact |
| package.json | name : modave-reactjs-19 ; version déclarée 0.0.0 |
| Interface | react et react-dom ^19.0.0 |
| Build | Vite ^6.2.0 ; scripts dev/build/preview utilisant Vite |
| Navigation | react-router-dom ^7.2.0 |
| Style/composants | Bootstrap ^5.3.2, Sass, Swiper |
| Réseau disponible | Axios, mais sa présence ne prouve pas une intégration commerciale |
| Catalogue inspecté | src/data/products.js ; importé par le contexte |
| Panier | src/context/Context.jsx : état React et localStorage cartList |
| Calcul du sous-total | Quantité × prix des données côté navigateur |
| Checkout inspecté | src/components/otherPages/Checkout.jsx : formulaires avec preventDefault, sans traitement réel de commande identifié dans ce composant |
| Connexion WooCommerce | Aucune occurrence woocommerce, wc/store ou wc/v3 trouvée dans src lors du contrôle ciblé |

Les plages de versions ci-dessus viennent de package.json, pas d’un environnement installé. Le nom modavereact-10.rar n’est pas une preuve de version interne 1.0. Ce projet n’est pas Next.js ; ne pas planifier une migration sans justification et validation.

### Répartition cible

| Partie | Responsabilité |
|---|---|
| Modave React/Vite | Affichage, navigation, cartes produits, formulaires et expérience mobile |
| WordPress | Administration, médias et contenus éditoriaux explicitement définis |
| WooCommerce | Produits, variantes, prix, disponibilité déclarée, livraison, commandes et statuts |
| Intégration | Remplacer les données fictives et raccorder panier/checkout au moteur WooCommerce |
| Prestataire de paiement | Transaction et notification vérifiée du résultat |

Le dashboard natif WordPress/WooCommerce suffit ; aucun dashboard sur mesure demandé. Le thème WordPress Modave, Elementor et Modave Core ne sont plus des dépendances du frontend. WordPress conserve un thème technique standard pour ses éventuelles pages natives, à définir selon le checkout retenu.

### Principes d’intégration

- WooCommerce est la source de vérité des montants et des commandes. Les prix de localStorage ne doivent jamais être acceptés comme prix de commande.
- Étudier la Store API et ses sessions Cart-Token pour catalogue/panier/checkout ; ne pas recréer un moteur e-commerce parallèle.
- Une application Vite livrée au navigateur ne fournit pas de serveur privé. Toute opération privilégiée doit être exécutée côté WordPress ou dans une couche serveur explicite. Aucune clé WooCommerce secrète dans le bundle ni dans une variable VITE_ publique.
- Remplacer le panier de démonstration par une session commerciale persistante et isolée entre visiteurs.
- Recalculer disponibilité, quantité, frais, remises et total côté WooCommerce avant la commande.
- Définir CORS, origines autorisées, stockage de session et protection des requêtes selon l’architecture retenue.
- Conserver quartier, adresse, repère et localisation facultative dans la commande, avec accès limité aux intervenants autorisés.
- Vérifier les paiements réellement retenus avant de confirmer un checkout React intégral. Une extension WooCommerce n’est pas automatiquement compatible avec ce parcours.
- Si un checkout WooCommerce natif est nécessaire, démontrer le transfert sécurisé du panier, des variantes et quantités, puis le retour cohérent. Un lien seul ne transfère pas la session.
- Supprimer les formulaires de carte bancaire de démonstration et utiliser l’interface sécurisée du prestataire retenu ; aucune collecte maison de données de carte.
- Prévenir les doubles commandes, vérifier les notifications de paiement et ne jamais marquer une commande payée sur le seul retour navigateur.
- Définir la mise à jour du catalogue et du stock déclaré, les caches et les erreurs API. Le stock fournisseur reste un processus distinct.

### Hébergement et référencement

Prévoir le déploiement du build Vite et le routage des URLs React, ainsi que PHP/base de données pour WordPress. Ils peuvent être hébergés chez le même prestataire sans constituer une seule application. Vérifier les pages produit accessibles directement, les métadonnées, le sitemap, les URLs canoniques et les aperçus sociaux. Choisir une stratégie de rendu/prérendu adaptée aux objectifs SEO sans supposer que Vite apporte un rendu serveur automatiquement.

### Séquence recommandée

1. Terminer le cadrage, la marque, les données produit, le paiement et les spécifications.
2. Préparer le code Modave et identifier une démo adaptée sans reconstruire le design.
3. À l’implémentation, prouver tôt un produit WooCommerce → panier → frais de livraison → commande visible en administration → confirmation fiable.
4. Étendre ensuite au catalogue et à la personnalisation complète.
5. Recetter les erreurs, paiements, mobile, SEO et gestion quotidienne avant lancement.

Le visuel peut être préparé avant la connexion, mais ne pas attendre la fin de toute la personnalisation pour tester l’intégration commerciale.

### Budget

Prévoir hébergement frontend et WordPress, intégration API, paiement, maintenance et tests. Retirer les travaux Elementor et Modave Core. Aucun coût ou gain de simplicité global n’est garanti : le template économise du design, la connexion reste un développement.

## 7\. Architecture des pages et UX

### Navigation

Header : logo, Boutique, Choisir son parfum, Contact ; recherche et panier accessibles\. Menu mobile simple\. Pas de menu inférieur ou de favoris imposé pour la V1\.

Footer : présentation courte, contact, livraison et paiement, FAQ/retours, conditions, confidentialité et réseaux réellement actifs\.

|Page                 |Contenu et rôle                                                                  |
|---------------------|---------------------------------------------------------------------------------|
|Accueil              |Promesse, sélection, aide au choix, fonctionnement, réassurance vérifiable       |
|Boutique             |Grille, prix, disponibilité, filtres alimentés par des données fiables           |
|Produit              |Photos, nom, marque, format, prix, description, disponibilité, livraison et achat|
|Choisir son parfum   |Guide court par préférences documentées, lien vers conseil WhatsApp              |
|Notre boutique       |Présentation réelle, approche de sélection, coordonnées                          |
|Livraison et paiement|Zones, tarifs, délais, conditions et modes disponibles                           |
|FAQ et retours       |Questions, erreurs, défauts, annulations et procédure de contact                 |
|Contact              |Téléphone/WhatsApp, formulaire court, horaires réels                             |
|Panier               |Articles, quantités, montant, estimation de livraison clairement qualifiée       |
|Commande             |Identité, adresse, zone, paiement, total et validation                           |
|Confirmation         |Numéro, état réel, prochaine étape, contact                                      |
|Pages légales        |Informations de l’entreprise et textes à finaliser selon situation réelle        |

Compte client facultatif ; achat invité prioritaire\. Pas de blog, fidélité, application, ERP ou automatisation complexe au lancement\.

### Accueil : ordre recommandé

1. Hero compact : titre, phrase, CTA et éventuellement une photo réelle\.
2. Sélection de produits renseignés, sans étiquette « meilleures ventes » sans données\.
3. Entrées par préférences si le catalogue les permet\.
4. Bloc « Besoin d’un conseil ? » vers WhatsApp\.
5. Fonctionnement de commande et livraison, selon règles validées\.
6. Présentation courte de la boutique et footer\.

### États à prévoir

Aucun résultat, produit indisponible, variante non sélectionnée, zone non desservie, localisation refusée, paiement échoué ou en attente, double clic de commande, erreur réseau et confirmation réussie\. Ne pas afficher un faux état « payé » ou « expédié »\.

## 8\. Catalogue maître et modèle de fiche produit

Une collection fournisseur n’est pas une référence vendable\. Créer une ligne par parfum et par variante utile ; ne regrouper en variantes que les options d’un même produit\.

### Champs internes

SKU ; fournisseur ; nom exact ; marque ; contenance ; concentration ; variante ; famille ; notes sourcées ; référence de la source ; date de vérification ; prix d’achat applicable ; coût d’approvisionnement ; prix de vente ; disponibilité ; délai ; photos autorisées ; poids/dimensions si requis ; informations d’usage présentes sur le produit ; statut de publication\.

### Gabarit éditorial réutilisable

```text
Titre : [Marque] — [Nom exact] — [Contenance vérifiée]
Résumé : [Une ou deux phrases fondées sur les informations vérifiées]
Prix : [Prix de vente validé] FCFA
Format : [Contenance et concentration]
Profil : [Famille documentée, sinon section omise]
Notes : [Notes documentées, sinon section omise]
Description : [Explication simple et fidèle]
Livraison : [Zone / tarif / délai validés ou lien vers conditions]
Conseil : Une question sur ce parfum ? Contactez-nous sur WhatsApp.
```

Champs manquants = produit en brouillon\. Ne pas inventer la durée de tenue, l’authenticité, les avis, les certifications ou les bénéfices\. Employer le nom réellement porté par le flacon ; ne pas présenter Kay\-aly comme une autre marque au nom proche\. Toute comparaison à un parfum tiers exige une revue adaptée avant publication\.

## 9\. Spécifications commande, paiement et livraison

### Processus métier proposé

1. Recevoir la demande de commande et attribuer un numéro\.
2. Vérifier le stock, le coût et le délai fournisseur ; réserver si possible\.
3. Confirmer au client le produit, l’adresse, le montant total et le délai\.
4. Selon le mode retenu, vérifier le paiement reçu ou confirmer le paiement à la livraison\.
5. Acheter puis contrôler le produit, ou transmettre au fournisseur chargé d’expédier\.
6. Préparer l’envoi et donner au livreur uniquement les informations nécessaires\.
7. Confirmer la livraison et rapprocher l’argent réellement encaissé\.
8. Traiter tout incident et enregistrer son coût\.

Ce sont des étapes métier\. Claude Opus doit proposer leur correspondance avec les statuts WooCommerce, sans supposer qu’ils existent tous nativement\.

### Paiement : décisions à prendre

- Paiement à la livraison : définir confirmation, avance de trésorerie, encaissement livreur et reversement\.
- Paiement avant livraison : définir réservation du stock, délai de vérification et remboursement si indisponible\.
- Paiement mobile : sélectionner ensuite le prestataire et vérifier frais, contrat, compatibilité et confirmation fiable\. Une capture de paiement n’est pas une preuve suffisante d’encaissement\.
- Ne jamais collecter de code secret ou d’identifiant de paiement sensible dans un formulaire maison\.

### Adresse et localisation

|Champ                    |Règle proposée                                          |
|-------------------------|--------------------------------------------------------|
|Nom du destinataire      |Obligatoire                                             |
|Téléphone                |Obligatoire, format normalisé et erreur compréhensible  |
|Commune/quartier         |Choix contrôlé pour les zones couvertes                 |
|Adresse et repère        |Informations suffisantes pour livrer                    |
|Instructions             |Facultatif                                              |
|Lien de carte / point GPS|Facultatif, modifiable                                  |
|E-mail                   |Décision UX/technique à vérifier selon paiement et reçus|

V1 minimale : adresse \+ quartier \+ lien de carte facultatif\. Amélioration possible : bouton « Utiliser ma position », demandant l’autorisation après clic ; latitude/longitude, point corrigible et solution manuelle si refus\. La position actuelle n’est pas forcément l’adresse de livraison : demander confirmation explicite du lieu\.

Le tarif doit provenir d’une grille de zones validée, pas d’une déduction approximative depuis les coordonnées\. Le total est visible avant validation\. Zone non couverte : empêcher une commande standard avec une fausse livraison à zéro et proposer un contact\.

Les positions ne doivent pas apparaître dans les outils publicitaires ou les URL publiques\. Limiter leur accès aux personnes chargées de traiter la commande\. Prévoir les règles de conservation et d’information client dans la préparation des textes\.

### Exceptions à documenter

Rupture après demande ; produit payé indisponible ; client injoignable ; adresse imprécise ; retard ; casse ; erreur de référence ; refus ; deuxième passage ; retour ; remboursement ; argent encaissé par le livreur non encore reversé\. Pour chaque cas : responsable, action, message client, coût et clôture\.

## 10\. Modèle financier préparé

Les montants ci\-dessous sont des simulations pédagogiques, pas un budget approuvé, un devis ou une prévision de demande\. Ils devront être remplacés par les données réelles\. La fiscalité dépend de la situation de l’entreprise et n’est pas établie ici\.

### Variables

P = prix de vente du produit ; Lf = livraison facturée ; A = achat fournisseur ; Ap = approvisionnement ; E = emballage ; Lr = livraison réelle ; Fp = frais de paiement ; Cac = publicité par commande livrée et encaissée ; I = coût moyen des incidents affecté à une vente\.

Contribution par commande = P \+ Lf − A − Ap − E − Lr − Fp − Cac − I\.

Résultat d’exploitation simplifié = somme des contributions − charges fixes\. Préciser séparément fiscalité et rémunération si elles ne sont pas intégrées\. Ne pas appeler cette contribution « bénéfice net »\.

### Sensibilité au prix d’achat

Hypothèses communes : vente 10 000 F ; approvisionnement 500 F ; emballage 300 F ; frais de paiement 200 F ; acquisition 1 000 F ; incidents 300 F\. Livraison facturée à son coût réel, donc solde nul dans cet exemple\.

|Indicateur                               |Achat unitaire 6 000 F|Achat négocié 4 000 F|
|-----------------------------------------|---------------------:|--------------------:|
|Marge sur produit avant autres frais     |4 000 F               |6 000 F              |
|Contribution avant publicité             |2 700 F               |4 700 F              |
|Contribution après publicité             |1 700 F               |3 700 F              |
|Taux de contribution sur prix produit    |17 %                  |37 %                 |
|CAC maximal avant frais fixes et bénéfice|2 700 F               |4 700 F              |

Un CAC égal à ce maximum ne laisse rien pour les frais fixes ou le bénéfice\. Si une livraison de 2 000 F est offerte au lieu d’être refacturée, la contribution du premier scénario devient −300 F\.

### Scénarios d’activité illustratifs

Base : achat à 6 000 F, contribution avant publicité 2 700 F, charges fixes hypothétiques 20 000 F/mois\. Ces scénarios ne prédisent pas les ventes\.

|Scénario                               |Commandes livrées et encaissées/mois|CAC supposé|Contribution/commande|Résultat simplifié/mois|
|---------------------------------------|-----------------------------------:|----------:|--------------------:|----------------------:|
|Faible volume / acquisition coûteuse   |15                                  |1 500 F    |1 200 F              |−2 000 F               |
|Référence de travail                   |30                                  |1 000 F    |1 700 F              |31 000 F               |
|Volume supérieur / acquisition efficace|60                                  |800 F      |1 900 F              |94 000 F               |

Seuil de rentabilité dans le scénario de référence : arrondi supérieur de 20 000 / 1 700 = 12 commandes livrées et encaissées par mois\. Ce résultat dépend entièrement des hypothèses et exclut les postes non renseignés\.

### ROI et récupération

Définir l’investissement initial K comme les dépenses de lancement non déjà comptées dans les charges mensuelles\. Résultat cumulé après lancement = somme des résultats mensuels − K\. ROI simplifié sur la période = &#40;somme des résultats mensuels − K&#41; / K, si K \> 0\. Délai de récupération : premier mois où les résultats cumulés couvrent K\. Le besoin de trésorerie se suit séparément ; éviter de compter deux fois les achats ou la réserve\.

Exemple conditionnel : K = 100 000 F et résultat mensuel stable de 31 000 F donneraient une récupération pendant le quatrième mois\. Ce n’est pas une promesse de rendement\.

### Trésorerie

Achats après commande ne signifie pas absence d’avance\. Avec cinq commandes simultanées et 6 800 F engagés par commande avant livraison, il faut déjà avancer 34 000 F, hors livraison et publicité\. Ajouter les décalages de reversement du livreur, remboursements et incidents\.

Prévisionnel de trésorerie hebdomadaire : solde initial \+ encaissements effectivement reçus − achats payés − transport − emballages − publicité − abonnements − remboursements = solde final\. Une commande refusée peut laisser un produit financé à revendre ; son coût n’est pas automatiquement une perte totale, mais il immobilise de l’argent\.

### Budget à chiffrer avant engagement

|Poste                   |Traitement                                      |
|------------------------|------------------------------------------------|
|Domaine et hébergement  |Coût réel initial et renouvellement             |
|Template et extensions  |Achat, renouvellement et services indispensables|
|Échantillons et contrôle|Quantité limitée, coûts réels                   |
|Logo et photos          |Production interne ou devis                     |
|Emballages              |Minimum de commande et coût unitaire            |
|Publicité test          |Plafond accepté et règle d’arrêt                |
|Réserve de trésorerie   |Avances liées au cycle réel d’encaissement      |
|Imprévus                |Montant choisi selon budget disponible          |

Pas de prix de vente final avant validation de ces postes et examen des alternatives réellement vendues sur le marché\.

## 11\. Acquisition et contenu

Créer sous le nom validé : Instagram, TikTok, WhatsApp Business et page Facebook\. Réutiliser les contenus adaptés aux formats ; ne pas imposer quatre productions éditoriales distinctes\.

Préparer avant lancement : bio courte, avatar, coordonnées, présentation, FAQ, visuels de produits et messages de service\. Ne pas afficher d’avis avant d’en avoir recueilli de vrais\.

### Mini\-calendrier proposé

|Moment                    |Contenu                                       |Objectif                 |
|--------------------------|----------------------------------------------|-------------------------|
|Préparation               |Présentation de la boutique et sélection      |Expliquer l’offre        |
|Préparation               |Photos/vidéos des vrais produits              |Montrer ce qui sera livré|
|Préparation               |Comment choisir + prix/livraison              |Lever les hésitations    |
|Lancement pilote          |Démonstration d’une commande                  |Clarifier le parcours    |
|Pilote                    |Préparation de colis avec consentements utiles|Montrer le service réel  |
|Après premières livraisons|Avis authentiques autorisés                   |Construire la confiance  |

Commencer par un pilote de 10 à 20 commandes au maximum si la capacité le permet\. Ce volume est une proposition opérationnelle, pas un objectif commercial garanti\. Corriger les difficultés avant d’augmenter les dépenses\.

Indicateurs : demandes reçues, commandes confirmées, livrées et encaissées, panier moyen, marge de contribution, CAC par commande encaissée, taux de refus, ruptures, délai réel et trésorerie\. Ne pas juger une campagne uniquement sur le chiffre d’affaires ou le nombre de commandes saisies\.

## 12\. Recette et conditions de lancement

- Prix, photos, format et disponibilité vérifiés pour chaque produit publié\.
- Commande mobile complète avec total correct\.
- Zone desservie au bon tarif ; zone non couverte correctement bloquée\.
- Fonctionnement sans GPS, avec GPS refusé et avec point corrigé si cette fonction est incluse\.
- Paiement testé selon le mode réellement configuré ; double notification sans double traitement\.
- Rupture et remboursement simulés sans fausse confirmation de disponibilité\.
- Notifications de commande délivrées ; coordonnées et liens vérifiés\.
- Aucun compte obligatoire pour acheter sauf contrainte explicitement acceptée\.
- Protection des accès, sauvegarde et procédure de restauration vérifiées\.
- Aucune donnée client ou position exposée publiquement\.
- Contrôle du contraste, du focus clavier, des libellés et du rendu mobile\.
- Conditions commerciales et données légales complétées avec les informations réelles\.
- Une commande de bout en bout, jusqu’au rapprochement d’encaissement, réalisée avant publicité à plus grande échelle\.

## 13\. Répartition du travail et portes de validation

|Étape                                                           |Responsable              |Sortie attendue                                           |
|----------------------------------------------------------------|-------------------------|----------------------------------------------------------|
|Données fournisseur et décisions commerciales                   |Utilisateur              |Conditions et budget réels                                |
|Stratégie, UX, contenus, charte de travail et modèle financier  |ChatGPT                  |Présent dossier puis mises à jour fondées sur les réponses|
|Architecture, sélection technique, risques et plan d’intégration|Claude Opus              |Dossier technique argumenté                               |
|Installation et personnalisation                                |Utilisateur + Claude Code|Préproduction conforme                                    |
|Audit UX, cohérence, marges et recette                          |ChatGPT + utilisateur    |Corrections et validation finale                          |

Porte A : tarif fournisseur et circuit de livraison établis\. Porte B : marque et budget acceptés\. Porte C : template, contenus et spécifications prêts\. Porte D : préproduction testée\. Porte E : lancement autorisé par l’utilisateur\.

Le présent dossier termine le cadrage initial réalisable avec les informations disponibles\. La validation des prix, du nom, des fiches finales et du prévisionnel réel dépend de données encore absentes ; elle n’est pas déclarée terminée\.

## 14. Brief à transmettre à Claude Opus — React/Vite et WooCommerce

> Tu reprends Fragrance comme architecte d’une boutique Modave React/Vite reliée à WordPress/WooCommerce. Lis ce dossier et l’archive modavereact-10.rar. La décision utilisateur est d’utiliser le code pour la boutique et WordPress/WooCommerce comme dashboard et moteur commercial. La version WordPress Modave n’est plus retenue pour le frontend. Pas de Claude Design.
>
> Constat initial : package.json déclare React 19, Vite 6.2 et React Router 7.2, pas Next.js. Le contexte charge les produits locaux, calcule les prix côté client et conserve le panier en localStorage. Le checkout inspecté est une interface de démonstration. Ne suppose pas une connexion WooCommerce existante.
>
> 1. Audite le projet et sa documentation, identifie les écrans réutilisables et les données/fonctions fictives. Vérifie les versions résolues, la maintenance et les dépendances avant installation. Ne migre pas vers Next.js par défaut.
> 2. Définis la séparation React/Vite, WordPress et WooCommerce. Conserve le dashboard natif ; aucun deuxième catalogue ou moteur de commandes.
> 3. Spécifie le contrat des produits, variantes, disponibilité et contenus, puis les API, sessions panier et mises à jour. Étudie Store API/Cart-Token et garde les accès privilégiés côté serveur.
> 4. Propose le checkout selon le paiement choisi : React avec compatibilité démontrée, ou passage vers WooCommerce avec transfert de session et de panier documenté. Définis total serveur, frais, erreurs, doublons et notifications vérifiées.
> 5. Spécifie quartier, adresse, localisation facultative et affichage dans la commande administrateur.
> 6. Définis les étapes métier fournisseur, paiement, livraison et encaissement, en conservant les inconnues commerciales.
> 7. Définis hébergement Vite/WordPress, routage, CORS, secrets, sauvegardes, mises à jour et SEO des pages produit. Si du code serveur est nécessaire, précise où il réside ; Vite n’en crée pas automatiquement.
> 8. Produis un budget technique avec coûts vérifiés ou postes à chiffrer et un plan pour Claude Code. Exige un premier parcours vertical connecté avant la personnalisation complète.
> 9. Fournis une recette couvrant stock modifié, prix manipulé, panier isolé, rafraîchissement, erreurs réseau, paiement échoué/répété et localisation refusée.
>
> Livrable : FRAGRANCE_02_ARCHITECTURE_MODAVE_REACT_WOOCOMMERCE.md. Préparation uniquement : n’installe rien, ne publie rien et n’achète rien à cette étape. Les prix fournisseur, le nom, les prix de vente et le budget restent à valider. Termine par les seules décisions indispensables et un prompt d’implémentation pour Claude Code.

## 15\. Sources et traçabilité

- Instructions et captures fournies par l’utilisateur dans cette conversation, 27 septembre 2026\.
- WooCommerce, zones de livraison : https://woocommerce\.com/document/setting\-up\-shipping\-zones/
- WooCommerce, paiement à la livraison : https://woocommerce\.com/document/cash\-on\-delivery/

Ces deux documentations ont été consultées pendant le cadrage\. Elles établissent l’existence des zones et du paiement à la livraison ; elles ne prouvent pas qu’une gestion spécifique des quartiers ou un sélecteur GPS soit natif\. Aucun tarif d’extension, nom de domaine, statut de marque, règle fiscale ou promesse de disponibilité commerciale n’a été vérifié dans ce dossier\.

### Sources de l’inspection React

- Archive utilisateur modavereact-10.rar, inspectée le 27 septembre 2026.
- modave-package/modavereact/package.json.
- src/context/Context.jsx ; src/data/products.js.
- src/components/otherPages/Checkout.jsx.
- Documentation WooCommerce précédemment consultée : https://developer.woocommerce.com/docs/apis/store-api/
- Sessions panier : https://developer.woocommerce.com/docs/apis/store-api/cart-tokens
- Checkout : https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/checkout

Inspection statique ciblée : aucun build, aucune installation, aucune connexion à WordPress ni certification de sécurité réalisée.

### Historique

- V1.0 : cadrage initial.
- V1.1 : piste React/Next.js envisagée.
- V1.2 : inspection du paquet WordPress et configuration native temporairement retenue.
- V1.3 : nouvelle décision utilisateur, code React + dashboard WordPress/WooCommerce ; archive réelle identifiée React/Vite. Cette version remplace les précédentes pour l’architecture.
