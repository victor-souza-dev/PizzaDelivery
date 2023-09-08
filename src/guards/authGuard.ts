import store from "@/store";

export function authGuard(to: any, from: any, next: any) {
  const isAuthenticated = store.getters.isAuthenticated;

  if (isAuthenticated) {
    next();
  } else {
    alert("Unauthorized access");
    next({ name: "" });
  }
}
