import React from "react";

import Slider from "@material-ui/core/Slider";
import "./Filters.css";

const RangeSlider = () => {
  // Our States
  const [value, setValue] = React.useState([1, 100]);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "fit-content",
      }}
    >
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Price Range Filter
      </h3>
      <Slider value={value} onChange={rangeSelector} valueLabelDisplay="auto" />
      Your range of Price is between {value[0]} /- and {value[1]} /-
    </div>
  );
};

export default RangeSlider;
