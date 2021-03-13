import {
  Sketch,
  SketchCollection,
  GeoprocessingHandler,
  sketchArea,
  isCollection,
} from "@seasketch/geoprocessing";
import bbox from "@turf/bbox";
import { AllGeoJSON, BBox } from "@turf/helpers";

export interface AreaResults {
  /** area of the sketch in square meters */
  area: number;
  bbox: BBox;
}

async function area(sketch: Sketch | SketchCollection): Promise<AreaResults> {
  return {
    area: sketchArea(sketch),
    bbox: bbox(sketch as AllGeoJSON),
  };
}

export default new GeoprocessingHandler(area, {
  title: "area",
  description: "Calculates the sketch area",
  timeout: 5, // seconds
  memory: 1024, // megabytes
  executionMode: "sync",
  // Specify any Sketch Class form attributes that are required
  requiresProperties: [],
});
