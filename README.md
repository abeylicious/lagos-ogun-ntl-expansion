# lagos-ogun-ntl-expansion
10-year spatiotemporal change detection of urban settlement expansion across the Lagos-Ogun interstate corridor using VIIRS Nighttime Lights (2015–2025).
# 🛰️ Lagos-Ogun Interstate Corridor: Decadal Settlement Expansion & Radiance Growth (2015–2025)

## 📌 Executive Summary
This repository analyzes the cross-boundary urban spillover and spatial densification along the **Lagos–Ogun interstate corridor** (e.g., Berger, Mowe, Ibafo, Sagamu, and Ota axes) over a 10-year period (2015–2025). 

Using **VIIRS Day/Night Band (DNB)** Nighttime Light (NTL) satellite composites, this project maps how high housing demands and commercial expansion in Lagos State have catalyzed rapid settlement growth across the Ogun State border.

---

## 🔬 Methodology & Spatial Framework
* **Data Sources:** VIIRS Nighttime Day/Night Band (DNB) Monthly/Annual Composites via Google Earth Engine (GEE).
* **Spatial Analytics:** Bitwise Matrix Classification in QGIS Raster Calculator isolating:
  * 🟪 **Cross-Border Expansion:** Unlit rural land in 2015 converted to settled land by 2025.
  * 🟨 **Core Densification:** Established urban nodes experiencing high radiance surges ($\ge +3.0 \text{ nW/cm}^2/\text{sr}$).
  * ⬜ **Stable Baseline Footprint:** Persistent 2015 urban boundaries.

---

## 📁 Expected Repository Structure
```text
lagos-ogun-ntl-expansion/
├── README.md
├── scripts/
│   ├── gee_data_extraction.js
│   └── qgis_raster_calculator.sql
├── maps/
│   └── Lagos_Ogun_Decadal_Growth.png
└── data/
    └── README.md
