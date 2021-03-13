#!/bin/bash
# Use this script to prepare data for distribution using 
# `npx geoprocessing bundle-features` of for direct import as geojson
mkdir dist/rasters
gdalwarp -t_srs EPSG:4326 src/Rasters/Carbon.tif dist/rasters/carbon.tif
gdalwarp -t_srs EPSG:4326 src/Rasters/Flow.tif dist/rasters/flow.tif
gdalwarp -t_srs EPSG:4326 src/Rasters/Nutrient.tif dist/rasters/nutrient.tif
gdalwarp -t_srs EPSG:4326 src/Rasters/Pollination.tif dist/rasters/pollination.tif
gdalwarp -t_srs EPSG:4326 src/Rasters/Recreation1.tif dist/rasters/recreation.tif
gdalwarp -t_srs EPSG:4326 src/Rasters/Sediment.tif dist/rasters/sediment.tif

# Copy these manually to s3://move-azores-rasters 

# Copy parks layer
ogr2ogr -dialect sqlite -sql "SELECT ST_UNION(shape), CAT_PNI AS category from ParqueNaturalIlha_ter group by category" -t_srs EPSG:4326 -simplify 1 -lco SIGNIFICANT_FIGURES=7 dist/parks.json src/Move-Azores.gdb
# Copy Land Use Layers
ogr2ogr -dialect sqlite -sql "SELECT ST_UNION(shape), DESIGNACAO AS category from COS_N3_2019 group by category" -t_srs EPSG:4326 -simplify 1 -lco SIGNIFICANT_FIGURES=7 dist/cosN3.json src/Move-Azores.gdb
ogr2ogr -dialect sqlite -sql "SELECT ST_UNION(shape), ludescript AS category from Sentinel2_singlepartN26cloudcover group by category" -t_srs EPSG:4326 -simplify 1 -lco SIGNIFICANT_FIGURES=7 dist/sentinal2.json src/Move-Azores.gdb
ogr2ogr -dialect sqlite -sql "SELECT ST_UNION(shape), cast(cast(lucode as int) as text) AS category from TerceiraCLC2018 group by category" -t_srs EPSG:4326 -simplify 1 -lco SIGNIFICANT_FIGURES=7 dist/clc2018.json src/Move-Azores.gdb
