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
  console.log({ width, height });
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
        viewBox={`-${width / 2} -${height / 2} ${width + 500} ${height + 500}`}
        preserveAspectRatio={"xMidYMid meet"}
      >
        <g transform="translate(250,250)">
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
