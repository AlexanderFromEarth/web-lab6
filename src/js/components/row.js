import React from "react";
import "../utils";

const DemographyRow = ({ demography, meta }) => {
  return (
    <tr className="demography-table-row">
      <td className="demography-table-row__name">{demography.name}</td>
      {meta.years.map((year, idx) =>
        meta.rates.map((rate) => (
          <td
            className={"demography-table-row__" + rate.toKebabCase()}
            key={rate + year}
          >
            {demography.years[year][rate]}{" "}
            <i
              className={
                "demography-table-row__" +
                (idx == 0
                  ? "icon-eq"
                  : demography.years[year][rate] >
                    demography.years[meta.years[idx - 1]][rate]
                  ? "icon-gt"
                  : demography.years[year][rate] <
                    demography.years[meta.years[idx - 1]][rate]
                  ? "icon-lt"
                  : "icon-eq")
              }
            />
          </td>
        ))
      )}
    </tr>
  );
};

export default DemographyRow;
