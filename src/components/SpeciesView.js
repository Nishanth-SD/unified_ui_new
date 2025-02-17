import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndiaMap from "react-svgmap-india";

const SpeciesDetails = () => {
  const { speciesName } = useParams();
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/herb_data.json", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch species data");
        }
        return res.json();
      })
      .then((json) => {
        const speciesInfo = json[speciesName];
        if (!speciesInfo) {
          throw new Error(`No data found for species: ${speciesName}`);
        }
        setSpeciesData(speciesInfo);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [speciesName]);

  if (error) {
    return <div style={styles.error}>{`Error: ${error}`}</div>;
  }

  if (!speciesData) {
    return <div>Loading...</div>;
  }

  // Helper function to safely check arrays and missing fields
  const safeValue = (value, defaultValue = "N/A") => (value && value !== "N/A" ? value : defaultValue);
  const safeJoin = (arr) => (Array.isArray(arr) && arr.length ? arr.join(", ") : "N/A");

  // States where the species is available
  const speciesStates = speciesData["Statewise availability"] || [];

  const stateAbbreviations = {
    "Andhra Pradesh": "AP",
    "Arunachal Pradesh": "AR",
    Assam: "AS",
    Bihar: "BR",
    Chandigarh: "CH",
    "Chhattisgarh": "CT",
    "Dadra and Nagar Haveli": "DD",
    Delhi: "DL",
    "Daman and Diu": "DN",
    Goa: "GA",
    Gujarat: "GJ",
    "Himachal Pradesh": "HP",
    Haryana: "HR",
    Jharkhand: "JH",
    "Jammu and Kashmir": "JK",
    Karnataka: "KA",
    Kerala: "KL",
    Ladakh: "LA",
    Lakshadweep: "LD",
    Maharashtra: "MH",
    Meghalaya: "ML",
    Manipur: "MN",
    "Madhya Pradesh": "MP",
    Mizoram: "MZ",
    Nagaland: "NL",
    Odisha: "OR",
    Punjab: "PB",
    Puducherry: "PY",
    Rajasthan: "RJ",
    Sikkim: "SK",
    Telangana: "TG",
    "Tamil Nadu": "TN",
    Tripura: "TR",
    "Uttar Pradesh": "UP",
    "Uttarakhand": "UT",
    "West Bengal": "WB",
  };

  const highlightedStates = speciesStates.map(
    (state) => stateAbbreviations[state] || null
  ).filter((state) => state); // Filter out any undefined values

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Species Information: {safeValue(speciesData.Genus)+ " " + safeValue(speciesData.Species)}</h2>
      <div style={styles.row}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Attribute</th>
                <th style={styles.tableHeader}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableCell}>Scientific Name</td>
                <td style={styles.tableCell}>{safeValue(speciesData.Genus)+ " " + safeValue(speciesData.Species)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Genus</td>
                <td style={styles.tableCell}>{safeValue(speciesData.Genus)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Species</td>
                <td style={styles.tableCell}>{safeValue(speciesData.Species)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Family</td>
                <td style={styles.tableCell}>{safeValue(speciesData.Family)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Synonym</td>
                <td style={styles.tableCell}>{safeValue(speciesData.Synonym)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Statewise Availability</td>
                <td style={styles.tableCell}>{safeJoin(speciesData["Statewise availability"])}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Phytochemicals</td>
                <td style={styles.tableCell}>{safeJoin(speciesData.Phytochemicals)}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Ailments Cured</td>
                <td style={styles.tableCell}>{safeJoin(speciesData["Ailments cured"])}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Plant Parts and Method</td>
                <td style={styles.tableCell}>{safeValue(speciesData["Plant parts and method of its use"])}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Vernacular Name</td>
                <td style={styles.tableCell}>{safeJoin(speciesData.VernacularName)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={styles.mapContainer}>
          <IndiaMap
            size="400px"
            mapColor="white"
            strokeColor="#4f4f4f"
            strokeWidth="1"
            hoverColor="#48d8f5"
            highlightedStates={highlightedStates} // Highlight the states where the species is present
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  tableContainer: {
    flex: "1",
    padding: "10px",
  },
  mapContainer: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
    fontWeight: "600",
    color: "#333",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    color: "#555",
  },
};

export default SpeciesDetails;
