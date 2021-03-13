import {
  Sketch,
  SketchCollection,
  GeoprocessingHandler,
} from "@seasketch/geoprocessing";
import {
  CategorizedFeatureCollection,
  CategoryResult,
  getCategoryIntersections,
} from "./getCategoryIntersections";
import layerInfo from "../../data/dist/layerInfo.json";
import clc from "../../data/dist/clc2018.json";
import cosN3 from "../../data/dist/cosN3.json";
import sentinal from "../../data/dist/sentinal2.json";

export type LandUseResults = {
  clc: CategoryResult[];
  sentinal: CategoryResult[];
  cosN3: CategoryResult[];
};

async function landUse(
  sketch: Sketch | SketchCollection
): Promise<LandUseResults> {
  return {
    clc: getCategoryIntersections(
      sketch,
      clc as CategorizedFeatureCollection,
      layerInfo.vectors.clc
    ),
    cosN3: getCategoryIntersections(
      sketch,
      cosN3 as CategorizedFeatureCollection,
      layerInfo.vectors.cosN3
    ),
    sentinal: getCategoryIntersections(
      sketch,
      sentinal as CategorizedFeatureCollection,
      layerInfo.vectors.sentinal
    ),
  };
}

export default new GeoprocessingHandler(landUse, {
  title: "landUse",
  description: "Calculates overlap with different land use categories",
  timeout: 30, // seconds
  memory: 1024, // megabytes
  executionMode: "sync",
  // Specify any Sketch Class form attributes that are required
  requiresProperties: [],
});
