# GIS Learning Guide 
**zero-to-hero GIS reading guide** designed for a **developer building a GIS platform like WYVERN**, where **LLMs convert user queries into reusable geospatial insights**.

---

## 1. GIS in One Line (Mental Model)

**GIS = Location + Data + Analysis + Insight**

User asks
“Show carbon risk for farms near rivers in MP.”

System does
→ Understand location
→ Fetch satellite + vector data
→ Run spatial + spectral analysis
→ Return insight, not raw maps

---

## 2. Core Data Types (Foundation)

### Vector Data (Discrete, Human-Defined)

![Image](https://earthdatascience.org/images/courses/earth-analytics/spatial-data/spatial-extent.png)

![Image](https://handsondataviz.org/images/13-transform/geojson-io-import.png)

**What it is**

* Points, lines, polygons
* Defined by coordinates

**Used for**

* Farms, roads, boundaries, sampling points

**Formats**

* GeoJSON
* Shapefile
* PostGIS tables

**Example**

```json
Farm boundary = polygon
River = line
Soil sensor = point
```

**Why devs love it**

* Small size
* Easy spatial queries
* Perfect for filters like “inside”, “near”, “overlaps”

---

### Raster Data (Continuous, Sensor-Derived)

![Image](https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/GUID-6754AF39-CDE9-4F9D-8C3A-D59D93059BDD-web.png)

![Image](https://blogs.loc.gov/maps/files/2023/05/5-parliament.png)

**What it is**

* Grid of pixels
* Each pixel has a value

**Used for**

* Satellite imagery
* NDVI, temperature, elevation, carbon density

**Formats**

* GeoTIFF
* Cloud Optimized GeoTIFF (COG)

**Example**

```text
Pixel value = vegetation health
Pixel size = 10m x 10m on ground
```

**Why it matters**

* All satellite data starts here
* ML + analytics mostly run on rasters

---

### Vector vs Raster (Rule of Thumb)

| Question                  | Use    |
| ------------------------- | ------ |
| “Where is it?”            | Vector |
| “How much / how intense?” | Raster |
| “Inside this boundary?”   | Vector |
| “Change over time?”       | Raster |

---

## 3. Earth Observation Basics

### Electromagnetic Spectrum (What Satellites See)

![Image](https://images.openai.com/static-rsc-3/z8PIEwH3NfWxIuLiHsP7EXKc7S8Ma4BOX0gMZxCU3FYk5nM4E3uXvbU2Q0iX3qIpEYzPjLo_6EgSxMi-dAgcnB2g10u206RjhialrtzdCNM?purpose=fullsize\&v=1)

![Image](https://www.researchgate.net/publication/242185956/figure/fig1/AS%3A298569836843008%401448196004008/The-spectral-coverage-of-the-six-visible-near-infrared-bands-with-a-representative.png)

Satellites don’t see “images”.
They measure **reflected energy at wavelengths**.

Key bands:

* Visible (RGB) → human vision
* Near Infrared (NIR) → vegetation health
* Shortwave IR → moisture, minerals

---

## 4. Types of Satellite Imaging (Critical)

### Panchromatic

![Image](https://www.researchgate.net/publication/301787878/figure/fig2/AS%3A357557962067973%401462259869694/Panchromatic-Band-of-the-Satellite-Image-of-the-High-Resolution-Ville-de-Sherbrooke.png)

![Image](https://www.geosage.com/highview/figures/definition_qb.gif)

* Single wide band
* Very high spatial resolution
* Black & white only

**Use**

* Sharp visuals
* Base layer
* Pansharpening

---

### Multispectral

![Image](https://www.e-education.psu.edu/natureofgeoinfo/sites/www.e-education.psu.edu.natureofgeoinfo/files/image/Landsat8_BandsUses.png)

![Image](https://www.researchgate.net/publication/265755845/figure/fig1/AS%3A669497434312755%401536632035972/Comparison-of-spectral-and-spatial-properties-of-panchromatic-multispectral-and.png)

* Few broad bands (RGB + NIR)
* Moderate resolution

**Use**

* NDVI
* Land cover
* Agriculture

---

### Hyperspectral (WYVERN Core)

![Image](https://www.researchgate.net/publication/323898641/figure/fig1/AS%3A11431281212376028%401702614462874/Left-Hyperspectral-data-cube-Right-The-reflectance-of-the-material-within-a-pixel.tif)

![Image](https://www.edmundoptics.com/media/rmbnzovn/figure4.jpg?rmode=max)

* Hundreds of narrow bands
* Each pixel = spectrum

**Enables**

* Carbon detection
* Crop stress
* Mineral composition
* Soil health

**Think**

```text
Pixel → spectral fingerprint → material type
```

---

## 5. From Raw Data to Insight

### Typical WYVERN Pipeline

```text
Satellite raster
→ Preprocessing (cloud mask, calibration)
→ Index / model (NDVI, carbon proxy)
→ Aggregate over vector (farm, forest)
→ Insight (score, alert, recommendation)
```

---

## 6. Core Spatial Operations (Must Know)

| Operation   | Meaning               | Example                   |
| ----------- | --------------------- | ------------------------- |
| Buffer      | distance area         | farms within 2km of river |
| Clip        | cut raster by polygon | NDVI inside farm          |
| Intersect   | overlap               | forest inside district    |
| Zonal Stats | raster → vector       | avg NDVI per farm         |
| Reproject   | CRS alignment         | satellite + map           |

---

## 7. Coordinate Systems (Silent Killer)

**Rule**

> Never mix projections blindly

* EPSG:4326 → lat/long (web, APIs)
* UTM → accurate distance & area
* Always reproject before analysis

---

## 8. GIS + LLM (Your Real Differentiator)

### What LLM Should Do

* Parse intent
* Select data
* Choose operations
* Explain result

### Example

**User**

> “Find carbon-rich farms with declining vegetation”

**LLM Plan**

1. Load farm polygons (vector)
2. Load hyperspectral rasters
3. Compute vegetation + carbon indices
4. Compare last 6 months
5. Rank + summarize

**Output**

```json
{
  "farm_id": 12,
  "carbon_score": "high",
  "vegetation_trend": "declining",
  "recommendation": "soil intervention"
}
```

---

## 9. Tools You’ll Actually Use

* QGIS → manual inspection
* Python: rasterio, geopandas, xarray
* PostGIS: spatial queries
* Cloud: COG + STAC catalogs

---

## 10. Carbon + Agro Use Cases (WYVERN Fit)

**Carbon**

* Baseline carbon mapping
* Change detection
* MRV for credits

**Agro**

* Crop stress alerts
* Yield proxy
* Soil health zoning

---

## 11. Reusable Insight Design (Important)

Bad:

```text
Map + layers
```

Good:

```text
Metric + trend + confidence + explanation
```

Example:

> “Farm A lost 12% vegetation health over 3 months due to moisture stress”

---

## 12. Final Mental Checklist (Hero Level)

Before shipping any GIS feature, ask:

* Vector or raster?
* Spatial or spectral?
* Single date or time series?
* Area-based or pixel-based?
* Insight or visualization?

If you can answer these fast, you’re operating at **GIS platform architect level**, not just map builder.

---

If you want next:

* **LLM → GIS agent architecture**
* **Carbon MRV deep dive**
* **Hyperspectral indices cheat sheet**
* **WYVERN-specific feature roadmap**

Say the word.
