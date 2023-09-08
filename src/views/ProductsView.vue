<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import CardProductComponent from "@/components/CardProduct/CardProductComponent.vue";
import { productsGetAll } from "@/queries/Products/productsGetAll";
import router from "@/router";
import { paths } from "@/controllers/paths";
import store from "@/store";

export default defineComponent({
  components: {
    CardProductComponent,
  },
  setup() {
    const pizzas = ref([]);

    onMounted(async () => {
      store.commit("setProducts", await productsGetAll());
    });

    function redirectToRegister() {
      router.push(paths.registerProduct);
    }
    return { pizzas, redirectToRegister, store };
  },
});
</script>

<template>
  <section class="view-header">
    <h2>Produtos</h2>
    <button @click="redirectToRegister">+</button>
  </section>
  <section v-for="pizza in store.state.products" :key="pizza.id">
    <CardProductComponent :product="pizza" />
  </section>
</template>

<style lang="scss" scoped>
.view-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    line-height: 24px;
  }

  button {
    border: none;
    border-radius: 6px;
    padding: 8px;
    width: 38px;
    height: 38px;
    background-color: #2ea80fc7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    font-size: 24px;
  }
}
</style>
@/queries/Product/productsGetAll
