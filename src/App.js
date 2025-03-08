import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndiaPoliticalMap from "./components/India";
import ClassificationTree from "./components/Classification";
import GenusTree from "./components/Genus";
import SpeciesTree from "./components/Species";
import SpeciesDetails from "./components/SpeciesView";
import StatewiseSpecies from "./components/Stateswise";
import GalleryAndStats from "./components/Gallery";
import AdvancedSearch from "./components/Search";
import HerbExpertChat from "./components/QAChat";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/state-index" element={<IndiaPoliticalMap />} /> */}
          <Route path="/family-index" element={<ClassificationTree />} />
          <Route path="/genus-index" element={<GenusTree />} />
          <Route path="/species-index" element={<SpeciesTree />} />
          <Route path="/species/:speciesName" element={<SpeciesDetails />} />
          <Route path="/state-index" element={<StatewiseSpecies/>} />
          <Route path="/herbs-gallery" element={<GalleryAndStats/>} />
          <Route path="/herb-search" element={<AdvancedSearch/>} />
          <Route path="/herb-qa" element={<HerbExpertChat/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
