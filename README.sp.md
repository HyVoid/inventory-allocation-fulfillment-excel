[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Plantilla de Excel para asignación de inventario multialmacén y cumplimiento de pedidos (calculadora de ATP y compras)
<img width="1920" height="833" alt="image" src="https://github.com/user-attachments/assets/1379f571-ef41-486b-9c87-e6dc5cb96b2e" />

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-217346.svg)
![Category](https://img.shields.io/badge/Tool-Supply%20Chain%20%26%20ATP%20Planning-2251FF.svg)

**Una plantilla de Excel para asignación de inventario multialmacén, cálculo de Available-to-Promise (ATP) y planificación de cumplimiento de pedidos. Diseñada para planificadores de cadena de suministro, analistas de inventario y distribuidores multialmacén que necesitan conciliar el stock físico, las reservas de pedidos activos, los contenedores en tránsito y las órdenes de compra (PO) abiertas—determinando la viabilidad exacta de entrega OTIF y los requerimientos netos de compras en formatos de navegador y Microsoft Excel.**

Sin registro. Sin instalación de software. Acceso instantáneo a través del simulador de cumplimiento web gratuito, junto con un libro de Microsoft Excel descargable para la conciliación de datos ERP sin conexión, operaciones S&OP repetibles y registros de auditoría permanentes.

> **Acceda a las herramientas de planificación de asignación de inventario y cumplimiento**
>
> - 🌐 **[Lance el simulador web gratuito de asignación de inventario y ATP](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)** — Pruebe jerarquías de abastecimiento multialmacén, simule reglas de envío dividido y verifique la viabilidad de entrega en línea sin instalar software ni configurar hojas de cálculo.
> - 📥 **[Descargue el libro de Excel de cumplimiento de pedidos multialmacén (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** — Obtenga el libro operativo completo de 13 hojas para importaciones recurrentes de datos ERP, seguimiento sin conexión del libro de reservas y cálculos automatizados de reabastecimiento neto. *Incluye una garantía de devolución de dinero de 30 días sin preguntas.*
>

---

## Métricas clave de cadena de suministro y desafíos de cumplimiento de pedidos resueltos

En lugar de cruzar manualmente exportaciones estáticas del ERP, este motor de asignación paramétrico estructura la oferta y la demanda multinivel en un único libro mayor auditable. Así es como el libro de Excel mapea los **puntos de dolor de la distribución multialmacén** con las **métricas automatizadas de ATP y compras**:

| Punto de dolor de cadena de suministro y cumplimiento | Mecanismo automatizado de conciliación y asignación | Métricas clave de inventario y OTIF monitoreadas |
| :--- | :--- | :--- |
| **Viabilidad de cumplimiento de pedidos poco clara (riesgo OTIF)** | Evalúa las fechas de entrega solicitadas por el cliente contra el stock multinuevel de almacenes, los plazos de transferencia y los colchones aduaneros. | Indicador de viabilidad On-Time In-Full (OTIF), tasa de llenado parcial, fecha estimada de entrega (EDD), cantidad de línea no cubierta |
| **Abastecimiento multialmacén fragmentado** | Asigna la demanda según una jerarquía de abastecimiento de 5 niveles: Local Stock $\rightarrow$ Nearby Stores $\rightarrow$ Central DC $\rightarrow$ In-Transit $\rightarrow$ Open POs. | ID de fuente de suministro asignada, asignación de envío dividido, elegibilidad de radio de transferencia entre sucursales |
| **Promesas excesivas sobre el stock físico disponible** | Deduce los compromisos existentes con clientes, las reservas activas del libro mayor, los colchones de stock de seguridad y la protección de pronóstico del stock bruto. | Neto Available-to-Promise (ATP), stock físico disponible vs. stock asignable, piso protegido de stock de seguridad |
| **Doble conteo de suministro en tránsito y PO abiertas** | Vincula los registros de contenedores de importación directamente con las líneas de las órdenes de compra de origen para eliminar la inflación fantasma del pipeline. | Cantidad neta de PO abiertas en pipeline, volumen de contenedores en tránsito conciliado, ID unificado del libro mayor de suministro |
| **Compra de pánico y sobrecompra por demanda bruta** | Calcula los déficits netos reales de inventario solo después de agotar todo el stock asignable de la red y los pipelines de reabastecimiento entrantes. | Cantidad neta de déficit, cantidad de pedido ajustada por MOQ y tamaño de paquete estándar, fecha más tardía de liberación de PO |
| **Datos maestros ocultos y errores de exportación del ERP** | Ejecuta verificaciones de diagnóstico previas a la asignación sobre los pedidos de venta importados, las tablas maestras de SKU y los registros de reservas. | Alertas de envíos huérfanos, indicadores de códigos SKU/ubicación faltantes, reservas de cotizaciones vencidas, conflictos de sobreasignación |

---

## Tutorial paso a paso: cómo ejecutar la asignación de inventario multialmacén y el reabastecimiento neto

El libro de Excel funciona como un **ciclo repetible de Distributed Order Management (DOM) y DRP**: configure una sola vez las reglas de su red de distribución, pegue las exportaciones crudas de su ERP/WMS, audite las excepciones y formalice los compromisos de cumplimiento.

### Paso 1: configurar las reglas de la red de distribución y los parámetros ATP
Abra la pestaña `00_Config_Params` para establecer sus reglas de gobernanza de la cadena de suministro sin tocar las fórmulas de celdas posteriores:

- **Topología de red:** designe el código del Centro de Distribución (DC) central y el radio máximo de transferencia entre sucursales cercanas.
- **Protección de inventario:** configure las políticas de protección de stock de seguridad, los umbrales de protección de demanda de pronóstico y los períodos de validez de las reservas de cotizaciones (días de expiración).
- **Colchones de plazo y empaque:** defina los colchones de transferencia entre almacenes, los retrasos de despacho aduanero y las reglas de empaque/redondeo estándar.

### Paso 2: importar pedidos de venta del ERP, stock disponible y datos del pipeline entrante
Exporte tablas crudas en CSV/XLSX desde su plataforma de ERP, contabilidad o WMS (p. ej., NetSuite, SAP Business One, Dynamics 365, Fishbowl, Cin7) y pégalas en las hojas de entrada estandarizadas:

- **Demanda de clientes:** líneas de pedidos de venta abiertas, ubicaciones de destino y fechas de entrega solicitadas por el cliente.
- **Inventario de almacén:** instantáneas de stock físico por SKU y código de ubicación de almacén.
- **Pipeline de suministro entrante:** líneas de órdenes de compra (PO) abiertas con fechas de llegada prometidas por el proveedor, además de manifiestos de envíos/contenedores en tránsito en vivo.
- **Datos maestros de cadena de suministro:** maestro de artículos (MOQ, tamaño de paquete), maestro de ubicaciones, matriz de distancias entre sitios y plazos de proveedores.

*(Conserve los encabezados de columna predefinidos y evite sobrescribir las columnas calculadas con fórmulas.)*

### Paso 3: auditar excepciones de datos y revisar el cumplimiento hipotético de pedidos
Active el recálculo del libro de Excel y siga la revisión de decisiones en tres etapas:

1. **Auditoría de higiene de datos (`13_Audit_Validation`):** resuelva coincidencias faltantes de maestro de SKU, códigos de almacén inválidos, contenedores en tránsito huérfanos o reservas vencidas antes de confiar en los resultados posteriores.
2. **ATP y abastecimiento a nivel de línea (`11_WhatIf_Fulfillment`):** inspeccione los estados exactos de cumplimiento (`Full & On-Time`, `Late`, `Partial`, `Shortage`), los almacenes de abastecimiento asignados y las fechas estimadas de llegada por línea de pedido de venta.
3. **Compras netas MRP / DRP (`12_Procurement_Summary`):** revise los faltantes netos no cubiertos, las asignaciones recomendadas de proveedores, las cantidades de pedido ajustadas por MOQ/paquete y las fechas más tardías de liberación de órdenes de compra.

### Paso 4: bloquear reservas de suministro y operar en el libro de Excel
Cuando pedidos de venta de alta prioridad requieran protección garantizada de stock, registre los IDs de suministro asignados en `09_Reservations_Ledger` y cambie el estado a `Active` para blindar ese inventario de las ejecuciones posteriores.

> 📦 **¿Listo para eliminar la conciliación manual de inventario en su red de almacenes?** 
> Después de probar la jerarquía de abastecimiento en el **[simulador gratuito de asignación de inventario en el navegador](https://hyvoid.github.io/inventory-allocation-fulfillment-excel/)**, descargue el **[libro de Excel completo de cumplimiento de pedidos multialmacén (.xlsx)](https://theseusworkshop.com/l/gxemem?utm_source=github&utm_medium=GitHub%20README)** para conectar sus exportaciones ERP reales, mantener un libro de reservas persistente y ejecutar ciclos semanales de reabastecimiento S&OP sin conexión.

---

## Por qué construí este motor de decisión de inventario multinivel y ATP

En una red de distribución multialmacén, saber *cuánto inventario físico hay en tus almacenes* es completamente diferente de saber *si un pedido de un cliente realmente puede entregarse a tiempo*.

Considere un distribuidor mayorista o una cadena minorista que opera **28 nodos de distribución**—combinando un Centro de Distribución (DC) central con tiendas avanzadas regionales. Los datos operativos suelen estar fragmentados entre exportaciones de pedidos de venta del ERP, instantáneas de stock del WMS, reportes de compras abiertas, rastreadores de contenedores de agentes de carga y matrices de tránsito regionales.

Cuando los equipos de gestión de pedidos concilian estas tablas manualmente en hojas de cálculo ad hoc, ocurren dos fallas sistémicas:

### 1. La ilusión de ATP de "100 unidades en existencia"
Una instantánea del WMS de un almacén podría mostrar **100 unidades físicamente disponibles**. Sin embargo, 30 unidades ya están comprometidas con órdenes de picking abiertas, 20 unidades están bloqueadas como stock de seguridad protegido y 10 unidades están retenidas bajo una reserva activa de cotización de venta. Tratar el saldo principal de 100 unidades como stock libremente asignable garantiza doble reserva, faltantes de picking en almacén y compromisos OTIF incumplidos.

### 2. La trampa del doble conteo entre PO de "160 unidades entrantes" y en tránsito
Los pipelines de suministro aguas arriba sufren la misma falla de visibilidad. Un reporte de órdenes de compra abiertas muestra **100 unidades pedidas** a una fábrica, mientras que el manifiesto de contenedores del equipo logístico muestra **60 de esas mismas unidades ya cargadas en el mar**. Si un planificador de inventario suma las PO abiertas y las hojas en tránsito de forma independiente, la red aparenta tener **160 unidades de suministro futuro** cuando solo existen **100 unidades netas**.

Construí este kit de herramientas como **razonamiento de decisiones de cadena de suministro productizado**—cerrando la brecha entre hojas de cálculo básicas y software empresarial APS/DOM de seis cifras. Unifica el cálculo de ATP neto, la conciliación PO-envío, las reglas de abastecimiento multinivel y la planificación de compras consciente del MOQ en un flujo de trabajo único, transparente y auditable: **qué se puede prometer, qué nodo debe enviarlo, qué queda sin cubrir y qué realmente hay que comprar.**

---

## Hojas de cálculo ERP desconectadas vs. libro estructurado de ATP y asignación

| Dimensión de planificación de cadena de suministro | Exportaciones ERP manuales y hojas ad hoc con VLOOKUP | Motor de asignación de inventario multialmacén (esta herramienta) |
| :--- | :--- | :--- |
| **Cálculo de Available-to-Promise (ATP)** | Los saldos físicos disponibles se confunden con stock libre, provocando doble asignación entre vendedores y canales. | Deduce automáticamente los compromisos existentes, las reservas activas del libro mayor, el stock de seguridad y los colchones de pronóstico antes de asignar. |
| **Conciliación en tránsito vs. PO abiertas** | Las órdenes de compra abiertas y los contenedores de carga entrante se suman por separado, inflando las posiciones proyectadas de inventario. | Concilia las líneas de envío contra los números de PO de origen para calcular las cantidades reales restantes del pipeline de fábrica. |
| **Viabilidad de entrega de pedidos (OTIF y plazo de entrega)** | Los planificadores verifican si hay stock en algún lugar de la red pero ignoran los tiempos de tránsito de transferencia entre almacenes y los colchones aduaneros. | Evalúa las fechas de disponibilidad de stock, los plazos de transferencia entre sitios y los retrasos aduaneros directamente contra las fechas de entrega solicitadas por el cliente. |
| **Abastecimiento multialmacén y envíos divididos** | Una sucursal dispara una orden de compra de emergencia mientras una tienda cercana dentro del radio de transferencia retiene stock excedente de baja rotación. | Aplica una jerarquía de abastecimiento de 5 niveles (`Local` $\rightarrow$ `Nearby` $\rightarrow$ `Central DC` $\rightarrow$ `In-Transit` $\rightarrow$ `Open PO`) con soporte de envío dividido. |
| **Reabastecimiento neto y compras con MOQ** | Los compradores generan órdenes de compra según la demanda bruta de ventas, ignorando el stock ya en tránsito o almacenado en hubs regionales. | Genera recomendaciones de compra de déficit neto ajustadas por plazos de proveedores, cantidades mínimas de pedido (MOQ) y tamaños de paquete. |
| **Higiene de datos maestros y auditoría de excepciones** | Las asignaciones de SKU rotas, los registros de contenedores huérfanos y las retenciones de stock vencidas permanecen ocultas hasta que falla el picking en almacén. | La hoja dedicada `13_Audit_Validation` señala errores de integridad de datos, sobre-reservas y conflictos de asignación antes de la ejecución. |

---

## Para quién está diseñado este libro de cadena de suministro: roles y flujos de trabajo

Este kit de herramientas de asignación de inventario y cumplimiento en formato dual (Navegador + Excel) está diseñado para equipos operativos que gestionan inventario multinodo sin automatización empresarial APS/DOM:

- **Planificadores de inventario y analistas de planificación de demanda/oferta:** reemplace las frágiles cadenas de VLOOKUP multiarchivo con una **plantilla de Excel estructurada de Available-to-Promise (ATP) y DRP**. Concilie el stock disponible, los pisos de stock de seguridad y los contenedores entrantes en minutos antes de las reuniones semanales de S&OP.
- **Coordinadores de gestión de pedidos (OM) y cumplimiento al cliente:** use la **calculadora de viabilidad de cumplimiento de pedidos** para dar a los clientes B2B fechas de entrega precisas, evaluar opciones de envío dividido entre tiendas regionales y bloquear reservas firmes de stock (`09_Reservations_Ledger`) para cuentas VIP.
- **Especialistas en compras y gerentes de adquisiciones:** elimine la inflación fantasma del pipeline y la sobrecompra. Use el **motor de conciliación PO-envío** y la pestaña `12_Procurement_Summary` para calcular los déficits netos exactos de compra, redondeados a los MOQ de proveedores y cantidades de paquete estándar.
- **Operaciones multiubicación y gerentes de centros de distribución:** optimice el rebalanceo de inventario entre 5 y más de 30 nodos de almacén. Configure reglas de radio de transferencia entre tiendas para que el stock regional excedente cubra la demanda cercana antes de agotar el DC central o disparar POs a proveedores externos.
- **Consultores de implementación ERP e ingenieros de cadena de suministro:** use la arquitectura transparente de 13 hojas del libro como una **especificación inspeccionable de Distributed Order Management (DOM)**—ideal para prototipar la lógica de asignación antes de codificar reglas personalizadas en NetSuite, SAP o Microsoft Dynamics.

---

## Casos de uso industriales y escenarios de nicho de cadena de suministro

Ya sea que gestione patios regionales de materiales de construcción, repuestos industriales al por mayor o tiendas minoristas omnicanal, este marco se adapta a topologías de distribución complejas:

### 1. Rebalanceo de red de distribución hub-and-spoke (DC central + sucursales regionales)
Al operar un centro de distribución central junto con 10–30+ tiendas avanzadas, los quiebres de stock localizados suelen coexistir con sobreabastecimiento a nivel de red. Configure el **parámetro de radio de transferencia** para enrutar automáticamente los faltantes de pedidos a sucursales vecinas elegibles antes de recurrir al reabastecimiento del DC central o a la compra a proveedores.

### 2. Conciliación de contenedores de importación y PO ultramarinas de largo plazo
Los importadores que compran a fabricantes extranjeros enfrentan largos plazos de flete marítimo donde una sola orden de compra abierta (Blanket PO) genera múltiples envíos parciales de contenedores. Al conciliar los **manifiestos de contenedores en tránsito contra las líneas de PO abiertas**, los equipos de compras evitan el doble conteo del flete marítimo entrante durante la planificación de picos estacionales.

### 3. Reservas de cotizaciones B2B y blindaje de inventario de alta prioridad
En la distribución mayorista y B2B basada en proyectos, las cotizaciones pendientes de clientes suelen requerir retenciones temporales de stock. Use el **período de validez de reservas y el libro mayor integrados (`09_Reservations_Ledger`)** para blindar el inventario de cotizaciones activas mientras señala automáticamente las retenciones vencidas, de modo que el stock atrapado regrese al pool general de ATP.

---

## Arquitectura técnica: qué hace diferente a este motor de asignación

A diferencia de los rastreadores estáticos de inventario que solo muestran saldos actuales, este libro está diseñado en torno a seis capas de control operativo:

### 1. Jerarquía configurable de abastecimiento de 5 niveles con lógica de cumplimiento dividido
El motor evalúa el suministro en una secuencia estricta: **1. Inventario local $\rightarrow$ 2. Ubicaciones cercanas (dentro del radio) $\rightarrow$ 3. DC central $\rightarrow$ 4. Suministro en tránsito $\rightarrow$ 5. Órdenes de compra abiertas**. Si un solo nivel no puede satisfacer la línea completa del pedido, el motor admite el **cumplimiento dividido** en los niveles siguientes en lugar de detenerse en el primer faltante.

### 2. Contabilidad real de Available-to-Promise (ATP) neto
El stock físico bruto se depura de los compromisos de pedidos existentes, las reservas activas del libro mayor, los pisos de stock de seguridad y la protección de pronóstico antes de exponer una sola unidad al algoritmo de asignación.

### 3. Libro mayor unificado de suministro y deduplicación PO-envío
Al hacer coincidir los registros en tránsito con sus líneas de órdenes de compra de origen, el modelo deduce las cantidades enviadas de los saldos de PO abiertas y asigna un **identificador único de suministro** a lo largo del libro mayor unificado para evitar la doble asignación.

### 4. Viabilidad de entrega dual por cantidad y tiempo (cálculo de EDD)
Tener stock en la red no significa que pueda llegar a tiempo. El motor agrega las fechas de disponibilidad del suministro, los plazos de transferencia entre ubicaciones, los colchones de despacho aduanero y los calendarios de reabastecimiento—usando la **fecha de llegada más tardía entre las fuentes divididas** para evaluar la verdadera viabilidad OTIF contra la fecha solicitada por el cliente.

### 5. Motor de compras neto consciente de MOQ y tamaño de paquete
Las recomendaciones de compra posteriores (`12_Procurement_Summary`) se generan estrictamente a partir de los **déficits netos** posteriores a la asignación, mostrando:
- SKU en déficit, ubicación de destino y cantidad neta total no cubierta.
- Proveedor preferido recomendado, tamaño de paquete estándar y **cantidad de compra ajustada por MOQ**.
- Fecha más tardía de liberación de PO, fecha estimada de llegada del reabastecimiento y un indicador de viabilidad de soporte de pedido.

### 6. Auditoría preoperativa integrada y gobernanza de excepciones
La capa dedicada `13_Audit_Validation` actúa como un disyuntor operativo—revelando uniones faltantes de datos maestros, códigos de ubicación inválidos, envíos en tránsito huérfanos, lotes de suministro sobre-reservados y reservas vencidas antes de que los planificadores ejecuten transferencias o liberen POs a proveedores.

---

### Alcance operativo y aviso de gobernanza
*Este kit de herramientas es un modelo analítico de apoyo a decisiones y una capa de planificación sin conexión—no es un ERP transaccional, un Sistema de Gestión de Almacenes (WMS), un Sistema de Gestión de Transporte (TMS) ni una plataforma automatizada de compras EDI. Los resultados de asignación y los resúmenes de compras son recomendaciones de planificación derivadas de exportaciones y parámetros suministrados por el usuario; verifique siempre las restricciones físicas del almacén y la capacidad del proveedor antes de comprometer fechas de entrega al cliente o emitir órdenes de compra vinculantes.*

---

## Sobre el creador

Desarrollo herramientas operativas ligeras e inspeccionables de apoyo a decisiones para flujos de trabajo de cadena de suministro y finanzas donde la lógica comercial crítica queda enterrada en hojas de cálculo desconectadas. La pregunta de ingeniería que me guía es: **¿qué puntos de datos exactos y reglas de validación deben reunirse para tomar el próximo compromiso operativo con confianza?**

## Arquitectura del libro de Excel

OFIA organiza sus 14 hojas de trabajo en cuatro capas funcionales.

| Capa | Responsabilidad principal | Hojas de trabajo |
|---|---|---|
| Configuración y datos maestros | Centraliza las reglas operativas y mantiene los datos de referencia de productos, ubicaciones y proveedores. | `00_Config_Params`, `01_Item_Master`, `02_Locations_Distance`, `03_Vendors_Leadtime` |
| Entrada operativa | Captura la demanda, el inventario físico, las órdenes de compra y la mercancía en tránsito. | `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline`, `07_In_Transit_OTW` |
| Cálculo y asignación | Construye un libro mayor unificado de suministro, rastrea reservas y calcula la asignación multinivel. | `08_Supply_Ledger`, `09_Reservations_Ledger`, `10_Allocation_Engine` |
| Resultados de decisión y controles | Presenta resultados de cumplimiento a nivel de pedido, recomendaciones de compras y excepciones de auditoría. | `11_WhatIf_Fulfillment`, `12_Procurement_Summary`, `13_Audit_Validation` |

### Referencia de hojas de trabajo

<details>
<summary>Configuración y datos maestros</summary>

| Hoja de trabajo | Propósito |
|---|---|
| `00_Config_Params` | Tabla central de parámetros para políticas de cumplimiento, protección de inventario, radio de transferencia, colchones de tiempo, reglas de tamaño de paquete, multiplicador de MOQ, validez de reservas y visualización de moneda. |
| `01_Item_Master` | Datos de referencia de productos a nivel SKU, incluidas descripciones de artículos, cantidades de paquete estándar, costos unitarios y referencias de proveedores. |
| `02_Locations_Distance` | Información de distancia origen-destino y tiempos de transferencia utilizada para identificar ubicaciones cercanas elegibles y estimar plazos de transferencia. |
| `03_Vendors_Leadtime` | Referencias de proveedores y componentes de plazos de reabastecimiento utilizados para estimar fechas de compra y llegada. |

</details>

<details>
<summary>Entrada operativa</summary>

| Hoja de trabajo | Propósito |
|---|---|
| `04_Sales_Demand` | Demanda a nivel de línea de pedido, tipo de demanda, SKU, destino, cantidad solicitada y fecha de entrega solicitada. |
| `05_Inv_On_Hand` | Instantáneas de stock físico por ubicación y SKU, incluida la cantidad comprometida y los insumos necesarios para calcular el stock protegido y transferible. |
| `06_PO_Pipeline` | Líneas de órdenes de compra abiertas y sus cantidades pendientes, incluidas las cantidades conciliadas con envíos en tránsito. |
| `07_In_Transit_OTW` | Registros de envíos o contenedores, referencias vinculadas a órdenes de compra, cantidades enviadas e información de llegada esperada. |

</details>

<details>
<summary>Cálculo y asignación</summary>

| Hoja de trabajo | Propósito |
|---|---|
| `08_Supply_Ledger` | Consolida las fuentes de suministro modeladas en un libro mayor unificado con IDs únicos de suministro, fechas de disponibilidad, cantidades brutas disponibles, reservas activas y cantidades netas disponibles. |
| `09_Reservations_Ledger` | Mantiene reservas de suministro persistentes vinculadas a líneas de pedido y IDs de suministro, incluido el estado, la fecha de creación y la información de auditoría de reservas. |
| `10_Allocation_Engine` | Ejecuta la secuencia de abastecimiento por niveles, calcula asignaciones divididas y demanda restante, y deriva la cantidad total asignada y la información estimada de llegada. |

</details>

<details>
<summary>Resultados de decisión y controles</summary>

| Hoja de trabajo | Propósito |
|---|---|
| `11_WhatIf_Fulfillment` | Vista de decisión a nivel de pedido que muestra la cantidad asignada, la cantidad no cubierta, el estado de cumplimiento, la fuente principal de suministro, el estado de pedido dividido, la fecha estimada de entrega, los días de retraso y la acción recomendada. |
| `12_Procurement_Summary` | Consolida los faltantes netos por SKU y destino, la información de proveedores, las cantidades recomendadas de compra, las fechas sugeridas de compra, las fechas esperadas de llegada y la viabilidad de tiempos. |
| `13_Audit_Validation` | Consolida las excepciones de calidad de datos y controles para revisión antes de finalizar decisiones operativas. |

</details>

## Lógica de negocio central

### Disponibilidad de inventario

El libro de Excel calcula el stock transferible a partir de la cantidad física disponible después de contabilizar la cantidad comprometida y la protección de inventario configurada.

Conceptualmente:

\[
\text{Net Transferable Qty}
=
\max(0,\ \text{Physical QOH}
-\text{Committed Qty}
-\text{Protected Qty})
\]

El cálculo de protección se rige por parámetros centralizados. Su objetivo es impedir que el motor de asignación trate cada unidad física como libremente disponible.

El resultado es una cantidad de asignación modelada, no un reemplazo del libro mayor de stock en vivo de un almacén.

### Conciliación de órdenes de compra y mercancía en tránsito

Cada línea de orden de compra tiene una clave única derivada de su número de orden de compra e ID de línea. Los registros en tránsito hacen referencia a esa clave para que el libro pueda identificar la cantidad enviada ya representada por una línea de PO abierta.

Conceptualmente:

\[
\text{Net Pending PO Qty}
=
\max(0,\ \text{PO Open Qty}
-\text{Matched OTW Qty})
\]

La cantidad neta pendiente resultante representa el pipeline de compras modelado restante después de deducir las cantidades en tránsito conciliadas.

Los registros sin una referencia de PO válida deben investigarse a través del flujo de validación. La conciliación depende de identificadores de origen precisos y consistentes.

### Asignación por niveles y demanda restante

El motor de asignación transporta la cantidad no cumplida de un nivel de abastecimiento al siguiente.

Para cada nivel:

\[
\text{Remaining Qty}_{n}
=
\max(0,\ \text{Remaining Qty}_{n-1}
-\text{Allocated Qty}_{n})
\]

Este cálculo en cascada está diseñado para evitar que la misma cantidad de demanda se asigne repetidamente a través de los niveles.

El resultado real depende de los registros de suministro, las reglas de elegibilidad, la secuencia de prioridad configurada y las fechas cargadas en el libro.

### Estado de cumplimiento a nivel de pedido

La vista de cumplimiento combina la suficiencia de cantidad con el tiempo de entrega. Sus categorías de estado previstas incluyen:

- **Cumplido por completo a tiempo** — la asignación modelada cubre la cantidad solicitada dentro de la fecha de entrega solicitada.
- **Cumplido con retraso** — la cantidad modelada está cubierta, pero la fecha esperada de entrega es posterior a la solicitada.
- **Parcialmente cumplido** — solo una parte de la cantidad solicitada está cubierta por la asignación modelada.
- **Sin stock / demanda no cubierta** — el pool de suministro modelado no puede cubrir la cantidad solicitada.
- **Cotización pendiente** — la demanda de cotización se retiene de la asignación firme cuando la política configurada de reserva de cotizaciones no permite que consuma suministro.

El resultado exacto es tan confiable como los datos subyacentes de demanda, stock, envíos, plazos y reservas. El estado del libro no debe interpretarse como una confirmación de reserva de transportista, promesa de proveedor o confirmación de ejecución de almacén.

### Cantidad y tiempos de compra

El resumen de compras parte del déficit neto modelado restante y aplica el multiplicador de MOQ y la política de tamaño de paquete configurados.

Cuando el redondeo por tamaño de paquete está habilitado, la recomendación se redondea hacia arriba a un múltiplo de paquete válido. La fecha sugerida de compra se deriva del tiempo del pedido relevante y del plazo de reabastecimiento modelado, incluidos los colchones configurados.

Esto ayuda a responder dos preguntas separadas:

1. **¿Cuánto suministro adicional podría requerirse?**
2. **¿Cuándo habría que ordenarlo para cumplir la fecha de entrega objetivo?**

La capacidad del proveedor, la disponibilidad de turnos de producción, las interrupciones de transporte y otras restricciones externas deben verificarse por separado, a menos que estén explícitamente representadas en los datos de entrada.

## Supuestos operativos y límites

OFIA está diseñado como un libro analítico repetible que utiliza datos comerciales exportados. Sus resultados dependen de la precisión y integridad de los registros proporcionados.

Antes de usar los resultados para un compromiso material con un cliente o una decisión de compra, confirme que:

- Los identificadores de SKU, ubicación, proveedor, PO y línea de PO son consistentes en todas las hojas de entrada.
- Las cantidades disponibles y comprometidas reflejan la instantánea de inventario prevista.
- Las cantidades en tránsito están vinculadas a las líneas correctas de órdenes de compra.
- Las fechas de entrega solicitadas, fechas de envío y plazos de entrega usan fechas válidas de Excel.
- Las reservas activas representan compromisos reales y se revisan cuando cambia su estado.
- Los colchones configurados de transferencia y reabastecimiento reflejan la política operativa modelada.
- Las excepciones relevantes en `13_Audit_Validation` han sido revisadas.

El libro apoya la preparación de decisiones; no ejecuta automáticamente transferencias, ni crea órdenes de compra, ni reserva stock en un ERP, ni notifica a los clientes.

## Detalles técnicos

El material de referencia técnica siguiente está agrupado en una sección plegable para mantener el README principal enfocado en el uso comercial, preservando los detalles de implementación para los mantenedores del libro.

<details>
<summary>Referencia de fórmulas y reglas de validación</summary>

### Referencia de fórmulas

El libro utiliza fórmulas modernas de matriz dinámica de Excel para generar resultados de cálculo a partir de los datos de origen. Las referencias siguientes resumen los patrones principales de fórmulas y sus roles comerciales.

#### 1. Funciones utilizadas

| Función | Rol en OFIA |
|---|---|
| `FILTER` | Selecciona demanda activa, registros de suministro elegibles y excepciones de validación. |
| `UNIQUE` | Identifica combinaciones distintas de SKU-ubicación y otras claves comerciales únicas. |
| `SORT` | Ordena registros candidatos cuando se requiere un orden definido. |
| `XLOOKUP` | Recupera atributos de artículos, proveedores, ubicaciones, PO y suministro desde tablas de referencia. |
| `SUMIFS` | Agrega cantidades por clave de línea de PO, UID de suministro, SKU, ubicación o estado de reserva. |
| `MAP` | Aplica lógica comercial a nivel de fila en matrices dinámicas sin rellenar fórmulas manualmente. |
| `BYROW` | Aplica cálculos por fila cuando una evaluación fila por fila es apropiada. |
| `LET` | Nombra cálculos intermedios dentro de una fórmula para estructurar mejor la lógica compleja. |
| `HSTACK` | Combina campos relacionados en una única matriz calculada. |
| `VSTACK` | Combina inventario, en tránsito y órdenes de compra en un libro mayor unificado. |
| `EXPAND` | Extiende un valor o matriz a las dimensiones requeridas al construir una matriz combinada. |
| `SEQUENCE` | Genera matrices numéricas secuenciales para cálculos basados en fórmulas. |
| `TODAY` | Calcula la antigüedad de reservas basada en la fecha actual y las fechas de disponibilidad del suministro. |
| `MAX` | Evita que las cantidades disponibles calculadas y la demanda restante se vuelvan negativas. |

La disponibilidad y el comportamiento de cada función dependen de la versión de Excel instalada. El libro requiere una versión compatible con las funciones de matriz dinámica utilizadas en sus fórmulas.

#### 2. Disponibilidad de inventario

La fórmula conceptual para el inventario neto transferible es:

```excel
=MAX(0, Physical_QOH - Committed_Qty - Protected_Qty)
```

En el libro, la cantidad protegida se calcula a partir de los insumos relevantes de protección de inventario y los parámetros de configuración centralizados. La fórmula real de la hoja utiliza referencias de celdas y rangos en lugar de los nombres conceptuales de campos mostrados arriba.

El resultado representa stock transferible modelado, no una confirmación en vivo de disponibilidad del almacén.

#### 3. Conciliación de órdenes de compra

Las líneas de órdenes de compra usan una clave compuesta basada en el número de PO y el ID de línea.

```excel
=PO_Number & "|" & PO_Line_ID
```

El libro mayor en tránsito usa la clave de referencia correspondiente para agregar las cantidades enviadas conciliadas:

```excel
=SUMIFS(
    '07_In_Transit_OTW'!E:E,
    '07_In_Transit_OTW'!D:D,
    PO_Unique_Key
)
```

El pipeline de compras modelado restante se calcula como:

```excel
=MAX(0, PO_Open_Qty - OTW_Matched_Qty)
```

Estos ejemplos ilustran la lógica. Al implementar o modificar fórmulas, utilice las asignaciones exactas de columnas y las estructuras de fórmulas definidas en el libro.

#### 4. Reservas y suministro neto

Las reservas activas se agregan contra el UID de suministro asignado. Conceptualmente:

```excel
=SUMIFS(
    '09_Reservations_Ledger'!H:H,
    '09_Reservations_Ledger'!F:F,
    Supply_UID,
    '09_Reservations_Ledger'!I:I,
    "Active"
)
```

La cantidad neta asignable se calcula entonces como:

```excel
=MAX(0, Gross_Available_Qty - Active_Reserved_Qty)
```

La lógica de auditoría también debe identificar los casos en que las reservas activas exceden el suministro bruto disponible. Un cálculo de disponibilidad neta no negativo por sí solo no es suficiente para detectar la sobre-reserva.

#### 5. Cascada de asignación

Para cada nivel de abastecimiento, la demanda restante se reduce por la cantidad asignada en ese nivel:

\[
\text{Remaining}_{n}
=
\max(0,\text{Remaining}_{n-1}-\text{Allocated}_{n})
\]

La asignación total es la suma de las cantidades asignadas a través de los niveles de abastecimiento:

\[
\text{Allocated Total}
=
\sum_{n=1}^{5}\text{Allocated}_{n}
\]

La cantidad no cubierta es:

\[
\text{Unmet Qty}
=
\max(0,\text{Requested Qty}-\text{Allocated Total})
\]

La implementación debe preservar la secuencia de niveles y transportar la cantidad restante de cada nivel al siguiente. Los cálculos independientes que no compartan el resto actualizado pueden sobreasignar la misma demanda.

#### 6. Tiempos de entrega

La fecha estimada de entrega del pedido se deriva de las fechas de llegada modeladas de sus fuentes de suministro asignadas. Cuando un pedido utiliza múltiples fuentes, la fecha de llegada más tardía entre las fuentes asignadas es la fecha limitante para el pedido completo.

El retraso de entrega se calcula conceptualmente como:

\[
\text{Delay Days}
=
\max(0,\text{Estimated Delivery Date}-\text{Requested Delivery Date})
\]

Una fecha estimada es un resultado de planificación basado en fechas de origen y supuestos de plazos configurados. No es un compromiso logístico confirmado.

#### 7. Cantidad de compra

La recomendación de compras parte del déficit neto restante. Luego aplica el multiplicador de MOQ configurado y, cuando está habilitado, redondea el resultado hacia arriba al múltiplo de tamaño de paquete estándar aplicable.

La implementación exacta debe seguir las referencias de parámetros del libro en `00_Config_Params`, especialmente:

- `B11` — interruptor de redondeo por tamaño de paquete.
- `B12` — multiplicador de MOQ.

No reemplace estas referencias de parámetros por valores codificados en las fórmulas de cálculo.

### Reglas de validación

`13_Audit_Validation` es la hoja central de monitoreo de excepciones. Revísela después de actualizar los datos de origen y antes de confiar en los resultados de cumplimiento o compras.

| Área de validación | Qué verificar | Por qué importa |
|---|---|---|
| Maestro de artículos | Los registros de SKU existen, las claves son únicas y las cantidades de paquete estándar son válidas. | Las referencias de artículos inválidas pueden comprometer los cálculos de asignación y compras. |
| Referencias de ubicación | Los códigos de ubicación de demanda e inventario existen en los datos de referencia relevantes. | Las ubicaciones faltantes o inconsistentes pueden impedir la elegibilidad correcta de fuentes y el cálculo de tiempos de transferencia. |
| Integridad de demanda | Los identificadores de pedido, identificadores de línea, referencias de SKU, cantidades solicitadas y fechas de entrega son válidos. | Los datos de demanda inválidos pueden producir estados de cumplimiento engañosos y cálculos incorrectos de cantidad no cubierta. |
| Integridad de órdenes de compra | Los números de PO, IDs de línea, cantidades abiertas y claves de línea de PO son consistentes. | Las claves inconsistentes pueden romper la conciliación de envíos. |
| Integridad en tránsito | Los registros de envíos se vinculan a líneas de PO válidas y contienen campos válidos de cantidades y tiempos. | Los envíos huérfanos pueden contarse incorrectamente o excluirse del pipeline de suministro previsto. |
| Disponibilidad de suministro | El suministro bruto, las reservas activas y la disponibilidad neta concilian. | Las reservas que exceden el suministro disponible indican un posible conflicto de compromisos. |
| Cumplimiento de reservas | El estado de reserva, el UID de suministro asignado, la fecha de creación y el período de validez son consistentes. | Las reservas inválidas, vencidas o rotas pueden distorsionar las asignaciones posteriores. |
| Integridad de asignación | Las cantidades asignadas no exceden el suministro elegible y cada nivel usa la demanda restante del nivel anterior. | Evita el uso duplicado de stock y la sobreasignación de demanda. |
| Viabilidad de entrega | Las fechas estimadas de llegada y las fechas de entrega solicitadas son válidas y comparables. | Las fechas o insumos de plazos inválidos pueden clasificar incorrectamente el cumplimiento a tiempo o con retraso. |
| Lógica de compras | Los déficits netos, mapeos de proveedores, tamaños de paquete y supuestos de plazos son consistentes. | Ayuda a prevenir recomendaciones de reabastecimiento inapropiadas o mal dimensionadas. |

#### Severidad y seguimiento

El diseño de origen distingue las excepciones críticas de nivel bloqueante de las advertencias. La respuesta adecuada depende del registro afectado y de la regla de validación configurada.

- **Excepción crítica:** investigue y corrija el conflicto subyacente de datos o asignación antes de confiar en la decisión afectada.
- **Advertencia:** revise el registro y determine si el problema afecta la acción propuesta de cumplimiento o compras.
- **Resultado global saludable:** indica que las verificaciones de auditoría configuradas no identificaron una excepción. No prueba que los datos externos de origen estén completos, actualizados u operativamente confirmados.

No interprete un resultado de auditoría limpio como una garantía del desempeño real de entrega. La capa de validación verifica las reglas y registros representados en el libro.

</details>

## Procedimiento operativo diario

Utilice el siguiente ciclo cada vez que cambien la demanda, el inventario, las órdenes de compra, los registros de envíos o los parámetros operativos.

1. **Actualice los datos de origen.** Actualice las áreas de entrada designadas en `04_Sales_Demand`, `05_Inv_On_Hand`, `06_PO_Pipeline` y `07_In_Transit_OTW`, junto con los datos maestros modificados.
2. **Recalcule el libro.** En Excel, use `Ctrl + Alt + F9` para forzar un recálculo completo cuando sea necesario.
3. **Revise la hoja de auditoría.** Verifique `13_Audit_Validation` e investigue las excepciones críticas antes de usar los resultados.
4. **Actualice las reservas persistentes.** Registre los compromisos reales en `09_Reservations_Ledger`, vincúlelos al UID de suministro apropiado y establezca el estado correcto.
5. **Revise las decisiones de cumplimiento.** Use `11_WhatIf_Fulfillment` para identificar la demanda con retraso, parcialmente cumplida o no cubierta.
6. **Revise las recomendaciones de compras.** Use `12_Procurement_Summary` para evaluar el faltante neto restante, la cantidad recomendada, el proveedor y los tiempos.
7. **Confirme la ejecución externa.** Valide las transferencias propuestas, la capacidad de proveedores, las órdenes de compra, los calendarios de envío y los compromisos con clientes junto a los equipos operativos correspondientes.

### Solución de problemas

<details>
<summary>La fórmula de matriz dinámica muestra #SPILL!</summary>

**Causa probable:** Las celdas del rango de derrame previsto no están vacías, por lo que Excel no puede mostrar el resultado completo de la matriz.

**Qué hacer:**

1. Seleccione la celda que contiene la fórmula.
2. Inspeccione el rango de derrame indicado por Excel.
3. Borre los valores o espacios no deseados que bloquean la salida.
4. Confirme que el área de salida de la fórmula no esté ocupada por datos ingresados manualmente.

No elimine la fórmula misma al limpiar las celdas obstructivas.

</details>

<details>
<summary>Los nuevos datos de entrada no cambian los resultados</summary>

**Causa probable:** Excel puede estar configurado en cálculo manual, o los datos de origen pueden haberse pegado fuera del rango de entrada esperado.

**Qué hacer:**

1. Abra el menú **Fórmulas → Opciones de cálculo** de Excel.
2. Seleccione el cálculo **Automático** si corresponde.
3. Verifique que los datos se ingresaron en las columnas de entrada correctas y dentro de los rangos compatibles del libro.
4. Ejecute un recálculo completo usando `Ctrl + Alt + F9`.

</details>

<details>
<summary>Cambiar un parámetro no actualiza el libro</summary>

**Causa probable:** El parámetro se ingresó en la celda incorrecta, se alteró una referencia de fórmula o el cálculo no se ha actualizado.

**Qué hacer:**

1. Confirme la posición esperada del parámetro en `00_Config_Params`.
2. Evite insertar o mover celdas de parámetros utilizadas por fórmulas.
3. Revise `13_Audit_Validation` en busca de excepciones relacionadas.
4. Fuerce un recálculo completo.

</details>

<details>
<summary>Las fechas aparecen como números de serie</summary>

**Causa probable:** La celda está formateada como General o Número en lugar de fecha.

**Qué hacer:**

1. Seleccione las celdas de fecha afectadas.
2. Abra Formato de celdas (`Ctrl + 1` en Windows o `Cmd + 1` en Mac).
3. Aplique un formato de fecha como `YYYY-MM-DD`.

Un valor numérico como `45628` puede ser un número de serie de fecha de Excel; verifique el valor subyacente antes de cambiar la fecha.

</details>

## Compatibilidad y rendimiento

### Versiones de Excel compatibles

La arquitectura de origen está diseñada para **Microsoft 365 o Excel 2021 y posteriores**, incluidas las versiones de escritorio y web compatibles que soportan las funciones requeridas por el libro.

Excel 2016 y Excel 2019 no están soportados por el diseño de origen. Otras aplicaciones de hojas de cálculo pueden no implementar de la misma manera las funciones de matriz dinámica requeridas.

### Volumen de datos recomendado

La implementación de origen recomienda:

- Hasta **50,000 filas por hoja de detalle**.
- Aproximadamente **150,000 filas en todo el libro** como límite total sugerido.

La velocidad real de recálculo depende de la computadora, la versión de Excel, la complejidad de las fórmulas y el número de registros poblados. Trate estas cifras como una guía de planificación, no como una garantía de rendimiento. Para conjuntos de datos mayores, archive los pedidos históricos completados y pruebe el rendimiento de recálculo antes de expandir el libro.

### Integridad de fórmulas y entradas

- No sobrescriba las columnas generadas por fórmulas.
- No cambie los nombres de hojas ni los encabezados de columna de origen referenciados por fórmulas.
- Mantenga las claves compuestas consistentes en los registros vinculados.
- Mantenga fechas válidas de Excel y campos numéricos de cantidades.
- Cambie los umbrales comerciales en `00_Config_Params` en lugar de editar fórmulas de cálculo individuales.
- Revise las excepciones de validación después de cada actualización material de datos.

## Limitaciones

OFIA es un libro de apoyo a decisiones analíticas. Por sí solo, no:

- Reemplaza un ERP, WMS, TMS, plataforma de compras ni sistema de gestión de pedidos.
- Ejecuta automáticamente transferencias de inventario ni crea órdenes de compra a proveedores.
- Confirma la capacidad de producción de proveedores, reservas de transportistas ni despachos aduaneros.
- Garantiza que las exportaciones de inventario y envíos estén actualizadas o completas.
- Considera restricciones operativas ausentes de sus datos de origen.
- Garantiza fechas de entrega ni elimina todos los conflictos de asignación.

Su utilidad depende de identificadores consistentes, insumos operativos actualizados, una configuración sensata y la revisión humana de excepciones materiales.

## Otras herramientas de esta serie

Explore otras herramientas ligeras de apoyo a decisiones comerciales de Theseus Workshop en el repositorio del proyecto y los listados de productos relacionados.

## Licencia

Este proyecto se distribuye bajo la Licencia Apache 2.0, como indica la insignia de licencia. Revise el archivo `LICENSE` del repositorio para conocer los términos completos de la licencia.

## Acerca de Theseus Workshop

Theseus Workshop crea herramientas prácticas y reutilizables que convierten preguntas comerciales recurrentes en flujos de trabajo estructurados. El enfoque está en ayudar a los equipos a tomar decisiones más claras usando herramientas familiares y datos comerciales existentes, sin introducir la complejidad de una plataforma empresarial completa.

OFIA aplica ese enfoque al cumplimiento de pedidos, la asignación de inventario, la conciliación de suministros y la planificación de compras.

---

**Antes de publicar:** reemplace los marcadores de posición de las URL de demo del navegador y compra de Excel en la sección inicial con los enlaces reales del producto. Confirme que el repositorio incluya el archivo `LICENSE` aplicable y que las versiones publicadas del navegador y Excel coincidan con las capacidades descritas aquí.
