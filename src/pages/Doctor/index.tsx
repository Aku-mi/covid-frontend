import React from "react";
import { TabView } from "../../components/TabView";
import { CaseMap } from "./CaseMap";
import { SearchCase } from "./SearchCase";

export const Doctor: React.FC = () => {
  return (
    <TabView
      tabs={[
        {
          component: SearchCase as React.FC,
          index: 0,
          title: "Buscar Casos",
        },
        {
          component: CaseMap as React.FC,
          index: 1,
          title: "Mapa Casos",
        },
      ]}
    />
  );
};
