import FilterSlider from "./FilterSlider";
import FilterSort from "./FilterSort";
import React from "react";
import './Filters.css'

function HeaderFilters() {
  return (
    <div className="HeaderFilters">
      <FilterSlider />
      <FilterSort />
    </div>
  );
}

export default HeaderFilters;
