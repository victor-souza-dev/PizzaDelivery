import { IOrder, IOrderItem } from "@/Interfaces/IOrder";
import { IProduct } from "@/Interfaces/IProduct";
import { IUser } from "@/Interfaces/IUser";
import { v4 } from "uuid";
import { createStore } from "vuex";

const defaultUser = {
  id: "",
  name: "",
  cpf: "",
  birthDate: "",
};

export default createStore({
  state: {
    isModalLogin: false,
    order: [],
    products: [],
    users: [],
    auth: {
      isAuthenticated: false,
      user: defaultUser,
    },
  },
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find((product: IProduct) => product.id === id);
    },
    getUserById: (state) => (id: string) => {
      return state.users.find((user: IUser) => user.id === id);
    },
    isAuthenticated: (state) => state.auth.isAuthenticated,
  },
  mutations: {
    toggleModal(state, payload) {
      state.isModalLogin = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setOrders(state, payload) {
      const newOrder: IOrder = {
        id: v4(),
        client: {
          id: state.auth.user.id,
          name: state.auth.user.name,
        },
        dateOfIssue: new Date().toISOString(),
        totalValue: 0,
        items: [],
      };

      const existingOrderIndex = state.order.findIndex(
        (order: IOrder) => order.client.id === newOrder.client.id
      );

      if (existingOrderIndex !== -1) {
        const existingOrder = state.order[existingOrderIndex];
        // eslint-disable-next-line
        // @ts-ignore
        newOrder.items = [...existingOrder.items];

        const existingItemIndex = newOrder.items.findIndex(
          (item: IOrderItem) => item.product.id === payload.product.id
        );

        if (existingItemIndex !== -1) {
          newOrder.items[existingItemIndex].quantity += payload.quantity;
          newOrder.items[existingItemIndex].subTotal += parseFloat(
            payload.subtotal
          );
          newOrder.totalValue += parseFloat(payload.subtotal);
        } else {
          newOrder.items.push(payload);
          newOrder.totalValue += parseFloat(payload.subtotal);
        }

        // eslint-disable-next-line
        // @ts-ignore
        state.order[existingOrderIndex] = { ...existingOrder, ...newOrder };
      } else {
        // Pedido não existe, crie um novo
        newOrder.items.push(payload);
        console.log(parseFloat(payload.subTotal));
        newOrder.totalValue += parseFloat(payload.subTotal);
        const createOrder = [...state.order, newOrder];
        state.order = createOrder as never;
      }
    },
    updateUser(state, updated) {
      const productIndex = state.users.findIndex(
        (user: IUser) => user.id === updated.id
      );
      if (productIndex !== -1) {
        // eslint-disable-next-line
        // @ts-ignore
        state.users[productIndex] = updated;
      }
    },
    deleteProduct(state, productId) {
      const productIndex = state.products.findIndex(
        (product: IProduct) => product.id === productId
      );

      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
    },
    deleteUser(state, userId) {
      const userIndex = state.users.findIndex(
        (user: IUser) => user.id === userId
      );

      if (userIndex !== -1) {
        state.users.splice(userIndex, 1);
      }
    },
    login(state, payload) {
      state.auth.user = payload;
      state.auth.isAuthenticated = true;
      sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
      sessionStorage.setItem("user", JSON.stringify(payload));
    },
    logout(state) {
      state.auth.user = defaultUser;
      state.auth.isAuthenticated = false;
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("user");
    },
    initialize(state) {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (isAuthenticated !== null) {
        state.auth.isAuthenticated = JSON.parse(isAuthenticated);
      }

      const user = sessionStorage.getItem("user");
      if (user !== null) {
        state.auth.user = JSON.parse(user);
      }
    },
  },
});
