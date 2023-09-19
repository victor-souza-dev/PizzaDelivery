import { userToAdapter } from "@/adapters/userAdapter";
import { IUser } from "@/Interfaces/IUser";
import { backConnection } from "@/services/backConnection";

export async function usersPost(payload: IUser): Promise<void> {
  try {
    await backConnection.post("pessoas", userToAdapter(payload));
    alert("Usuário cadastrado com sucesso");
  } catch (error) {
    throw new Error("Ocorreu um erro ao cadastrar o usuário");
  }
}
