import {
  Sketch,
  SketchCollection,
  GeoprocessingHandler,
  sketchArea,
  isCollection,
} from "@seasketch/geoprocessing";
import bbox from "@turf/bbox";
// @ts-ignore
import geoblaze from "geoblaze";
import layerInfo from "../../data/dist/layerInfo.json";
import { AllGeoJSON, BBox } from "@turf/helpers";

jest.setTimeout(30000);

export type RasterName =
  | "carbon"
  | "flow"
  | "nutrient"
  | "pollination"
  | "recreation"
  | "sediment";

async function loadRaster(fname: RasterName) {
  const url =
    process.env.NODE_ENV === "test"
      ? `http://127.0.0.1:5000/dist/rasters/${fname}.tif`
      : `https://move-azores-rasters.s3.eu-central-1.amazonaws.com/${fname}.tif`;
  const data = await geoblaze.load(url);
  return {
    ...layerInfo.rasters[fname],
    data,
  };
}

export const rasters = Promise.all(
  Object.keys(layerInfo.rasters).map((key) => loadRaster(key as RasterName))
);

interface EcosystemServiceCategoryResult {
  categoryLabel: string;
  meanScore: number;
  meanForStudyRegion: number;
}

export type EcosystemServicesResults = EcosystemServiceCategoryResult[];

async function ecosystemServices(
  sketch: Sketch | SketchCollection
): Promise<EcosystemServicesResults> {
  const rasterLayers = await rasters;
  if (isCollection(sketch)) {
    const sketchScores: {
      area: number;
      scores: EcosystemServiceCategoryResult[];
    }[] = [];
    for (const feature of sketch.features) {
      sketchScores.push({
        area: sketchArea(feature),
        scores: await scoresForSketch(feature),
      });
    }
    const totalArea = sketchScores.reduce((sum, r) => (sum += r.area), 0);
    const results = sketchScores[0].scores.map((score) => ({
      ...score,
      meanScore: 0,
    }));
    for (const sketchResults of sketchScores) {
      for (const categoryResults of sketchResults.scores) {
        results.find(
          (r) => r.categoryLabel === categoryResults.categoryLabel
        )!.meanScore +=
          categoryResults.meanScore * (sketchResults.area / totalArea);
      }
    }
    return results;
  } else {
    return await scoresForSketch(sketch);
  }
}

export default new GeoprocessingHandler(ecosystemServices, {
  title: "ecosystemServices",
  description: "Calculates ecosystem services score for multiple categories",
  timeout: 60, // seconds
  memory: 1024, // megabytes
  executionMode: "sync",
  // Specify any Sketch Class form attributes that are required
  requiresProperties: [],
});

async function scoresForSketch(sketch: Sketch) {
  const scores: EcosystemServiceCategoryResult[] = [];
  for (const raster of await rasters) {
    const mean = await geoblaze.mean(raster.data, sketch);
    scores.push({
      categoryLabel: raster.label,
      meanScore: mean[0],
      meanForStudyRegion: raster.meanForStudyRegion,
    });
  }
  return scores;
}
