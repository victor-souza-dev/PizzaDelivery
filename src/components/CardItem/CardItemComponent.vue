<script lang="ts">
import { IProduct } from "@/Interfaces/IProduct";
import store from "@/store";
import { v4 } from "uuid";
import { defineComponent, ref } from "vue";
import "./cardItemComponent.scss";

export default defineComponent({
  name: "CardItemComponent",
  props: {
    product: Object as () => IProduct,
  },
  setup(props) {
    const countItem = ref(0);

    function insertToCart() {
      if (props.product && countItem.value > 0) {
        store.commit("setOrders", {
          id: v4(),
          product: {
            id: props.product.id,
            description: props.product.description,
          },
          value: parseFloat(props.product.unitaryValue),
          quantity: countItem.value,
          subTotal: parseFloat(props.product.unitaryValue) * countItem.value,
        });
        countItem.value = 0;
      }
    }

    return { countItem, props, insertToCart };
  },
  methods: {
    addItem() {
      this.countItem++;
    },
    substractItem() {
      if (this.countItem > 0) {
        this.countItem--;
      }
    },
  },
});
</script>

<template>
  <article class="card-container">
    <header class="card-header">
      <img src="../../assets/pizza.svg" alt="image item" />
      <div>
        <p>{{ props.product.type }}</p>
      </div>
      <h2>{{ props.product.description }}</h2>
    </header>
    <footer class="card-footer">
      <span
        >R$ <strong>{{ props.product.unitaryValue }}</strong></span
      >
      <div>
        <section class="card-counter">
          <button
            @click="substractItem"
            :disabled="countItem === 0 ? true : false"
          >
            -
          </button>
          <span>{{ countItem }}</span>
          <button @click="addItem">+</button>
        </section>
        <button class="card-addCart" @click="insertToCart">
          <img src="../../assets/white-cart.svg" alt="add cart" />
        </button>
      </div>
    </footer>
  </article>
</template>
