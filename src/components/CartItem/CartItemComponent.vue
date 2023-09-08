<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CartItemComponent",
  setup() {
    const countItem = ref(0);

    return { countItem };
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
  <section>
    <div>
      <img src="" alt="item" />
      <section>
        <p>Frango</p>
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
      </section>
      <button>Remover</button>
    </div>
    <p>R$ 9,99</p>
  </section>
</template>
