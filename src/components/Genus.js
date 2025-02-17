import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  button: {
    width: "100%",
    textAlign: "left",
    fontWeight: "600",
    backgroundColor: "#c3e6cb",
    padding: "12px",
    borderRadius: "6px",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonHover: {
    backgroundColor: "#a8d5ba",
  },
  subContainer: {
    paddingLeft: "16px",
    marginTop: "4px",
    borderLeft: "4px solid #66bb6a",
  },
  subButton: {
    width: "100%",
    textAlign: "left",
    backgroundColor: "#e8f5e9",
    padding: "8px",
    borderRadius: "6px",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  list: {
    paddingLeft: "16px",
    listStyleType: "disc",
    marginTop: "4px",
    color: "#555",
    paddingInlineStart: "1em",
  },
};

const GenusTree = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/processed_herb_data.json", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const sortedData = Object.keys(json).reduce((acc, family) => {
          Object.entries(json[family]).forEach(([genus, species]) => {
            if (!acc[genus]) {
              acc[genus] = [];
            }
            acc[genus].push(...species);
          });
          return acc;
        }, {});

        // Sort the genera and species alphabetically
        const sortedGenera = Object.keys(sortedData).sort();
        const sortedSpeciesData = sortedGenera.reduce((acc, genus) => {
          acc[genus] = sortedData[genus].sort();
          return acc;
        }, {});

        setData(sortedSpeciesData);
      });
  }, []);

  const [expandedGenera, setExpandedGenera] = useState({});

  const toggleGenus = (genus) => {
    setExpandedGenera((prev) => ({ ...prev, [genus]: !prev[genus] }));
  };

  const handleSpeciesClick = (genus, species) => {
    const speciesName = `${genus} ${species}`;
    navigate(`/species/${speciesName}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Genus Classification</h2>
      {Object.entries(data).map(([genus, species]) => (
        <div key={genus} style={{ marginBottom: "8px" }}>
          <button
            style={styles.button}
            onClick={() => toggleGenus(genus)}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {genus}
          </button>
          {expandedGenera[genus] && (
            <div style={styles.subContainer}>
              <p>Species</p>
              <ul style={styles.list}>
                {species.map((sp) => (
                  <li key={sp} onClick={() => handleSpeciesClick(genus, sp)} style={{ cursor: "pointer" }}>
                    {`${genus} ${sp}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GenusTree;
