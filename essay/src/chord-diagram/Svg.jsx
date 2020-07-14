import React from "react";
import PropTypes from "prop-types";
import useChartDimensions from "../hooks/useChartDimensions.js";

const Svg = ({
  width,
  height,
  style,
  className,
  clearHover,
  children,
  resizeWithWindow,
  onClick,
}) => {
  return (
    <div
      className="svg-container"
      style={{
        ...style,
        ...(!resizeWithWindow
          ? { width: `${width}px`, height: `${height}px` }
          : {}),
      }}
    >
      <svg
        className={`svg-content ${className}`}
        viewBox={`-${width / 2} -${height / 2} ${width + 600} ${height + 600}`}
        preserveAspectRatio={"xMidYMid meet"}
      >
        <g transform="translate(300,300)">
          <rect
            fillOpacity={0}
            height={height}
            onClick={(event) => {
              clearHover();
              onClick(event);
            }}
            width={width}
            x={`-${width / 2}`}
            y={`-${height / 2}`}
          />
          {children}
        </g>
      </svg>
    </div>
  );
};

Svg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.node),
  resizeWithWindow: PropTypes.bool,
};

export default Svg;
