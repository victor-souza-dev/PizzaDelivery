import { adapterToProduct } from "@/adapters/productAdapter";
import { backConnection } from "@/services/backConnection";

export async function productsGetAll(): Promise<any> {
  try {
    const { data } = await backConnection.get("produtos");
    return adapterToProduct(data);
  } catch (error) {
    alert("Ocorreu um erro");
  }
}
