/**
 * @group smoke
 */
import Handler from "./landUse";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const landUse = Handler.func;

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof landUse).toBe("function");
  });
  test("tests run against all examples", async () => {
    const examples = await getExampleSketches();
    for (const example of examples) {
      const result = await landUse(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "landUse", example.properties.name);
    }
  });
});
