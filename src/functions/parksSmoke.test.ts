/**
 * @group smoke
 */
import Handler from "./parks";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const parks = Handler.func;

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof parks).toBe("function");
  });
  test("tests run against all examples", async () => {
    const examples = await getExampleSketches();
    for (const example of examples) {
      const result = await parks(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "parks", example.properties.name);
    }
  });
});
