import {
  Sketch,
  SketchCollection,
  GeoprocessingHandler,
} from "@seasketch/geoprocessing";
import { Polygon, MultiPolygon, FeatureCollection } from "@turf/helpers";
import parkFeatures from "../../data/dist/parks.json";
import layerInfo from "../../data/dist/layerInfo.json";
import {
  CategoryResult,
  getCategoryIntersections,
} from "./getCategoryIntersections";

export type ParksResults = CategoryResult[];

async function parks(sketch: Sketch | SketchCollection): Promise<ParksResults> {
  return getCategoryIntersections(
    sketch,
    parkFeatures as FeatureCollection<
      Polygon | MultiPolygon,
      { category: string }
    >,
    layerInfo.vectors.parks
  );
}

export default new GeoprocessingHandler(parks, {
  title: "parks",
  description: "Calculates overlap with natural parks",
  timeout: 10, // seconds
  memory: 1024, // megabytes
  executionMode: "sync",
  // Specify any Sketch Class form attributes that are required
  requiresProperties: [],
});
