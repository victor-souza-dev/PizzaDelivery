import { IUser } from "@/Interfaces/IUser";
import { v4 } from "uuid";

export interface IUserAdapter {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export const userToAdapter = (
  user: IUser | IUser[]
): IUserAdapter | IUserAdapter[] => {
  if (Array.isArray(user)) {
    return user.map((singleUser) => {
      return {
        id: v4(),
        nome: singleUser.name,
        cpf: singleUser.cpf.replace(/[^\d]/g, ""),
        dataNascimento: singleUser.birthDate,
      };
    });
  }

  return {
    id: v4(),
    nome: user.name,
    cpf: user.cpf.replace(/[^\d]/g, ""),
    dataNascimento: user.birthDate,
  };
};

export const adapterToUser = (
  adapter: IUserAdapter | IUserAdapter[]
): Partial<IUser> | Partial<IUser[]> => {
  if (Array.isArray(adapter)) {
    return adapter.map((singleAdapter) => {
      return {
        id: singleAdapter?.id || v4(),
        name: singleAdapter?.nome,
        cpf: singleAdapter?.cpf?.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        ),
        birthDate: singleAdapter?.dataNascimento,
      };
    });
  }

  return {
    id: (adapter as IUserAdapter)?.id,
    name: (adapter as IUserAdapter)?.nome,
    cpf: (adapter as IUserAdapter)?.cpf?.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    ),
    birthDate: (adapter as IUserAdapter)?.dataNascimento,
  } as Partial<IUser>;
};
