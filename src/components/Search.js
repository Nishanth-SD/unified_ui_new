import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 6px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "25px",
    textAlign: "center",
    color: "#4A154B",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    backgroundColor: "#fff",
    transition: "0.3s",
  },
  inputFocus: {
    borderColor: "#4A154B",
    boxShadow: "0 0 5px rgba(74, 21, 75, 0.3)",
  },
  searchButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4A154B",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "15px",
    transition: "0.3s",
  },
  searchButtonHover: {
    backgroundColor: "#6A1B9A",
  },
  results: {
    marginTop: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#4A154B",
    color: "white",
    fontWeight: "bold",
    padding: "12px",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "12px",
    fontSize: "16px",
  },
};

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [herbData, setHerbData] = useState([]);
  const [filters, setFilters] = useState({
    family: "",
    genus: "",
    species: "",
    vernacular: "",
    phytochemicals: "",
    ailments: "",
    stateAvailability: "",
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/herb_data.json")
      .then((res) => res.json())
      .then((data) => setHerbData(Object.values(data)));
  }, []);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const filtered = herbData.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        value
          ? Array.isArray(item[key])
            ? item[key].some((v) => v.toLowerCase().includes(value.toLowerCase()))
            : String(item[key]).toLowerCase().includes(value.toLowerCase())
          : true
      )
    );
    setResults(filtered);
  };

  const handleSpeciesClick = (species) => {
    navigate(`/species/${species}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Advanced Search</h2>
      <div style={styles.formGrid}>
        <input type="text" placeholder="Family" style={styles.input} onChange={(e) => handleChange("Family", e.target.value)} />
        <input type="text" placeholder="Genus" style={styles.input} onChange={(e) => handleChange("Genus", e.target.value)} />
        <input type="text" placeholder="Species" style={styles.input} onChange={(e) => handleChange("Species", e.target.value)} />
        <input type="text" placeholder="Vernacular Name" style={styles.input} onChange={(e) => handleChange("Vernacular name", e.target.value)} />
        <input type="text" placeholder="Phytochemicals" style={styles.input} onChange={(e) => handleChange("Phytochemicals", e.target.value)} />
        <input type="text" placeholder="Ailments Cured" style={styles.input} onChange={(e) => handleChange("Ailments cured", e.target.value)} />
        <input type="text" placeholder="Statewise Availability" style={styles.input} onChange={(e) => handleChange("Statewise availability", e.target.value)} />
      </div>
      <button style={styles.searchButton} onClick={handleSearch}>Search</button>

      <div style={styles.results}>
        {results.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Scientific Name</th>
                <th style={styles.tableHeader}>Family</th>
                <th style={styles.tableHeader}>Genus</th>
                <th style={styles.tableHeader}>Species</th>
                <th style={styles.tableHeader}>Ailments Cured</th>
                <th style={styles.tableHeader}>Statewise Availability</th>
                <th style={styles.tableHeader}>Plant Parts & Usage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell} onClick={() => handleSpeciesClick(item["Scientific Name"]) }>{item["Scientific Name"]}</td>
                  <td style={styles.tableCell}>{item.Family}</td>
                  <td style={styles.tableCell}>{item.Genus}</td>
                  <td style={styles.tableCell}>{item.Species}</td>
                  <td style={styles.tableCell}>{item["Ailments cured"] ? item["Ailments cured"].join(", ") : "N/A"}</td>
                  <td style={styles.tableCell}>{item["Statewise availability"] ? item["Statewise availability"].join(", ") : "N/A"}</td>
                  <td style={styles.tableCell}>{item["Plant parts and method of its use"] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
