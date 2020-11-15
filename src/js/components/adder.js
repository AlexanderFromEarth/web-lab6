import React, { useState, useContext } from "react";
import Context from "../context";

const AdderRow = ({ meta }) => {
  const [name, setName] = useState("");
  const [years, setYears] = useState(
    meta.years.reduce(
      (obj, year) => ({
        ...obj,
        [year]: meta.rates.reduce((obj, rate) => ({ ...obj, [rate]: 0.0 }), {}),
      }),
      {}
    )
  );

  const { createDemography } = useContext(Context);

  return (
    <tr className="demography-table-adder">
      <th className="demography-table-adder__head">
          <input
            className="demography-table-adder__submit"
            type="button"
            value="+"
            onClick={() => createDemography({ name: name, years: years })}
          />
          <input
            className="demography-table-adder__name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
      </th>

      {meta.years.map((year) =>
        meta.rates.map((rate) => (
          <th
            key={year + rate}
            className={"demography-table-adder__" + rate.toKebabCase()}
          >
            <input
              type="number"
              value={years[year][rate]}
              onChange={(event) =>
                setYears({
                  ...years,
                  [year]: { ...years[year], [rate]: event.target.value },
                })
              }
            />
          </th>
        ))
      )}
    </tr>
  );
};

export default AdderRow;
