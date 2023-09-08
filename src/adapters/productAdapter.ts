import { IProduct } from "@/Interfaces/IProduct";
import { v4 } from "uuid";

interface IProductAdapter {
  id?: string;
  descricao: string;
  type: string;
  valoUnitario: number;
}

export const productToAdapter = (
  user: IProduct | IProduct[]
): IProductAdapter | IProductAdapter[] => {
  if (Array.isArray(user)) {
    return user.map((singleUser) => {
      return {
        id: v4(),
        descricao: singleUser.description,
        type: singleUser.type,
        valoUnitario: parseFloat(singleUser.unitaryValue),
      };
    });
  }

  return {
    id: v4(),
    descricao: user.description,
    type: user.type,
    valoUnitario: parseFloat(user.unitaryValue),
  };
};

export const adapterToProduct = (
  adapter: IProductAdapter | IProductAdapter[]
): Partial<IProduct> | Partial<IProduct[]> => {
  if (Array.isArray(adapter)) {
    return adapter.map((singleAdapter) => {
      return {
        id: singleAdapter.id || v4(),
        description: singleAdapter.descricao,
        type: singleAdapter.type,
        unitaryValue: singleAdapter.valoUnitario.toString().replace(".", ","),
      };
    });
  }

  return {
    id: (adapter as IProductAdapter).id || v4(),
    description: (adapter as IProductAdapter).descricao,
    type: (adapter as IProductAdapter).type,
    unitaryValue: (adapter as IProductAdapter).valoUnitario
      .toString()
      .replace(".", ","),
  } as Partial<IProduct>;
};
