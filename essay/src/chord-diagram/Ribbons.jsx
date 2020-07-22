import React from "react";
import PropTypes from "prop-types";
import { rgb } from "d3-color";

import { isHiddenRibbon } from "./utils";

const Ribbons = ({
  chords,
  themeLookup,
  themeColors,
  color,
  disableHover,
  ribbon,
  setMouseOverRibbon,
  mouseOverGroup,
  mouseOverRibbon,
  hoverPersist,
  setHoverPersist,
  onClick,
  strokeWidth,
  blurOnHover,
  ribbonOpacity,
  ribbonBlurOpacity,
}) => {
  return (
    <g className="ribbons" fillOpacity={ribbonOpacity}>
      {chords.map((chord, chordIndex) => {
        const themeName = themeLookup[[chord.source.index, chord.target.index]];
        const themeColor = themeColors[themeName];

        console.log(themeColor);

        const hidden =
          isHiddenRibbon(
            mouseOverGroup,
            chord.source.index,
            chord.target.index
          ) || isHiddenRibbon(mouseOverRibbon, chordIndex, null);

        const style = blurOnHover
          ? { fillOpacity: `${hidden ? ribbonBlurOpacity : ribbonOpacity}` }
          : {
              display: `${hidden ? "none" : "block"}`,
              fillOpacity: ribbonOpacity,
            };

        return (
          <path
            key={chordIndex}
            style={style}
            //fill={color(chord.target.index)}
            fill={`#${themeColor}`}
            //stroke={`${rgb(color(chord.target.index)).darker()}`}
            stroke={`${rgb(themeColor).darker()}`}
            strokeWidth={strokeWidth}
            d={`${ribbon({ source: chord.source, target: chord.target })}`}
            onClick={() => {
              setHoverPersist(!hoverPersist);
              onClick(chordIndex);
            }}
            onMouseOver={
              !disableHover && !hoverPersist
                ? () => setMouseOverRibbon(chordIndex)
                : null
            }
            onMouseOut={
              !disableHover && !hoverPersist
                ? () => setMouseOverRibbon(null)
                : null
            }
          />
        );
      })}
    </g>
  );
};

Ribbons.propTypes = {
  chords: PropTypes.array.isRequired,
  color: PropTypes.func.isRequired,
  ribbon: PropTypes.func.isRequired,
  setMouseOverRibbon: PropTypes.func.isRequired,
  mouseOverGroup: PropTypes.number,
  mouseOverRibbon: PropTypes.number,
  onClick: PropTypes.func,
  strokeWidth: PropTypes.number,
  disableHover: PropTypes.bool,
  blurOnHover: PropTypes.bool,
};

export default Ribbons;
