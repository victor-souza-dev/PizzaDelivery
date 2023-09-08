import { adapterToUser } from "@/adapters/userAdapter";
import { backConnection } from "@/services/backConnection";

export async function usersGetAll(): Promise<any> {
  try {
    const { data } = await backConnection.get("pessoas");
    return adapterToUser(data);
  } catch (error) {
    alert("Ocorreu um erro");
  }
}
