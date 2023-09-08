import { backConnection } from "@/services/backConnection";

export async function pedidosGetAll(): Promise<any> {
  const { data } = await backConnection.get("/pedidos");
  return data;
}
