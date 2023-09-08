import { productToAdapter } from "@/adapters/productAdapter";
import { IProduct } from "@/Interfaces/IProduct";
import { backConnection } from "@/services/backConnection";

export async function productsPatch(payload: IProduct): Promise<void> {
  const { id, ...rest } = payload;

  try {
    await backConnection.patch(`produtos/${id}`, productToAdapter({ ...rest }));
  } catch (error) {
    alert("Ocorreu um erro ao atualizar o produto");
  }
}
