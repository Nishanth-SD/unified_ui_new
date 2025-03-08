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

const StatewiseSpecies = () => {
    const navigate = useNavigate();
  const [data, setData] = useState({});
  const [expandedStates, setExpandedStates] = useState({});
  const [expandedFamilies, setExpandedFamilies] = useState({});
  const [expandedGenera, setExpandedGenera] = useState({});

  useEffect(() => {
    fetch("/statewise_species.json", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  const toggleState = (state) => {
    setExpandedStates((prev) => ({ ...prev, [state]: !prev[state] }));
  };

  const toggleFamily = (state, family) => {
    setExpandedFamilies((prev) => ({
      ...prev,
      [`${state}-${family}`]: !prev[`${state}-${family}`],
    }));
  };

  const toggleGenus = (state, family, genus) => {
    setExpandedGenera((prev) => ({
      ...prev,
      [`${state}-${family}-${genus}`]: !prev[`${state}-${family}-${genus}`],
    }));
  };

  const handleSpeciesClick = (genus, species) => {
    const speciesName = `${species}`;
    navigate(`/species/${speciesName}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Statewise Classification of Species</h2>
      {Object.entries(data).map(([state, families]) => (
        <div key={state} style={{ marginBottom: "8px" }}>
          <button
            style={styles.button}
            onClick={() => toggleState(state)}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {state}
          </button>
          {expandedStates[state] && (
            <div style={styles.subContainer}>
              {Object.entries(families).map(([family, genera]) => (
                <div key={family} style={{ marginBottom: "6px" }}>
                  <button
                    style={styles.subButton}
                    onClick={() => toggleFamily(state, family)}
                  >
                    {family}
                  </button>
                  {expandedFamilies[`${state}-${family}`] && (
                    <div style={styles.subContainer}>
                      {Object.entries(genera).map(([genus, species]) => (
                        <div key={genus} style={{ marginBottom: "6px" }}>
                          <button
                            style={styles.subButton}
                            onClick={() => toggleGenus(state, family, genus)}
                          >
                            {genus}
                          </button>
                          {expandedGenera[`${state}-${family}-${genus}`] && (
                            <ul style={styles.list}>
                              {species.map((sp) => (
                                <li
                                    key={sp}
                                    onClick={() => handleSpeciesClick(genus, sp)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {`${sp}`}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatewiseSpecies;
