const fs = require("fs");
const geoblaze = require("geoblaze");
const rasters = require("./dist/rasters/layers.json");
const categoryNames = require("./categoryNames.json");
const handler = require("serve-handler");
const http = require("http");
const calcArea = require("@turf/area").default;
const cos = require("./dist/cosN3.json");
const sentinal = require("./dist/sentinal2.json");

// have to host rasters locally since geoblaze can't handle it otherwise
const server = http.createServer((req, res) => handler(req, res));

server.listen(3333, async () => {
  const layerInfo = {
    rasters: {},
    vectors: {
      parks: calcTotals(categoryNames, require("./dist/parks.json")),
      clc: calcTotals(categoryNames, require("./dist/clc2018.json")),
      cosN3: calcTotals(categoryNames, require("./dist/cosN3.json")),
      sentinal: calcTotals(categoryNames, require("./dist/sentinal2.json")),
    },
  };

  for (const fname in rasters) {
    console.log("processing", fname);
    layerInfo.rasters[fname] = {
      label: rasters[fname],
    };
    const raster = await geoblaze.load(
      `http://127.0.0.1:3333/dist/rasters/${fname}.tif`
    );
    const mean = (await geoblaze.mean(raster))[0];
    layerInfo.rasters[fname].meanForStudyRegion = mean;
  }

  fs.writeFileSync(
    `./dist/layerInfo.json`,
    JSON.stringify(layerInfo, null, "  ")
  );
  console.log("Wrote output to ./dist/layerInfo.json");
  process.exit();
});

function calcTotals(categoryNames, featureCollection) {
  const info = {};
  for (const feature of featureCollection.features) {
    if (!info[feature.properties.category]) {
      info[feature.properties.category] = {
        categoryLabel: categoryNames[feature.properties.category],
        area: 0,
      };
    }
    info[feature.properties.category].area += calcArea(feature);
  }
  return info;
}
