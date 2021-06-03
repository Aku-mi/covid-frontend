export interface IUser {
  name: string;
  last_name: string;
  dni: number;
  user_name: string;
  password: string;
  role: string;
}

export const roles = [
  {
    label: "Medico",
    value: "doctor",
  },
  {
    label: "Ayudante",
    value: "helper",
  },
];
