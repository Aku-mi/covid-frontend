export enum State {
  HOME_TREATMENT = "Tratamiento en casa",
  HOSPITAL_TREATMENT = "Tratamiento en hospital",
  ICU = "UCI",
  CURED = "Curado",
  DEAD = "Muerto",
}

interface StateH {
  update_date: string;
  state: string;
  s_id: string;
}

export interface User {
  name: string;
  last_name: string;
  dni: number;
  sex: string;
  birth_date: string;
  home_address: string;
  job_address: string;
  test_result: string;
  test_date: string;
  state: string;
  id?: string;
  states?: StateH[];
}

export const gender = [
  {
    label: "Masculino",
    value: "M",
  },
  {
    label: "Femenino",
    value: "F",
  },
];

export const test_results = [
  {
    label: "Positivo",
    value: "true",
  },
  {
    label: "Negativo",
    value: "false",
  },
];

export const case_states = [
  {
    value: State.CURED,
  },
  {
    value: State.HOME_TREATMENT,
  },
  {
    value: State.HOSPITAL_TREATMENT,
  },
  {
    value: State.ICU,
  },
  {
    value: State.DEAD,
  },
];
