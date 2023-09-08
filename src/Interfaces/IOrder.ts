import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrderItem {
  product: Partial<IProduct>;
  value: number;
  quantity: number;
  subTotal: number;
}

export interface IOrder {
  id?: string;
  client: Partial<IUser>;
  dateOfIssue: string;
  totalValue: number;
  items: IOrderItem[];
}
