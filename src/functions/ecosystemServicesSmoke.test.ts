/**
 * @jest-environment node
 * @group smoke
 */
import Handler from "./ecosystemServices";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const ecosystemServices = Handler.func;

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof ecosystemServices).toBe("function");
  });
  test("tests run against all examples", async () => {
    const examples = await getExampleSketches();
    for (const example of examples) {
      const result = await ecosystemServices(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "ecosystemServices", example.properties.name);
    }
  });
});
