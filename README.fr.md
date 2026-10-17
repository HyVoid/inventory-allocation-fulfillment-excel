[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Excel d'allocation de stock multi-sites et de préparation de commandes (calculateur ATP et achats)
<img width="1920" height="833" alt="image" src="https://github.com/user-attachments/assets/1379f571-ef41-486b-9c87-e6dc5cb96b2e" />

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-217346.svg)
![Category](https://img.shields.io/badge/Tool-Supply%20Chain%20%26%20ATP%20Planning-2251FF.svg)

**Un modèle Excel d'allocation de stock multi-sites, de calcul du Available-to-Promise (ATP) et de planification de la préparation de commandes. Conçu pour les planificateurs de chaîne logistique, les analystes de stock et les distributeurs multi-entrepôts qui doivent rapprocher le stock physique, les réservations de commandes actives, les conteneurs en transit et les bons de commande (PO) ouverts—afin de déterminer la faisabilité exacte de livraison OTIF et les besoins nets d'approvisionnement, dans les formats navigateur et Microsoft Excel.**

Sans inscription. Sans installation de logiciel. Accès instantané via le simulateur gratuit de préparation de commandes en ligne, accompagné d'un classeur Microsoft Excel téléchargeable pour le rapprochement des données ERP hors ligne, des opérations S&OP répétables et des registres d'audit permanents.

> **Accédez aux outils de planification d'allocation de stock et de préparation de commandes**
>
> - 🌐 **[Lancez le simulateur en ligne gratuit d'allocation de stock et d'ATP](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** — Testez des hiérarchies d'approvisionnement multi-entrepôts, simulez des règles d'expédition éclatée et vérifiez la faisabilité de livraison en ligne sans installer de logiciel ni configurer de tableurs.
> - 📥 **[Téléchargez le classeur Excel multi-sites de préparation de commandes (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** — Obtenez le classeur opérationnel complet de 13 feuilles pour des imports récurrents de données ERP, un suivi hors ligne du registre des réservations et des calculs automatisés de réapprovisionnement net. *Garantie de remboursement de 30 jours sans condition.*
>

---

## Indicateurs clés de la chaîne logistique et défis de préparation de commandes résolus

Plutôt que de croiser manuellement des exports ERP statiques, ce moteur d'allocation paramétrique structure l'offre et la demande multi-échelons dans un registre unique et auditable. Voici comment le classeur associe les **points de douleur de la distribution multi-sites** aux **indicateurs automatisés d'ATP et d'approvisionnement** :

| Point de douleur logistique et de préparation de commandes | Mécanisme automatisé de rapprochement et d'allocation | Indicateurs clés de stock et d'OTIF suivis |
| :--- | :--- | :--- |
| **Faisabilité de préparation de commandes floue (risque OTIF)** | Évalue les dates de livraison demandées par les clients par rapport au stock multi-niveaux des entrepôts, aux délais de transfert et aux marges douanières. | Indicateur de faisabilité On-Time In-Full (OTIF), taux de remplissage partiel, date de livraison estimée (EDD), quantité de ligne non satisfaite |
| **Approvisionnement multi-entrepôts fragmenté** | Alloue la demande selon une hiérarchie d'approvisionnement à 5 niveaux : Local Stock $\rightarrow$ Nearby Stores $\rightarrow$ Central DC $\rightarrow$ In-Transit $\rightarrow$ Open POs. | ID de source d'approvisionnement attribuée, allocation en expédition éclatée, éligibilité au rayon de transfert inter-agences |
| **Promesses excessives sur le stock physique disponible** | Déduit des stocks bruts les engagements clients existants, les réservations actives du registre, les marges de stock de sécurité et la protection des prévisions. | Available-to-Promise (ATP) net, stock physique disponible vs stock allouable, plancher protégé de stock de sécurité |
| **Double comptage du stock en transit et des PO ouvertes** | Lie directement les enregistrements de conteneurs entrants aux lignes de bons de commande d'origine pour éliminer la gonflage fantôme du pipeline. | Quantité nette de pipeline de PO ouvertes, volume de conteneurs en transit rapproché, ID unifié du registre d'approvisionnement |
| **Achats paniques et surcommande sur demande brute** | Calcule les déficits nets réels de stock uniquement après épuisement de tout le stock allouable du réseau et des pipelines de réapprovisionnement entrants. | Quantité nette de déficit, quantité commandée ajustée au MOQ et au conditionnement standard, date la plus tardive de lancement de PO |
| **Données maîtres cachées et erreurs d'export ERP** | Exécute des contrôles de diagnostic préalables à l'allocation sur les commandes clients importées, les tables maîtres SKU et les enregistrements de réservation. | Alertes d'expéditions orphelines, signalements de codes SKU/emplacement manquants, réservations de devis expirées, conflits de surallocation |

---

## Tutoriel pas à pas : exécuter l'allocation de stock multi-entrepôts et le réapprovisionnement net

Le classeur fonctionne comme un **cycle répétable de Distributed Order Management (DOM) et de DRP** : configurez une seule fois les règles de votre réseau de distribution, collez les exports bruts de votre ERP/WMS, auditez les exceptions et figez les engagements de préparation.

### Étape 1 : configurer les règles du réseau de distribution et les paramètres ATP
Ouvrez l'onglet `00_Config_Params` pour établir vos règles de gouvernance de la chaîne logistique sans toucher aux formules des cellules en aval :

- **Topologie du réseau :** désignez le code du Centre de Distribution (DC) central et le rayon maximal de transfert inter-agences des sites proches.
- **Protection du stock :** définissez les politiques de protection par stock de sécurité, les seuils de protection de la demande prévisionnelle et les périodes de validité des réservations de devis (jours d'expiration).
- **Marges de délai et de conditionnement :** définissez les marges de transfert inter-entrepôts, les délais de dédouanement et les règles de conditionnement/arrondi standard.

### Étape 2 : importer les commandes clients ERP, le stock disponible et les données du pipeline entrant
Exportez des tableaux bruts CSV/XLSX depuis votre plateforme ERP, comptable ou WMS (p. ex. NetSuite, SAP Business One, Dynamics 365, Fishbowl, Cin7) et collez-les dans les feuilles d'entrée standardisées :

- **Demande clients :** lignes de commandes clients ouvertes, sites de destination et dates de livraison demandées par les clients.
- **Stock d'entrepôt :** instantanés du stock physique par SKU et code d'emplacement d'entrepôt.
- **Pipeline d'approvisionnement entrant :** lignes de bons de commande (PO) ouvertes avec dates d'arrivée promises par les fournisseurs, plus manifestes d'expéditions/conteneurs en transit en temps réel.
- **Données maîtres logistiques :** fichier articles (MOQ, conditionnement), fichier emplacements, matrice de distances intersites et délais fournisseurs.

*(Conservez les en-têtes de colonne prédéfinis et évitez d'écraser les colonnes calculées par formules.)*

### Étape 3 : auditer les exceptions de données et examiner la préparation hypothétique des commandes
Déclenchez le recalcul du classeur et suivez la revue de décision en trois étapes :

1. **Audit d'hygiène des données (`13_Audit_Validation`) :** résolvez les correspondances manquantes du fichier articles SKU, les codes d'entrepôt invalides, les conteneurs en transit orphelins ou les réservations expirées avant de vous fier aux résultats en aval.
2. **ATP et approvisionnement au niveau ligne (`11_WhatIf_Fulfillment`) :** inspectez les statuts exacts de préparation (`Full & On-Time`, `Late`, `Partial`, `Shortage`), les entrepôts d'approvisionnement attribués et les dates d'arrivée estimées par ligne de commande client.
3. **Achats nets MRP / DRP (`12_Procurement_Summary`) :** passez en revue les manquants nets non couverts, les allocations fournisseurs recommandées, les quantités commandées ajustées au MOQ/conditionnement et les dates les plus tardives de lancement de bons de commande.

### Étape 4 : figer les réservations d'approvisionnement et opérationnaliser dans le classeur Excel
Lorsque des commandes clients prioritaires exigent une protection garantie du stock, consignez les ID d'approvisionnement alloués dans `09_Reservations_Ledger` et basculez le statut sur `Active` pour soustraire ce stock des exécutions suivantes.

> 📦 **Prêt à éliminer le rapprochement manuel du stock dans tout votre réseau d'entrepôts ?** 
> Après avoir testé la hiérarchie d'approvisionnement dans le **[simulateur gratuit d'allocation de stock en ligne](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)**, téléchargez le **[classeur Excel complet multi-sites de préparation de commandes (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** pour connecter vos exports ERP réels, tenir un registre de réservations permanent et exécuter hors ligne des cycles hebdomadaires de réapprovisionnement S&OP.

---

## Pourquoi j'ai construit ce moteur de décision multi-échelons de stock et d'ATP

Dans un réseau de distribution multi-sites, savoir *combien de stock physique se trouve dans vos entrepôts* n'a rien à voir avec savoir *si une commande client peut réellement être livrée à temps*.

Prenons un grossiste-distributeur ou une chaîne de magasins exploitant **28 nœuds de distribution**—combinant un Centre de Distribution (DC) central et des magasins avancés régionaux. Les données opérationnelles sont généralement fragmentées entre les exports de commandes clients de l'ERP, les instantanés de stock du WMS, les rapports d'achats ouverts, les trackers de conteneurs des transitaires et les matrices de transit régionales.

Lorsque les équipes de gestion des commandes rapprochent manuellement ces tableaux dans des feuilles ad hoc, deux défaillances systémiques surviennent :

### 1. L'illusion d'ATP des « 100 unités en stock »
Un instantané WMS d'entrepôt peut afficher **100 unités physiquement disponibles**. Or, 30 unités sont déjà engagées sur des bons de prélèvement ouverts, 20 unités sont bloquées en stock de sécurité protégé et 10 unités sont retenues sous une réservation de devis actif. Considérer le solde affiché de 100 unités comme du stock librement allouable garantit doubles réservations, prélèvements manquants en entrepôt et engagements OTIF manqués.

### 2. Le piège du double comptage PO « 160 unités entrantes » vs en transit
Les pipelines d'approvisionnement amont souffrent de la même défaillance de visibilité. Un rapport de PO ouvertes affiche **100 unités commandées** auprès d'une usine, tandis que le manifeste de conteneurs de l'équipe logistique montre **60 de ces mêmes unités déjà chargées en mer**. Si un planificateur de stock additionne séparément les PO ouvertes et les feuilles en transit, le réseau semble disposer de **160 unités d'approvisionnement futur** alors qu'il n'existe que **100 unités nettes**.

J'ai construit cette boîte à outils comme un **raisonnement décisionnel logistique industrialisé**—comblant l'écart entre les tableurs basiques et les logiciels APS/DOM d'entreprise à six chiffres. Elle unifie le calcul d'ATP net, le rapprochement PO-expédition, les règles d'approvisionnement multi-niveaux et la planification des achats tenant compte du MOQ en un flux de travail unique, transparent et auditable : **ce qui peut être promis, quel nœud doit expédier, ce qui reste non couvert et ce qu'il faut réellement acheter.**

---

## Tableurs ERP déconnectés vs classeur structuré d'ATP et d'allocation

| Dimension de planification logistique | Exports ERP manuels et tableurs ad hoc avec VLOOKUP | Moteur d'allocation de stock multi-sites (cet outil) |
| :--- | :--- | :--- |
| **Calcul du Available-to-Promise (ATP)** | Les soldes physiques disponibles sont pris pour du stock libre, provoquant des doubles allocations entre commerciaux et canaux. | Déduit automatiquement les engagements existants, les réservations actives du registre, le stock de sécurité et les marges de prévision avant toute allocation. |
| **Rapprochement en transit vs PO ouvertes** | Les PO ouvertes et les conteneurs de fret entrant sont additionnés séparément, gonflant les positions de stock projetées. | Rapproche les lignes d'expédition avec les numéros de PO d'origine pour calculer les quantités réelles restantes du pipeline usine. |
| **Faisabilité de livraison (OTIF et délai)** | Les planificateurs vérifient si le stock existe quelque part dans le réseau mais ignorent les temps de transfert inter-entrepôts et les marges douanières. | Évalue les dates de disponibilité du stock, les délais de transfert intersites et les retards douaniers directement par rapport aux dates de livraison demandées par les clients. |
| **Approvisionnement multi-entrepôts et expéditions éclatées** | Une agence déclenche une PO d'urgence pendant qu'un magasin proche dans le rayon de transfert détient un stock dormant excédentaire. | Applique une hiérarchie d'approvisionnement à 5 niveaux (`Local` $\rightarrow$ `Nearby` $\rightarrow$ `Central DC` $\rightarrow$ `In-Transit` $\rightarrow$ `Open PO`) avec prise en charge de l'expédition éclatée. |
| **Réapprovisionnement net et achats au MOQ** | Les acheteurs passent des PO sur la demande de ventes brute, en ignorant le stock déjà en transit ou entreposé dans les hubs régionaux. | Génère des recommandations d'achat de déficit net ajustées aux délais fournisseurs, aux quantités minimales de commande (MOQ) et aux conditionnements. |
| **Hygiène des données maîtres et audit des exceptions** | Les correspondances SKU rompues, les enregistrements de conteneurs orphelins et les blocages de stock expirés restent cachés jusqu'à l'échec du prélèvement en entrepôt. | La feuille dédiée `13_Audit_Validation` signale les erreurs d'intégrité des données, les sur-réservations et les conflits d'allocation avant exécution. |

---

## Pour qui ce classeur logistique est conçu : rôles et flux de travail

Cette boîte à outils d'allocation de stock et de préparation de commandes au format double (Navigateur + Excel) est conçue pour les équipes opérationnelles gérant un stock multi-nœuds sans automatisation APS/DOM d'entreprise :

- **Planificateurs de stock et analystes de planification offre/demande :** remplacez les fragiles chaînes de VLOOKUP multi-fichiers par un **modèle Excel structuré d'Available-to-Promise (ATP) et de DRP**. Rapprochez stock disponible, planchers de stock de sécurité et conteneurs entrants en quelques minutes avant les réunions S&OP hebdomadaires.
- **Coordinateurs de gestion des commandes (OM) et de préparation client :** utilisez le **calculateur de faisabilité de préparation de commandes** pour donner aux clients B2B des dates de livraison précises, évaluer les options d'expédition éclatée entre magasins régionaux et figer des réservations fermes de stock (`09_Reservations_Ledger`) pour les comptes VIP.
- **Spécialistes des achats et responsables achats :** éliminez le gonflage fantôme du pipeline et la surcommande. Utilisez le **moteur de rapprochement PO-expédition** et l'onglet `12_Procurement_Summary` pour calculer les déficits nets exacts d'achat, arrondis aux MOQ fournisseurs et aux quantités de conditionnement standard.
- **Opérations multi-sites et responsables de centres de distribution :** optimisez le rééquilibrage du stock entre 5 et plus de 30 nœuds d'entrepôts. Configurez des règles de rayon de transfert inter-magasins pour que le stock régional excédentaire couvre la demande proche avant d'épuiser le DC central ou de déclencher des PO fournisseurs externes.
- **Consultants en implémentation ERP et ingénieurs logistiques :** utilisez l'architecture transparente de 13 feuilles du classeur comme une **spécification inspectable de Distributed Order Management (DOM)**—idéale pour prototyper la logique d'allocation avant de coder des règles personnalisées dans NetSuite, SAP ou Microsoft Dynamics.

---

## Cas d'usage sectoriels et scénarios logistiques de niche

Que vous gériez des dépôts régionaux de matériaux de construction, des pièces industrielles en gros ou des magasins de détail omnicanal, ce cadre s'adapte aux topologies de distribution complexes :

### 1. Rééquilibrage d'un réseau de distribution hub-and-spoke (DC central + agences régionales)
En exploitant un centre de distribution central avec 10 à plus de 30 magasins avancés, les ruptures localisées coexistent souvent avec le surstock à l'échelle du réseau. Configurez le **paramètre de rayon de transfert** pour acheminer automatiquement les manquants de commandes vers les agences voisines éligibles avant de recourir au réapprovisionnement du DC central ou aux achats fournisseurs.

### 2. Rapprochement des conteneurs d'importation et des PO outre-mer à long délai
Les importateurs s'approvisionnant auprès de fabricants étrangers font face à de longs délais de fret maritime où une seule PO cadre (Blanket PO) génère plusieurs expéditions partielles de conteneurs. En rapprochant les **manifestes de conteneurs en transit avec les lignes de PO ouvertes**, les équipes achats évitent le double comptage du fret maritime entrant lors de la planification des pics saisonniers.

### 3. Réservations de devis B2B et mise sous cloche du stock prioritaire
Dans la distribution B2B et de gros par projet, les devis clients en attente exigent souvent des blocages temporaires de stock. Utilisez la **période de validité des réservations et le registre intégrés (`09_Reservations_Ledger`)** pour mettre sous cloche le stock des devis actifs tout en signalant automatiquement les blocages expirés, afin que le stock immobilisé retourne dans le pool général d'ATP.

---

## Architecture technique : ce qui distingue ce moteur d'allocation

Contrairement aux traceurs de stock statiques qui se contentent d'afficher les soldes actuels, ce classeur est conçu autour de six couches de contrôle opérationnel :

### 1. Hiérarchie d'approvisionnement configurable à 5 niveaux avec logique de préparation éclatée
Le moteur évalue l'approvisionnement selon une séquence stricte : **1. Stock local $\rightarrow$ 2. Sites proches (dans le rayon) $\rightarrow$ 3. DC central $\rightarrow$ 4. Approvisionnement en transit $\rightarrow$ 5. PO ouvertes**. Si un seul niveau ne peut couvrir la ligne de commande complète, le moteur prend en charge la **préparation éclatée** sur les niveaux suivants plutôt que de s'arrêter au premier manquant.

### 2. Comptabilité fidèle de l'Available-to-Promise (ATP) net
Le stock physique brut est amputé des engagements de commande existants, des réservations actives du registre, des planchers de stock de sécurité et de la protection des prévisions avant qu'une seule unité ne soit exposée à l'algorithme d'allocation.

### 3. Registre d'approvisionnement unifié et déduplication PO-expédition
En rapprochant les enregistrements en transit de leurs lignes de bons de commande d'origine, le modèle déduit les quantités expédiées des soldes de PO ouvertes et attribue un **identifiant d'approvisionnement unique** dans le registre unifié pour prévenir la double allocation.

### 4. Faisabilité de livraison double en quantité et en délai (calcul de l'EDD)
Avoir du stock dans le réseau ne signifie pas qu'il peut arriver à temps. Le moteur ajoute les dates de disponibilité de l'approvisionnement, les délais de transfert inter-sites, les marges de dédouanement et les calendriers de réapprovisionnement—en utilisant la **date d'arrivée la plus tardive parmi les sources éclatées** pour évaluer la véritable faisabilité OTIF par rapport à la date demandée par le client.

### 5. Moteur d'achats net tenant compte du MOQ et du conditionnement
Les recommandations d'achat en aval (`12_Procurement_Summary`) sont pilotées strictement par les **déficits nets** post-allocation, produisant :
- SKU en déficit, site de destination et quantité nette totale non couverte.
- Fournisseur préféré recommandé, conditionnement standard et **quantité d'achat ajustée au MOQ**.
- Date la plus tardive de lancement de PO, date d'arrivée estimée du réapprovisionnement et un indicateur de faisabilité d'appui à la commande.

### 6. Audit préalable intégré et gouvernance des exceptions
La couche dédiée `13_Audit_Validation` agit comme un disjoncteur opérationnel—révélant les jointures de données maîtres manquantes, les codes d'emplacement invalides, les expéditions en transit orphelines, les lots d'approvisionnement sur-réservés et les réservations expirées avant que les planificateurs n'exécutent des transferts ou ne lancent des PO fournisseurs.

---

### Périmètre opérationnel et avertissement de gouvernance
*Cette boîte à outils est un modèle analytique d'aide à la décision et une couche de planification hors ligne—ce n'est ni un ERP transactionnel, ni un Système de Gestion d'Entrepôt (WMS), ni un Système de Gestion du Transport (TMS), ni une plateforme d'achat EDI automatisée. Les résultats d'allocation et les synthèses d'achats sont des recommandations de planification dérivées des exports et paramètres fournis par l'utilisateur ; vérifiez toujours les contraintes physiques de l'entrepôt et la capacité du fournisseur avant de vous engager sur des dates de livraison clients ou d'émettre des bons de commande contraignants.*

---

## À propos du créateur

Je conçois des outils opérationnels légers et inspectables d'aide à la décision pour les flux de travail logistiques et financiers où la logique métier critique se retrouve enfouie dans des tableurs déconnectés. La question d'ingénierie qui me guide est : **quels points de données exacts et quelles règles de validation doivent être réunis pour prendre le prochain engagement opérationnel en toute confiance ?**

## Architecture du classeur

OFIA organise ses 14 feuilles de calcul en quatre couches fonctionnelles.

| Couche | Responsabilité principale | Feuilles de calcul |
|---|---|---|
| Configuration et données maîtres | Centralise les règles opérationnelles et gère les données de référence produits, emplacements et fournisseurs. | `00_Config_Params`, `01_Item_Master`, `02_Locations_Distance`, `03_Vendors_Leadtime` |
| Entrée opérationnelle | Capture la demande, le stock physique, les bons de commande et les marchandises en transit. | `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, `07_In_Transit_OTW` |
| Calcul et allocation | Construit un registre d'approvisionnement unifié, suit les réservations et calcule l'allocation multi-niveaux. | `08_Supply_Ledger`, `09_Reservations_Ledger`, `10_Allocation_Engine` |
| Sorties décisionnelles et contrôles | Présente les résultats de préparation au niveau commande, les recommandations d'achat et les exceptions d'audit. | `11_WhatIf_Fulfillment`, `12_Procurement_Summary`, `13_Audit_Validation` |

### Référence des feuilles de calcul

<details>
<summary>Configuration et données maîtres</summary>

| Feuille de calcul | Objectif |
|---|---|
| `00_Config_Params` | Table de paramètres centrale pour les politiques de préparation, la protection du stock, le rayon de transfert, les marges temporelles, les règles de conditionnement, le multiplicateur de MOQ, la validité des réservations et l'affichage monétaire. |
| `01_Item_Master` | Données de référence produits au niveau SKU, incluant descriptions d'articles, quantités de conditionnement standard, coûts unitaires et références fournisseurs. |
| `02_Locations_Distance` | Informations de distance origine-destination et de temps de transfert utilisées pour identifier les sites proches éligibles et estimer les délais de transfert. |
| `03_Vendors_Leadtime` | Références fournisseurs et composantes des délais de réapprovisionnement utilisées pour estimer les dates d'achat et d'arrivée. |

</details>

<details>
<summary>Entrée opérationnelle</summary>

| Feuille de calcul | Objectif |
|---|---|
| `04_Sales_Demand` | Demande au niveau ligne de commande, type de demande, SKU, destination, quantité demandée et date de livraison demandée. |
| `05_Inv_On_Hand` | Instantanés de stock physique par emplacement et SKU, incluant la quantité engagée et les données nécessaires au calcul du stock protégé et transférable. |
| `06_PO_Pipeline` | Lignes de bons de commande ouvertes et leurs quantités restantes, incluant les quantités rapprochées avec les expéditions en transit. |
| `07_In_Transit_OTW` | Enregistrements d'expéditions ou de conteneurs, références de bons de commande liées, quantités expédiées et informations d'arrivée prévue. |

</details>

<details>
<summary>Calcul et allocation</summary>

| Feuille de calcul | Objectif |
|---|---|
| `08_Supply_Ledger` | Consolide les sources d'approvisionnement modélisées dans un registre unifié avec IDs d'approvisionnement uniques, dates de disponibilité, quantités brutes disponibles, réservations actives et quantités nettes disponibles. |
| `09_Reservations_Ledger` | Conserve des réservations d'approvisionnement permanentes liées aux lignes de commande et aux ID d'approvisionnement, incluant statut, date de création et informations d'audit des réservations. |
| `10_Allocation_Engine` | Exécute la séquence d'approvisionnement par niveaux, calcule les allocations éclatées et la demande restante, et déduit la quantité totale allouée et les informations d'arrivée estimées. |

</details>

<details>
<summary>Sorties décisionnelles et contrôles</summary>

| Feuille de calcul | Objectif |
|---|---|
| `11_WhatIf_Fulfillment` | Vue décisionnelle au niveau commande affichant la quantité allouée, la quantité non satisfaite, le statut de préparation, la source d'approvisionnement principale, le statut de commande éclatée, la date de livraison estimée, les jours de retard et l'action recommandée. |
| `12_Procurement_Summary` | Consolide les manquants nets par SKU et destination, les informations fournisseurs, les quantités d'achat recommandées, les dates d'achat suggérées, les dates d'arrivée prévues et la faisabilité temporelle. |
| `13_Audit_Validation` | Consolide les exceptions de qualité de données et de contrôle pour revue avant de finaliser les décisions opérationnelles. |

</details>

## Logique métier centrale

### Disponibilité du stock

Le classeur calcule le stock transférable à partir de la quantité physique disponible après prise en compte de la quantité engagée et de la protection de stock configurée.

Conceptuellement :

\[
\text{Net Transferable Qty}
=
\max(0,\ \text{Physical QOH}
-\text{Committed Qty}
-\text{Protected Qty})
\]

Le calcul de protection est piloté par des paramètres centralisés. Il vise à empêcher le moteur d'allocation de considérer chaque unité physique comme librement disponible.

Le résultat est une quantité d'allocation modélisée, et non un remplacement du registre de stock en temps réel d'un entrepôt.

### Rapprochement des bons de commande et du transit

Chaque ligne de bon de commande possède une clé unique dérivée de son numéro de bon de commande et de son ID de ligne. Les enregistrements en transit référencent cette clé afin que le classeur puisse identifier la quantité expédiée déjà représentée par une ligne de PO ouverte.

Conceptuellement :

\[
\text{Net Pending PO Qty}
=
\max(0,\ \text{PO Open Qty}
-\text{Matched OTW Qty})
\]

La quantité nette restante représente le pipeline d'achat modélisé restant après déduction des quantités en transit rapprochées.

Les enregistrements sans référence de PO valide doivent être investigués via le flux de validation. Le rapprochement dépend d'identifiants sources précis et cohérents.

### Allocation par niveaux et demande restante

Le moteur d'allocation reporte la quantité non satisfaite d'un niveau d'approvisionnement au suivant.

Pour chaque niveau :

\[
\text{Remaining Qty}_{n}
=
\max(0,\ \text{Remaining Qty}_{n-1}
-\text{Allocated Qty}_{n})
\]

Ce calcul en cascade est conçu pour empêcher qu'une même quantité de demande soit allouée plusieurs fois à travers les niveaux.

Le résultat réel dépend des enregistrements d'approvisionnement, des règles d'éligibilité, de la séquence de priorité configurée et des dates chargées dans le classeur.

### Statut de préparation au niveau commande

La vue de préparation combine la suffisance de quantité et le délai de livraison. Ses catégories de statut prévues comprennent :

- **Entièrement préparé à temps** — l'allocation modélisée couvre la quantité demandée dans le délai demandé.
- **Préparé en retard** — la quantité modélisée est couverte, mais la date de livraison prévue est postérieure à la date demandée.
- **Partiellement préparé** — seule une partie de la quantité demandée est couverte par l'allocation modélisée.
- **Rupture / demande non satisfaite** — le pool d'approvisionnement modélisé ne peut couvrir la quantité demandée.
- **Devis en attente** — la demande de devis est retenue hors allocation ferme lorsque la politique de réservation de devis configurée ne l'autorise pas à consommer l'approvisionnement.

Le résultat exact n'est fiable qu'à la hauteur des données sous-jacentes de demande, de stock, d'expédition, de délais et de réservations. Un statut du classeur ne doit pas être interprété comme une confirmation de réservation transporteur, une promesse fournisseur ou une confirmation d'exécution d'entrepôt.

### Quantité et délais d'achat

La synthèse d'achats part du déficit net modélisé restant et applique le multiplicateur de MOQ et la politique de conditionnement configurés.

Lorsque l'arrondi au conditionnement est activé, la recommandation est arrondie vers le haut à un multiple de conditionnement valide. La date d'achat suggérée est dérivée de l'échéance de la commande concernée et du délai de réapprovisionnement modélisé, marges configurées incluses.

Cela permet de répondre à deux questions distinctes :

1. **Quel approvisionnement supplémentaire pourrait être requis ?**
2. **Quand faudrait-il le commander pour tenir la date de livraison cible ?**

La capacité fournisseur, la disponibilité des créneaux de production, les perturbations de transport et autres contraintes externes doivent être vérifiées séparément, sauf si elles sont explicitement représentées dans les données d'entrée.

## Hypothèses d'exploitation et limites

OFIA est conçu comme un classeur analytique répétable utilisant des données métier exportées. Ses résultats dépendent de l'exactitude et de l'exhaustivité des enregistrements fournis.

Avant d'utiliser les résultats pour un engagement client important ou une décision d'achat, confirmez que :

- Les identifiants SKU, emplacement, fournisseur, PO et ligne de PO sont cohérents entre les feuilles d'entrée.
- Les quantités disponibles et engagées reflètent l'instantané de stock visé.
- Les quantités en transit sont liées aux bonnes lignes de bons de commande.
- Les dates de livraison demandées, dates d'expédition et délais utilisent des dates Excel valides.
- Les réservations actives représentent des engagements réels et sont revues lorsque leur statut change.
- Les marges configurées de transfert et de réapprovisionnement reflètent la politique opérationnelle modélisée.
- Les exceptions pertinentes dans `13_Audit_Validation` ont été revues.

Le classeur prépare la décision ; il n'exécute pas automatiquement les transferts, ne crée pas de bons de commande, ne réserve pas de stock dans un ERP et ne notifie pas les clients.

## Détails techniques

Le matériel de référence technique suivant est regroupé dans une section repliable pour garder le README principal axé sur l'usage métier, tout en préservant les détails d'implémentation pour les mainteneurs du classeur.

<details>
<summary>Référence des formules et règles de validation</summary>

### Référence des formules

Le classeur utilise des formules Excel modernes à tableaux dynamiques pour générer les résultats de calcul à partir des données sources. Les références ci-dessous résument les principaux schémas de formules et leur rôle métier.

#### 1. Fonctions utilisées

| Fonction | Rôle dans OFIA |
|---|---|
| `FILTER` | Sélectionne la demande active, les enregistrements d'approvisionnement éligibles et les exceptions de validation. |
| `UNIQUE` | Identifie les combinaisons SKU-emplacement distinctes et autres clés métier uniques. |
| `SORT` | Ordonne les enregistrements candidats lorsqu'un ordre défini est requis. |
| `XLOOKUP` | Récupère les attributs d'articles, fournisseurs, emplacements, PO et approvisionnement depuis les tables de référence. |
| `SUMIFS` | Agrège les quantités par clé de ligne de PO, UID d'approvisionnement, SKU, emplacement ou statut de réservation. |
| `MAP` | Applique une logique métier par ligne sur des tableaux dynamiques sans remplir manuellement les formules vers le bas. |
| `BYROW` | Applique des calculs par ligne lorsqu'une évaluation ligne par ligne est appropriée. |
| `LET` | Nomme les calculs intermédiaires dans une formule pour structurer plus facilement une logique complexe. |
| `HSTACK` | Combine des champs associés en un seul tableau calculé. |
| `VSTACK` | Combine stock, transit et bons de commande en un registre unifié. |
| `EXPAND` | Étend une valeur ou un tableau aux dimensions requises lors de la construction d'un tableau combiné. |
| `SEQUENCE` | Génère des tableaux numériques séquentiels pour les calculs pilotés par formules. |
| `TODAY` | Calcule l'ancienneté des réservations basée sur la date du jour et les dates de disponibilité de l'approvisionnement. |
| `MAX` | Empêche les quantités disponibles calculées et la demande restante de devenir négatives. |

La disponibilité et le comportement de chaque fonction dépendent de la version d'Excel installée. Le classeur requiert une version prenant en charge les fonctions de tableau dynamique utilisées dans ses formules.

#### 2. Disponibilité du stock

La formule conceptuelle du stock net transférable est :

```excel
=MAX(0, Physical_QOH - Committed_Qty - Protected_Qty)
```

Dans le classeur, la quantité protégée est calculée à partir des données pertinentes de protection du stock et des paramètres de configuration centralisés. La formule réelle de la feuille utilise des références de cellules et de plages plutôt que les noms de champs conceptuels affichés ci-dessus.

Le résultat représente un stock transférable modélisé, et non une confirmation en temps réel de la disponibilité de l'entrepôt.

#### 3. Rapprochement des bons de commande

Les lignes de bons de commande utilisent une clé composite basée sur le numéro de PO et l'ID de ligne.

```excel
=PO_Number & "|" & PO_Line_ID
```

Le registre en transit utilise la clé de référence correspondante pour agréger les quantités expédiées rapprochées :

```excel
=SUMIFS(
    '07_In_Transit_OTW'!E:E,
    '07_In_Transit_OTW'!D:D,
    PO_Unique_Key
)
```

Le pipeline d'achat modélisé restant se calcule comme suit :

```excel
=MAX(0, PO_Open_Qty - OTW_Matched_Qty)
```

Ces exemples illustrent la logique. Lors de l'implémentation ou de la modification de formules, utilisez les correspondances exactes de colonnes et les structures de formules définies dans le classeur.

#### 4. Réservations et approvisionnement net

Les réservations actives sont agrégées par rapport à l'UID d'approvisionnement qui leur est attribué. Conceptuellement :

```excel
=SUMIFS(
    '09_Reservations_Ledger'!H:H,
    '09_Reservations_Ledger'!F:F,
    Supply_UID,
    '09_Reservations_Ledger'!I:I,
    "Active"
)
```

La quantité nette allouable se calcule ensuite comme suit :

```excel
=MAX(0, Gross_Available_Qty - Active_Reserved_Qty)
```

La logique d'audit doit également identifier les cas où les réservations actives excèdent l'approvisionnement brut disponible. Un calcul de disponibilité nette non négatif seul ne suffit pas à détecter la sur-réservation.

#### 5. Cascade d'allocation

Pour chaque niveau d'approvisionnement, la demande restante est réduite de la quantité allouée à ce niveau :

\[
\text{Remaining}_{n}
=
\max(0,\text{Remaining}_{n-1}-\text{Allocated}_{n})
\]

L'allocation totale est la somme des quantités attribuées à travers les niveaux d'approvisionnement :

\[
\text{Allocated Total}
=
\sum_{n=1}^{5}\text{Allocated}_{n}
\]

La quantité non satisfaite est :

\[
\text{Unmet Qty}
=
\max(0,\text{Requested Qty}-\text{Allocated Total})
\]

L'implémentation doit préserver la séquence des niveaux et reporter la quantité restante de chaque niveau au suivant. Des calculs indépendants ne partageant pas le reste mis à jour peuvent sur-allouer la même demande.

#### 6. Délai de livraison

La date de livraison estimée de la commande est dérivée des dates d'arrivée modélisées de ses sources d'approvisionnement allouées. Lorsqu'une commande mobilise plusieurs sources, la date d'arrivée la plus tardive des sources allouées constitue la date limitante pour la commande complète.

Le retard de livraison se calcule conceptuellement ainsi :

\[
\text{Delay Days}
=
\max(0,\text{Estimated Delivery Date}-\text{Requested Delivery Date})
\]

Une date estimée est un résultat de planification fondé sur les dates sources et les hypothèses de délais configurées. Ce n'est pas un engagement logistique confirmé.

#### 7. Quantité d'achat

La recommandation d'achat part du déficit net restant. Elle applique ensuite le multiplicateur de MOQ configuré et, si activé, arrondit le résultat vers le haut au multiple de conditionnement standard applicable.

L'implémentation exacte doit suivre les références de paramètres du classeur dans `00_Config_Params`, notamment :

- `B11` — commutateur d'arrondi au conditionnement.
- `B12` — multiplicateur de MOQ.

Ne remplacez pas ces références de paramètres par des valeurs codées en dur dans les formules de calcul.

### Règles de validation

`13_Audit_Validation` est la feuille centrale de surveillance des exceptions. Consultez-la après chaque actualisation des données sources et avant de vous fier aux résultats de préparation ou d'achat.

| Domaine de validation | Ce qu'il faut vérifier | Pourquoi c'est important |
|---|---|---|
| Fichier articles | Les enregistrements SKU existent, les clés sont uniques et les quantités de conditionnement standard sont valides. | Des références d'articles invalides peuvent compromettre les calculs d'allocation et d'achat. |
| Références d'emplacement | Les codes d'emplacement de demande et de stock existent dans les données de référence pertinentes. | Des emplacements manquants ou incohérents peuvent empêcher l'éligibilité correcte des sources et le calcul des temps de transfert. |
| Intégrité de la demande | Les identifiants de commande, identifiants de ligne, références SKU, quantités demandées et dates de livraison sont valides. | Des données de demande invalides peuvent produire des statuts de préparation trompeurs et des calculs erronés de quantité non satisfaite. |
| Intégrité des bons de commande | Les numéros de PO, ID de ligne, quantités ouvertes et clés de ligne de PO sont cohérents. | Des clés incohérentes peuvent rompre le rapprochement des expéditions. |
| Intégrité du transit | Les enregistrements d'expédition sont liés à des lignes de PO valides et contiennent des champs de quantité et de délai valides. | Les expéditions orphelines peuvent être comptées incorrectement ou exclues du pipeline d'approvisionnement prévu. |
| Disponibilité de l'approvisionnement | L'approvisionnement brut, les réservations actives et la disponibilité nette se rapprochent. | Des réservations excédant l'approvisionnement disponible signalent un conflit d'engagement potentiel. |
| Conformité des réservations | Le statut de réservation, l'UID d'approvisionnement attribué, la date de création et la période de validité sont cohérents. | Des réservations invalides, expirées ou rompues peuvent fausser les allocations ultérieures. |
| Intégrité de l'allocation | Les quantités allouées n'excèdent pas l'approvisionnement éligible et chaque niveau utilise la demande restante du niveau précédent. | Empêche la double utilisation du stock et la surallocation de la demande. |
| Faisabilité de livraison | Les dates d'arrivée estimées et les dates de livraison demandées sont valides et comparables. | Des dates ou données de délais invalides peuvent mal classer les préparations à l'heure ou en retard. |
| Logique d'achat | Les déficits nets, mappages fournisseurs, conditionnements et hypothèses de délais sont cohérents. | Aide à prévenir des recommandations de réapprovisionnement inappropriées ou mal dimensionnées. |

#### Gravité et suites à donner

La conception source distingue les exceptions critiques bloquantes des avertissements. La réponse appropriée dépend de l'enregistrement affecté et de la règle de validation configurée.

- **Exception critique :** investiguez et corrigez le conflit sous-jacent de données ou d'allocation avant de vous fier à la décision affectée.
- **Avertissement :** examinez l'enregistrement et déterminez si le problème affecte l'action de préparation ou d'achat envisagée.
- **Résultat global sain :** indique que les contrôles d'audit configurés n'ont identifié aucune exception. Cela ne prouve pas que les données sources externes sont complètes, à jour ou confirmées opérationnellement.

N'interprétez pas un résultat d'audit propre comme une garantie de performance de livraison réelle. La couche de validation contrôle les règles et enregistrements représentés dans le classeur.

</details>

## Procédure d'exploitation quotidienne

Utilisez le cycle suivant chaque fois que la demande, le stock, les bons de commande, les enregistrements d'expédition ou les paramètres opérationnels changent.

1. **Actualisez les données sources.** Mettez à jour les zones d'entrée désignées dans `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline` et `07_In_Transit_OTW`, ainsi que les données maîtres modifiées.
2. **Recalculez le classeur.** Dans Excel, utilisez `Ctrl + Alt + F9` pour forcer un recalcul complet si nécessaire.
3. **Consultez la feuille d'audit.** Vérifiez `13_Audit_Validation` et investiguez les exceptions critiques avant d'utiliser les résultats.
4. **Mettez à jour les réservations permanentes.** Consignez les engagements réels dans `09_Reservations_Ledger`, liez-les à l'UID d'approvisionnement approprié et définissez le statut correct.
5. **Examinez les décisions de préparation.** Utilisez `11_WhatIf_Fulfillment` pour identifier la demande en retard, partiellement préparée ou non couverte.
6. **Examinez les recommandations d'achat.** Utilisez `12_Procurement_Summary` pour évaluer le manquant net restant, la quantité recommandée, le fournisseur et les délais.
7. **Confirmez l'exécution externe.** Validez les transferts proposés, la capacité fournisseurs, les bons de commande, les calendriers d'expédition et les engagements clients avec les équipes opérationnelles concernées.

### Dépannage

<details>
<summary>La formule de tableau dynamique affiche #SPILL!</summary>

**Cause probable :** Des cellules de la plage de débordement prévue ne sont pas vides, empêchant Excel d'afficher le résultat complet du tableau.

**Que faire :**

1. Sélectionnez la cellule contenant la formule.
2. Inspectez la plage de débordement indiquée par Excel.
3. Supprimez les valeurs ou espaces non voulus qui bloquent la sortie.
4. Confirmez que la zone de sortie de la formule n'est pas occupée par des données saisies manuellement.

Ne supprimez pas la formule elle-même lors du nettoyage des cellules obstructives.

</details>

<details>
<summary>Les nouvelles données d'entrée ne modifient pas les résultats</summary>

**Cause probable :** Excel est peut-être en mode de calcul manuel, ou les données sources ont été collées hors de la plage d'entrée attendue.

**Que faire :**

1. Ouvrez le menu **Formules → Options de calcul** d'Excel.
2. Sélectionnez le calcul **Automatique** le cas échéant.
3. Vérifiez que les données ont été saisies dans les bonnes colonnes d'entrée et dans les plages prises en charge par le classeur.
4. Exécutez un recalcul complet avec `Ctrl + Alt + F9`.

</details>

<details>
<summary>La modification d'un paramètre ne met pas à jour le classeur</summary>

**Cause probable :** Le paramètre a été saisi dans la mauvaise cellule, une référence de formule a été altérée ou le calcul n'a pas été actualisé.

**Que faire :**

1. Confirmez la position attendue du paramètre dans `00_Config_Params`.
2. Évitez d'insérer ou de déplacer des cellules de paramètres utilisées par des formules.
3. Vérifiez `13_Audit_Validation` pour les exceptions associées.
4. Forcez un recalcul complet.

</details>

<details>
<summary>Les dates apparaissent sous forme de numéros de série</summary>

**Cause probable :** La cellule est au format Standard ou Nombre plutôt qu'au format Date.

**Que faire :**

1. Sélectionnez les cellules de date concernées.
2. Ouvrez Format de cellule (`Ctrl + 1` sous Windows ou `Cmd + 1` sur Mac).
3. Appliquez un format de date tel que `YYYY-MM-DD`.

Une valeur numérique telle que `45628` peut être un numéro de série de date Excel ; vérifiez la valeur sous-jacente avant de modifier la date.

</details>

## Compatibilité et performances

### Versions d'Excel prises en charge

L'architecture source est conçue pour **Microsoft 365 ou Excel 2021 et versions ultérieures**, y compris les versions de bureau et web compatibles prenant en charge les fonctions requises par le classeur.

Excel 2016 et Excel 2019 ne sont pas pris en charge par la conception source. D'autres applications tableur peuvent ne pas implémenter de la même manière les fonctions de tableau dynamique requises.

### Volume de données recommandé

L'implémentation source recommande :

- Jusqu'à **50 000 lignes par feuille de détail**.
- Environ **150 000 lignes sur l'ensemble du classeur** comme limite totale indicative.

La vitesse réelle de recalcul dépend de l'ordinateur, de la version d'Excel, de la complexité des formules et du nombre d'enregistrements renseignés. Considérez ces chiffres comme des repères de planification, non comme une garantie de performance. Pour des jeux de données plus importants, archivez les commandes historiques terminées et testez les performances de recalcul avant d'étendre le classeur.

### Intégrité des formules et des entrées

- N'écrasez pas les colonnes générées par formules.
- Ne modifiez pas les noms de feuilles ni les en-têtes de colonnes sources référencés par les formules.
- Conservez des clés composites cohérentes entre les enregistrements liés.
- Maintenez des dates Excel valides et des champs de quantités numériques.
- Modifiez les seuils métier dans `00_Config_Params` plutôt que d'éditer les formules de calcul individuelles.
- Revoyez les exceptions de validation après chaque actualisation significative des données.

## Limites

OFIA est un classeur d'aide à la décision analytique. En soi, il ne :

- Remplace pas un ERP, WMS, TMS, une plateforme d'achat ni un système de gestion des commandes.
- Exécute pas automatiquement les transferts de stock ni ne crée de bons de commande fournisseurs.
- Confirme pas la capacité de production des fournisseurs, les réservations transporteurs ni le dédouanement.
- Garantit pas que les exports de stock et d'expéditions sont à jour ou complets.
- Prend pas en compte les contraintes opérationnelles absentes de ses données sources.
- Garantit pas les dates de livraison ni n'élimine tous les conflits d'allocation.

Son utilité dépend d'identifiants cohérents, de données opérationnelles à jour, d'une configuration pertinente et d'une revue humaine des exceptions importantes.

## Autres outils de cette série

Explorez les autres outils légers d'aide à la décision métier de Theseus Workshop dans le dépôt du projet et les fiches produits associées.

## Licence

Ce projet est distribué sous la Licence Apache 2.0, comme l'indique le badge de licence. Consultez le fichier `LICENSE` du dépôt pour les termes complets de la licence.

## À propos de Theseus Workshop

Theseus Workshop crée des outils pratiques et réutilisables qui transforment les questions métier récurrentes en flux de travail structurés. L'objectif est d'aider les équipes à prendre des décisions plus claires avec des outils familiers et des données métier existantes, sans introduire la complexité d'une plateforme d'entreprise complète.

OFIA applique cette approche à la préparation de commandes, l'allocation de stock, le rapprochement des approvisionnements et la planification des achats.

---

**Avant publication :** remplacez les espaces réservés d'URL de la démo navigateur et de l'achat Excel dans la section d'ouverture par les liens produits réels. Confirmez que le dépôt inclut le fichier `LICENSE` applicable et que les versions publiées navigateur et Excel correspondent aux capacités décrites ici.
