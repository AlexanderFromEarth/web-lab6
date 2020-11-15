import React, { useContext } from "react";
import Context from "../context";

const RegionFilter = () => {
  const { filterDemographies } = useContext(Context);

  return (
    <div className="region-filter">
      <span className="region-filter__title">Фильтр</span>
      <input
        type="text"
        className="region-filter__input"
        onChange={(event) => filterDemographies(event.target.value)}
      />
    </div>
  );
};

export default RegionFilter;
