import { IUser } from "@/Interfaces/IUser";
import { IUserAdapter, adapterToUser } from "@/adapters/userAdapter";
import { backConnection } from "@/services/backConnection";

export async function usersLogin(payload: Partial<IUser>) {
  const { data } = await backConnection.get("/pessoas");

  if (data) {
    return adapterToUser(
      data.find((user: IUserAdapter) => {
        if (
          user.cpf === payload.cpf &&
          user.dataNascimento === payload.birthDate
        ) {
          return user;
        } else {
          return false;
        }
      })
    );
  }
}
