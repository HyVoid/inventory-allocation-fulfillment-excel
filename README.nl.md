[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Excel-sjabloon voor voorraadtoewijzing op meerdere locaties en orderafwikkeling (ATP- en inkoopcalculator)
<img width="1920" height="833" alt="image" src="https://github.com/user-attachments/assets/1379f571-ef41-486b-9c87-e6dc5cb96b2e" />

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-217346.svg)
![Category](https://img.shields.io/badge/Tool-Supply%20Chain%20%26%20ATP%20Planning-2251FF.svg)

**Een Excel-sjabloon voor voorraadtoewijzing op meerdere locaties, Available-to-Promise-berekening (ATP) en planning van orderafwikkeling. Gebouwd voor supply chain-planners, voorraadanalisten en distributeurs met meerdere magazijnen om fysieke voorraad, actieve orderreserveringen, containers onderweg en openstaande inkooporders (PO's) met elkaar te reconciliëren—waardoor de exacte OTIF-leverbaarheid en de netto inkoopbehoeften zowel in browser- als Microsoft Excel-formaat worden vastgesteld.**

Geen registratie. Geen software-installatie. Directe toegang via de gratis webgebaseerde afwikkelingssimulator, gecombineerd met een downloadbaar Microsoft Excel-werkboek voor offline ERP-datareconciliatie, herhaalbare S&OP-processen en permanente auditregistratie.

> **Toegang tot de tools voor voorraadtoewijzing en afwikkelingsplanning**
>
> - 🌐 **[Start de gratis webgebaseerde simulator voor voorraadtoewijzing en ATP](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** — Test multi-magazijn sourcing-hiërarchieën, simuleer regels voor gesplitste zendingen en controleer de leverbaarheid online zonder software te installeren of spreadsheets te configureren.
> - 📥 **[Download het Excel-werkboek voor orderafwikkeling op meerdere locaties (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** — Ontvang het volledige operationele werkboek met 13 werkbladen voor terugkerende ERP-dataimports, offline tracking van het reserveringsgrootboek en geautomatiseerde netto aanvulberekeningen. *Inclusief een 30-dagen geld-terug-garantie zonder vragen.*
>

---

## Kernindicatoren voor supply chain en opgeloste uitdagingen bij orderafwikkeling

In plaats van statische ERP-exports handmatig met elkaar te vergelijken, structureert deze parametrische toewijzingsengine aanbod en vraag over meerdere echelons in één auditeerbaar grootboek. Zo brengt het werkboek de **pijnpunten van distributie over meerdere locaties** in kaart tegen geautomatiseerde **ATP- en inkoopindicatoren**:

| Pijnpunt in supply chain en orderafwikkeling | Geautomatiseerd reconciliatie- en toewijzingsmechanisme | Gevolgde kernindicatoren voor voorraad en OTIF |
| :--- | :--- | :--- |
| **Onduidelijke haalbaarheid van orderafwikkeling (OTIF-risico)** | Beoordeelt de door klanten gevraagde leverdata tegen voorraad op meerdere niveaus in magazijnen, transfertijden en douanemarges. | On-Time-In-Full-(OTIF)-haalbaarheidsindicator, gedeeltelijke vulgraad, geschatte leverdatum (EDD), niet-gedekte orderregelhoeveelheid |
| **Versnipperde sourcing over meerdere magazijnen** | Wijst vraag toe volgens een sourcing-hiërarchie van 5 niveaus: Local Stock $\rightarrow$ Nearby Stores $\rightarrow$ Central DC $\rightarrow$ In-Transit $\rightarrow$ Open POs. | ID van toegewezen bron, toewijzing van gesplitste zending, geschiktheid binnen transferradius tussen vestigingen |
| **Overdreven beloftes over fysieke voorraad** | Trekt bestaande klantverplichtingen, actieve grootboekreserveringen, veiligheidsvoorraadbuffers en prognosebescherming af van de brutovoorraad. | Netto Available-to-Promise (ATP), fysieke voorraad vs. toewijsbare voorraad, beschermd veiligheidsvoorraadminimumniveau |
| **Dubbeltelling van voorraad onderweg en open PO's** | Koppelt inkomende containerregistraties rechtstreeks aan de oorspronkelijke inkooporderregels om fantoomopblazing van de pijplijn te elimineren. | Netto open PO-pijplijnhoeveelheid, gereconcilieerd containervolume onderweg, uniforme ID van het leveringsgrootboek |
| **Paniekaankopen en overaanschaf op brutaalvraag** | Berekent echte netto voorraadtekorten pas nadat alle toewijsbare netwerkvoorraad en inkomende aanvulpijplijnen zijn uitgeput. | Netto tekorthoeveelheid, MOQ- en standaardverpakkingsgecorrigeerde bestelhoeveelheid, laatste PO-vrijgavedatum |
| **Verborgen stamgegevens en ERP-exportfouten** | Voert diagnostische controles vóór toewijzing uit op geïmporteerde verkooporders, SKU-stamtabellen en reserveringsregistraties. | Meldingen van wees-zendingen, signalen van ontbrekende SKU-/locatiecodes, verlopen offertesreserveringen, conflictueuze overtoewijzing |

---

## Stapsgewijze handleiding: voorraadtoewijzing over meerdere magazijnen en netto aanvulling uitvoeren

Het werkboek werkt als een herhaalbare **Distributed Order Management (DOM)- en DRP-cyclus**: configureer de regels van uw distributienetwerk één keer, plak de ruwe exports uit uw ERP/WMS, auditteer uitzonderingen en borg de afwikkelingsverplichtingen in.

### Stap 1: distributienetwerkregels en ATP-parameters configureren
Open het tabblad `00_Config_Params` om uw supply chain-governanceregels vast te leggen zonder downstream-celformules aan te raken:

- **Netwerktopologie:** Wijs de code van het centrale distributiecentrum (DC) toe en de maximale transferradius tussen nabijgelegen vestigingen.
- **Voorraadbescherming:** Stel beleid voor veiligheidsvoorraadbescherming, drempels voor prognosevraagbescherming en geldigheidsperioden van offerte-reserveringen (vervaldagen) in.
- **Doorlooptijd- en verpakkingsbuffers:** Definieer buffers voor overdrachten tussen magazijnen, douaneafhandellingsvertragingen en standaardregels voor verpakking/afronding.

### Stap 2: ERP-verkooporders, voorhanden voorraad en inkomende pijplijndata importeren
Exporteer ruwe CSV-/XLSX-tabellen uit uw ERP-, boekhoud- of WMS-platform (bijv. NetSuite, SAP Business One, Dynamics 365, Fishbowl, Cin7) en plak ze in de gestandaardiseerde invoerbladen:

- **Klantvraag:** Openstaande verkooporderregels, doellocaties en door klanten gevraagde leverdata.
- **Magazijnvoorraad:** Momentopnames van fysieke voorraad per SKU en magazijnlocatiecode.
- **Inkomende leveringspijplijn:** Openstaande inkooporderregels (PO's) met toegezegde aankomstdaten van leveranciers, plus actuele manifesten van zendingen/containers onderweg.
- **Supply chain-stamgegevens:** Artikelstamgegevens (MOQ, verpakkingsgrootte), locatiestamgegevens, afstandsmatrix tussen locaties en doorlooptijden van leveranciers.

*(Behoud de vooraf gedefinieerde kolomkoppen en overschrijf geen berekende formulekolommen.)*

### Stap 3: data-uitzonderingen auditteen en what-if-orderafwikkeling beoordelen
Activeer de herberekening van het werkboek en volg de besluitvormingsbeoordeling in drie fasen:

1. **Datahygiëne-audit (`13_Audit_Validation`):** Los ontbrekende SKU-stamkoppelingen, ongeldige magazijncodes, wees-containers onderweg of verlopen reserveringen op voordat u downstream-resultaten vertrouwt.
2. **ATP en sourcing op regelniveau (`11_WhatIf_Fulfillment`):** Controleer de exacte afwikkelingsstatussen (`Full & On-Time`, `Late`, `Partial`, `Shortage`), toegewezen bronmagazijnen en geschatte aankomstdaten per verkooporderregel.
3. **Netto MRP-/DRP-inkoop (`12_Procurement_Summary`):** Beoordeel niet-gedekte nettotekorten, aanbevolen leverancierstoewijzingen, MOQ-/verpakkingsgecorrigeerde bestelhoeveelheden en de laatste bestelvrijgavedata.

### Stap 4: voorraadreserveringen vastleggen en operationeel maken in het Excel-werkboek
Wanneer verkooporders met hoge prioriteit gegarandeerde voorraadbescherming vereisen, registreer dan de toegewezen bron-ID's in `09_Reservations_Ledger` en zet de status op `Active` om die voorraad te beschermen tegen volgende runs.

> 📦 **Klaar om handmatige voorraadreconciliatie in uw hele magazijnnetwerk af te schaffen?** 
> Nadat u de sourcing-hiërarchie in de **[gratis browsergebaseerde simulator voor voorraadtoewijzing](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** heeft getest, downloadt u het **[volledige Excel-werkboek voor orderafwikkeling op meerdere locaties (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** om uw live ERP-exports aan te sluiten, een permanent reserveringsgrootboek bij te houden en wekelijkse S&OP-aanvulcycli offline uit te voeren.

---

## Waarom ik deze multi-echelon voorraad- en ATP-beslissingsengine heb gebouwd

In een distributienetwerk met meerdere locaties is het weten *hoeveel fysieke voorraad er in uw magazijnen ligt* iets compleet anders dan het weten *of een klantorder daadwerkelijk op tijd kan worden geleverd*.

Neem een groothandeldistributeur of retailketen met **28 distributieknooppunten**—een combinatie van een centraal distributiecentrum (DC) en regionale voorliggende winkels. Operationele data is doorgaans versnipperd over ERP-verkooporderexports, WMS-voorraadmomentopnames, rapporten van openstaande inkooporders, containertrackers van expediteurs en regionale transitmatrices.

Wanneer ordermanagementteams deze tabellen handmatig vergelijken in ad-hocspreadsheets, doen zich twee systemische fouten voor:

### 1. De ATP-illusie van "100 stuks op voorraad"
Een WMS-momentopname van een magazijn kan **100 fysiek voorhanden stuks** tonen. Echter, 30 stuks zijn al toegezegd aan openstaande pickorders, 20 stuks zijn geblokkeerd als beschermd veiligheidsvoorraad en 10 stuks zijn vastgelegd onder een actieve offerte-reservering. Het opgegeven saldo van 100 stuks als vrij toewijsbare voorraad behandelen garandeert dubbele boekingen, magazijnpicktekorten en gemiste OTIF-verplichtingen.

### 2. De valkuil van dubbeltelling tussen PO "160 stuks inkomend" en onderweg
De upstream-leveringspijplijnen lijden aan hetzelfde zichtbaarheidsgebrek. Een rapport van openstaande inkooporders toont **100 bestelde stuks** bij een fabriek, terwijl het containermanifest van het logistieke team **60 van precies die stuks al op zee** toont. Als een voorraadplanner openstaande PO's en onderweg-spreadsheets apart optelt, lijkt het netwerk **160 stuks toekomstige levering** te hebben, terwijl er slechts **100 netto stuks** bestaan.

Ik heb deze toolkit gebouwd als **geproductiseerde supply chain-besluitvorming**—als brug tussen eenvoudige spreadsheets en enterprise APS/DOM-software van zes cijfers. Het verenigt netto ATP-berekening, PO-zendingsreconciliatie, multi-niveau sourcing-regels en MOQ-bewuste inkoopplanning in één transparante, auditeerbare werkstroom: **wat beloofd kan worden, welk knooppunt moet verzenden, wat ongedekt blijft en wat daadwerkelijk gekocht moet worden.**

---

## Ontkoppelde ERP-spreadsheets vs. gestructureerd ATP- en toewijzingswerkboek

| Dimensie van supply chain-planning | Handmatige ERP-exports en ad-hoc VLOOKUP-spreadsheets | Voorraadtoewijzingsengine voor meerdere locaties (deze tool) |
| :--- | :--- | :--- |
| **Available-to-Promise-berekening (ATP)** | Fysieke voorraadsaldi worden voor vrije voorraad aangezien, wat dubbele toewijzing tussen vertegenwoordigers en kanalen veroorzaakt. | Trekt bestaande verplichtingen, actieve grootboekreserveringen, veiligheidsvoorraad en prognosebuffers automatisch af vóór toewijzing. |
| **Reconciliatie onderweg vs. open PO's** | Openstaande inkooporders en inkomende freight-containers worden apart opgeteld, wat geprojecteerde voorraadposities opblaast. | Reconcilieert zendingsregels tegen oorspronkelijke PO-nummers om de echte resterende fabriekspijplijnhoeveelheden te berekenen. |
| **Leverbaarheid van orders (OTIF en doorlooptijd)** | Planners controleren of voorraad ergens in het netwerk bestaat maar negeren transittijden voor overdrachten tussen magazijnen en douanemarges. | Beoordeelt voorraadbeschikbaarheidsdata, transfertijden tussen locaties en douanevertragingen direct tegen de door klanten gevraagde leverdata. |
| **Sourcing over meerdere magazijnen en gesplitste zendingen** | Eén vestiging lost een noodinkooporder uit terwijl een nabijgelegen winkel binnen de transferradius overtollige trage voorraad aanhoudt. | Handhaaft een sourcing-hiërarchie van 5 niveaus (`Local` $\rightarrow$ `Nearby` $\rightarrow$ `Central DC` $\rightarrow$ `In-Transit` $\rightarrow$ `Open PO`) met ondersteuning voor gesplitste zendingen. |
| **Netto aanvulling en MOQ-inkoop** | Inkopers starten inkooporders op basis van de brutoverkoopvraag en negeren voorraad die al onderweg is of in regionale hubs ligt. | Genereert netto tekort-inkoopaanbevelingen, gecorrigeerd voor leveranciersdoorlooptijden, minimale bestelhoeveelheden (MOQ) en verpakkingsgroottes. |
| **Stamgegevenshygiëne en uitzonderingsaudits** | Gebroken SKU-koppelingen, wees-containerregistraties en verlopen voorraadblokkades blijven verborgen tot het picken in het magazijn faalt. | Het dedicatede werkblad `13_Audit_Validation` signaleert gegevensintegriteitsfouten, overreserveringen en toewijzingsconflicten vóór uitvoering. |

---

## Voor wie dit supply chain-werkboek is gebouwd: rollen en workflows

Deze toolkit voor voorraadtoewijzing en afwikkeling in dubbel formaat (Browser + Excel) is ontworpen voor operationele teams die voorraad over meerdere knooppunten beheren zonder enterprise APS/DOM-automatisering:

- **Voorraadplanners en analisten vraag-/aanbodplanning:** Vervang kwetsbare multi-bestand VLOOKUP-ketens door een gestructureerd **Available-to-Promise (ATP)- en DRP-Excel-sjabloon**. Reconcilieer voorhanden voorraad, veiligheidsvoorraadvloeren en inkomende containers binnen enkele minuten vóór wekelijkse S&OP-overleggen.
- **Ordermanagement- (OM-) en klantafwikkelingscoördinatoren:** Gebruik de **haalbaarheidscalculator voor orderafwikkeling** om B2B-klanten nauwkeurige leverdata te geven, opties voor gesplitste zendingen tussen regionale winkels te beoordelen en harde voorraadreserveringen (`09_Reservations_Ledger`) voor VIP-accounts vast te leggen.
- **Inkoopspecialisten en inkoopmanagers:** Elimineer fantoomopblazing van de pijplijn en overaanschaf. Gebruik de **PO-zendingsreconciliatie-engine** en het tabblad `12_Procurement_Summary` om exacte netto inkooptekorten te berekenen, afgerond op leveranciers-MOQ's en standaardverpakkingshoeveelheden.
- **Operationeel managers op meerdere locaties en distributiecentrummanagers:** Optimaliseer voorraadherbalancering over 5 tot meer dan 30 magazijnknooppunten. Configureer transferradiusregels tussen winkels zodat overtollige regionale voorraad nabijgelegen vraag dekt voordat het centrale DC wordt aangeboord of externe leveranciers-PO's worden uitgelokt.
- **ERP-implementatieconsultants en supply chain-engineers:** Gebruik de transparante 13-werkbladarchitectuur van het werkboek als inspecteerbare **Distributed Order Management (DOM)-specificatie**—ideaal om toewijzingslogica te prototypen voordat aangepaste regels in NetSuite, SAP of Microsoft Dynamics worden vastgelegd.

---

## Branche-gebruiksscenario's en long-tail supply chain-situaties

Of u nu regionale bouwmaterialenhoven beheert, groothandel in industriële onderdelen of omnichannel-winkels, dit framework past zich aan complexe distributietopologieën aan:

### 1. Herbalancering van een hub-and-spoke distributienetwerk (centraal DC + regionale vestigingen)
Bij het exploiteren van een centraal distributiecentrum naast 10 tot meer dan 30 voorliggende winkels bestaan gelokaliseerde voorraadtekorten vaak naast netwerkbreed overvoorraad. Configureer de **transferradiusparameter** om ordertekorten automatisch te routeren naar geschikte nabijgelegen vestigingen voordat wordt teruggevallen op aanvulling via het centrale DC of leveranciersaankopen.

### 2. Reconciliatie van importcontainers en overzeese PO's met lange doorlooptijd
Importeurs die bij overzeese fabrikanten inkopen, krijgen te maken met lange zeevrachtdoorlooptijden waarbij één raaminkooporder (Blanket PO) meerdere gedeeltelijke containerzendingen oplevert. Door **containermanifesten onderweg te reconciliëren tegen open PO-regels** voorkomen inkoopteams dubbeltelling van inkomende zeevracht tijdens seizoenspiekplanning.

### 3. B2B-offerte-reserveringen en afscherming van voorraad met hoge prioriteit
In projectgebaseerde groothandel en B2B-distributie vereisen openstaande klantoffertes vaak tijdelijke voorraadblokkades. Gebruik de ingebouwde **reserveringsgeldigheidsperiode en het grootboek (`09_Reservations_Ledger`)** om voorraad voor actieve offertes af te schermen en verlopen blokkades automatisch te signaleren, zodat vastgelopen voorraad terugkeert naar de algemene ATP-pool.

---

## Technische architectuur: wat deze toewijzingsengine onderscheidt

In tegenstelling tot statische voorraadtrackers die slechts huidige saldi tonen, is dit werkboek gebouwd rond zes operationele controleniveaus:

### 1. Configureerbare sourcing-hiërarchie van 5 niveaus met logica voor gesplitste afwikkeling
De engine beoordeelt de levering volgens een strikte volgorde: **1. Lokale voorraad $\rightarrow$ 2. Nabijgelegen locaties (binnen de radius) $\rightarrow$ 3. Centrale DC $\rightarrow$ 4. Levering onderweg $\rightarrow$ 5. Openstaande inkooporders**. Kan één niveau de volledige orderregel niet dekken, dan ondersteunt de engine **gesplitste afwikkeling** over de daaropvolgende niveaus in plaats van te stoppen bij het eerste tekort.

### 2. Waarachtige netto Available-to-Promise (ATP)-boekhouding
Brutofysieke voorraad wordt ontdaan van bestaande orderverplichtingen, actieve grootboekreserveringen, veiligheidsvoorraadvloeren en prognosebescherming voordat ook maar één eenheid aan het toewijzalgoritme wordt blootgesteld.

### 3. Geünifieerd leveringsgrootboek en PO-zending-deduplicatie
Door registraties onderweg te koppelen aan hun oorspronkelijke inkooporderregels, trekt het model verzonden hoeveelheden af van open PO-saldi en wijst het een **unieke leveringsidentificatie** toe binnen het geünificeerde grootboek om dubbele toewijzing te voorkomen.

### 4. Dubbele leverbaarheid op hoeveelheid en timing (EDD-berekening)
Voorraad in het netwerk hebben betekent niet dat het op tijd kan aankomen. De engine voegt leveringsbeschikbaarheidsdata, transfertijden tussen locaties, douaneafhandellingsbuffers en aanvulplanning toe—en gebruikt de **laatste aankomstdatum onder de gesplitste bronnen** om de werkelijke OTIF-haalbaarheid te beoordelen tegen de door de klant gevraagde datum.

### 5. MOQ- en verpakkingsgrootte-bewuste netto inkoopengine
Downstream inkoopaanbevelingen (`12_Procurement_Summary`) worden strikt aangestuurd door **nettotekorten na toewijzing** en leveren:
- Tekort-SKU, bestemmingslocatie en totale niet-gedekte nettohoeveelheid.
- Aanbevolen voorkeursleverancier, standaardverpakkingsgrootte en **MOQ-gecorrigeerde inkoophoeveelheid**.
- Laatste PO-vrijgavedatum, geschatte aankomstdatum van aanvulling en een haalbaarheidsindicator ter ondersteuning van de order.

### 6. Ingebouwde vooraf-audit en uitzonderingsgovernance
De dedicatede laag `13_Audit_Validation` fungeert als operationele stroomonderbreker— zij brengt ontbrekende stamgegevenskoppelingen, ongeldige locatiecodes, wees-zendingen onderweg, overgereserveerde leveringsbatches en verlopen reserveringen aan het licht voordat planners overdrachten uitvoeren of leveranciers-PO's vrijgeven.

---

### Operationele reikwijdte en governance-disclaimer
*Deze toolkit is een analytisch beslissingsondersteuningsmodel en offline planningslaag—geen transactioneel ERP, Warehouse Management System (WMS), Transport Management System (TMS) of geautomatiseerd EDI-inkoopplatform. Toewijzingsresultaten en inkoopsamenvattingen zijn planningsaanbevelingen die zijn afgeleid uit door de gebruiker aangeleverde exports en parameters; verifieer altijd de fysieke magazijnbeperkingen en leverancierscapaciteit voordat u klantleverdata toezegt of bindende inkooporders uitgeeft.*

---

## Over de maker

Ik bouw lichte, inspecteerbare operationele beslissingsondersteuningstools voor supply chain- en financiële workflows waar kritische bedrijfslogica begraven raakt in losse spreadsheets. De leidende ontwerpvraag is: **welke exacte datapunten en validatieregels moeten samenbrengen worden om de volgende operationele toezegging met vertrouwen te doen?**

## Werkboekarchitectuur

OFIA ordent zijn 14 werkbladen in vier functionele lagen.

| Laag | Primaire verantwoordelijkheid | Werkbladen |
|---|---|---|
| Configuratie en stamgegevens | Centraliseert bedrijfsregels en beheert referentiegegevens van producten, locaties en leveranciers. | `00_Config_Params`, `01_Item_Master`, `02_Locations_Distance`, `03_Vendors_Leadtime` |
| Operationele invoer | Vangt vraag, fysieke voorraad, inkooporders en goederen onderweg op. | `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, `07_In_Transit_OTW` |
| Berekening en toewijzing | Bouwt een geünificeerd leveringsgrootboek, volgt reserveringen en berekent toewijzing over meerdere niveaus. | `08_Supply_Ledger`, `09_Reservations_Ledger`, `10_Allocation_Engine` |
| Beslissingsoutputs en controles | Presenteert afwikkelingsresultaten op orderniveau, inkoopaanbevelingen en audituitzonderingen. | `11_WhatIf_Fulfillment`, `12_Procurement_Summary`, `13_Audit_Validation` |

### Referentie werkbladen

<details>
<summary>Configuratie en stamgegevens</summary>

| Werkblad | Doel |
|---|---|
| `00_Config_Params` | Centrale parametertabel voor afwikkelingsbeleid, voorraadbescherming, transferradius, tijdsbuffers, verpakkingsgrootteregels, MOQ-vermenigvuldiger, reserveringsgeldigheid en valutaweergave. |
| `01_Item_Master` | Productreferentiegegevens op SKU-niveau, inclusief artikelomschrijvingen, standaardverpakkingshoeveelheden, eenheidskosten en leveranciersreferenties. |
| `02_Locations_Distance` | Informatie over afstand van herkomst naar bestemming en transittijden, gebruikt om geschikte nabijgelegen locaties te identificeren en transfertijden te schatten. |
| `03_Vendors_Leadtime` | Leveranciersreferenties en componenten van de aanvuldoorlooptijd, gebruikt om inkoop- en aankomstdaten te schatten. |

</details>

<details>
<summary>Operationele invoer</summary>

| Werkblad | Doel |
|---|---|
| `04_Sales_Demand` | Vraag op orderregelniveau, vraagtype, SKU, bestemming, gevraagde hoeveelheid en gevraagde leverdatum. |
| `05_Inv_On_Hand` | Momentopnames van fysieke voorraad per locatie en SKU, inclusief toegezegde hoeveelheid en de invoer die nodig is om beschermd en overdraagbare voorraad te berekenen. |
| `06_PO_Pipeline` | Openstaande inkooporderregels en hun openstaande hoeveelheden, inclusief hoeveelheden die zijn gekoppeld aan zendingen onderweg. |
| `07_In_Transit_OTW` | Registraties van zendingen of containers, gekoppelde inkooporderreferenties, zendingshoeveelheden en verwachte aankomstinformatie. |

</details>

<details>
<summary>Berekening en toewijzing</summary>

| Werkblad | Doel |
|---|---|
| `08_Supply_Ledger` | Consolideert gemodelleerde leveringsbronnen in een geünificeerd grootboek met unieke leverings-ID's, beschikbaarheidsdata, bruto beschikbare hoeveelheden, actieve reserveringen en netto beschikbare hoeveelheden. |
| `09_Reservations_Ledger` | Beheert permanente leveringsreserveringen gekoppeld aan orderregels en leverings-ID's, inclusief status, aanmaakdatum en auditinformatie over reserveringen. |
| `10_Allocation_Engine` | Voert de getrapte sourcing-volgorde uit, berekent gesplitste toewijzingen en resterende vraag, en leidt de totale toegewezen hoeveelheid en geschatte aankomstinformatie af. |

</details>

<details>
<summary>Beslissingsoutputs en controles</summary>

| Werkblad | Doel |
|---|---|
| `11_WhatIf_Fulfillment` | Beslisweergave op orderniveau met toegewezen hoeveelheid, niet-gedekte hoeveelheid, afwikkelingsstatus, primaire leveringsbron, status van gesplitste order, geschatte leverdatum, vertraging in dagen en aanbevolen actie. |
| `12_Procurement_Summary` | Consolideert nettotekorten per SKU en bestemming, leveranciersinformatie, aanbevolen inkoophoeveelheden, voorgestelde inkoopdata, verwachte aankomstdaten en timinghaalbaarheid. |
| `13_Audit_Validation` | Consolideert gegevenskwaliteits- en controle-uitzonderingen ter beoordeling voordat operationele beslissingen worden afgerond. |

</details>

## Kernbedrijfslogica

### Voorraadbeschikbaarheid

Het werkboek berekent overdraagbare voorraad uit de fysiek voorhanden hoeveelheid na verrekening van de toegezegde hoeveelheid en de geconfigureerde voorraadbescherming.

Conceptueel:

\[
\text{Net Transferable Qty}
=
\max(0,\ \text{Physical QOH}
-\text{Committed Qty}
-\text{Protected Qty})
\]

De beschermingsberekening wordt aangestuurd door gecentraliseerde parameters. De bedoeling is te voorkomen dat de toewijzingsengine elke fysieke eenheid als vrij beschikbaar behandelt.

Het resultaat is een gemodelleerde toewijzingshoeveelheid, geen vervanging van het live voorraadgrootboek van een magazijn.

### Reconciliatie van inkooporders en zendingen onderweg

Elke inkooporderregel heeft een unieke sleutel, afgeleid van het inkoopordernummer en de regel-ID. Registraties onderweg verwijzen naar die sleutel zodat het werkboek de zendingshoeveelheid kan identificeren die al door een open PO-regel wordt gedekt.

Conceptueel:

\[
\text{Net Pending PO Qty}
=
\max(0,\ \text{PO Open Qty}
-\text{Matched OTW Qty})
\]

De resulterende netto openstaande hoeveelheid vertegenwoordigt de resterende gemodelleerde inkooppijplijn nadat gekoppelde hoeveelheden onderweg zijn afgetrokken.

Registraties zonder geldige PO-referentie moeten via de validatiewerkstroom worden onderzocht. De reconciliatie hangt af van nauwkeurige en consistente bronidentificatoren.

### Getrappe toewijzing en resterende vraag

De toewijzingsengine draagt de niet-afgewikkelde hoeveelheid van het ene sourcing-niveau over naar het volgende.

Voor elk niveau:

\[
\text{Remaining Qty}_{n}
=
\max(0,\ \text{Remaining Qty}_{n-1}
-\text{Allocated Qty}_{n})
\]

Deze cascaderende berekening is bedoeld om te voorkomen dat dezelfde vraaghoeveelheid herhaaldelijk over de niveaus wordt toegewezen.

Het werkelijke resultaat hangt af van de leveringsregistraties, geschiktheidsregels, de geconfigureerde prioriteitsvolgorde en de data die in het werkboek zijn geladen.

### Afwikkelingsstatus op orderniveau

De afwikkelingsweergave combineert voldoende hoeveelheid met levertiming. De beoogde statuscategorieën omvatten:

- **Volledig op tijd afgewikkeld** — de gemodelleerde toewijzing dekt de gevraagde hoeveelheid binnen de gevraagde leverdatum.
- **Vertraagd afgewikkeld** — de gemodelleerde hoeveelheid is gedekt, maar de verwachte leverdatum ligt later dan gevraagd.
- **Gedeeltelijk afgewikkeld** — slechts een deel van de gevraagde hoeveelheid wordt door de gemodelleerde toewijzing gedekt.
- **Niet op voorraad / ongedekte vraag** — de gemodelleerde leveringspool kan de gevraagde hoeveelheid niet dekken.
- **Offerte in afwachting** — offertevraag wordt vastgehouden buiten harde toewijzing wanneer het geconfigureerde offerte-reserveringsbeleid geen verbruik van levering toestaat.

Het exacte resultaat is alleen zo betrouwbaar als de onderliggende vraag-, voorraad-, zendings-, doorlooptijd- en reserveringsgegevens. Een werkboekstatus mag niet worden geïnterpreteerd als een bevestigde vervoersboeking, leveranciersbelofte of magazijnuitvoeringsbevestiging.

### Inkoophoeveelheid en timing

De inkoopsamenvatting vertrekt vanaf het resterende gemodelleerde tekort en past de geconfigureerde MOQ-vermenigvuldiger en het verpakkingsgroottebeleid toe.

Wanneer afronding op verpakkingsgrootte is ingeschakeld, wordt de aanbeveling naar boven afgerond op een geldig verpakkingsveelvoud. De voorgestelde inkoopdatum is afgeleid van de relevante ordertiming en de gemodelleerde aanvuldoorlooptijd, inclusief geconfigureerde buffers.

Dit helpt twee afzonderlijke vragen te beantwoorden:

1. **Hoeveel extra levering zou nodig kunnen zijn?**
2. **Wanneer zou het besteld moeten worden om de doelleverdatum te ondersteunen?**

Leverancierscapaciteit, beschikbaarheid van productieslots, transportverstoringen en andere externe beperkingen moeten apart worden geverifieerd, tenzij ze expliciet in de invoergegevens zijn opgenomen.

## Operationele aannames en grenzen

OFIA is ontworpen als een herhaalbaar analytisch werkboek met geëxporteerde bedrijfsgegevens. De resultaten hangen af van de nauwkeurigheid en volledigheid van de aangeleverde registraties.

Voordat u de resultaten gebruikt voor een wezenlijke klantverplichting of inkoopbeslissing, bevestigt u dat:

- SKU-, locatie-, leveranciers-, PO- en PO-regelidentificatoren consistent zijn over alle invoerbladen.
- Voorhanden en toegezegde hoeveelheden de beoogde voorraadmomentopname weerspiegelen.
- Hoeveelheden onderweg zijn gekoppeld aan de juiste inkooporderregels.
- Gevraagde leverdata, verzenddata en doorlooptijden geldige Excel-datums zijn.
- Actieve reserveringen echte verplichtingen vertegenwoordigen en worden beoordeeld wanneer hun status verandert.
- Geconfigureerde overdracht- en aanvulbuffers het gemodelleerde operationele beleid weerspiegelen.
- Relevante uitzonderingen in `13_Audit_Validation` zijn beoordeeld.

Het werkboek ondersteunt beslissingsvoorbereiding; het voert geen overdrachten automatisch uit, maakt geen inkooporders aan, reserveert geen voorraad in een ERP en informeert geen klanten.

## Technische details

Het volgende technische referentiemateriaal is gegroepeerd in een inklapbare sectie om het hoofd-README gericht op zakelijk gebruik te houden en tegelijk de implementatiedetails voor beheerders van het werkboek te bewaren.

<details>
<summary>Formularereferentie en validatieregels</summary>

### Formularereferentie

Het werkboek gebruikt moderne Excel dynamische-matrixformules om berekeningsresultaten uit de brongegevens te genereren. De volgende referenties vatten de belangrijkste formulepatronen en hun zakelijke rol samen.

#### 1. Gebruikte functies

| Functie | Rol in OFIA |
|---|---|
| `FILTER` | Selecteert actieve vraag, geschikte leveringsregistraties en validatieuitzonderingen. |
| `UNIQUE` | Identificeert unieke SKU-locatiecombinaties en andere unieke bedrijfssleutels. |
| `SORT` | Ordent kandidaatregistraties wanneer een gedefinieerde volgorde vereist is. |
| `XLOOKUP` | Haalt artikel-, leveranciers-, locatie-, PO- en leveringsattributen op uit referentietabellen. |
| `SUMIFS` | Aggregeert hoeveelheden per PO-regelsleutel, leverings-UID, SKU, locatie of reserveringsstatus. |
| `MAP` | Past bedrijfslogica op regelniveau toe over dynamische matrices zonder formules handmatig omlaag te kopiëren. |
| `BYROW` | Past berekeningen over rijen toe wanneer rijsgewijze evaluatie passend is. |
| `LET` | Benoemt tussenberekeningen binnen een formule om complexe logica gemakkelijker te structureren. |
| `HSTACK` | Combineert verwante velden in één berekende matrix. |
| `VSTACK` | Combineert voorraad, onderweg en inkooporders tot een geünificeerd grootboek. |
| `EXPAND` | Breidt een waarde of matrix uit naar de vereiste afmetingen bij het bouwen van een gecombineerde matrix. |
| `SEQUENCE` | Genereert sequentiële numerieke matrices voor formulegestuurde berekeningen. |
| `TODAY` | Berekent reserveringsleeftijd op basis van de huidige datum en leveringsbeschikbaarheidsdata. |
| `MAX` | Voorkomt dat berekende beschikbare hoeveelheden en resterende vraag negatief worden. |

Beschikbaarheid en gedrag van afzonderlijke functies hangen af van de geïnstalleerde Excel-versie. Het werkboek vereist een versie die de in de formules gebruikte dynamische-matrixfuncties ondersteunt.

#### 2. Voorraadbeschikbaarheid

De conceptuele formule voor netto overdraagbare voorraad is:

```excel
=MAX(0, Physical_QOH - Committed_Qty - Protected_Qty)
```

In het werkboek wordt de beschermde hoeveelheid berekend uit de relevante invoer voor voorraadbescherming en gecentraliseerde configuratieparameters. De werkelijke werkbladformule gebruikt cel- en bereikverwijzingen in plaats van de hierboven getoonde conceptuele veldnamen.

Het resultaat vertegenwoordigt gemodelleerde overdraagbare voorraad, geen live bevestiging van magazijnbeschikbaarheid.

#### 3. Reconciliatie van inkooporders

Inkooporderregels gebruiken een samengestelde sleutel op basis van het PO-nummer en de regel-ID.

```excel
=PO_Number & "|" & PO_Line_ID
```

Het grootboek onderweg gebruikt de overeenkomstige referentiesleutel om gekoppelde zendingshoeveelheden te aggregeren:

```excel
=SUMIFS(
    '07_In_Transit_OTW'!E:E,
    '07_In_Transit_OTW'!D:D,
    PO_Unique_Key
)
```

De resterende gemodelleerde inkooppijplijn wordt als volgt berekend:

```excel
=MAX(0, PO_Open_Qty - OTW_Matched_Qty)
```

Deze voorbeelden illustreren de logica. Gebruik bij het implementeren of aanpassen van formules de exacte kolomtoewijzingen en formulestructuren die in het werkboek zijn gedefinieerd.

#### 4. Reserveringen en netto levering

Actieve reserveringen worden geaggregeerd tegen hun toegewezen leverings-UID. Conceptueel:

```excel
=SUMIFS(
    '09_Reservations_Ledger'!H:H,
    '09_Reservations_Ledger'!F:F,
    Supply_UID,
    '09_Reservations_Ledger'!I:I,
    "Active"
)
```

De netto toewijsbare hoeveelheid wordt vervolgens als volgt berekend:

```excel
=MAX(0, Gross_Available_Qty - Active_Reserved_Qty)
```

De auditlogica moet ook gevallen identificeren waarin actieve reserveringen de bruto beschikbare levering overschrijden. Alleen een niet-negatieve netto-beschikbaarheidsberekening is niet voldoende om overreservering te detecteren.

#### 5. Toewijzingscascade

Voor elk sourcing-niveau wordt de resterende vraag verminderd met de op dat niveau toegewezen hoeveelheid:

\[
\text{Remaining}_{n}
=
\max(0,\text{Remaining}_{n-1}-\text{Allocated}_{n})
\]

De totale toewijzing is de som van de hoeveelheden die over de sourcing-niveaus zijn toegewezen:

\[
\text{Allocated Total}
=
\sum_{n=1}^{5}\text{Allocated}_{n}
\]

De niet-gedekte hoeveelheid is:

\[
\text{Unmet Qty}
=
\max(0,\text{Requested Qty}-\text{Allocated Total})
\]

De implementatie moet de niveavolgorde behouden en de resterende hoeveelheid van elk niveau naar het volgende overdragen. Onafhankelijke berekeningen die de bijgewerkte restwaarde niet delen, kunnen dezelfde vraag over-toewijzen.

#### 6. Levertiming

De geschatte leverdatum van een order wordt afgeleid uit de gemodelleerde aankomstdaten van zijn toegewezen leveringsbronnen. Wanneer een order meerdere bronnen gebruikt, is de laatste aankomstdatum van de toegewezen bronnen de beperkende datum voor de volledige order.

Leververtraging wordt conceptueel als volgt berekend:

\[
\text{Delay Days}
=
\max(0,\text{Estimated Delivery Date}-\text{Requested Delivery Date})
\]

Een geschatte datum is een planningsresultaat op basis van brondatum en geconfigureerde doorlooptijdaannames. Het is geen bevestigde logistieke toezegging.

#### 7. Inkoophoeveelheid

De inkoopaanbeveling vertrekt vanaf het resterende nettotekort. Vervolgens past deze de geconfigureerde MOQ-vermenigvuldiger toe en—indien ingeschakeld—rondt het resultaat naar boven af op het toepasselijke standaardverpakkingsveelvoud.

De exacte implementatie moet de parameterverwijzingen van het werkboek in `00_Config_Params` volgen, met name:

- `B11` — schakelaar voor afronding op verpakkingsgrootte.
- `B12` — MOQ-vermenigvuldiger.

Vervang deze parameterverwijzingen niet door hardgecodeerde waarden in berekeningsformules.

### Validatieregels

`13_Audit_Validation` is het centrale uitzonderingsmonitoringwerkblad. Beoordeel het na elke verversing van de brongegevens en voordat u op de afwikkelings- of inkoopresultaten vertrouwt.

| Validatiegebied | Wat te controleren | Waarom het belangrijk is |
|---|---|---|
| Artikelstamgegevens | SKU-registraties bestaan, sleutels zijn uniek en standaardverpakkingshoeveelheden zijn geldig. | Ongeldige artikelverwijzingen kunnen toewijzings- en inkoopberekeningen ondermijnen. |
| Locatieverwijzingen | Vraag- en voorraadlocatiecodes bestaan in de relevante referentiegegevens. | Ontbrekende of inconsistente locaties kunnen correcte brongeschiktheid en transatijdberekening verhinderen. |
| Vraagintegriteit | Orderidentificatoren, regelidentificatoren, SKU-verwijzingen, gevraagde hoeveelheden en leverdata zijn geldig. | Ongeldige vraaggegevens kunnen misleidende afwikkelingsstatussen en foutieve berekeningen van niet-gedekte hoeveelheden opleveren. |
| Integriteit inkooporders | PO-nummers, regel-ID's, openstaande hoeveelheden en PO-regelsleutels zijn consistent. | Inconsistente sleutels kunnen zendingsreconciliatie breken. |
| Integriteit onderweg | Zendingsregistraties zijn gekoppeld aan geldige PO-regels en bevatten geldige hoeveelheids- en timingvelden. | Wees-zendingen kunnen verkeerd worden geteld of worden uitgesloten van de beoogde leveringspijplijn. |
| Leveringsbeschikbaarheid | Brutolevering, actieve reserveringen en netto beschikbaarheid reconciliëren. | Reserveringen die de beschikbare levering overschrijden duiden op een mogelijk verplichtingsconflict. |
| Reserveringsnaleving | Reserveringsstatus, toegewezen leverings-UID, aanmaakdatum en geldigheidsperiode zijn consistent. | Ongeldige, verlopen of gebroken reserveringen kunnen latere toewijzingen verstoren. |
| Toewijzingsintegriteit | Toegewezen hoeveelheden overschrijden de geschikte levering niet en elk niveau gebruikt de resterende vraag van het vorige niveau. | Voorkomt dubbel gebruik van voorraad en overtoewijzing van vraag. |
| Leverbaarheid | Geschatte aankomstdaten en gevraagde leverdata zijn geldig en vergelijkbaar. | Ongeldige datum- of doorlooptijdinvoer kan op tijd en vertraagde afwikkeling verkeerd classificeren. |
| Inkooplogica | Nettotekorten, leverancierstoewijzingen, verpakkingsgroottes en doorlooptijdaannames zijn consistent. | Helpt ongepaste of verkeerd gedimensioneerde aanvulaanbevelingen te voorkomen. |

#### Ernst en opvolging

Het bronontwerp onderscheidt blokkerende kritieke uitzonderingen van waarschuwingen. De juiste reactie hangt af van de getroffen registratie en de geconfigureerde validatieregel.

- **Kritieke uitzondering:** Onderzoek en corrigeer het onderliggende gegevens- of toewijzingsconflict voordat u op de getroffen beslissing vertrouwt.
- **Waarschuwing:** Beoordeel de registratie en bepaal of het probleem de voorgestelde afwikkelings- of inkoopactie beïnvloedt.
- **Globaal gezond resultaat:** Geeft aan dat de geconfigureerde auditcontroles geen uitzondering hebben geïdentificeerd. Het bewijst niet dat externe brongegevens volledig, actueel of operationeel bevestigd zijn.

Interpreteer een schone audituitslag niet als garantie voor de werkelijke leveringsprestaties. De validatielaag controleert de regels en registraties die in het werkboek zijn weergegeven.

</details>

## Dagelijkse bedrijfsprocedure

Gebruik de volgende cyclus wanneer vraag, voorraad, inkooporders, zendingsregistraties of bedrijfsparameters veranderen.

1. **Ververs de brongegevens.** Werk de aangewezen invoergebieden in `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline` en `07_In_Transit_OTW` bij, samen met gewijzigde stamgegevens.
2. **Herbereken het werkboek.** Gebruik in Excel `Ctrl + Alt + F9` om indien nodig een volledige herberekening af te dwingen.
3. **Beoordeel het auditwerkblad.** Controleer `13_Audit_Validation` en onderzoek kritieke uitzonderingen voordat u de resultaten gebruikt.
4. **Werk permanente reserveringen bij.** Registreer echte verplichtingen in `09_Reservations_Ledger`, koppel ze aan de juiste leverings-UID en stel de juiste status in.
5. **Beoordeel afwikkelingsbeslissingen.** Gebruik `11_WhatIf_Fulfillment` om vertraagde, gedeeltelijk afgewikkelde of ongedekte vraag te identificeren.
6. **Beoordeel inkoopaanbevelingen.** Gebruik `12_Procurement_Summary` om het resterende nettotekort, de aanbevolen hoeveelheid, de leverancier en de timing te beoordelen.
7. **Bevestig externe uitvoering.** Valideer voorgestelde overdrachten, leverancierscapaciteit, inkooporders, verzendplannen en klantverplichtingen met de betrokken operationele teams.

### Probleemoplossing

<details>
<summary>Dynamische-matrixformule toont #SPILL!</summary>

**Waarschijnlijke oorzaak:** Cellen in het beoogde overloopbereik zijn niet leeg, zodat Excel het volledige matrixresultaat niet kan weergeven.

**Wat te doen:**

1. Selecteer de cel met de formule.
2. Inspecteer het door Excel aangegeven overloopgebied.
3. Verwijder onbedoelde waarden of spaties die de uitvoer blokkeren.
4. Bevestig dat het uitvoergebied van de formule niet bezet is door handmatig ingevoerde gegevens.

Verwijder bij het opschonen van de blokkerende cellen niet de formule zelf.

</details>

<details>
<summary>Nieuwe invoergegevens veranderen de resultaten niet</summary>

**Waarschijnlijke oorzaak:** Excel staat mogelijk op handmatige berekening, of de brongegevens zijn buiten het verwachte invoerbereik geplakt.

**Wat te doen:**

1. Open het menu **Formules → Berekeningsopties** van Excel.
2. Selecteer zo nodig **Automatisch** als berekeningsoptie.
3. Controleer of de gegevens in de juiste invoerkolommen en binnen de ondersteunde bereiken van het werkboek zijn ingevoerd.
4. Voer een volledige herberekening uit met `Ctrl + Alt + F9`.

</details>

<details>
<summary>Het wijzigen van een parameter werkt het werkboek niet bij</summary>

**Waarschijnlijke oorzaak:** De parameter is in de verkeerde cel ingevoerd, een formuleverwijzing is gewijzigd of de berekening is niet ververst.

**Wat te doen:**

1. Bevestig de verwachte positie van de parameter in `00_Config_Params`.
2. Vermijd het invoegen of verplaatsen van parametercellen die door formules worden gebruikt.
3. Controleer `13_Audit_Validation` op gerelateerde uitzonderingen.
4. Dwing een volledige herberekening af.

</details>

<details>
<summary>Datums verschijnen als serienummers</summary>

**Waarschijnlijke oorzaak:** De cel is opgemaakt als Standaard of Getal in plaats van als datum.

**Wat te doen:**

1. Selecteer de getroffen datumcellen.
2. Open Cellen opmaken (`Ctrl + 1` op Windows of `Cmd + 1` op Mac).
3. Pas een datumopmaak toe zoals `YYYY-MM-DD`.

Een numerieke waarde zoals `45628` kan een Excel-datumserienummer zijn; verifieer de onderliggende waarde voordat u de datum wijzigt.

</details>

## Compatibiliteit en prestaties

### Ondersteunde Excel-versies

De bronarchitectuur is ontworpen voor **Microsoft 365 of Excel 2021 en later**, inclusief compatibele desktop- en webversies die de vereiste functies van het werkboek ondersteunen.

Excel 2016 en Excel 2019 worden door het bronontwerp niet ondersteund. Andere spreadsheettoepassingen implementeren de vereiste dynamische-matrixfuncties mogelijk niet op dezelfde manier.

### Aanbevolen datavolume

De bronimplementatie beveelt aan:

- Tot **50.000 rijen per detailwerkblad**.
- Ongeveer **150.000 rijen in het hele werkboek** als voorgestelde totaallimiet.

De werkelijke herberekeningssnelheid hangt af van de computer, de Excel-versie, de formulecomplexiteit en het aantal gevulde registraties. Behandel deze cijfers als planningsrichtlijnen, niet als prestatiegarantie. Archiveer bij grotere datasets voltooide historische orders en test de herberekeningsprestaties voordat u het werkboek uitbreidt.

### Integriteit van formules en invoer

- Overschrijf geen formulegegenereerde kolommen.
- Wijzig geen werkbladnamen of bronkolomkoppen waarnaar formules verwijzen.
- Houd samengestelde sleutels consistent over gekoppelde registraties.
- Onderhoud geldige Excel-datum en numerieke hoeveelheidsvelden.
- Wijzig zakelijke drempelwaarden in `00_Config_Params` in plaats van afzonderlijke berekeningsformules te bewerken.
- Beoordeel validatieuitzonderingen na elke wezenlijke gegevensverversing.

## Beperkingen

OFIA is een analytisch beslissingsondersteuningswerkboek. Het vervangt op zichzelf niet:

- Geen ERP, WMS, TMS, inkoopplatform of ordermanagementsysteem.
- Voert geen voorraadoverdrachten automatisch uit en maakt geen leveranciersinkooporders aan.
- Bevestigt geen productiecapaciteit van leveranciers, vervoersboekingen of douaneafhandeling.
- Garandeert niet dat voorraad- en zendingsexports actueel of volledig zijn.
- Houdt geen rekening met operationele beperkingen die ontbreken in de brongegevens.
- Garanteert geen leverdatum en elimineert niet alle toewijzingsconflicten.

Het nut ervan hangt af van consistente identificatoren, actuele operationele invoer, verstandige configuratie en menselijke beoordeling van wezenlijke uitzonderingen.

## Andere tools in deze reeks

Ontdek andere lichte tools voor zakelijke beslissingsondersteuning van Theseus Workshop in de projectrepository en gerelateerde productoverzichten.

## Licentie

Dit project wordt gedistribueerd onder de Apache-licentie 2.0, zoals aangegeven door het licentiebadge. Raadpleeg het bestand `LICENSE` van de repository voor de volledige licentievoorwaarden.

## Over Theseus Workshop

Theseus Workshop bouwt praktische, herbruikbare tools die terugkerende zakelijke vragen omzetten in gestructureerde workflows. De focus ligt op het helpen van teams om heldere beslissingen te nemen met vertrouwde tools en bestaande bedrijfsgegevens, zonder de complexiteit van een volledig enterprise-platform te introduceren.

OFIA past die aanpak toe op orderafwikkeling, voorraadtoewijzing, leveringsreconciliatie en inkoopplanning.

---

**Vóór publicatie:** vervang de plaatsaanduidingen voor de browserdemo- en Excel-aankoop-URL's in het openingsgedeelte door de werkelijke productlinks. Bevestig dat de repository het toepasselijke `LICENSE`-bestand bevat en dat de gepubliceerde browser- en Excel-versies overeenkomen met de hier beschreven mogelijkheden.
