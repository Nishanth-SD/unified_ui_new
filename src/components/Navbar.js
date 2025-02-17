import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      {isMobile && (
        <button style={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      )}
      <ul
        style={{
          ...styles.navLinks,
          ...(isMobile ? (isOpen ? styles.showMenu : styles.hideMenu) : {}),
        }}
      >
        <li><Link to="/" style={styles.link}>Home</Link></li>

        <li
          style={styles.dropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span style={styles.link}>Herb Data View ▼</span>
          {dropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <li><Link to="/family-index" style={styles.dropdownLink}>Family Index (A-Z)</Link></li>
              <li><Link to="/genus-index" style={styles.dropdownLink}>Genus Index (A-Z)</Link></li>
              <li><Link to="/species-index" style={styles.dropdownLink}>Species Index (A-Z)</Link></li>
              <li><Link to="/state-index" style={styles.dropdownLink}>State Index (A-Z) & Image</Link></li>
              <li><Link to="/herbs-gallery" style={styles.dropdownLink}>Herbs Gallery</Link></li>
              <li><Link to="/family-genus-species" style={styles.dropdownLink}>Family → Genus → Species</Link></li>
              <li><Link to="/landscape-wise" style={styles.dropdownLink}>Landscape Wise</Link></li>
              <li><Link to="/herb-search" style={styles.dropdownLink}>Herb Search</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/image-herb-identification" style={styles.link}>Image-based Herb Identification</Link></li>
        <li><Link to="/text-herb-identification" style={styles.link}>Text-based Herb Identification</Link></li>
        <li><Link to="/herb-qa" style={styles.link}>Herb Question Answering</Link></li>

        <li
          style={styles.dropdown}
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <span style={styles.link}>Resources ▼</span>
          {resourcesOpen && (
            <ul style={styles.dropdownMenu}>
              <li><Link to="/download" style={styles.dropdownLink}>Download</Link></li>
              <li><Link to="/mobile-app" style={styles.dropdownLink}>Mobile App</Link></li>
              <li><Link to="/data-request" style={styles.dropdownLink}>Data Request Form</Link></li>
              <li><Link to="/copyright" style={styles.dropdownLink}>Copyright Information</Link></li>
              <li><Link to="/contact" style={styles.dropdownLink}>Contact Details</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,rgb(60, 119, 84),rgb(16, 141, 24))",
    color: "white",
    padding: "15px 20px",
    position: "relative",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  menuButton: {
    fontSize: "1.8rem",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    position: "absolute",
    left: "15px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    padding: "0",
    margin: "0",
    alignItems: "center",
  },
  hideMenu: {
    display: "none",
  },
  showMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "60px",
    left: "0",
    width: "100%",
    background: "linear-gradient(135deg,rgb(67, 70, 75),rgb(16, 141, 24))",
    textAlign: "center",
    padding: "10px 0",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background 0.3s, transform 0.2s",
    fontSize: "90%",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#2a5298",
    listStyle: "none",
    padding: "0",
    margin: "0",
    minWidth: "220px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    zIndex: "10",
  },
  dropdownLink: {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "12px 20px",
    transition: "background 0.3s, transform 0.2s",
    fontSize: "90%",
  },
  linkHover: {
    background: "#3b5998",
    transform: "scale(1.05)",
  },
};

export default Navbar;
