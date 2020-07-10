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
  const chartSettings = {};
  const [ref, dms] = useChartDimensions(chartSettings);

  return (
    <div
      className="svg-container"
      ref={ref}
      style={{
        ...style,
        ...(!resizeWithWindow
          ? { width: `${width}px`, height: `${height}px` }
          : { height: "70vh" }),
      }}
    >
      <svg
        className={`svg-content ${className}`}
        height={dms.height}
        width={dms.width}
        // viewBox={`-${width / 2} -${height / 2} ${width + 500} ${height + 500}`}
        // preserveAspectRatio={"xMidYMid meet"}
      >
        <g transform={`translate(${dms.width / 2}, ${dms.height / 2})`}>
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
