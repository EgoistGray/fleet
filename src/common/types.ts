import { type RouterInputs, type RouterOutputs } from "../utils/api";

export type EmployeeInfo = {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  username: string;
};

export type RegisterType = RouterInputs["users"]["register"];
export type LoginType = RouterInputs["users"]["login"];
export type RegisterOut = RouterOutputs["users"]["register"];
