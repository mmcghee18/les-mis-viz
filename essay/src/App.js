import React from "react";
import "./App.css";
import ChordDiagram from "./chord-diagram/ChordDiagram.jsx";
import matrix from "./data/matrix.json";
import songNames from "./data/songNames.json";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      <h1>Themes in Les Miserables</h1>
      <ChordDiagram
        matrix={matrix}
        componentId={1}
        groupLabels={songNames}
        groupColors={["#000000", "#FFDD89", "#957244", "#F26223"]}
        themeColors={["#000000", "#FFDD89", "#957244", "#F26223"]} // TODO: a color for each theme
        resizeWithWindow={true}
      />
    </div>
  );
}

export default App;
