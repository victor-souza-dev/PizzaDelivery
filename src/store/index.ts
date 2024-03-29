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
    getOrderByUser: (state) => {
      const deserializedState: IOrder[] = JSON.parse(
        JSON.stringify(state.order)
      );

      if (deserializedState.length === 0) {
        return undefined;
      }

      return deserializedState
        .filter((order) => order.client.id === state.auth.user.id)
        .sort((a, b) => {
          const dateA = new Date(a.dateOfIssue).getTime();
          const dateB = new Date(b.dateOfIssue).getTime();
          return dateA - dateB;
        })[0];
    },
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
      const deserializedState: IOrder[] = JSON.parse(
        JSON.stringify(state.order)
      );
      const ordersSetCopy = [...deserializedState];

      const existingOrderIndex = ordersSetCopy.findIndex(
        (order) => order.client.id === state.auth.user.id
      );

      if (existingOrderIndex !== -1) {
        const existingOrder = ordersSetCopy[existingOrderIndex];
        const existingItemIndex = existingOrder.items.findIndex(
          (item) => item.product.id === payload.product.id
        );

        if (existingItemIndex !== -1) {
          const existingItem = existingOrder.items[existingItemIndex];
          existingItem.quantity += payload.quantity;
          existingItem.subTotal += parseFloat(payload.subTotal);
        } else {
          existingOrder.items.push(payload);
          existingOrder.totalValue += parseFloat(payload.subTotal);
        }

        existingOrder.totalValue = Object.values(
          existingOrder.items as IOrderItem[]
        ).reduce((acc, objeto) => {
          return acc + objeto.subTotal;
        }, 0);
      } else {
        // Pedido não existe, crie um novo
        const newOrder = {
          id: v4(),
          client: {
            id: state.auth.user.id,
            name: state.auth.user.name,
          },
          dateOfIssue: new Date().toISOString(),
          totalValue: parseFloat(payload.subTotal),
          items: [payload],
        };

        ordersSetCopy.push(newOrder);
      }

      state.order = ordersSetCopy as never[];
      sessionStorage.setItem("orders", JSON.stringify(ordersSetCopy));
    },
    addItemOrder(state, { index, id }) {
      const deserializedState: IOrder[] = JSON.parse(
        JSON.stringify(state.order)
      );

      const filteredState = deserializedState.filter(
        (order: IOrder) => order.id === id
      )[0];

      const ordersSetCopy: IOrder = { ...filteredState };
      ordersSetCopy.items[index].quantity++;
      ordersSetCopy.items[index].subTotal =
        ordersSetCopy.items[index].quantity * ordersSetCopy.items[index].value;

      ordersSetCopy.totalValue = Object.values(
        ordersSetCopy.items as IOrderItem[]
      ).reduce((acc, objeto) => {
        return acc + objeto.subTotal;
      }, 0);

      deserializedState[0] = ordersSetCopy;

      state.order = deserializedState as never[];
      sessionStorage.setItem("orders", JSON.stringify(deserializedState));
    },
    substractItemOrder(state, { index, id }) {
      const deserializedState: IOrder[] = JSON.parse(
        JSON.stringify(state.order)
      );

      const filteredState = deserializedState.filter(
        (order: IOrder) => order.id === id
      )[0];

      const ordersSetCopy: IOrder = { ...filteredState };
      ordersSetCopy.items[index].quantity--;
      ordersSetCopy.items[index].subTotal =
        ordersSetCopy.items[index].quantity * ordersSetCopy.items[index].value;

      ordersSetCopy.totalValue = Object.values(
        ordersSetCopy.items as IOrderItem[]
      ).reduce((acc, objeto) => {
        return acc + objeto.subTotal;
      }, 0);

      deserializedState[0] = ordersSetCopy;

      state.order = deserializedState as never[];
      sessionStorage.setItem("orders", JSON.stringify(deserializedState));
    },
    removeItemOrder(state, { index, id }) {
      const deserializedState: IOrder[] = JSON.parse(
        JSON.stringify(state.order)
      );

      const filteredState = deserializedState.filter(
        (order: IOrder) => order.id === id
      )[0];

      const ordersSetCopy: IOrder = { ...filteredState };
      ordersSetCopy.items = ordersSetCopy.items.filter((_, i) => i !== index);
      ordersSetCopy.items.map((item) => {
        item.subTotal = item.quantity * item.value;
      });

      ordersSetCopy.totalValue = Object.values(
        ordersSetCopy.items as IOrderItem[]
      ).reduce((acc, objeto) => {
        return acc + objeto.subTotal;
      }, 0);

      deserializedState[0] = ordersSetCopy;

      if (ordersSetCopy.items.length > 0) {
        state.order = deserializedState as never[];
        return sessionStorage.setItem(
          "orders",
          JSON.stringify(deserializedState)
        );
      }

      state.order = [];
      sessionStorage.removeItem("orders");
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
      sessionStorage.clear();
    },
    initialize(state) {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (isAuthenticated !== null) {
        state.auth.isAuthenticated = JSON.parse(isAuthenticated);
      }

      const user = sessionStorage.getItem("user");
      if (user !== null) {
        state.auth.user = JSON.parse(user);

        const orders = sessionStorage.getItem("orders");
        if (orders !== null) state.order = JSON.parse(orders) as never[];
      }
    },
  },
});
