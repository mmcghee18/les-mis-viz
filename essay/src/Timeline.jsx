import React from "react";
import themesBySong from "./themesBySong.json";
import _ from "lodash";

const Song = ({ songNumber }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "2vw",
          height: "30px",
          background: "cornflowerblue",
          border: "1px solid black",
          minWidth: "30px",
        }}
      ></div>
      <div
        style={{
          width: "2vw",
          border: "1px solid black",
          minWidth: "30px",
        }}
      >
        {songNumber}
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "100px",
      }}
    >
      {_.map(_.range(1, 47), (songNumber) => (
        <Song songNumber={songNumber} />
      ))}
    </div>
  );
};

export default Timeline;
