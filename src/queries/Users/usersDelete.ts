import { backConnection } from "@/services/backConnection";

export async function usersDelete(id: string): Promise<void> {
  try {
    await backConnection.delete(`pessoas/${id}`);
    alert("Usuário deletado com sucesso");
  } catch (error) {
    alert("Ocorreu um erro ao deletar o usuário");
  }
}
