[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Excel-Vorlage für Bestandsallokation über mehrere Standorte und Auftragsabwicklung (ATP- und Beschaffungsrechner)
<img width="1920" height="833" alt="image" src="https://github.com/user-attachments/assets/1379f571-ef41-486b-9c87-e6dc5cb96b2e" />

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-217346.svg)
![Category](https://img.shields.io/badge/Tool-Supply%20Chain%20%26%20ATP%20Planning-2251FF.svg)

**Eine Excel-Vorlage für die Bestandsallokation über mehrere Standorte, die Available-to-Promise-Berechnung (ATP) und die Planung der Auftragsabwicklung. Entwickelt für Supply-Chain-Planer, Bestandsanalysten und Distributeure mit mehreren Lagerhäusern, um physischen Bestand, aktive Auftragsreservierungen, Container unterwegs und offene Bestellungen (POs) abzugleichen—und daraus die genaue OTIF-Lieferfähigkeit sowie den Netto-Beschaffungsbedarf sowohl im Browser- als auch im Microsoft-Excel-Format zu ermitteln.**

Keine Registrierung. Keine Softwareinstallation. Sofortiger Zugriff über den kostenlosen webbasierten Abwicklungs-Simulator, kombiniert mit einer herunterladbaren Microsoft-Excel-Arbeitsmappe für den Offline-Abgleich von ERP-Daten, wiederholbare S&OP-Abläufe und dauerhafte Audit-Aufzeichnungen.

> **Zugang zu den Tools für Bestandsallokation und Abwicklungsplanung**
>
> - 🌐 **[Starten Sie den kostenlosen webbasierten Simulator für Bestandsallokation und ATP](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** — Testen Sie Mehrweghaus-Beschaffungshierarchien, simulieren Sie Regeln für Teillieferungen und prüfen Sie die Lieferfähigkeit online, ohne Software zu installieren oder Tabellen zu konfigurieren.
> - 📥 **[Laden Sie die Excel-Arbeitsmappe für Auftragsabwicklung über mehrere Standorte herunter (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** — Erhalten Sie die vollständige Betriebsmappe mit 13 Blättern für wiederkehrende ERP-Datenimporte, die Offline-Verfolgung des Reservierungsjournals und automatisierte Nettowiederbeschaffungsberechnungen. *Enthält eine 30-tägige Geld-zurück-Garantie ohne Rückfragen.*
>

---

## Zentrale Lieferketten-Kennzahlen und gelöste Herausforderungen der Auftragsabwicklung

Statt statische ERP-Exporte manuell gegeneinander abzugleichen, strukturiert diese parametrische Allokations-Engine das mehrstufige Angebot und die Nachfrage in einem einzigen prüfbaren Journal. So ordnet die Arbeitsmappe die **Schmerzpunkte der Verteilung über mehrere Standorte** den automatisierten **ATP- und Beschaffungskennzahlen** zu:

| Schmerzpunkt in Lieferkette und Auftragsabwicklung | Automatisierter Abgleichs- und Allokationsmechanismus | Verfolgte zentrale Bestands- und OTIF-Kennzahlen |
| :--- | :--- | :--- |
| **Unklare Machbarkeit der Auftragsabwicklung (OTIF-Risiko)** | Bewertet die vom Kunden gewünschten Lieferdaten anhand des mehrstufigen Lagerbestands, von Transferzeiten und Zollpuffern. | On-Time-In-Full-(OTIF)-Machbarkeitskennzeichen, Teilfüllquote, voraussichtliches Lieferdatum (EDD), nicht erfüllte Positionsmenge |
| **Fragmentierte Beschaffung über mehrere Lagerhäuser** | Allokiert die Bedarfsmengen entlang einer 5-stufigen Beschaffungshierarchie: Local Stock $\rightarrow$ Nearby Stores $\rightarrow$ Central DC $\rightarrow$ In-Transit $\rightarrow$ Open POs. | Zugewiesene Lieferquellen-ID, Teillieferungs-Allokation, Eignung im Transfer-Radius zwischen Niederlassungen |
| **Übertriebene Zusagen zum physischen Lagerbestand** | Zieht bestehende Kundenzusagen, aktive Journal-Reservierungen, Sicherheitsbestandspuffer und Prognoseschutz vom Bruttobestand ab. | Netto-Available-to-Promise (ATP), physischer Bestand vs. allokierbarer Bestand, geschützter Sicherheitsbestands-Mindestwert |
| **Doppelzählung von Ware unterwegs und offenen POs** | Verknüpft eingehende Containeraufzeichnungen direkt mit den ursprünglichen Bestellpositionen, um eine phantomhafte Aufblähung der Pipeline auszuschließen. | Nettomenge offener POs in der Pipeline, abgeglichenes Volumen Containersendungen unterwegs, einheitliche Lieferjournal-ID |
| **Panikkäufe und Überbeschaffung auf Basis des Bruttobedarfs** | Berechnet echte Netto-Bestandsdefizite erst, nachdem der gesamte allokierbare Bestand des Netzwerks und alle eingehenden Wiederbeschaffungspipelines ausgeschöpft sind. | Nettodefizitmenge, MOQ- und Standardgebinde-adjustierte Bestellmenge, spätester PO-Freigabestarttermin |
| **Versteckte Stammdaten und ERP-Exportfehler** | Führt vor der Allokation Diagnoseprüfungen über importierte Kundenaufträge, SKU-Stammtabellen und Reservierungsdatensätze durch. | Warnungen zu verwaisten Sendungen, Hinweise auf fehlende SKU-/Standortcodes, abgelaufene Angebotsreservierungen, Überallokationskonflikte |

---

## Schritt-für-Schritt-Anleitung: Ausführung der Bestandsallokation über mehrere Lagerhäuser und der Nettowiederbeschaffung

Die Arbeitsmappe arbeitet als wiederholbarer **Distributed-Order-Management- (DOM-) und DRP-Zyklus**: Konfigurieren Sie die Regeln Ihres Distributionsnetzwerks einmal, fügen Sie die Rohdaten aus Ihrem ERP/WMS ein, prüfen Sie Ausnahmen und fixieren Sie die Abwicklungszusagen.

### Schritt 1: Distributionsnetzwerk-Regeln und ATP-Parameter konfigurieren
Öffnen Sie den Tab `00_Config_Params`, um Ihre Governance-Regeln der Lieferkette festzulegen, ohne nachgelagerte Zellformeln anzufassen:

- **Netzwerktopologie:** Legen Sie den Code des zentralen Distributionszentrums (DC) und den maximalen Transfer-Radius zwischen nahegelegenen Standorten fest.
- **Bestandsschutz:** Definieren Sie Richtlinien zum Schutz durch Sicherheitsbestand, Schwellenwerte für den Schutz von Bedarfsprognosen und Gültigkeitszeiträume von Angebotsreservierungen (Ablauftage).
- **Vorlaufzeit- und Verpackungspuffer:** Definieren Sie Transferpuffer zwischen Lagerhäusern, Verzögerungen bei der Zollabfertigung sowie Standardregeln für Verpackung und Rundung.

### Schritt 2: ERP-Kundenaufträge, Lagerbestand und eingehende Pipeline-Daten importieren
Exportieren Sie rohe CSV-/XLSX-Tabellen aus Ihrer ERP-, Finanzbuchhaltungs- oder WMS-Plattform (z. B. NetSuite, SAP Business One, Dynamics 365, Fishbowl, Cin7) und fügen Sie sie in die standardisierten Eingabeblätter ein:

- **Kundenbedarf:** Offene Kundenauftragspositionen, Zielstandorte und vom Kunden gewünschte Lieferdaten.
- **Lagerbestand:** Schnappschüsse des physischen Bestands je SKU und Lagerortcode.
- **Eingehende Versorgungspipeline:** Offene Bestellpositionen (POs) mit zugesagten Lieferanten-Ankunftsdaten sowie aktuelle Sendungs-/Containermanifeste unterwegs.
- **Lieferketten-Stammdaten:** Artikelstamm (MOQ, Gebindegröße), Standortstamm, Distanzmatrix zwischen Standorten und Lieferanten-Vorlaufzeiten.

*(Behalten Sie die vordefinierten Spaltenüberschriften bei und überschreiben Sie keine berechneten Formelspalten.)*

### Schritt 3: Daten-Ausnahmen prüfen und What-if-Auftragsabwicklung durchsehen
Lösen Sie die Neuberechnung der Arbeitsmappe aus und folgen Sie der dreistufigen Entscheidungsprüfung:

1. **Datenqualitäts-Audit (`13_Audit_Validation`):** Klären Sie fehlende SKU-Stammzuordnungen, ungültige Lagercodes, verwaiste Container unterwegs oder abgelaufene Reservierungen, bevor Sie nachgelagerten Ergebnissen vertrauen.
2. **ATP und Beschaffung auf Positionsebene (`11_WhatIf_Fulfillment`):** Prüfen Sie die genauen Abwicklungsstatus (`Full & On-Time`, `Late`, `Partial`, `Shortage`), zugewiesene Beschaffungslagerhäuser und geschätzte Ankunftsdaten je Kundenauftragsposition.
3. **Netto-MRP-/DRP-Beschaffung (`12_Procurement_Summary`):** Durchsehen Sie die unabgedeckten Netto-Fehlmengen, empfohlene Lieferantenzuteilungen, MOQ-/Gebinde-adjustierte Bestellmengen und die spätesten Bestellfreigabetermine.

### Schritt 4: Versorgungsreservierungen fixieren und in der Excel-Arbeitsmappe operationalisieren
Wenn Kundenaufträge mit hoher Priorität eine garantierte Bestandssicherung erfordern, tragen Sie die zugewiesenen Versorgungs-IDs in `09_Reservations_Ledger` ein und schalten den Status auf `Active`, um diesen Bestand vor nachfolgenden Läufen zu schützen.

> 📦 **Bereit, den manuellen Bestandsabgleich in Ihrem gesamten Lagernetzwerk abzuschaffen?** 
> Nachdem Sie die Beschaffungshierarchie im **[kostenlosen browserbasierten Bestandsallokationssimulator](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** getestet haben, laden Sie die **[vollständige Excel-Arbeitsmappe für Auftragsabwicklung über mehrere Standorte herunter (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)**, um Ihre echten ERP-Exporte anzubinden, ein dauerhaftes Reservierungsjournal zu führen und wöchentliche S&OP-Wiederbeschaffungszyklen offline auszuführen.

---

## Warum ich diese mehrstufige Bestands- und ATP-Entscheidungs-Engine gebaut habe

In einem Distributionsnetzwerk mit mehreren Standorten ist es etwas völlig anderes zu wissen, *wie viel physischer Bestand in den Lagerhäusern liegt*, als zu wissen, *ob eine Kundenbestellung tatsächlich pünktlich geliefert werden kann*.

Betrachten Sie einen Großhändler oder eine Einzelhandelskette mit **28 Distributionsknotenpunkten**—einer Kombination aus zentralem Distributionszentrum (DC) und regionalen vorgelagerten Filialen. Betriebsdaten sind typischerweise verstreut: über ERP-Auftragsexporte, WMS-Bestandsschnappschüsse, offene Beschaffungsberichte, Container-Tracker der Spediteure und regionale Transitmatrizen.

Wenn Auftragsteams diese Tabellen manuell in Ad-hoc-Tabellenkalkulationen abgleichen, treten zwei systemische Fehler auf:

### 1. Die ATP-Illusion der „100 Stück auf Lager“
Ein WMS-Schnappschuss eines Lagerhauses zeigt möglicherweise **100 physisch verfügbare Stück**. Doch 30 Stück sind bereits auf offene Kommissionieraufträge gebucht, 20 Stück sind als geschützter Sicherheitsbestand gesperrt und 10 Stück sind durch eine aktive Angebotsreservierung belegt. Wird der ausgewiesene Bestand von 100 Stück als frei allokierbar behandelt, sind Doppelbelegungen, Fehlkommissionierungen und verpasste OTIF-Zusagen vorprogrammiert.

### 2. Die Doppelzählungsfalle zwischen PO „160 Stück eingehend“ und Ware unterwegs
Die vorgelagerten Versorgungspipelines leiden unter demselben Sichtbarkeitsmangel. Ein Bericht offener Bestellungen zeigt **100 bestellte Stück** bei einem Werk, während das Containermanifest des Logistikteams **60 genau dieser Stück bereits auf dem Schiff** ausweist. Summiert ein Bestandsplaner offene POs und Ware-unterwegs-Tabellen getrennt, scheint das Netzwerk über **160 Stück künftiger Versorgung** zu verfügen, obwohl nur **100 Netto-Stück** existieren.

Ich habe dieses Toolkit als **produktivisierte Supply-Chain-Entscheidungslogik** gebaut—als Brücke zwischen einfachen Tabellen und sechsstelliger Enterprise-APS-/DOM-Software. Es vereint die Netto-ATP-Berechnung, den PO-Sendungs-Abgleich, mehrstufige Beschaffungsregeln und die MOQ-bewusste Beschaffungsplanung in einem transparenten, prüfbaren Arbeitsablauf: **was zugesagt werden kann, welcher Knoten versenden sollte, was ungedeckt bleibt und was tatsächlich gekauft werden muss.**

---

## Getrennte ERP-Tabellen vs. strukturierte ATP- und Allokations-Arbeitsmappe

| Dimension der Lieferkettenplanung | Manuelle ERP-Exporte und Ad-hoc-VLOOKUP-Tabellen | Bestandsallokations-Engine für mehrere Standorte (dieses Tool) |
| :--- | :--- | :--- |
| **Available-to-Promise-Berechnung (ATP)** | Physische Bestände werden für freien Bestand gehalten, was Doppelallokationen zwischen Vertriebsmitarbeitern und Kanälen verursacht. | Zieht bestehende Zusagen, aktive Journal-Reservierungen, Sicherheitsbestand und Prognosepuffer vor der Allokation automatisch ab. |
| **Abgleich Ware unterwegs vs. offene POs** | Offene Bestellungen und eingehende Frachtcontainer werden getrennt summiert, was die projizierten Bestandspositionen aufbläht. | Gleicht Sendungspositionen mit den ursprünglichen PO-Nummern ab, um die echten verbleibenden Werks-Pipeline-Mengen zu berechnen. |
| **Lieferbarkeit von Aufträgen (OTIF und Vorlaufzeit)** | Planer prüfen, ob Bestand irgendwo im Netzwerk vorhanden ist, ignorieren jedoch Transferzeiten zwischen Lagerhäusern und Zollpuffer. | Bewertet Bestandsverfügbarkeitsdaten, Transfer-Vorlaufzeiten zwischen Standorten und Zollverzögerungen direkt gegen die vom Kunden gewünschten Lieferdaten. |
| **Beschaffung über mehrere Lagerhäuser und Teillieferungen** | Eine Niederlassung löst eine Notbestellung aus, während eine nahegelegene Filiale innerhalb des Transfer-Radius überschüssigen Langsamdreher-Bestand hält. | Setzt eine 5-stufige Beschaffungshierarchie durch (`Local` $\rightarrow$ `Nearby` $\rightarrow$ `Central DC` $\rightarrow$ `In-Transit` $\rightarrow$ `Open PO`) mit Unterstützung von Teillieferungen. |
| **Nettowiederbeschaffung und MOQ-Beschaffung** | Einkäufer lösen Bestellungen auf Basis des Bruttoverkaufsbedarfs aus und ignorieren Bestand, der bereits unterwegs oder in regionalen Hubs liegt. | Erzeugt Nettodefizit-Beschaffungsempfehlungen, adjustiert um Lieferanten-Vorlaufzeiten, Mindestbestellmengen (MOQ) und Gebindegrößen. |
| **Stammdatenhygiene und Ausnahme-Audit** | Fehlende SKU-Zuordnungen, verwaiste Containerdatensätze und abgelaufene Bestandssperren bleiben verborgen, bis die Kommissionierung im Lagerhaus scheitert. | Das dedizierte Blatt `13_Audit_Validation` kennzeichnet Datenintegritätsfehler, Überreservierungen und Allokationskonflikte vor der Ausführung. |

---

## Für wen diese Lieferketten-Arbeitsmappe gebaut ist: Rollen und Arbeitsabläufe

Dieses Toolkit zur Bestandsallokation und Auftragsabwicklung im Doppelformat (Browser + Excel) ist für Operationsteams konzipiert, die Bestände über mehrere Knotenpunkte verwalten, ohne auf Enterprise-APS-/DOM-Automatisierung zurückgreifen zu können:

- **Bestandsplaner und Bedarfs-/Versorgungsplanungs-Analysten:** Ersetzen Sie fragile VLOOKUP-Ketten über mehrere Dateien durch eine strukturierte **Available-to-Promise- (ATP-) und DRP-Excel-Vorlage**. Gleichen Sie verfügbaren Bestand, Sicherheitsbestands-Mindestwerte und eingehende Container in Minuten vor den wöchentlichen S&OP-Meetings ab.
- **Auftragsmanagement- (OM-) und Kundenservice-Koordinatoren:** Nutzen Sie den **Machbarkeitsrechner für die Auftragsabwicklung**, um B2B-Kunden genaue Lieferdaten zu geben, Teillieferungsoptionen zwischen regionalen Filialen zu bewerten und harte Bestandsreservierungen (`09_Reservations_Ledger`) für VIP-Konten zu fixieren.
- **Beschaffungsspezialisten und Einkaufsleiter:** Beseitigen Sie phantomhafte Pipeline-Aufblähung und Überbeschaffung. Nutzen Sie die **PO-Sendungs-Abgleichs-Engine** und den Tab `12_Procurement_Summary`, um die exakten Nettobeschaffungsdefizite zu berechnen—gerundet auf Lieferanten-MOQs und Standardgebinde.
- **Betrieb über mehrere Standorte und Distributionszentren-Leiter:** Optimieren Sie den Bestandsausgleich über 5 bis über 30 Lagernetzwerk-Knoten. Konfigurieren Sie Transfer-Radius-Regeln zwischen Filialen, damit überschüssiger regionaler Bestand nahegelegenen Bedarf deckt, bevor das zentrale DC abgebaut oder externe Lieferanten-POs ausgelöst werden.
- **ERP-Implementierungsberater und Lieferketten-Ingenieure:** Nutzen Sie die transparente 13-Blatt-Architektur der Arbeitsmappe als überprüfbare **Distributed-Order-Management- (DOM-)Spezifikation**—ideal, um Allokationslogik zu prototypisieren, bevor eigene Regeln in NetSuite, SAP oder Microsoft Dynamics hartkodiert werden.

---

## Branchen-Anwendungsfälle und Nischen-Szenarien der Lieferkette

Ob Sie regionale Baustoffhöfe, industrielle Großhandelsteile oder omnichannel Einzelhandelsfilialen verwalten—dieses Framework passt sich komplexen Distributionstopologien an:

### 1. Neuausgleich eines Hub-and-Spoke-Distributionsnetzwerks (zentrales DC + regionale Niederlassungen)
Beim Betrieb eines zentralen Distributionszentrums neben 10 bis über 30 vorgelagerten Filialen bestehen lokalisierte Bestandslücken oft neben einem Netzwerk-weiten Überbestand. Konfigurieren Sie den **Transfer-Radius-Parameter**, um Auftrags-Fehlmengen automatisch an berechtigte Nachbarfilialen zu verteilen, bevor auf die Wiederbeschaffung des zentralen DC oder Lieferanteneinkäufe zurückgegriffen wird.

### 2. Abgleich von Importcontainern und Übersee-POs mit langer Vorlaufzeit
Importeure, die bei Übersee-Manufakturen beschaffen, stehen vor langen Seefracht-Vorlaufzeiten, bei denen eine einzige Rahmenbestellung (Blanket PO) mehrere partielle Containerlieferungen erzeugt. Durch den Abgleich von **Containermanifesten unterwegs mit offenen PO-Positionen** verhindern Einkaufsteams die Doppelzählung der eingehenden Seefracht während der Saisonspitzen-Planung.

### 3. B2B-Angebotsreservierungen und Absicherung von Beständen mit hoher Priorität
In projektorientierten Großhandels- und B2B-Distributionsgeschäften erfordern ausstehende Kundenvorschläge oft temporäre Bestandssperren. Nutzen Sie die integrierte **Reservierungsgültigkeit und das Journal (`09_Reservations_Ledger`)**, um Bestand für aktive Angebote abzusichern und abgelaufene Sperren automatisch zu kennzeichnen, damit gebundener Bestand in den allgemeinen ATP-Pool zurückkehrt.

---

## Technische Architektur: Was diese Allokations-Engine unterscheidet

Anders als statische Bestandstracker, die nur aktuelle Bestände anzeigen, ist diese Arbeitsmappe um sechs operative Kontrollschichten herum aufgebaut:

### 1. Konfigurierbare 5-stufige Beschaffungshierarchie mit Teillieferungs-Logik
Die Engine bewertet die Versorgung in einer strengen Reihenfolge: **1. Lokaler Bestand $\rightarrow$ 2. Nahegelegene Standorte (im Radius) $\rightarrow$ 3. Zentrales DC $\rightarrow$ 4. Versorgung unterwegs $\rightarrow$ 5. Offene Bestellungen**. Kann eine einzelne Stufe die vollständige Auftragsposition nicht abdecken, unterstützt die Engine eine **Teillieferung** über die nachfolgenden Stufen, statt beim ersten Fehlbestand anzuhalten.

### 2. Wahrheitsgetreue Netto-Available-to-Promise-(ATP-)Verbuchung
Der physische Bruttobestand wird von bestehenden Auftragszusagen, aktiven Journal-Reservierungen, Sicherheitsbestands-Mindestwerten und Prognoseschutz befreit, bevor eine einzige Einheit dem Allokationsalgorithmus ausgesetzt wird.

### 3. Einheitliches Versorgungsjournal und PO-Sendungs-Deduplizierung
Durch die Zuordnung der Datensätze unterwegs zu ihren ursprünglichen Bestellpositionen zieht das Modell die versandten Mengen von den offenen PO-Beständen ab und vergibt eine **eindeutige Versorgungskennung** über das einheitliche Journal, um Doppelallokationen zu vermeiden.

### 4. Doppelspurige Liefermachbarkeit nach Menge und Termin (EDD-Berechnung)
Bestand im Netzwerk bedeutet nicht, dass er rechtzeitig ankommen kann. Die Engine ergänzt Versorgungsbereitschaftsdaten, Transfer-Vorlaufzeiten zwischen Standorten, Zollabfertigungspuffer und Wiederbeschaffungspläne—und verwendet das **späteste Ankunftsdatum aller Teillieferungsquellen**, um die echte OTIF-Machbarkeit gegen das vom Kunden gewünschte Datum zu bewerten.

### 5. MOQ- und Gebindegrößen-bewusste Netto-Beschaffungs-Engine
Nachgelagerte Beschaffungsempfehlungen (`12_Procurement_Summary`) werden strikt aus den **Nettodefiziten nach der Allokation** abgeleitet und geben aus:
- Defizit-SKU, Zielstandort und gesamte unabgedeckte Nettomenge.
- Empfohlenen bevorzugten Lieferanten, Standardgebindegröße und **MOQ-adjustierte Bestellmenge**.
- Spätesten PO-Freigabestarttermin, geschätztes Wiederbeschaffungs-Ankunftsdatum und ein Machbarkeitskennzeichen zur Auftragsunterstützung.

### 6. Integriertes Vorab-Audit und Ausnahmengovernance
Die dedizierte Schicht `13_Audit_Validation` wirkt als operativer Schutzschalter—sie deckt fehlende Stammdaten-Verknüpfungen, ungültige Standortcodes, verwaiste Sendungen unterwegs, überreservierte Versorgungslose und abgelaufene Reservierungen auf, bevor Planer Transfers ausführen oder Lieferanten-POs freigeben.

---

### Operativer Geltungsbereich und Governance-Hinweis
*Dieses Toolkit ist ein analytisches Entscheidungsunterstützungsmodell und eine Offline-Planungsschicht—kein transaktionales ERP, kein Warehouse-Management-System (WMS), kein Transportmanagement-System (TMS) und keine automatisierte EDI-Beschaffungsplattform. Allokationsergebnisse und Beschaffungszusammenfassungen sind Planungsempfehlungen, die aus vom Nutzer bereitgestellten Exporten und Parametern abgeleitet werden; prüfen Sie stets die physischen Lagerbeschränkungen und Lieferantenkapazitäten, bevor Sie Kundenlieferdaten zusagen oder verbindliche Bestellungen auslösen.*

---

## Über den Ersteller

Ich entwickle leichte, überprüfbare operative Entscheidungsunterstützungs-Tools für Lieferketten- und Finanzabläufe, bei denen kritische Geschäftslogik in getrennten Tabellen begraben wird. Die leitende ingenieurtechnische Frage lautet: **Welche exakten Datenpunkte und Validierungsregeln müssen zusammengebracht werden, um das nächste operative Engagement mit Zuversicht einzugehen?**

## Architektur der Arbeitsmappe

OFIA gliedert seine 14 Arbeitsblätter in vier funktionale Schichten.

| Schicht | Hauptverantwortung | Arbeitsblätter |
|---|---|---|
| Konfiguration und Stammdaten | Zentralisiert Betriebsregeln und pflegt die Referenzdaten für Produkte, Standorte und Lieferanten. | `00_Config_Params`, `01_Item_Master`, `02_Locations_Distance`, `03_Vendors_Leadtime` |
| Operative Eingabe | Erfasst Bedarf, physischen Bestand, Bestellungen und Ware unterwegs. | `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, `07_In_Transit_OTW` |
| Berechnung und Allokation | Erstellt ein einheitliches Versorgungsjournal, verfolgt Reservierungen und berechnet die mehrstufige Allokation. | `08_Supply_Ledger`, `09_Reservations_Ledger`, `10_Allocation_Engine` |
| Entscheidungsausgaben und Kontrollen | Stellt Abwicklungsergebnisse auf Auftragsebene, Beschaffungsempfehlungen und Audit-Ausnahmen dar. | `11_WhatIf_Fulfillment`, `12_Procurement_Summary`, `13_Audit_Validation` |

### Referenz der Arbeitsblätter

<details>
<summary>Konfiguration und Stammdaten</summary>

| Arbeitsblatt | Zweck |
|---|---|
| `00_Config_Params` | Zentrale Parametertabelle für Abwicklungsrichtlinien, Bestandsschutz, Transfer-Radius, Zeitpuffer, Gebindegrößenregeln, MOQ-Multiplikator, Reservierungsgültigkeit und Währungsanzeige. |
| `01_Item_Master` | Produktreferenzdaten auf SKU-Ebene, einschließlich Artikelbeschreibungen, Standardgebindequantitäten, Stückkosten und Lieferantenreferenzen. |
| `02_Locations_Distance` | Informationen zu Entfernungen und Transferzeiten zwischen Ursprung und Ziel, um nahegelegene Standorte zu identifizieren und Transfer-Vorlaufzeiten zu schätzen. |
| `03_Vendors_Leadtime` | Lieferantenreferenzen und Komponenten der Wiederbeschaffungs-Vorlaufzeit zur Schätzung von Beschaffungs- und Ankunftsdaten. |

</details>

<details>
<summary>Operative Eingabe</summary>

| Arbeitsblatt | Zweck |
|---|---|
| `04_Sales_Demand` | Bedarf auf Auftragspositionsebene, Bedarfstyp, SKU, Zielort, angeforderte Menge und gewünschtes Lieferdatum. |
| `05_Inv_On_Hand` | Schnappschüsse des physischen Bestands je Standort und SKU, einschließlich zugesagter Menge und der Eingaben zur Berechnung von geschütztem und transferierbarem Bestand. |
| `06_PO_Pipeline` | Offene Bestellpositionen und ihre offenen Mengen, einschließlich der Mengen, die Sendungen unterwegs zugeordnet sind. |
| `07_In_Transit_OTW` | Sendungs- oder Containerdatensätze, verknüpfte Bestellreferenzen, Sendungsmengen und erwartete Ankunftsinformationen. |

</details>

<details>
<summary>Berechnung und Allokation</summary>

| Arbeitsblatt | Zweck |
|---|---|
| `08_Supply_Ledger` | Konsolidiert modellierte Versorgungsquellen in einem einheitlichen Journal mit eindeutigen Versorgungs-IDs, Bereitschaftsdaten, brutto verfügbaren Mengen, aktiven Reservierungen und netto verfügbaren Mengen. |
| `09_Reservations_Ledger` | Führt dauerhafte Versorgungsreservierungen, verknüpft mit Auftragspositionen und Versorgungs-IDs, einschließlich Status, Erstellungsdatum und Reservierungs-Auditinformationen. |
| `10_Allocation_Engine` | Führt die gestufte Beschaffungssequenz aus, berechnet Teillieferungs-Allokationen und Restbedarf und leitet die Gesamtallokationsmenge sowie geschätzte Ankunftsinformationen ab. |

</details>

<details>
<summary>Entscheidungsausgaben und Kontrollen</summary>

| Arbeitsblatt | Zweck |
|---|---|
| `11_WhatIf_Fulfillment` | Entscheidungsansicht auf Auftragsebene mit allokierter Menge, unerfüllter Menge, Abwicklungsstatus, primärer Versorgungsquelle, Teilauftragsstatus, geschätztem Lieferdatum, Verzögerungstagen und empfohlener Maßnahme. |
| `12_Procurement_Summary` | Konsolidiert Netto-Fehlmengen je SKU und Zielort, Lieferanteninformationen, empfohlene Bestellmengen, vorgeschlagene Beschaffungstermine, erwartete Ankunftsdaten und Terminmachbarkeit. |
| `13_Audit_Validation` | Konsolidiert Datenqualitäts- und Kontrollausnahmen zur Prüfung, bevor operationale Entscheidungen finalisiert werden. |

</details>

## Zentrale Geschäftslogik

### Bestandsverfügbarkeit

Die Arbeitsmappe berechnet den transferierbaren Bestand aus der physisch vorhandenen Menge, nachdem zugesagte Mengen und der konfigurierte Bestandsschutz berücksichtigt wurden.

Konzeptionell:

\[
\text{Net Transferable Qty}
=
\max(0,\ \text{Physical QOH}
-\text{Committed Qty}
-\text{Protected Qty})
\]

Die Schutzberechnung wird durch zentralisierte Parameter gesteuert. Sie soll verhindern, dass die Allokations-Engine jede physische Einheit als frei verfügbar behandelt.

Das Ergebnis ist eine modellierte Allokationsmenge, kein Ersatz für das Live-Bestandsjournal eines Lagerhauses.

### Abgleich von Bestellungen und Ware unterwegs

Jede Bestellposition hat einen eindeutigen Schlüssel, der sich aus der Bestellnummer und der Positions-ID ableitet. Datensätze unterwegs referenzieren diesen Schlüssel, sodass die Arbeitsmappe die Sendungsmenge identifizieren kann, die bereits durch eine offene PO-Position abgedeckt ist.

Konzeptionell:

\[
\text{Net Pending PO Qty}
=
\max(0,\ \text{PO Open Qty}
-\text{Matched OTW Qty})
\]

Die resultierende Nettomenge repräsentiert die verbleibende modellierte Beschaffungspipeline nach Abzug der zugeordneten Mengen unterwegs.

Datensätze ohne gültige PO-Referenz sollten über den Validierungsablauf untersucht werden. Der Abgleich hängt von präzisen und konsistenten Quell-Identifikatoren ab.

### Gestufte Allokation und Restbedarf

Die Allokations-Engine überträgt die unerfüllte Menge von einer Beschaffungsstufe zur nächsten.

Für jede Stufe:

\[
\text{Remaining Qty}_{n}
=
\max(0,\ \text{Remaining Qty}_{n-1}
-\text{Allocated Qty}_{n})
\]

Diese kaskadierende Berechnung soll verhindern, dass dieselbe Bedarfsmenge über die Stufen hinweg mehrfach allokiert wird.

Das tatsächliche Ergebnis hängt von den Versorgungsdatensätzen, den Eignungsregeln, der konfigurierten Prioritätssequenz und den in die Arbeitsmappe geladenen Daten ab.

### Abwicklungsstatus auf Auftragsebene

Die Abwicklungsansicht kombiniert Mengen-Ausreichendheit mit dem Liefertermin. Die vorgesehenen Statuskategorien umfassen:

- **Vollständig und pünktlich erfüllt** — die modellierte Allokation deckt die angeforderte Menge innerhalb des gewünschten Lieferdatums ab.
- **Verspätet erfüllt** — die modellierte Menge ist abgedeckt, aber das erwartete Lieferdatum liegt nach dem gewünschten.
- **Teilweise erfüllt** — nur ein Teil der angeforderten Menge wird durch die modellierte Allokation abgedeckt.
- **Nicht lieferbar / unerfüllter Bedarf** — der modellierte Versorgungspool kann die angeforderte Menge nicht abdecken.
- **Angebot ausstehend** — Angebotsbedarf wird von der harten Allokation zurückgehalten, wenn die konfigurierte Angebotsreservierungsrichtlinie keinen Versorgungsverbrauch erlaubt.

Das exakte Ergebnis ist nur so zuverlässig wie die zugrunde liegenden Bedarfs-, Bestands-, Sendungs-, Vorlaufzeit- und Reservierungsdaten. Ein Arbeitsmappenstatus sollte nicht als bestätigte Spediteurbuchung, Lieferantenzusage oder Lagerausführungsbestätigung interpretiert werden.

### Beschaffungsmenge und -termin

Die Beschaffungszusammenfassung startet vom verbleibenden modellierten Defizit und wendet den konfigurierten MOQ-Multiplikator sowie die Gebindegrößenrichtlinie an.

Ist die Gebinderundung aktiviert, wird die Empfehlung auf ein gültiges Gebinde-Vielfaches aufgerundet. Das vorgeschlagene Beschaffungsdatum wird aus dem relevanten Auftragstermin und der modellierten Wiederbeschaffungs-Vorlaufzeit—einschließlich der konfigurierten Puffer—abgeleitet.

Dies hilft, zwei getrennte Fragen zu beantworten:

1. **Wie viel zusätzliche Versorgung könnte benötigt werden?**
2. **Bis wann müsste bestellt werden, um das Ziellieferdatum zu unterstützen?**

Lieferantenkapazitäten, Produktionsfenster-Verfügbarkeit, Transportstörungen und andere externe Einschränkungen müssen separat verifiziert werden, sofern sie nicht explizit in den Eingabedaten abgebildet sind.

## Betriebsannahmen und Grenzen

OFIA ist als wiederholbare analytische Arbeitsmappe für exportierte Geschäftsdaten konzipiert. Seine Ergebnisse hängen von der Genauigkeit und Vollständigkeit der bereitgestellten Datensätze ab.

Bevor Sie die Ergebnisse für eine wesentliche Kundenzusage oder eine Kaufentscheidung verwenden, bestätigen Sie Folgendes:

- SKU-, Standort-, Lieferanten-, PO- und PO-Positions-Identifikatoren sind über alle Eingabeblätter hinweg konsistent.
- Verfügbare und zugesagte Mengen spiegeln den beabsichtigten Bestandsschnappschuss wider.
- Mengen unterwegs sind mit den korrekten Bestellpositionen verknüpft.
- Gewünschte Lieferdaten, Versanddaten und Vorlaufzeiten verwenden gültige Excel-Daten.
- Aktive Reservierungen repräsentieren echte Zusagen und werden bei Statusänderungen überprüft.
- Die konfigurierten Transfer- und Wiederbeschaffungspuffer spiegeln die modellierte Betriebsrichtlinie wider.
- Relevante Ausnahmen in `13_Audit_Validation` wurden geprüft.

Die Arbeitsmappe unterstützt die Entscheidungsvorbereitung; sie führt keine Transfers automatisch aus, erstellt keine Bestellungen, reserviert keinen Bestand in einem ERP und benachrichtigt keine Kunden.

## Technische Details

Das folgende technische Referenzmaterial ist in einem aufklappbaren Abschnitt gruppiert, damit das Haupt-README auf die geschäftliche Nutzung fokussiert bleibt und die Implementierungsdetails für die Betreuer der Arbeitsmappe erhalten bleiben.

<details>
<summary>Formelreferenz und Validierungsregeln</summary>

### Formelreferenz

Die Arbeitsmappe nutzt moderne dynamische Excel-Array-Formeln, um Berechnungsergebnisse aus den Quelldaten zu erzeugen. Die folgenden Referenzen fassen die wichtigsten Formelmuster und ihre geschäftliche Rolle zusammen.

#### 1. Verwendete Funktionen

| Funktion | Rolle in OFIA |
|---|---|
| `FILTER` | Wählt aktiven Bedarf, geeignete Versorgungsdatensätze und Validierungsausnahmen aus. |
| `UNIQUE` | Identifiziert eindeutige SKU-Standort-Kombinationen und andere eindeutige Geschäftsschlüssel. |
| `SORT` | Ordnet Kandidatendatensätze an, wenn eine definierte Sortierung erforderlich ist. |
| `XLOOKUP` | Ruft Artikel-, Lieferanten-, Standort-, PO- und Versorgungsattribute aus Referenztabellen ab. |
| `SUMIFS` | Aggregiert Mengen nach PO-Positionsschlüssel, Versorgungs-UID, SKU, Standort oder Reservierungsstatus. |
| `MAP` | Wendet Geschäftslogik auf Zeilenebene über dynamische Arrays an, ohne Formeln manuell nach unten zu kopieren. |
| `BYROW` | Wendet Berechnungen über Zeilen an, wenn eine zeilenweise Auswertung passend ist. |
| `LET` | Benennt Zwischenberechnungen innerhalb einer Formel, um komplexe Logik besser zu strukturieren. |
| `HSTACK` | Kombiniert verwandte Felder zu einem einzelnen berechneten Array. |
| `VSTACK` | Kombiniert Bestand, Ware unterwegs und Bestellungen zu einem einheitlichen Journal. |
| `EXPAND` | Erweitert einen Wert oder ein Array auf die erforderlichen Dimensionen beim Aufbau eines kombinierten Arrays. |
| `SEQUENCE` | Erzeugt sequenzielle numerische Arrays für formelgesteuerte Berechnungen. |
| `TODAY` | Berechnet das altersbezogene Reservierungsalter und Versorgungsbereitschaftsdaten auf Basis des aktuellen Datums. |
| `MAX` | Verhindert, dass berechnete verfügbare Mengen und Restbedarf negativ werden. |

Verfügbarkeit und Verhalten der einzelnen Funktionen hängen von der installierten Excel-Version ab. Die Arbeitsmappe erfordert eine Version, die die in ihren Formeln verwendeten dynamischen Array-Funktionen unterstützt.

#### 2. Bestandsverfügbarkeit

Die konzeptionelle Formel für den netto transferierbaren Bestand lautet:

```excel
=MAX(0, Physical_QOH - Committed_Qty - Protected_Qty)
```

In der Arbeitsmappe wird die geschützte Menge aus den relevanten Bestandsschutzeingaben und den zentralisierten Konfigurationsparametern berechnet. Die tatsächliche Blattformel verwendet Zell- und Bereichsreferenzen statt der oben gezeigten konzeptionellen Feldnamen.

Das Ergebnis stellt modellierten transferierbaren Bestand dar, keine Live-Bestätigung der Lagerhausverfügbarkeit.

#### 3. Abgleich von Bestellungen

Bestellpositionen verwenden einen zusammengesetzten Schlüssel aus PO-Nummer und Positions-ID.

```excel
=PO_Number & "|" & PO_Line_ID
```

Das Journal für Ware unterwegs verwendet den entsprechenden Referenzschlüssel, um die zugeordneten Sendungsmengen zu aggregieren:

```excel
=SUMIFS(
    '07_In_Transit_OTW'!E:E,
    '07_In_Transit_OTW'!D:D,
    PO_Unique_Key
)
```

Die verbleibende modellierte Beschaffungspipeline wird wie folgt berechnet:

```excel
=MAX(0, PO_Open_Qty - OTW_Matched_Qty)
```

Diese Beispiele veranschaulichen die Logik. Verwenden Sie beim Implementieren oder Anpassen von Formeln die exakten Spaltenzuordnungen und Formelstrukturen der Arbeitsmappe.

#### 4. Reservierungen und Nettoversorgung

Aktive Reservierungen werden gegen ihre zugewiesene Versorgungs-UID aggregiert. Konzeptionell:

```excel
=SUMIFS(
    '09_Reservations_Ledger'!H:H,
    '09_Reservations_Ledger'!F:F,
    Supply_UID,
    '09_Reservations_Ledger'!I:I,
    "Active"
)
```

Die netto allokierbare Menge wird anschließend wie folgt berechnet:

```excel
=MAX(0, Gross_Available_Qty - Active_Reserved_Qty)
```

Die Audit-Logik muss zudem Fälle identifizieren, in denen aktive Reservierungen die brutto verfügbare Versorgung überschreiten. Eine alleinige nicht negative Nettoverfügbarkeitsberechnung reicht nicht aus, um Überreservierungen zu erkennen.

#### 5. Allokationskaskade

Für jede Beschaffungsstufe wird der Restbedarf um die auf dieser Stufe allokiierte Menge reduziert:

\[
\text{Remaining}_{n}
=
\max(0,\text{Remaining}_{n-1}-\text{Allocated}_{n})
\]

Die Gesamtallokation ist die Summe der über die Beschaffungsstufen zugewiesenen Mengen:

\[
\text{Allocated Total}
=
\sum_{n=1}^{5}\text{Allocated}_{n}
\]

Die unerfüllte Menge ist:

\[
\text{Unmet Qty}
=
\max(0,\text{Requested Qty}-\text{Allocated Total})
\]

Die Implementierung muss die Stufensequenz bewahren und die Restmenge jeder Stufe an die nächste weitergeben. Unabhängige Berechnungen, die nicht den aktualisierten Restwert teilen, können denselben Bedarf über-allokieren.

#### 6. Lieferterminierung

Das geschätzte Lieferdatum eines Auftrags wird aus den modellierten Ankunftsdaten seiner zugeordneten Versorgungsquellen abgeleitet. Nutzt ein Auftrag mehrere Quellen, ist das späteste Ankunftsdatum der zugeordneten Quellen das begrenzende Datum für den vollständigen Auftrag.

Die Lieferverspätung wird konzeptionell wie folgt berechnet:

\[
\text{Delay Days}
=
\max(0,\text{Estimated Delivery Date}-\text{Requested Delivery Date})
\]

Ein geschätztes Datum ist ein Planungsergebnis auf Basis von Quelldaten und konfigurierter Vorlaufzeitannahmen. Es ist keine bestätigte logistische Zusage.

#### 7. Beschaffungsmenge

Die Beschaffungsempfehlung startet vom verbleibenden Nettodefizit. Sie wendet dann den konfigurierten MOQ-Multiplikator an und rundet—bei Aktivierung—das Ergebnis auf das anwendbare Standardgebinde-Vielfache auf.

Die exakte Implementierung sollte den Parameterreferenzen der Arbeitsmappe in `00_Config_Params` folgen, insbesondere:

- `B11` — Schalter für die Gebinderundung.
- `B12` — MOQ-Multiplikator.

Ersetzen Sie diese Parameterreferenzen nicht durch fest kodierte Werte in Berechnungsformeln.

### Validierungsregeln

`13_Audit_Validation` ist das zentrale Ausnahmenüberwachungsblatt. Prüfen Sie es nach jeder Aktualisierung der Quelldaten und bevor Sie sich auf die Abwicklungs- oder Beschaffungsergebnisse verlassen.

| Validierungsbereich | Was zu prüfen ist | Warum es wichtig ist |
|---|---|---|
| Artikelstamm | SKU-Datensätze existieren, Schlüssel sind eindeutig und Standardgebindequantitäten sind gültig. | Ungültige Artikelreferenzen können Allokations- und Beschaffungsberechnungen untergraben. |
| Standortreferenzen | Bedarfs- und Bestands-Standortcodes existieren in den relevanten Referenzdaten. | Fehlende oder inkonsistente Standorte können die korrekte Quelleneignung und Transferzeitberechnung verhindern. |
| Bedarfsintegrität | Auftragsidentifikatoren, Positionsidentifikatoren, SKU-Referenzen, angeforderte Mengen und Lieferdaten sind gültig. | Ungültige Bedarfsdaten können irreführende Abwicklungsstatus und fehlerhafte Berechnungen unerfüllter Mengen erzeugen. |
| Bestellintegrität | PO-Nummern, Positions-IDs, offene Mengen und PO-Positionsschlüssel sind konsistent. | Inkonsistente Schlüssel können den Sendungsabgleich brechen. |
| Integrität Ware unterwegs | Sendungsdatensätze sind mit gültigen PO-Positionen verknüpft und enthalten gültige Mengen- und Terminfelder. | Verwaiste Sendungen können falsch gezählt oder aus der vorgesehenen Versorgungspipeline ausgeschlossen werden. |
| Versorgungsverfügbarkeit | Bruttoversorgung, aktive Reservierungen und Nettoverfügbarkeit stimmen überein. | Reservierungen, die die verfügbare Versorgung überschreiten, deuten auf einen potenziellen Zusagekonflikt hin. |
| Reservierungskonformität | Reservierungsstatus, zugewiesene Versorgungs-UID, Erstellungsdatum und Gültigkeitszeitraum sind konsistent. | Ungültige, abgelaufene oder gebrochene Reservierungen können nachfolgende Allokationen verzerren. |
| Allokationsintegrität | Allokiierte Mengen übersteigen nicht die geeignete Versorgung, und jede Stufe nutzt den Restbedarf der vorherigen Stufe. | Verhindert die doppelte Nutzung von Bestand und die Überallokation von Bedarf. |
| Liefermachbarkeit | Geschätzte Ankunftsdaten und gewünschte Lieferdaten sind gültig und vergleichbar. | Ungültige Daten oder Vorlaufzeiteingaben können pünktliche und verspätete Abwicklung falsch klassifizieren. |
| Beschaffungslogik | Nettodefizite, Lieferantenzuordnungen, Gebindegrößen und Vorlaufzeitannahmen sind konsistent. | Hilft, ungeeignete oder falsch dimensionierte Wiederbeschaffungsempfehlungen zu vermeiden. |

#### Schweregrad und Nachverfolgung

Der Quellentwurf unterscheidet blockierende kritische Ausnahmen von Warnungen. Die angemessene Reaktion hängt vom betroffenen Datensatz und der konfigurierten Validierungsregel ab.

- **Kritische Ausnahme:** Untersuchen und korrigieren Sie den zugrunde liegenden Daten- oder Allokationskonflikt, bevor Sie sich auf die betroffene Entscheidung verlassen.
- **Warnung:** Prüfen Sie den Datensatz und bestimmen Sie, ob das Problem die vorgeschlagene Abwicklungs- oder Beschaffungsmaßnahme beeinträchtigt.
- **Global gesundes Ergebnis:** Zeigt an, dass die konfigurierten Audit-Prüfungen keine Ausnahme identifiziert haben. Es beweist nicht, dass externe Quelldaten vollständig, aktuell oder operationell bestätigt sind.

Interpretieren Sie ein sauberes Audit-Ergebnis nicht als Garantie für die reale Lieferperformance. Die Validierungsschicht prüft die Regeln und Datensätze, die in der Arbeitsmappe abgebildet sind.

</details>

## Täglicher Betriebsablauf

Verwenden Sie den folgenden Zyklus, sobald sich Bedarf, Bestand, Bestellungen, Sendungsdatensätze oder Betriebsparameter ändern.

1. **Aktualisieren Sie die Quelldaten.** Aktualisieren Sie die festgelegten Eingabebereiche in `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline` und `07_In_Transit_OTW` sowie alle geänderten Stammdaten.
2. **Berechnen Sie die Arbeitsmappe neu.** Verwenden Sie in Excel `Ctrl + Alt + F9`, um bei Bedarf eine vollständige Neuberechnung zu erzwingen.
3. **Prüfen Sie das Audit-Blatt.** Kontrollieren Sie `13_Audit_Validation` und untersuchen Sie kritische Ausnahmen, bevor Sie die Ergebnisse verwenden.
4. **Aktualisieren Sie dauerhafte Reservierungen.** Erfassen Sie echte Zusagen in `09_Reservations_Ledger`, verknüpfen Sie sie mit der passenden Versorgungs-UID und setzen Sie den korrekten Status.
5. **Prüfen Sie die Abwicklungsentscheidungen.** Nutzen Sie `11_WhatIf_Fulfillment`, um verspäteten, teilweise erfüllten oder ungedeckten Bedarf zu identifizieren.
6. **Prüfen Sie die Beschaffungsempfehlungen.** Nutzen Sie `12_Procurement_Summary`, um den verbleibenden Netto-Fehlbestand, die empfohlene Menge, den Lieferanten und die Terminierung zu bewerten.
7. **Bestätigen Sie die externe Ausführung.** Validieren Sie vorgeschlagene Transfers, Lieferantenkapazitäten, Bestellungen, Versandpläne und Kundenzusagen mit den zuständigen Operationsteams.

### Fehlerbehebung

<details>
<summary>Die dynamische Array-Formel zeigt #SPILL! an</summary>

**Wahrscheinliche Ursache:** Zellen im vorgesehenen Überlaufbereich sind nicht leer, sodass Excel das vollständige Array-Ergebnis nicht anzeigen kann.

**Vorgehen:**

1. Wählen Sie die Zelle mit der Formel aus.
2. Prüfen Sie den von Excel angezeigten Überlaufbereich.
3. Entfernen Sie unbeabsichtigte Werte oder Leerzeichen, die die Ausgabe blockieren.
4. Bestätigen Sie, dass der Ausgabebereich der Formel nicht durch manuell eingegebene Daten belegt ist.

Löschen Sie beim Bereinigen der blockierenden Zellen nicht die Formel selbst.

</details>

<details>
<summary>Neue Eingabedaten ändern die Ergebnisse nicht</summary>

**Wahrscheinliche Ursache:** Excel steht möglicherweise auf manuelle Berechnung, oder die Quelldaten wurden außerhalb des erwarteten Eingabebereichs eingefügt.

**Vorgehen:**

1. Öffnen Sie das Menü **Formeln → Berechnungsoptionen** in Excel.
2. Wählen Sie ggf. die Berechnung **Automatisch**.
3. Stellen Sie sicher, dass die Daten in die richtigen Eingabespalten und innerhalb der unterstützten Bereiche der Arbeitsmappe eingegeben wurden.
4. Führen Sie mit `Ctrl + Alt + F9` eine vollständige Neuberechnung durch.

</details>

<details>
<summary>Das Ändern eines Parameters aktualisiert die Arbeitsmappe nicht</summary>

**Wahrscheinliche Ursache:** Der Parameter wurde in die falsche Zelle eingegeben, eine Formelreferenz wurde geändert oder die Berechnung wurde nicht aktualisiert.

**Vorgehen:**

1. Bestätigen Sie die erwartete Position des Parameters in `00_Config_Params`.
2. Vermeiden Sie das Einfügen oder Verschieben von Parameterzellen, die von Formeln verwendet werden.
3. Prüfen Sie `13_Audit_Validation` auf verwandte Ausnahmen.
4. Erzwingen Sie eine vollständige Neuberechnung.

</details>

<details>
<summary>Daten erscheinen als serielle Nummern</summary>

**Wahrscheinliche Ursache:** Die Zelle ist als Standard oder Zahl statt als Datum formatiert.

**Vorgehen:**

1. Wählen Sie die betroffenen Datumszellen aus.
2. Öffnen Sie Zellen formatieren (`Ctrl + 1` unter Windows oder `Cmd + 1` auf dem Mac).
3. Wenden Sie ein Datumsformat wie `YYYY-MM-DD` an.

Ein numerischer Wert wie `45628` kann eine Excel-Datumsseriennummer sein; prüfen Sie den zugrunde liegenden Wert, bevor Sie das Datum ändern.

</details>

## Kompatibilität und Leistung

### Unterstützte Excel-Versionen

Die Quellarchitektur ist für **Microsoft 365 oder Excel 2021 und höher** konzipiert, einschließlich kompatibler Desktop- und Webversionen, die die für die Arbeitsmappe erforderlichen Funktionen unterstützen.

Excel 2016 und Excel 2019 werden von der Quellimplementierung nicht unterstützt. Andere Tabellenkalkulationsanwendungen implementieren die erforderlichen dynamischen Array-Funktionen möglicherweise nicht auf dieselbe Weise.

### Empfohlenes Datenvolumen

Die Quellimplementierung empfiehlt:

- Bis zu **50.000 Zeilen pro Detail-Arbeitsblatt**.
- Etwa **150.000 Zeilen in der gesamten Arbeitsmappe** als vorgeschlagene Obergrenze.

Die tatsächliche Neuberechnungsgeschwindigkeit hängt vom Computer, der Excel-Version, der Formelkomplexität und der Anzahl der erfassten Datensätze ab. Behandeln Sie diese Zahlen als Planungsrichtwerte, nicht als Leistungsgarantie. Archivieren Sie bei größeren Datensätzen abgeschlossene historische Aufträge und testen Sie die Neuberechnungsleistung, bevor Sie die Arbeitsmappe erweitern.

### Integrität von Formeln und Eingaben

- Überschreiben Sie keine formelerzeugten Spalten.
- Ändern Sie keine Blattnamen oder Quellspaltenüberschriften, auf die sich Formeln beziehen.
- Halten Sie zusammengesetzte Schlüssel über verknüpfte Datensätze hinweg konsistent.
- Pflegen Sie gültige Excel-Daten und numerische Mengenfelder.
- Ändern Sie geschäftliche Schwellenwerte in `00_Config_Params`, statt einzelne Berechnungsformeln zu bearbeiten.
- Prüfen Sie Validierungsausnahmen nach jeder wesentlichen Datenaktualisierung.

## Einschränkungen

OFIA ist eine analytische Arbeitsmappe zur Entscheidungsunterstützung. Sie ersetzt für sich genommen nicht:

- Kein ERP, WMS, TMS, keine Beschaffungsplattform und kein Auftragsmanagementsystem.
- Führt keine Bestandstransfers automatisch aus und erstellt keine Lieferantenbestellungen.
- Bestätigt keine Lieferanten-Produktionskapazitäten, Spediteurbuchungen oder Zollabfertigungen.
- Garantiert nicht, dass Bestands- und Sendungsexporte aktuell oder vollständig sind.
- Berücksichtigt keine operativen Beschränkungen, die in den Quelldaten fehlen.
- Garantiert keine Lieferdaten und beseitigt nicht alle Allokationskonflikte.

Ihr Nutzen hängt von konsistenten Identifikatoren, aktuellen operativen Eingaben, einer sinnvollen Konfiguration und der menschlichen Prüfung wesentlicher Ausnahmen ab.

## Weitere Tools dieser Reihe

Entdecken Sie weitere leichte Tools zur geschäftlichen Entscheidungsunterstützung von Theseus Workshop im Projektrepository und den zugehörigen Produktlisten.

## Lizenz

Dieses Projekt wird unter der Apache-Lizenz 2.0 vertrieben, wie das Lizenz-Abzeichen anzeigt. Die vollständigen Lizenzbedingungen finden Sie in der Datei `LICENSE` des Repositorys.

## Über Theseus Workshop

Theseus Workshop entwickelt praktische, wiederverwendbare Tools, die wiederkehrende Geschäftsfragen in strukturierte Abläufe überführen. Der Fokus liegt darauf, Teams mit vertrauten Tools und vorhandenen Geschäftsdaten zu klareren Entscheidungen zu verhelfen—ohne die Komplexität einer vollständigen Enterprise-Plattform.

OFIA wendet diesen Ansatz auf Auftragsabwicklung, Bestandsallokation, Versorgungsabgleich und Beschaffungsplanung an.

---

**Vor der Veröffentlichung:** Ersetzen Sie die Platzhalter für die Browser-Demo- und den Excel-Kauf-URLs im einleitenden Abschnitt durch die tatsächlichen Produktlinks. Bestätigen Sie, dass das Repository die zutreffende `LICENSE`-Datei enthält und dass die veröffentlichten Browser- und Excel-Versionen den hier beschriebenen Funktionen entsprechen.
