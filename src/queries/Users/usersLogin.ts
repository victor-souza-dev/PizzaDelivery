import { IUser } from "@/Interfaces/IUser";
import {
  IUserAdapter,
  adapterToUser,
  userToAdapter,
} from "@/adapters/userAdapter";
import { backConnection } from "@/services/backConnection";

export async function usersLogin(
  payload: Partial<IUser>
): Promise<Partial<IUser> | undefined> {
  const { data } = await backConnection.get("/pessoas");

  if (!data) return undefined;

  const adapter = userToAdapter(payload as IUser) as IUserAdapter;
  const user = data.find(
    (user: IUserAdapter) =>
      user.cpf === adapter.cpf && user.dataNascimento === adapter.dataNascimento
  );

  return user ? (adapterToUser(user) as Partial<IUser>) : undefined;
}
