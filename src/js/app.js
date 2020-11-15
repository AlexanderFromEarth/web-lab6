import React, { useState, useEffect } from "react";
import Context from "./context";
import DemographyTable from "./components/table";
import RegionFilter from "./components/filter";
import "./utils";

let pred = undefined;
let [comp, compParams] = [undefined, []];

const App = () => {
  const [meta, setMeta] = useState({});
  const [demographies, setDemographies] = useState([]);
  const [loading, setLoading] = useState(true);

  const readMeta = async () => {
    const meta = localStorage.getItem("demographyMetaData");
    if (meta) {
      return JSON.parse(meta);
    } else {
      return await fetch("./metadata.json")
        .then((response) => response.json())
        .then((meta) => {
          localStorage.setItem("demographyMetaData", JSON.stringify(meta));
          return meta;
        });
    }
  };

  const readData = async () => {
    const data = localStorage.getItem("demographyData");
    if (data) {
      console.log("Parsing LocalStorage");
      return JSON.parse(data);
    } else {
      console.log("Parsing JSON");
      return await fetch("./data.json")
        .then((response) => response.json())
        .then((demographies) => {
          localStorage.setItem("demographyData", JSON.stringify(demographies));
          return demographies;
        });
    }
  };

  const processData = () =>
    readData()
      .then((demographies) => {
        if (pred) {
          return demographies.filter(pred);
        } else {
          return demographies;
        }
      })
      .then((demographies) => {
        if (comp) {
          return demographies.sort(comp);
        } else {
          return demographies;
        }
      });

  const filterDemographies = async (filter) => {
    pred = (d) => d.name.includes(filter);
    setDemographies(await processData());
  };

  const sortDemographiesByRate = async (year, rate) => {
    if (!compParams.equals([year, rate])) {
      compParams = [year, rate];
      comp = (l, r) =>
        l.years[year][rate] === r.years[year][rate]
          ? 0
          : l.years[year][rate] > r.years[year][rate]
          ? 1
          : -1;
    } else {
      comp = ((comp) => (l, r) => comp(l, r) * -1)(comp);
    }
    setDemographies(await processData());
  };

  const sortDemographiesByName = async () => {
    if (!compParams.equals(["name"])) {
      compParams = ["name"];
      comp = (l, r) => (l.name === r.name ? 0 : l.name > r.name ? 1 : -1);
    } else {
      comp = ((comp) => (l, r) => comp(l, r) * -1)(comp);
    }
    setDemographies(await processData());
  };

  const createDemography = async (demography) => {
    const data = await readData().then((demographies) =>
      demographies.concat({
        id: demographies.length,
        ...demography,
      })
    );
    localStorage.setItem("demographyData", JSON.stringify(data));
    setDemographies(await processData());
  };
  useEffect(() => {
    (async () => {
      setMeta(await readMeta());
      setDemographies(await processData());
      setLoading(false);
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        filterDemographies,
        sortDemographiesByRate,
        createDemography,
        sortDemographiesByName,
      }}
    >
      <header className="header">
        <h1 className="header__title">Демография России</h1>
      </header>
      <div className="container">
        <RegionFilter />
        <input
          className="anti-sort-btn"
          type="button"
          value="Сбросить сортировку"
          onClick={async () => {
            comp = undefined;
            compParams = [];
            setDemographies(await processData());
          }}
        />
      </div>
      {loading ? (
        ""
      ) : (
        <DemographyTable demographies={demographies} meta={meta} />
      )}
    </Context.Provider>
  );
};

export default App;
