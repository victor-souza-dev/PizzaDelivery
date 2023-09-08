import { IProduct } from "@/Interfaces/IProduct";
import { productToAdapter } from "@/adapters/productAdapter";
import { backConnection } from "@/services/backConnection";

export async function productsPost(payload: IProduct): Promise<void> {
  try {
    await backConnection.post("produtos", productToAdapter(payload));
    alert("Produto cadastrado com sucesso");
  } catch (error) {
    alert("Ocorreu um erro ao cadastrar o produto");
  }
}
