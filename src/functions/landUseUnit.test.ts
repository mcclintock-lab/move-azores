/**
 * @group unit
 */
import Handler from "./landUse";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const landUse = Handler.func;

describe("Unit tests", () => {
  test("Area should be > 700 sq km", async () => {
    const examples = await getExampleSketches();
    const result = await landUse(examples[0]);
    expect(result.area / 1000 ** 2).toBeGreaterThan(700);
  });
});
