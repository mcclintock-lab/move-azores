const fs = require("fs");
const parks = require("./dist/parks.json");
const sentinal = require("./dist/sentinal2.json");
const cosN3 = require("./dist/cosN3.json");
const renderer = require("./lucodeRenderer.json");

const categories = {};
for (const feature of parks.features) {
  categories[feature.properties.category] = feature.properties.category;
}
for (const feature of sentinal.features) {
  categories[feature.properties.category] = feature.properties.category;
}
for (const feature of cosN3.features) {
  categories[feature.properties.category] = feature.properties.category;
}

const clcCategories = {};
for (const r of renderer.renderer.uniqueValueInfos) {
  categories[r.value] = r.label;
}

fs.writeFileSync(
  "./categoryNames.json",
  JSON.stringify(categories, null, "  ")
);
