import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";

interface Set {
  data: number[];
  label: string;
  borderColor: string;
  backgroundColor: string;
}

interface DataSet {
  sets: Set[];
  labels: string[];
}

export const LineChart: React.FC<DataSet> = (props) => {
  const [sets, setSets] = useState<Set[]>([
    { data: [1], backgroundColor: "", borderColor: "", label: "" },
  ]);
  useEffect(() => {
    setSets(
      props.sets.map((ds) => ({
        data: ds.data,
        borderColor: ds.borderColor,
        backgroundColor: ds.backgroundColor,
        label: ds.label,
      }))
    );
  }, [props.sets]);

  return (
    <Line
      type="line"
      data={{
        datasets: sets,
        labels: props.labels,
      }}
    />
  );
};

interface PieC {
  data: number[];
  labels: string[];
  colors: string[];
}

export const PieChart: React.FC<PieC> = (props) => {
  return (
    <Pie
      type="pie"
      data={{
        labels: props.labels,
        datasets: [
          {
            backgroundColor: props.colors,
            data: props.data,
            borderColor: "#ffffff5e",
          },
        ],
      }}
    />
  );
};
