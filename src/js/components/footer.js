import React from "react";
import "../utils";

const TableFooter = ({ demographies, meta }) => {
  const totalObj = demographies.reduce(
    (prev, cur) =>
      meta.years.reduce(
        (obj, year) => ({
          ...obj,
          [year]: meta.rates.reduce(
            (obj, rate) => ({
              ...obj,
              [rate]:
                prev[year][rate] + cur.years[year][rate] / demographies.length,
            }),
            obj[year]
          ),
        }),
        prev
      ),
    meta.years.reduce(
      (obj, year) => ({
        ...obj,
        [year]: meta.rates.reduce((obj, rate) => ({ ...obj, [rate]: 0.0 }), {}),
      }),
      {}
    )
  );
  return (
    <tfoot className="demography-table-footer">
      <tr>
        <td className="demography-table-footer__title">Итог</td>
        {meta.years.map((year, idx) =>
          meta.rates.map((rate) => (
            <td
              className={"demography-table-footer__" + rate.toKebabCase()}
              key={rate + year}
            >
              {totalObj[year][rate].toFixed(2)}{" "}
              <i
                className={
                  "demography-table-footer__" +
                  (idx == 0
                    ? "icon-eq"
                    : totalObj[year][rate] > totalObj[meta.years[idx - 1]][rate]
                    ? "icon-gt"
                    : totalObj[year][rate] < totalObj[meta.years[idx - 1]][rate]
                    ? "icon-lt"
                    : "icon-eq")
                }
              />
            </td>
          ))
        )}
      </tr>
    </tfoot>
  );
};

export default TableFooter;
