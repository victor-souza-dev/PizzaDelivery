<script lang="ts">
import { defineComponent } from "vue";
import RegisterUserComponent from "@/components/RegisterUser/RegisterUserComponent.vue";

export default defineComponent({
  components: {
    RegisterUserComponent,
  },
});
</script>

<template>
  <main class="register-main">
    <RegisterUserComponent />
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
