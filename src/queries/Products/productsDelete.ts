import { backConnection } from "@/services/backConnection";

export async function productsDelete(id: string): Promise<void> {
  try {
    await backConnection.delete(`produtos/${id}`);
    alert("Produto deletado com sucesso");
  } catch (error) {
    alert("Ocorreu um erro ao deletar o produto");
  }
}
