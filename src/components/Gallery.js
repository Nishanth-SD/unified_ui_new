import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const styles = {
  container: {
    width: "90%",
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
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#34495e",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  tab: {
    flex: "1",
    textAlign: "center",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "border-bottom 0.3s",
  },
  activeTab: {
    borderBottom: "2px solid #4CAF50",
    fontWeight: "bold",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "15px",
  },
  tableContainer: {
    overflowX: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
    fontWeight: "600",
    color: "#333",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    fontSize: "14px",
    color: "#555",
  },
};

const GalleryAndStats = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [folderStructure, setFolderStructure] = useState([]);
  const [excelData, setExcelData] = useState({});

  useEffect(() => {
    fetch("/folder_structure.json") // This should be pre-generated from your backend
      .then((res) => res.json())
      .then(setFolderStructure);

    fetch("/stats.xlsx")
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheets = {};
        workbook.SheetNames.forEach((sheetName) => {
          sheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        });
        setExcelData(sheets);
      });
  }, []);

  const switchTab = (tab) => setActiveTab(tab);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gallery and Statistics</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div
          style={{ ...styles.tab, ...(activeTab === "gallery" ? styles.activeTab : {}) }}
          onClick={() => switchTab("gallery")}
        >
          Image Gallery
        </div>
        <div
          style={{ ...styles.tab, ...(activeTab === "statistics" ? styles.activeTab : {}) }}
          onClick={() => switchTab("statistics")}
        >
          Statistics
        </div>
      </div>

      {/* Gallery Section */}
      {activeTab === "gallery" && (
        <div style={styles.gallery}>
          {folderStructure.map((folder) => (
            <div key={folder.name}>
              <h3>{folder.name}</h3>
              {folder.subfolders.map((subfolder) => (
                <details key={subfolder.name} style={{ marginBottom: "10px" }}>
                  <summary>{subfolder.name}</summary>
                  <div className="carousel-container">
                    {/* Fullplant Images */}
                    <ImageCarousel title="Fullplant Images" images={subfolder.subfolders.filter((img) => /fullplant/i.test(img.name))} />
                    {/* Flower Images */}
                    <ImageCarousel title="Flower Images" images={subfolder.subfolders.filter((img) => /flower/i.test(img.name))} />
                    {/* Leaf Images */}
                    <ImageCarousel title="Leaf Images" images={subfolder.subfolders.filter((img) => /leaf/i.test(img.name))} />
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Statistics Section */}
      {activeTab === "statistics" && (
        <div>
          {Object.keys(excelData).map((sheetName) => (
            <details key={sheetName} style={{ marginBottom: "10px" }}>
              <summary>{sheetName}</summary>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {Object.keys(excelData[sheetName][0]).map((col) => (
                        <th key={col} style={styles.tableHeader}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData[sheetName].map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((cell, i) => (
                          <td key={i} style={styles.tableCell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ title, images }) => {
  return (
    <div className="carousel" style={{ textAlign: "center", marginBottom: "10px" }}>
      <h4>{title}</h4>
      <div className="carousel-images" style={{ display: "flex", overflowX: "auto", gap: "10px" }}>
        {images.length > 0 ? (
          images.map((img) => <img key={img.path} src={img.path} alt={img.name} style={{ width: "150px", borderRadius: "8px" }} />)
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default GalleryAndStats;
