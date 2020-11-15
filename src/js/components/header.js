import React, { useContext } from "react";
import Context from "../context";

const TableHeader = ({ meta }) => {
  const { sortDemographiesByRate, sortDemographiesByName } = useContext(Context);

  return (
    <thead className="demography-table-header">
      <tr>
        <th className="demography-table-header__title" rowSpan="2" onClick={sortDemographiesByName}>Регион</th>
        {meta.years.map((year) => (
          <th className="demography-table-header__year" colSpan="2" key={year}>
            {year}
          </th>
        ))}
      </tr>
      <tr>
        {meta.years.map((year) =>
          meta.rates.map((rate) => (
            <th
              className="demography-table-header__rate"
              key={year + rate}
              onClick={() => sortDemographiesByRate(year, rate)}
            >
              <i
                className={
                  "demography-table-header__icon-" +
                  rate.toKebabCase()
                }
              ></i>
            </th>
          ))
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
