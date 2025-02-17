function Header() {
    const style = {
      width: "100vw",
      height: "25vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('/trees.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      
    };
  
    const headerStyle = {
      fontFamily: "Times New Roman",
      fontSize: "300%",
      margin: "0",
    };
  
    return (
      <div style={style}>
        <h1 style={headerStyle}>AUDist Herbs</h1>
        <h3 style={{ margin: "0" }}>College of Engineering Guindy</h3>
      </div>
    );
  }
  
  export default Header;
  