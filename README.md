# Multi-Location Inventory Allocation & Order Fulfillment Excel Template (ATP & Procurement Calculator)
<img width="1920" height="833" alt="image" src="https://github.com/user-attachments/assets/1379f571-ef41-486b-9c87-e6dc5cb96b2e" />

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-217346.svg)
![Category](https://img.shields.io/badge/Tool-Supply%20Chain%20%26%20ATP%20Planning-2251FF.svg)

**A multi-location inventory allocation, Available-to-Promise (ATP) calculator, and order fulfillment planning Excel template. Built for supply chain planners, inventory analysts, and multi-warehouse distributors to reconcile physical stock, active order reservations, in-transit containers, and open purchase orders (POs)—determining exact OTIF delivery feasibility and net procurement requirements across browser and Microsoft Excel formats.**

No signup. No software installation. Instant access via the free web-based fulfillment simulator, paired with a downloadable Microsoft Excel workbook for offline ERP data reconciliation, repeatable S&OP operations, and permanent audit records.

> **Access the Inventory Allocation & Fulfillment Planning Tools**
>
> - 🌐 **[Launch the Free Web-Based Inventory Allocation & ATP Simulator](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** — Test multi-warehouse order sourcing hierarchies, simulate split-shipment rules, and check delivery feasibility online without installing software or configuring spreadsheets.
> - 📥 **[Download the Multi-Location Order Fulfillment Excel Workbook (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** — Get the full 13-sheet operational workbook for recurring ERP data imports, offline reservation ledger tracking, and automated net replenishment calculations. *Includes a 30-day, no-questions-asked money-back guarantee.*
>

---

## Core Supply Chain Metrics & Order Fulfillment Challenges Solved

Instead of manually cross-referencing static ERP exports, this parametric allocation engine structures multi-echelon supply and demand into a single auditable ledger. Here is how the workbook maps **multi-location distribution pain points** to automated **ATP and procurement metrics**:

| Supply Chain & Fulfillment Pain Point | Automated Reconciliation & Allocation Mechanism | Key Inventory & OTIF Metrics Tracked |
| :--- | :--- | :--- |
| **Unclear Order Fulfillment Feasibility (OTIF Risk)** | Evaluates customer requested delivery dates against multi-tier warehouse stock, transfer lead times, and customs buffers. | On-Time In-Full (OTIF) feasibility flag, partial fill rate, estimated delivery date (EDD), unmet line quantity |
| **Fragmented Multi-Warehouse Sourcing** | Allocates demand across a 5-tier sourcing hierarchy: Local Stock $\rightarrow$ Nearby Stores $\rightarrow$ Central DC $\rightarrow$ In-Transit $\rightarrow$ Open POs. | Assigned supply source ID, split-shipment allocation, inter-branch transfer radius eligibility |
| **Overpromising Physical On-Hand Stock** | Deducts existing customer commitments, active ledger reservations, safety stock buffers, and forecast protection from gross stock. | Net Available-to-Promise (ATP), physical on-hand vs. allocatable stock, protected safety stock floor |
| **Double-Counting In-Transit & Open PO Supply** | Links inbound shipping container records directly to originating purchase-order lines to eliminate phantom pipeline inflation. | Net open PO pipeline quantity, matched in-transit container volume, unified supply ledger ID |
| **Panic Buying & Gross-Demand Over-Purchasing** | Calculates true net inventory deficits only after exhausting all allocatable network stock and inbound replenishment pipelines. | Net deficit quantity, MOQ & standard pack-size adjusted order quantity, latest PO release start date |
| **Hidden Master Data & ERP Export Errors** | Runs pre-allocation diagnostic checks across imported sales orders, SKU master tables, and reservation records. | Orphaned shipment alerts, missing SKU/location code flags, expired quote reservations, over-allocation conflicts |

---

## Step-by-Step Tutorial: How to Run Multi-Warehouse Inventory Allocation & Net Replenishment

The workbook operates as a repeatable **Distributed Order Management (DOM) and DRP cycle**: configure your distribution network rules once, paste raw exports from your ERP/WMS, audit exceptions, and lock in fulfillment commitments.

### Step 1: Configure Distribution Network Rules & ATP Parameters
Open the `00_Config_Params` tab to establish your supply chain governance rules without touching downstream cell formulas:

- **Network Topology:** Designate the Central Distribution Center (DC) code and maximum nearby-location inter-branch transfer radius.
- **Inventory Protection:** Set safety-stock protection policies, forecast demand protection thresholds, and quote reservation validity periods (expiration days).
- **Lead-Time & Packaging Buffers:** Define inter-warehouse transfer buffers, customs clearance delays, and standard packaging / rounding rules.

### Step 2: Import ERP Sales Orders, On-Hand Stock & Inbound Pipeline Data
Export raw CSV/XLSX tables from your ERP, accounting, or WMS platform (e.g., NetSuite, SAP Business One, Dynamics 365, Fishbowl, Cin7) and paste them into the standardized input sheets:

- **Customer Demand:** Open sales order lines, destination locations, and customer requested delivery dates.
- **Warehouse Inventory:** Physical on-hand stock snapshots by SKU and warehouse location code.
- **Inbound Supply Pipeline:** Open purchase-order (PO) lines with promised vendor arrival dates, plus live in-transit shipment/container manifests.
- **Supply Chain Master Data:** Item master (MOQ, pack size), location master, inter-site distance matrix, and supplier lead times.

*(Preserve predefined column headers and avoid overwriting calculated formula columns.)*

### Step 3: Audit Data Exceptions & Review What-If Order Fulfillment
Trigger workbook recalculation and follow the three-stage decision review:

1. **Data Hygiene Audit (`13_Audit_Validation`):** Resolve missing SKU master matches, invalid warehouse codes, orphaned in-transit containers, or expired reservations before trusting downstream outputs.
2. **Line-Level ATP & Sourcing (`11_WhatIf_Fulfillment`):** Inspect exact fulfillment statuses (`Full & On-Time`, `Late`, `Partial`, `Shortage`), assigned sourcing warehouses, and estimated arrival dates per sales order line.
3. **Net MRP / DRP Purchasing (`12_Procurement_Summary`):** Review net uncovered shortages, recommended supplier allocations, MOQ/pack-adjusted order quantities, and latest purchase order release dates.

### Step 4: Lock Supply Reservations & Operationalize in the Excel Workbook
When high-priority sales orders require guaranteed stock protection, log the allocated supply IDs into `09_Reservations_Ledger` and toggle the status to `Active` to shield that inventory from subsequent runs.

> 📦 **Ready to eliminate manual inventory reconciliation across your warehouse network?** 
> After testing the sourcing hierarchy in the **[Free Browser-Based Inventory Allocation Simulator](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)**, download the **[Full Multi-Location Order Fulfillment Excel Workbook (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** to connect your live ERP exports, maintain a persistent reservation ledger, and run weekly S&OP replenishment cycles offline.

---

## Why I Built This Multi-Echelon Inventory & ATP Decision Engine

In a multi-location distribution network, knowing *how much physical inventory sits in your warehouses* is completely different from knowing *whether a customer order can actually be delivered on time*.

Consider a wholesale distributor or retail chain operating **28 distribution nodes**—combining a Central Distribution Center (DC) with regional forward stores. Operational data is typically fragmented across ERP sales order exports, WMS on-hand snapshots, open purchasing reports, freight forwarder container trackers, and regional transit matrices.

When order management teams reconcile these tables manually in ad-hoc spreadsheets, two systemic failures occur:

### 1. The "100 Units On-Hand" Available-to-Promise (ATP) Illusion
A warehouse WMS snapshot might display **100 units physically on hand**. However, 30 units are already committed to open pick tickets, 20 units are locked as protected safety stock, and 10 units are held under an active sales quote reservation. Treating the 100-unit headline balance as freely allocatable stock guarantees double-booking, warehouse short-picks, and missed OTIF commitments.

### 2. The "160 Units Inbound" PO vs. In-Transit Double-Counting Trap
Upstream supply pipelines suffer from an identical visibility flaw. An open purchase order report shows **100 units on order** with a factory, while the logistics team's container manifest shows **60 of those exact units already loaded on the water**. If an inventory planner sums open POs and in-transit spreadsheets independently, the network appears to have **160 units of future supply** when only **100 net units** exist.

I built this toolkit as **productized supply chain decision reasoning**—bridging the gap between basic spreadsheets and six-figure enterprise APS/DOM software. It unifies net ATP calculation, PO-to-shipment reconciliation, multi-tier sourcing rules, and MOQ-aware procurement planning into one transparent, auditable workflow: **what can be promised, which node should ship it, what remains uncovered, and what genuinely needs to be bought.**

---

## Disconnected ERP Spreadsheets vs. Structured ATP & Allocation Workbook

| Supply Chain Planning Dimension | Manual ERP Exports & Ad-Hoc VLOOKUP Spreadsheets | Multi-Location Inventory Allocation Engine (This Tool) |
| :--- | :--- | :--- |
| **Available-to-Promise (ATP) Calculation** | Physical on-hand balances are mistaken for free stock, causing double-allocation across sales reps and channels. | Automatically deducts existing commitments, active ledger reservations, safety stock, and forecast buffers prior to allocation. |
| **In-Transit vs. Open PO Reconciliation** | Open purchase orders and inbound freight containers are summed separately, inflating projected inventory positions. | Reconciles shipment lines against originating PO numbers to calculate true remaining factory pipeline quantities. |
| **Order Delivery Feasibility (OTIF & Lead Time)** | Planners check if stock exists anywhere in the network but ignore inter-warehouse transfer transit times and customs buffers. | Evaluates stock readiness dates, inter-site transfer lead times, and customs delays directly against customer requested delivery dates. |
| **Multi-Warehouse Sourcing & Split Shipments** | One branch triggers an emergency purchase order while a nearby store within transfer radius holds excess slow-moving stock. | Enforces a 5-tier sourcing hierarchy (`Local` $\rightarrow$ `Nearby` $\rightarrow$ `Central DC` $\rightarrow$ `In-Transit` $\rightarrow$ `Open PO`) with split-shipment support. |
| **Net Replenishment & MOQ Procurement** | Buyers raise purchase orders based on gross sales demand, ignoring stock already in transit or sitting in regional hubs. | Generates net deficit purchasing recommendations adjusted for supplier lead times, minimum order quantities (MOQ), and pack sizes. |
| **Master Data Hygiene & Exception Auditing** | Broken SKU mappings, orphaned container records, and expired stock holds remain hidden until warehouse picking fails. | Dedicated `13_Audit_Validation` sheet flags data integrity errors, over-reservations, and allocation conflicts before execution. |

---

## Who This Supply Chain Workbook Is Built For: Roles & Workflows

This dual-format (Browser + Excel) inventory allocation and fulfillment toolkit is engineered for operational teams managing multi-node inventory without enterprise APS/DOM automation:

- **Inventory Planners & Demand/Supply Planning Analysts:** Replace fragile multi-file VLOOKUP chains with a structured **Available-to-Promise (ATP) and DRP Excel template**. Reconcile on-hand stock, safety stock floors, and inbound containers in minutes before weekly S&OP meetings.
- **Order Management (OM) & Customer Fulfillment Coordinators:** Use the **order fulfillment feasibility calculator** to give B2B customers accurate delivery dates, evaluate split-shipment options across regional stores, and lock in hard stock reservations (`09_Reservations_Ledger`) for VIP accounts.
- **Procurement Specialists & Purchasing Managers:** Eliminate phantom pipeline inflation and over-buying. Use the **PO-to-shipment reconciliation engine** and `12_Procurement_Summary` tab to calculate exact net purchase deficits, rounded to supplier MOQs and standard pack quantities.
- **Multi-Location Operations & Distribution Center Managers:** Optimize inventory rebalancing across 5 to 30+ warehouse nodes. Configure inter-store transfer radius rules so excess regional stock fulfills nearby demand before depleting the Central DC or triggering external vendor POs.
- **ERP Implementation Consultants & Supply Chain Engineers:** Use the workbook's transparent 13-sheet architecture as an inspectable **Distributed Order Management (DOM) specification**—ideal for prototyping allocation logic prior to hardcoding custom rules into NetSuite, SAP, or Microsoft Dynamics.

---

## Industry Use Cases & Long-Tail Supply Chain Scenarios

Whether you manage regional building materials yards, wholesale industrial parts, or omnichannel retail stores, this framework adapts to complex distribution topologies:

### 1. Hub-and-Spoke Distribution Network Rebalancing (Central DC + Regional Branches)
When operating a central distribution center alongside 10–30+ forward stores, localized stockouts often coexist with network-wide overstock. Configure the **transfer radius parameter** to automatically route order shortages to eligible neighboring branches before falling back to central DC replenishment or vendor purchasing.

### 2. Import Container & Long-Lead-Time Overseas PO Reconciliation
Importers sourcing from overseas manufacturers face long ocean freight lead times where a single Blanket PO spawns multiple partial container shipments. By reconciling **in-transit container manifests against open PO lines**, purchasing teams prevent double-counting inbound sea freight during seasonal peak planning.

### 3. B2B Quote Reservation & High-Priority Inventory Ring-Fencing
In project-based wholesale and B2B distribution, pending customer quotes often require temporary stock holds. Use the built-in **reservation validity period and ledger (`09_Reservations_Ledger`)** to ring-fence inventory for active quotes while automatically flagging expired holds so trapped stock returns to the general ATP pool.

---

## Technical Architecture: What Makes This Allocation Engine Different

Unlike static inventory trackers that merely display current stock balances, this workbook is engineered around six operational control layers:

### 1. Configurable 5-Tier Sourcing Hierarchy with Split-Fulfillment Logic
The engine evaluates supply across a strict sequence: **1. Local Inventory $\rightarrow$ 2. Nearby Locations (within radius) $\rightarrow$ 3. Central DC $\rightarrow$ 4. In-Transit Supply $\rightarrow$ 5. Open Purchase Orders**. If a single tier cannot satisfy the full order line, the engine supports **split fulfillment** across subsequent tiers rather than halting at the first shortage.

### 2. True Net Available-to-Promise (ATP) Accounting
Gross physical stock is stripped of existing order commitments, active ledger reservations, safety-stock floors, and forecast protection before a single unit is exposed to the allocation algorithm.

### 3. Unified Supply Ledger & PO-to-Shipment Deduplication
By matching in-transit records to their parent purchase-order lines, the model deducts shipped quantities from open PO balances and assigns a **unique supply identifier** across the unified ledger to prevent double allocation.

### 4. Dual Quantity-and-Timing Delivery Feasibility (EDD Calculation)
Having stock in the network does not mean it can arrive on time. The engine adds supply readiness dates, inter-location transfer lead times, customs clearance buffers, and replenishment schedules—using the **latest arrival date among split sources** to evaluate true OTIF feasibility against the customer's requested date.

### 5. MOQ & Pack-Size Aware Net Procurement Engine
Downstream purchasing recommendations (`12_Procurement_Summary`) are driven strictly by post-allocation **net deficits**, outputting:
- Deficit SKU, destination location, and total net uncovered quantity.
- Recommended preferred supplier, standard pack size, and **MOQ-adjusted purchase quantity**.
- Latest PO release start date, estimated replenishment arrival date, and an order-support feasibility flag.

### 6. Built-In Pre-Flight Audit & Exception Governance
The dedicated `13_Audit_Validation` layer acts as an operational circuit breaker—surfacing missing master-data joins, invalid location codes, orphaned in-transit shipments, over-reserved supply batches, and expired reservations before planners execute transfers or release vendor POs.

---

### Operational Scope & Governance Disclaimer
*This toolkit is an analytical decision-support model and offline planning layer—not a transactional ERP, Warehouse Management System (WMS), Transportation Management System (TMS), or automated EDI purchasing platform. Allocation outputs and procurement summaries are planning recommendations derived from user-supplied exports and parameters; always verify physical warehouse constraints and supplier capacity before committing customer delivery dates or issuing binding purchase orders.*

---

## About the Creator

I build lightweight, inspectable operational decision-support tools for supply chain and finance workflows where critical business logic gets buried across disconnected spreadsheets. The guiding engineering question is: **What exact data points and validation rules must be brought together to make the next operational commitment with confidence?**

## Workbook Architecture

OFIA organizes its 14 worksheets into four functional layers.

| Layer | Primary responsibility | Worksheets |
|---|---|---|
| Configuration and master data | Centralize operating rules and maintain product, location, and supplier reference data. | `00_Config_Params`, `01_Item_Master`, `02_Locations_Distance`, `03_Vendors_Leadtime` |
| Operational input | Capture demand, physical inventory, purchase orders, and goods in transit. | `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, `07_In_Transit_OTW` |
| Calculation and allocation | Build a unified supply ledger, track reservations, and calculate multi-tier allocation. | `08_Supply_Ledger`, `09_Reservations_Ledger`, `10_Allocation_Engine` |
| Decision outputs and controls | Present order-level fulfillment results, procurement recommendations, and audit exceptions. | `11_WhatIf_Fulfillment`, `12_Procurement_Summary`, `13_Audit_Validation` |

### Worksheet Reference

<details>
<summary>Configuration and master data</summary>

| Worksheet | Purpose |
|---|---|
| `00_Config_Params` | Central parameter table for fulfillment policies, inventory protection, transfer radius, timing buffers, pack-size rules, MOQ multiplier, reservation validity, and currency display. |
| `01_Item_Master` | SKU-level product reference data, including item descriptions, standard pack quantities, unit costs, and supplier references. |
| `02_Locations_Distance` | Origin-to-destination distance and transfer-time information used to identify eligible nearby locations and estimate transfer lead times. |
| `03_Vendors_Leadtime` | Supplier references and replenishment lead-time components used to estimate purchasing and arrival dates. |

</details>

<details>
<summary>Operational input</summary>

| Worksheet | Purpose |
|---|---|
| `04_Sales_Demand` | Order-line demand, demand type, SKU, destination, requested quantity, and requested delivery date. |
| `05_Inv_On_Hand` | Physical stock snapshots by location and SKU, including committed quantity and the inputs needed to calculate protected and transferable stock. |
| `06_PO_Pipeline` | Open purchase-order lines and their outstanding quantities, including quantities matched to in-transit shipments. |
| `07_In_Transit_OTW` | Shipment or container records, linked purchase-order references, shipment quantities, and expected arrival information. |

</details>

<details>
<summary>Calculation and allocation</summary>

| Worksheet | Purpose |
|---|---|
| `08_Supply_Ledger` | Consolidates modeled supply sources into a unified ledger with unique supply IDs, readiness dates, gross available quantities, active reservations, and net available quantities. |
| `09_Reservations_Ledger` | Maintains persistent supply reservations linked to order lines and supply IDs, including status, creation date, and reservation audit information. |
| `10_Allocation_Engine` | Runs the tiered sourcing sequence, calculates split allocations and remaining demand, and derives total allocated quantity and estimated arrival information. |

</details>

<details>
<summary>Decision outputs and controls</summary>

| Worksheet | Purpose |
|---|---|
| `11_WhatIf_Fulfillment` | Order-level decision view showing allocated quantity, unmet quantity, fulfillment status, primary supply source, split-order status, estimated delivery date, delay days, and recommended action. |
| `12_Procurement_Summary` | Consolidates net shortages by SKU and destination, supplier information, recommended purchase quantities, suggested purchasing dates, expected arrival dates, and timing feasibility. |
| `13_Audit_Validation` | Consolidates data-quality and control exceptions for review before operational decisions are finalized. |

</details>

## Core Business Logic

### Inventory availability

The workbook calculates transferable stock from physical on-hand quantity after accounting for committed quantity and configured inventory protection.

Conceptually:

\[
\text{Net Transferable Qty}
=
\max(0,\ \text{Physical QOH}
-\text{Committed Qty}
-\text{Protected Qty})
\]

The protection calculation is driven by centralized parameters. It is intended to stop the allocation engine from treating every physical unit as freely available.

The result is a modeled allocation quantity, not a replacement for a warehouse's live stock ledger.

### Purchase-order and in-transit reconciliation

Each purchase-order line has a unique key derived from its purchase-order number and line ID. In-transit records reference that key so the workbook can identify the shipment quantity already represented by an open PO line.

Conceptually:

\[
\text{Net Pending PO Qty}
=
\max(0,\ \text{PO Open Qty}
-\text{Matched OTW Qty})
\]

The resulting net pending quantity represents the remaining modeled purchase pipeline after matched in-transit quantities are deducted.

Records without a valid PO reference should be investigated through the validation workflow. The reconciliation depends on accurate, consistent source identifiers.

### Tiered allocation and remaining demand

The allocation engine carries the unfulfilled quantity from one sourcing tier to the next.

For each tier:

\[
\text{Remaining Qty}_{n}
=
\max(0,\ \text{Remaining Qty}_{n-1}
-\text{Allocated Qty}_{n})
\]

This cascading calculation is designed to prevent the same demand quantity from being allocated repeatedly across tiers.

The actual result depends on the supply records, eligibility rules, configured priority sequence, and dates loaded into the workbook.

### Order-level fulfillment status

The fulfillment view combines quantity sufficiency with delivery timing. Its intended status categories include:

- **Fully fulfilled on time** — the modeled allocation covers the requested quantity within the requested delivery date.
- **Fulfilled late** — the modeled quantity is covered, but the expected delivery date is later than requested.
- **Partially fulfilled** — only part of the requested quantity is covered by the modeled allocation.
- **Out of stock / unmet demand** — the modeled supply pool cannot cover the requested quantity.
- **Quote pending** — quote demand is held from hard allocation when the configured quote-reservation policy does not allow it to consume supply.

The exact result is only as reliable as the underlying demand, stock, shipment, lead-time, and reservation data. A workbook status should not be interpreted as a confirmed carrier booking, supplier promise, or warehouse execution confirmation.

### Procurement quantity and timing

The procurement summary starts from the remaining modeled deficit and applies the configured MOQ multiplier and pack-size policy.

When pack-size rounding is enabled, the recommendation is rounded upward to a valid pack multiple. The suggested purchasing date is derived from the relevant order timing and the modeled replenishment lead time, including configured buffers.

This helps answer two separate questions:

1. **How much additional supply may be required?**
2. **When would it need to be ordered to support the target delivery date?**

Supplier capacity, production-slot availability, transport disruption, and other external constraints must be verified separately unless they are explicitly represented in the input data.

## Operating Assumptions and Boundaries

OFIA is designed as a repeatable analytical workbook using exported business data. Its results depend on the accuracy and completeness of the records provided.

Before using the outputs for a material customer commitment or purchase decision, confirm that:

- SKU, location, supplier, PO, and PO-line identifiers are consistent across input sheets.
- On-hand and committed quantities reflect the intended inventory snapshot.
- In-transit quantities are linked to the correct purchase-order lines.
- Requested delivery dates, shipment dates, and lead times use valid Excel dates.
- Active reservations represent real commitments and are reviewed when their status changes.
- Configured transfer and replenishment buffers reflect the operating policy being modeled.
- Relevant exceptions in `13_Audit_Validation` have been reviewed.

The workbook supports decision preparation; it does not automatically execute transfers, create purchase orders, reserve stock in an ERP, or notify customers.

## Technical Details

The following technical reference material is grouped in a collapsible section to keep the main README focused on business use while preserving implementation details for workbook maintainers.

<details>
<summary>Formula Reference and Validation Rules</summary>

### Formula Reference

The workbook uses modern Excel dynamic-array formulas to generate calculation results from source data. The following references summarize the main formula patterns and their business roles.

#### 1. Functions Used

| Function | Role in OFIA |
|---|---|
| `FILTER` | Select active demand, eligible supply records, and validation exceptions. |
| `UNIQUE` | Identify distinct SKU-location combinations and other unique business keys. |
| `SORT` | Arrange candidate records when a defined ordering is required. |
| `XLOOKUP` | Retrieve item, supplier, location, PO, and supply attributes from reference tables. |
| `SUMIFS` | Aggregate quantities by PO-line key, supply UID, SKU, location, or reservation status. |
| `MAP` | Apply row-level business logic across dynamic arrays without manually filling formulas down. |
| `BYROW` | Apply calculations across rows when a row-wise evaluation is appropriate. |
| `LET` | Name intermediate calculations within a formula to make complex logic easier to structure. |
| `HSTACK` | Combine related fields into a single calculated array. |
| `VSTACK` | Combine inventory, in-transit, and purchase-order supply into a unified ledger. |
| `EXPAND` | Extend a value or array to the required dimensions when constructing a combined array. |
| `SEQUENCE` | Generate sequential numeric arrays for formula-driven calculations. |
| `TODAY` | Calculate current-date-based reservation age and supply readiness dates. |
| `MAX` | Prevent calculated available quantities and remaining demand from becoming negative. |

Availability and behavior of individual functions depend on the installed Excel version. The workbook requires a version that supports the dynamic-array functions used in its formulas.

#### 2. Inventory Availability

The conceptual formula for net transferable inventory is:

```excel
=MAX(0, Physical_QOH - Committed_Qty - Protected_Qty)
```

In the workbook, protected quantity is calculated from the relevant inventory protection inputs and centralized configuration parameters. The actual worksheet formula uses cell and range references rather than the conceptual field names shown above.

The result represents modeled transferable stock, not a live warehouse availability confirmation.

#### 3. Purchase-Order Reconciliation

Purchase-order lines use a composite key based on the PO number and line ID.

```excel
=PO_Number & "|" & PO_Line_ID
```

The in-transit ledger uses the corresponding reference key to aggregate matched shipment quantities:

```excel
=SUMIFS(
    '07_In_Transit_OTW'!E:E,
    '07_In_Transit_OTW'!D:D,
    PO_Unique_Key
)
```

The remaining modeled purchase pipeline is calculated as:

```excel
=MAX(0, PO_Open_Qty - OTW_Matched_Qty)
```

These examples illustrate the logic. When implementing or modifying formulas, use the exact column mappings and formula structures defined in the workbook.

#### 4. Reservation and Net Supply

Active reservations are aggregated against their assigned supply UID. Conceptually:

```excel
=SUMIFS(
    '09_Reservations_Ledger'!H:H,
    '09_Reservations_Ledger'!F:F,
    Supply_UID,
    '09_Reservations_Ledger'!I:I,
    "Active"
)
```

Net allocatable quantity is then calculated as:

```excel
=MAX(0, Gross_Available_Qty - Active_Reserved_Qty)
```

The audit logic must also identify cases where active reservations exceed gross available supply. A non-negative net-availability calculation alone is not sufficient to detect over-reservation.

#### 5. Allocation Cascade

For each sourcing tier, the remaining demand is reduced by the quantity allocated at that tier:

\[
\text{Remaining}_{n}
=
\max(0,\text{Remaining}_{n-1}-\text{Allocated}_{n})
\]

The total allocation is the sum of the quantities assigned across the sourcing tiers:

\[
\text{Allocated Total}
=
\sum_{n=1}^{5}\text{Allocated}_{n}
\]

The unmet quantity is:

\[
\text{Unmet Qty}
=
\max(0,\text{Requested Qty}-\text{Allocated Total})
\]

The implementation must preserve the tier sequence and carry each tier's remaining quantity into the next tier. Independent calculations that do not share the updated remainder can over-allocate the same demand.

#### 6. Delivery Timing

The estimated order delivery date is derived from the modeled arrival dates of its allocated supply sources. Where an order uses multiple sources, the latest allocated-source arrival date is the limiting date for the complete order.

Delivery delay is calculated conceptually as:

\[
\text{Delay Days}
=
\max(0,\text{Estimated Delivery Date}-\text{Requested Delivery Date})
\]

An estimated date is a planning result based on source dates and configured lead-time assumptions. It is not a confirmed logistics commitment.

#### 7. Procurement Quantity

The procurement recommendation starts from the remaining net deficit. It then applies the configured MOQ multiplier and, when enabled, rounds the result upward to the applicable standard pack-size multiple.

The exact implementation should follow the workbook's parameter references in `00_Config_Params`, especially:

- `B11` — pack-size rounding switch.
- `B12` — MOQ multiplier.

Do not replace these parameter references with hard-coded values in calculation formulas.

### Validation Rules

`13_Audit_Validation` is the central exception-monitoring worksheet. Review it after refreshing source data and before relying on the fulfillment or procurement outputs.

| Validation area | What to check | Why it matters |
|---|---|---|
| Item master | SKU records exist, keys are unique, and standard pack quantities are valid. | Invalid item references can undermine allocation and procurement calculations. |
| Location references | Demand and inventory location codes exist in the relevant reference data. | Missing or inconsistent locations can prevent correct source eligibility and transfer-time calculation. |
| Demand integrity | Order identifiers, line identifiers, SKU references, requested quantities, and delivery dates are valid. | Invalid demand data can produce misleading fulfillment statuses and unmet-quantity calculations. |
| Purchase-order integrity | PO numbers, line IDs, open quantities, and PO-line keys are consistent. | Inconsistent keys can break shipment reconciliation. |
| In-transit integrity | Shipment records link to valid PO lines and contain valid quantities and timing fields. | Orphaned shipments may be counted incorrectly or excluded from the intended supply pipeline. |
| Supply availability | Gross supply, active reservations, and net availability reconcile. | Reservations exceeding available supply indicate a potential commitment conflict. |
| Reservation compliance | Reservation status, assigned supply UID, creation date, and validity period are consistent. | Invalid, expired, or broken reservations can distort subsequent allocations. |
| Allocation integrity | Allocated quantities do not exceed eligible supply and each tier uses the remaining demand from the preceding tier. | Prevents duplicate use of stock and over-allocation of demand. |
| Delivery feasibility | Estimated arrival dates and requested delivery dates are valid and comparable. | Invalid dates or lead-time inputs can misclassify on-time and late fulfillment. |
| Procurement logic | Net deficits, supplier mappings, pack sizes, and lead-time assumptions are consistent. | Helps prevent inappropriate or incorrectly sized replenishment recommendations. |

#### Severity and Follow-Up

The source design distinguishes blocking-level critical exceptions from warnings. The appropriate response depends on the affected record and the configured validation rule.

- **Critical exception:** investigate and correct the underlying data or allocation conflict before relying on the affected decision.
- **Warning:** review the record and determine whether the issue affects the proposed fulfillment or procurement action.
- **Global healthy result:** indicates that the configured audit checks did not identify an exception. It does not prove that external source data is complete, current, or operationally confirmed.

Do not interpret a clean audit result as a guarantee of real-world delivery performance. The validation layer checks the rules and records represented in the workbook.

</details>

## Daily Operating Procedure

Use the following cycle whenever demand, inventory, purchase orders, shipment records, or operating parameters change.

1. **Refresh the source data.** Update the designated input areas in `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, and `07_In_Transit_OTW`, along with any changed master data.
2. **Recalculate the workbook.** In Excel, use `Ctrl + Alt + F9` to force a full recalculation when required.
3. **Review the audit sheet.** Check `13_Audit_Validation` and investigate critical exceptions before using the results.
4. **Update persistent reservations.** Record genuine commitments in `09_Reservations_Ledger`, link them to the appropriate supply UID, and set the correct status.
5. **Review fulfillment decisions.** Use `11_WhatIf_Fulfillment` to identify late, partially fulfilled, or uncovered demand.
6. **Review procurement recommendations.** Use `12_Procurement_Summary` to assess the remaining net shortage, recommended quantity, supplier, and timing.
7. **Confirm external execution.** Validate proposed transfers, supplier capacity, purchase orders, shipment schedules, and customer commitments with the relevant operational teams.

### Troubleshooting

<details>
<summary>Dynamic-array formula displays #SPILL!</summary>

**Likely cause:** Cells in the intended spill range are not empty, so Excel cannot display the complete array result.

**What to do:**

1. Select the cell containing the formula.
2. Inspect the spill range indicated by Excel.
3. Clear unintended values or spaces blocking the output.
4. Confirm that the formula's output area is not occupied by manually entered data.

Do not delete the formula itself when clearing the obstructing cells.

</details>

<details>
<summary>New input data does not change the results</summary>

**Likely cause:** Excel may be set to manual calculation, or the source data may have been pasted outside the expected input range.

**What to do:**

1. Open Excel's **Formulas → Calculation Options** menu.
2. Select **Automatic** calculation if appropriate.
3. Verify that the data was entered into the correct input columns and within the workbook's supported ranges.
4. Run a full recalculation using `Ctrl + Alt + F9`.

</details>

<details>
<summary>Changing a parameter does not update the workbook</summary>

**Likely cause:** The parameter was entered in the wrong cell, a formula reference was altered, or calculation has not refreshed.

**What to do:**

1. Confirm the parameter's expected position in `00_Config_Params`.
2. Avoid inserting or moving parameter cells used by formulas.
3. Check `13_Audit_Validation` for related exceptions.
4. Force a full recalculation.

</details>

<details>
<summary>Dates appear as serial numbers</summary>

**Likely cause:** The cell is formatted as General or Number rather than as a date.

**What to do:**

1. Select the affected date cells.
2. Open Format Cells (`Ctrl + 1` on Windows or `Cmd + 1` on Mac).
3. Apply a date format such as `YYYY-MM-DD`.

A numeric value such as `45628` can be an Excel date serial; verify the underlying value before changing the date.

</details>

## Compatibility and Performance

### Supported Excel Versions

The source architecture is designed for **Microsoft 365 or Excel 2021 and later**, including compatible desktop and web versions that support the workbook's required functions.

Excel 2016 and Excel 2019 are not supported by the source design. Other spreadsheet applications may not implement the required dynamic-array functions in the same way.

### Recommended Data Volume

The source implementation recommends:

- Up to **50,000 rows per detail worksheet**.
- Approximately **150,000 rows across the workbook** as a suggested total limit.

Actual recalculation speed depends on the computer, Excel version, formula complexity, and the number of populated records. Treat these figures as planning guidance, not a performance guarantee. For larger datasets, archive completed historical orders and test recalculation performance before expanding the workbook.

### Formula and Input Integrity

- Do not overwrite formula-generated columns.
- Do not change worksheet names or source column headers referenced by formulas.
- Keep composite keys consistent across linked records.
- Maintain valid Excel dates and numeric quantity fields.
- Change business thresholds in `00_Config_Params` rather than editing individual calculation formulas.
- Review validation exceptions after each material data refresh.

## Limitations

OFIA is an analytical decision-support workbook. It does not, by itself:

- Replace an ERP, WMS, TMS, purchasing platform, or order-management system.
- Automatically execute inventory transfers or create supplier purchase orders.
- Confirm supplier production capacity, carrier bookings, or customs clearance.
- Guarantee that inventory and shipment exports are current or complete.
- Account for operational constraints that are absent from its source data.
- Guarantee delivery dates or eliminate all allocation conflicts.

Its usefulness depends on consistent identifiers, current operational inputs, sensible configuration, and human review of material exceptions.

## Other Tools in This Series

Explore other lightweight business decision-support tools from Theseus Workshop in the project repository and related product listings.

## License

This project is distributed under the Apache License 2.0, as indicated by the license badge. Review the repository's `LICENSE` file for the complete license terms.

## About Theseus Workshop

Theseus Workshop builds practical, reusable tools that turn recurring business questions into structured workflows. The focus is on helping teams make clearer decisions using familiar tools and existing business data, without introducing the complexity of a full enterprise platform.

OFIA applies that approach to order fulfillment, inventory allocation, supply reconciliation, and procurement planning.

---

**Before publishing:** replace the browser-demo and Excel-purchase URL placeholders in the opening section with the actual product links. Confirm that the repository includes the applicable `LICENSE` file and that the published browser and Excel versions match the capabilities described here.
