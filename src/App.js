import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndiaPoliticalMap from "./components/India";
import ClassificationTree from "./components/Classification";
import GenusTree from "./components/Genus";
import SpeciesTree from "./components/Species";
import SpeciesDetails from "./components/SpeciesView";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/state-index" element={<IndiaPoliticalMap />} />
          <Route path="/family-index" element={<ClassificationTree />} />
          <Route path="/genus-index" element={<GenusTree />} />
          <Route path="/species-index" element={<SpeciesTree />} />
          <Route path="/species/:speciesName" element={<SpeciesDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
