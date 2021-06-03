import React from "react";
import { TabView } from "../../components/TabView";
import { AddCase } from "./AddCase";
import { EditCase } from "./EditCase";

export const Helper: React.FC = () => {
  return (
    <TabView
      tabs={[
        {
          component: AddCase as React.FC,
          index: 0,
          title: "Registrar Casos",
        },
        {
          component: EditCase as React.FC,
          index: 1,
          title: "Gestionar Casos",
        },
      ]}
    />
  );
};
