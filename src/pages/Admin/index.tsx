import React from "react";
import { TabView } from "../../components/TabView";
import { AddUser } from "./AddUser";
//import { EditUser } from "./EditUser";

export const Admin: React.FC = () => {
  return (
    <TabView
      tabs={[
        {
          component: AddUser as React.FC,
          index: 0,
          title: "Registrar Usuarios",
        },
      ]}
    />
  );
};

// {
//   component: EditUser as React.FC,
//   index: 1,
//   title: "Gestionar Usuarios",
// },
