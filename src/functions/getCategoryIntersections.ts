import {
  SketchCollection,
  Sketch,
  isCollection,
} from "@seasketch/geoprocessing";
import {
  FeatureCollection,
  Feature,
  Polygon,
  MultiPolygon,
} from "@turf/helpers";
import dissolve from "@turf/dissolve";
import combine from "@turf/combine";
import intersect from "@turf/intersect";
import calcArea from "@turf/area";

export interface CategoryResult {
  categoryLabel: string;
  /* Intersected area in square meters */
  area: number;
  /* Area in square meters of this entire category in the dataset */
  categoryArea: number;
  /* fraction of entire dataset captured in the sketch */
  fraction: number;
}

export type CategorizedFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  { category: string }
>;

export function getCategoryIntersections(
  sketch: Sketch | SketchCollection,
  featureCollection: CategorizedFeatureCollection,
  categoryInfo: { [category: string]: { area: number; categoryLabel: string } }
): CategoryResult[] {
  let dissolvedSketch: Feature<MultiPolygon | Polygon>;
  if (isCollection(sketch)) {
    dissolvedSketch = combine(
      dissolve({
        type: "FeatureCollection",
        features: (sketch.features as unknown) as Feature<
          Polygon,
          { category: string }
        >[],
      })
    ).features[0] as Feature<Polygon | MultiPolygon>;
  } else {
    dissolvedSketch = sketch as Feature<Polygon | MultiPolygon>;
  }
  const results: CategoryResult[] = Object.values(categoryInfo).map((val) => {
    return {
      categoryArea: val.area,
      categoryLabel: val.categoryLabel,
      area: 0,
      fraction: 0,
    };
  });
  for (const feature of featureCollection.features) {
    const intersection = intersect(dissolvedSketch, feature);
    if (intersection) {
      const category = feature.properties.category;
      // @ts-ignore
      const categoryLabel = categoryInfo[category].categoryLabel;
      let existingResult = results.find(
        (r) => r.categoryLabel === categoryLabel
      )!;
      if (!existingResult) {
        throw new Error("Could not find category " + categoryLabel);
      }
      existingResult.area += calcArea(intersection);
    }
  }
  // Loop through and calculate fraction
  for (const record of results) {
    record.fraction = record.area / record.categoryArea;
  }
  return results;
}
