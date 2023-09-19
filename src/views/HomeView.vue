<script lang="ts">
import CardItemComponent from "@/components/CardItem/CardItemComponent.vue";
import PresentationLayout from "@/layouts/PresentationLayout.vue";
import { defineComponent, onMounted, ref } from "vue";
import { productsGetAll } from "@/queries/Products/productsGetAll";
import store from "@/store";

export default defineComponent({
  components: {
    CardItemComponent,
    PresentationLayout,
  },
  setup() {
    const pizzas = ref([]);

    // console.log(store.state.order);

    onMounted(async () => {
      pizzas.value = await productsGetAll();
    });
    return { pizzas };
  },
});
</script>

<template>
  <main class="home-main">
    <PresentationLayout />
    <h2 class="home-subtitle">Nossas Pizzas</h2>
    <section class="pizzas-list">
      <div v-for="item in pizzas" :key="item.id">
        <CardItemComponent :product="item" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.pizzas-list {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  article {
    margin: 35px 10px;
  }
}

.home-subtitle {
  width: 100%;
  margin-left: 0px;
  margin-bottom: 0;
  font-size: 32px;
  line-height: 41.6px;
  text-align: start;
  font-weight: 800;
}
</style>
@/queries/Product/productsGetAll
