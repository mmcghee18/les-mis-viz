import React from "react";
import "./App.css";
import ChordDiagram from "./chord-diagram/ChordDiagram.jsx";
import matrix from "./data/matrix.json";
import songNames from "./data/songNames.json";
import themeLookup from "./data/themeLookup.json";
import themeColors from "./data/themeColors.json";
import * as d3 from "d3";
import _ from "lodash";

function App() {
  const palette = d3.interpolateSpectral;

  return (
    <div className="App">
      <h1>Themes in Les Miserables</h1>
      <ChordDiagram
        matrix={matrix}
        themeLookup={themeLookup}
        themeColors={themeColors}
        componentId={1}
        groupLabels={songNames}
        groupColors={["#000000", "#FFDD89", "#957244", "#F26223"]}
        resizeWithWindow={true}
      />
    </div>
  );
}

export default App;
