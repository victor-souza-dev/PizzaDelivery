import { userToAdapter } from "@/adapters/userAdapter";
import { IUser } from "@/Interfaces/IUser";
import { backConnection } from "@/services/backConnection";

export async function usersPatch(payload: IUser): Promise<void> {
  const { id, ...rest } = payload;
  try {
    await backConnection.patch(`pessoas/${id}`, userToAdapter(rest));
  } catch (error) {
    alert("Ocorreu um erro ao atualizar o usuário");
  }
}
