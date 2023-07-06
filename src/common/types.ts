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

export type CreateEmployeeAccount = RouterInputs["users"]["createAccount"];
export type UpdateEmployeeAccount = RouterInputs["users"]["updateAccount"];
export type DeleteEmployeeAccount = RouterInputs["users"]["deleteAccount"];

export type CreateShipment = RouterInputs["shipments"]["createShipment"];
export type UpdateShipment = RouterInputs["shipments"]["updateShipment"];
export type DeleteShipment = RouterInputs["shipments"]["deleteShipment"];
