import store from "@/store";

export function cartGuard(to: any, from: any, next: any) {
  const orders = store.state.order;

  if (orders.length > 0) {
    next();
  } else {
    alert("Carrinho vazio");
    next({ name: "" });
  }
}
