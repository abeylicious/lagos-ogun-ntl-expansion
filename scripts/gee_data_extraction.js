/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Workflow:
// Filter both states and dissolve into a single MultiPolygon Geometry right away
var lagosOgunGeom = ee.FeatureCollection("FAO/GAUL/2015/level1")
                      .filter(ee.Filter.inList('ADM1_NAME', ['Lagos', 'Ogun']))
                      .geometry(); // <--- Converts FeatureCollection directly to Geometry
          
//we use ee.Filter.inList('ADM1_NAME', ['Lagos', 'Ogun']) 
//to combine both states into one unified processing geometry.

Map.centerObject(lagosOgunGeom, 9);
Map.addLayer(lagosOgunGeom, {color: 'cyan'}, 'Lagos-Ogun Boundary', false);


//LOAD & FILTER VIIRS (Stray Light Corrected) Image
// Filter out the average radiation band//Radiance band (nW/cm^2/sr)
var viirs = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
              .select('avg_rad'); 
// Create a full monthly time series to visualize macro growth
var ntlTimeSeries = viirs.filter(ee.Filter.date('2015-01-01', '2026-01-01'))
                         .filter(ee.Filter.bounds(lagosOgunGeom));            
              
var corridorChart = ui.Chart.image.series({
  imageCollection: ntlTimeSeries,
  region: lagosOgunGeom,
  reducer: ee.Reducer.sum(), // Aggregate radiance sum across both states
  scale: 500, // VIIRS native resolution (~500m)
}).setOptions({
  title: 'Lagos-Ogun Corridor Total Aggregate Nighttime Light Emission (2014–2025)',
  hAxis: {title: 'Year-Month', format: 'YYYY'},
  vAxis: {title: 'Total Sum Radiance (nW/cm²/sr)'},
  lineWidth: 2,
  series: {0: {color: '#00FFCC'}}
});

// Render chart in the Console
print(corridorChart);              

// Create Annual Composites for Baseline for a 20yr- period, 2005 and recent2025
var ntl2015 = viirs.filter(ee.Filter.date('2015-01-01', '2016-01-01'))
                   .median().clip(lagosOgunGeom);

var ntl2025 = viirs.filter(ee.Filter.date('2025-01-01', '2026-01-01'))
                   .median().clip(lagosOgunGeom);

// Define Visualizations
var ntlVis = {min: 0.0, max: 35.0, palette: ['000000', '4B0082', '00FFCC', 'FFD700']};


// Add Layers to Map
Map.addLayer(ntl2015, ntlVis, 'VIIRS NTL 2015');
Map.addLayer(ntl2025, ntlVis, 'VIIRS NTL 2025');

// 5. Export GeoTIFFs to Google Drive for QGIS Bitwise Processing
Export.image.toDrive({
  image: ntl2015,
  description: 'Lagos_Ogun_NTL_2015',
  scale: 500,
  region: lagosOgunGeom,
  maxPixels: 1e9,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: ntl2025,
  description: 'Lagos_Ogun_NTL_2025',
  scale: 500,
  region: lagosOgunGeom,
  maxPixels: 1e9,
  fileFormat: 'GeoTIFF'
});



