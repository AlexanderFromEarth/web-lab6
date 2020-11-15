import React from "react";
import DemographyRow from "./row";
import AdderRow from "./adder";
import TableHeader from "./header";
import TableFooter from "./footer";

const DemographyTable = ({ demographies, meta }) => (
  <div className="container">
    <table className="demography-table">
      <TableHeader meta={meta} />
      <tbody className="demography-table-body">
        <AdderRow meta={meta} />
        {demographies.map((demography) => (
          <DemographyRow
            demography={demography}
            meta={meta}
            key={demography.id}
          />
        ))}
      </tbody>
      <TableFooter demographies={demographies} meta={meta} />
    </table>
  </div>
);

export default DemographyTable;
