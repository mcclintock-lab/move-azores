/**
 * @jest-environment node
 * @group unit
 */
import Handler from "./ecosystemServices";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const ecosystemServices = Handler.func;

describe("Unit tests", () => {
  test("", async () => {
    const test1 = (await getExampleSketches()).find(
      (e) => e.properties.name === "Test 1"
    )!;
    const result = await ecosystemServices(test1);
    expect(
      result.find((v) => v.categoryLabel === "Carbon storage")!.meanScore
    ).toBeGreaterThan(0.1);
  });
});
