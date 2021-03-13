/**
 * @group unit
 */
import Handler from "./parks";
import {
  getExampleSketches,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

const parks = Handler.func;

describe("Unit tests", () => {
  test("Species area sketch intersects Área Protegida para a Gestão de Habitats ou Espécies", async () => {
    const example = (await getExampleSketches()).find(
      (s) => s.properties.name === "Species"
    )!;
    const result = await parks(example);
    expect(
      result.find(
        (r) =>
          r.categoryLabel ===
          "Área Protegida para a Gestão de Habitats ou Espécies"
      )?.area
    ).toBeGreaterThan(0);
    expect(
      result.find((r) => r.categoryLabel === "Área de Paisagem Protegida")?.area
    ).toBe(0);
  });

  test("Natural area sketch intersects Reserva Natural", async () => {
    const example = (await getExampleSketches()).find(
      (s) => s.properties.name === "Natural"
    )!;
    const result = await parks(example);
    expect(
      result.find((r) => r.categoryLabel === "Reserva Natural")?.area
    ).toBeGreaterThan(0);
    expect(
      result.find(
        (r) =>
          r.categoryLabel ===
          "Área Protegida para a Gestão de Habitats ou Espécies"
      )?.area
    ).toBe(0);
  });

  test("Natural and Species area sketch intersects both", async () => {
    const example = (await getExampleSketches()).find(
      (s) => s.properties.name === "Natural and Species"
    )!;
    const result = await parks(example);
    expect(
      result.find((r) => r.categoryLabel === "Reserva Natural")?.area
    ).toBeGreaterThan(0);
    expect(
      result.find(
        (r) =>
          r.categoryLabel ===
          "Área Protegida para a Gestão de Habitats ou Espécies"
      )?.area
    ).toBeGreaterThan(0);
  });
});
