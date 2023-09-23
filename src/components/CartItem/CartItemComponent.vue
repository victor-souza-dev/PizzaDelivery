<script lang="ts">
import { paths } from "@/controllers/paths";
import store from "@/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import "./cartItemComponent.scss";

export default defineComponent({
  name: "CartItemComponent",
  methods: {
    addItem(index: number) {
      store.commit("addItemOrder", { index, id: this.orders.id });
    },
    substractItem(index: number) {
      if (this.orders.items[index].quantity > 0) {
        store.commit("substractItemOrder", { index, id: this.orders.id });
      }
    },
    removeItem(index: number) {
      store.commit("removeItemOrder", { index, id: this.orders.id });
    },
    redirectToOrder() {
      this.$router.push(paths.success);
    },
  },
  computed: {
    orders() {
      const orders = store.getters.getOrderByUser;
      const route = useRouter();

      if (!orders) {
        route.push("/");
      }

      return orders;
    },
  },
});
</script>

<template>
  <section class="cart-items">
    <h3>Pizzas selecionadas</h3>
    <section>
      <div
        v-for="(item, index) in orders?.items"
        :key="item.product.toString()"
        class="cart-items--item"
      >
        <div class="cart-item">
          <img src="@/assets/pizza.svg" alt="item" />
          <div class="cart-item--configs">
            <span>{{ item.product.description }}</span>
            <div>
              <section class="cart-items--counter">
                <button
                  @click="() => substractItem(index)"
                  :disabled="item.quantity === 0 ? true : false"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="() => addItem(index)">+</button>
              </section>
              <button
                class="cart-items--removeButton"
                @click="() => removeItem(index)"
              >
                <img src="@/assets/delete.svg" alt="remove icon" />REMOVER
              </button>
            </div>
          </div>
        </div>
        <p>R$ {{ item.value }}</p>
      </div>
      <div class="cart-items--divider" />
      <div class="cart-items--prices">
        <section>
          <span>Total de Itens</span>
          <p>R$ {{ orders?.totalValue }}</p>
        </section>
        <section>
          <span>Entrega</span>
          <p>R$ 3</p>
        </section>
        <section>
          <h4>Total</h4>
          <h4>R$ {{ orders?.totalValue + 3 }}</h4>
        </section>
      </div>
      <button class="cart-items--submit" @click="redirectToOrder">
        Confirmar pedido
      </button>
    </section>
  </section>
</template>
