<template>
  <NavbarComponent />
  <nav v-if="isAuth" class="navbar">
    <button @click="redirectTo(paths.users)">Usuários</button>
    <button @click="redirectTo(paths.products)">Produtos</button>
  </nav>
  <router-view />
</template>

<script lang="ts">
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";
import { defineComponent } from "vue";
import "@/styles/global.scss";
import router from "./router";
import { paths } from "./controllers/paths";
import store from "./store";

export default defineComponent({
  components: {
    NavbarComponent,
  },
  setup() {
    store.commit("initialize");
    const isAuth = store.state.auth.isAuthenticated;

    function redirectTo(path: string) {
      router.push(path);
    }
    return { redirectTo, paths, isAuth };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  button {
    height: 38px;
    padding: 8px;
    border-radius: 6px;
    border-color: transparent;
    transition: filter 0.2s;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 12px;
    background-color: white;
    color: black;
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
    }
  }
}
</style>
