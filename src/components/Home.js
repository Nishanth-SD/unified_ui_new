import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to AUDistherbs</h1>
        <p style={styles.subtitle}>Exploring the world of Indian medicinal plants</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Indian Herbs</h2>
        <p style={styles.paragraph}>
          Indian herbs have been integral to traditional medicine for centuries. Known for their
          medicinal properties, they have been used for healing, wellness, and spiritual purposes.
          The diverse flora of India holds a treasure trove of plant species with therapeutic benefits.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About DST Project</h2>
        <p style={styles.paragraph}>
          The Department of Science and Technology (DST) project aims to document and preserve the
          medicinal properties of Indian herbs. This project strives to provide easy access to
          researchers, practitioners, and the public by digitizing and classifying important plant
          species and their uses.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Classification of Plants</h2>
        <p style={styles.paragraph}>
          Indian herbs are classified based on their scientific taxonomy, medicinal uses, and
          geographical distribution. These plants are categorized into families, genera, and species,
          each with its distinct properties and applications in various forms of traditional medicine.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Data Collection Methods & Sources</h2>
        <p style={styles.paragraph}>
          Data for the Indian Herbs Database is collected through various methods such as field
          surveys, scientific literature, and interviews with local healers. Sources include academic
          papers, government reports, and traditional knowledge passed down through generations.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Herbs Data Statistics</h2>
        <p style={styles.paragraph}>
          The Indian Herbs Database contains detailed information on over 500 species of herbs. The
          database tracks their medicinal properties, uses, geographic distribution, and phytochemical
          compositions. As the project grows, more data will be added, providing valuable insights into
          the therapeutic potential of these plants.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Copyright Information</h2>
        <p style={styles.paragraph}>
          The content provided on this platform is protected under copyright law. All data, images,
          and research are owned by the Indian Herbs Database project. Unauthorized reproduction or
          distribution is prohibited. Please credit the project appropriately when using any data or
          resources from this website.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Details</h2>
        <p style={styles.paragraph}>
          For inquiries, collaboration, or feedback, please reach out to us at:
        </p>
        <ul style={styles.contactList}>
          <li>Email: contact@indianherbs.com</li>
          <li>Phone: +91 123 456 7890</li>
          <li>Address: 123 Herb Street, Medicinal City, India</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Indian Herbs Database Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: '18px',
    color: '#7f8c8d',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '28px',
    color: '#16a085',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#34495e',
  },
  contactList: {
    listStyleType: 'none',
    paddingLeft: '0',
    fontSize: '18px',
    color: '#34495e',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '10px',
    backgroundColor: '#2c3e50',
    color: '#fff',
  },
  footerText: {
    fontSize: '14px',
  },
};

export default Home;
