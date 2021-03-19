import React from "react";
import {
  ResultsCard,
  SketchAttributesCard,
  Skeleton,
} from "@seasketch/geoprocessing/client";
// Import the results type definition from your functions to type-check your
// component render functions
import { EcosystemServicesResults } from "../functions/ecosystemServices";
import { AreaResults } from "../functions/area";
import useSketchProperties from "@seasketch/geoprocessing/src/hooks/useSketchProperties";
import { ParksResults } from "../functions/parks";
import { LandUseResults } from "../functions/landUse";
import "./index.css";

const Number = new Intl.NumberFormat("en", {
  style: "decimal",
  maximumFractionDigits: 1,
});

const Percent = new Intl.NumberFormat("en", {
  style: "percent",
  maximumFractionDigits: 0,
});

const tdStyle = {
  padding: "5px 4px",
};

const thStyle = {
  padding: "5px 4px",
};
const trStyle = (alternate: boolean, area: number) => ({
  ...(alternate ? { background: "rgba(0,0,0,0.05)" } : {}),
  color: area > 0 ? "black" : "rgba(0,0,0,0.2)",
});

const MOVEClient = () => {
  const [props, getProp] = useSketchProperties();
  return (
    <>
      <ResultsCard
        title="📐 Area"
        functionName="area"
        skeleton={
          <p>
            <Skeleton style={{}}>&nbsp;</Skeleton>
          </p>
        }
      >
        {(data: AreaResults) => (
          <p>
            The area of this {props.isCollection ? "collection" : "zone"} is{" "}
            <b>{Number.format(Math.round(data.area * 1e-6))}</b> km²
          </p>
        )}
      </ResultsCard>
      <ResultsCard
        title="Ecosystem Services"
        functionName="ecosystemServices"
        skeleton={
          <p>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
          </p>
        }
      >
        {(data: EcosystemServicesResults) => (
          <table
            style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", width: 270, ...thStyle }}>
                  Category
                </th>
                <th style={{ textAlign: "center", ...thStyle }}>Score</th>
                <th style={{ textAlign: "center", ...thStyle }}>Average</th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel))
                .map((d, i) => (
                  <tr style={i % 2 ? {} : { background: "rgba(0,0,0,0.05)" }}>
                    <td style={{ textAlign: "left", ...tdStyle }}>
                      {d.categoryLabel}
                    </td>
                    <td style={{ textAlign: "center", ...tdStyle }}>
                      {Number.format(d.meanScore)}
                    </td>
                    <td style={{ textAlign: "center", ...tdStyle }}>
                      {Number.format(d.meanForStudyRegion)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </ResultsCard>
      <ResultsCard
        title="Parks"
        functionName="parks"
        skeleton={
          <p>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
          </p>
        }
      >
        {(data: ParksResults) => (
          <table
            style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", width: 250, ...thStyle }}>
                  Category
                </th>
                <th style={{ textAlign: "center", ...thStyle }}>Area (km²)</th>
                <th style={{ textAlign: "center", ...thStyle }}>Percent</th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel))
                .map((d, i) => (
                  <tr style={i % 2 ? {} : { background: "rgba(0,0,0,0.05)" }}>
                    <td style={{ textAlign: "left", ...tdStyle }}>
                      {d.categoryLabel}
                    </td>
                    <td style={{ textAlign: "center", ...tdStyle }}>
                      {Number.format(d.area * 1e-6)}
                    </td>
                    <td style={{ textAlign: "center", ...tdStyle }}>
                      {Percent.format(d.fraction)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </ResultsCard>
      <ResultsCard
        title="Land Use"
        functionName="landUse"
        skeleton={
          <p>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
            <Skeleton style={{}}>&nbsp;</Skeleton>
          </p>
        }
      >
        {(data: LandUseResults) => (
          <>
            <h3>Sentinal</h3>
            <table
              style={{
                width: "100%",
                marginTop: 12,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: 250, ...thStyle }}>
                    Category
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>
                    Area (km²)
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>Percent</th>
                </tr>
              </thead>
              <tbody>
                {data.sentinal
                  .sort((a, b) =>
                    a.categoryLabel.localeCompare(b.categoryLabel)
                  )
                  .map((d, i) => (
                    <tr style={trStyle(i % 2 === 0, d.area)}>
                      <td style={{ textAlign: "left", ...tdStyle }}>
                        {d.categoryLabel}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Number.format(d.area * 1e-6)}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Percent.format(d.fraction)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h3>CLC 2018</h3>
            <table
              style={{
                width: "100%",
                marginTop: 12,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: 250, ...thStyle }}>
                    Category
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>
                    Area (km²)
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>Percent</th>
                </tr>
              </thead>
              <tbody>
                {data.clc
                  .sort((a, b) =>
                    a.categoryLabel.localeCompare(b.categoryLabel)
                  )
                  .map((d, i) => (
                    <tr style={trStyle(i % 2 === 0, d.area)}>
                      <td style={{ textAlign: "left", ...tdStyle }}>
                        {d.categoryLabel}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Number.format(d.area * 1e-6)}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Percent.format(d.fraction)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h3>COS N3 2019</h3>
            <table
              style={{
                width: "100%",
                marginTop: 12,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: 250, ...thStyle }}>
                    Category
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>
                    Area (km²)
                  </th>
                  <th style={{ textAlign: "center", ...thStyle }}>Percent</th>
                </tr>
              </thead>
              <tbody>
                {data.cosN3
                  .sort((a, b) =>
                    a.categoryLabel.localeCompare(b.categoryLabel)
                  )
                  .map((d, i) => (
                    <tr style={trStyle(i % 2 === 0, d.area)}>
                      <td style={{ textAlign: "left", ...tdStyle }}>
                        {d.categoryLabel}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Number.format(d.area * 1e-6)}
                      </td>
                      <td style={{ textAlign: "center", ...tdStyle }}>
                        {Percent.format(d.fraction)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </ResultsCard>
      <SketchAttributesCard autoHide={true} />
    </>
  );
};

const LoadingSkeleton = () => (
  <p>
    <Skeleton style={{}}>&nbsp;</Skeleton>
    <Skeleton style={{}}>&nbsp;</Skeleton>
    <Skeleton style={{}}>&nbsp;</Skeleton>
    <Skeleton style={{}}>&nbsp;</Skeleton>
    <Skeleton style={{}}>&nbsp;</Skeleton>
  </p>
);

export default MOVEClient;
