<script lang="ts">
import { defineComponent } from "vue";
import RegisterProductComponent from "@/components/RegisterProduct/RegisterProductComponent.vue";

export default defineComponent({
  components: {
    RegisterProductComponent,
  },
});
</script>

<template>
  <main class="register-main">
    <RegisterProductComponent />
  </main>
</template>

<style lang="scss" scoped>
.register-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
