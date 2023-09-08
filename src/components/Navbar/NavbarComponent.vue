<script lang="ts">
import router from "@/router";
import store from "@/store";
import ModalComponent from "@/components/Modal/ModalComponent.vue";
import { defineComponent } from "vue";
import { paths } from "@/controllers/paths";
import "./navbarComponent.scss";

export default defineComponent({
  name: "NavbarComponent",
  components: {
    ModalComponent,
  },
  setup() {
    const { user, isAuthenticated: isAuth } = store.state.auth;

    function login() {
      router.push("/");
      store.commit("toggleModal", true);
    }

    function logout() {
      router.push("/");
      let confirmLogout = confirm("Deseja mesmo fazer logout?");
      if (confirmLogout) {
        store.commit("logout");
        window.location.reload();
      }
    }

    function redirectTo(path: string) {
      router.push(path);
    }

    function goToCart() {
      if (store.state.order.length > 0) {
        return redirectTo(paths.cart);
      }
      return alert("Carrinho vazio");
    }
    return { redirectTo, login, logout, goToCart, paths, store, isAuth, user };
  },
});
</script>

<template>
  <header class="header">
    <img
      class="logo"
      src="../../assets/logo.svg"
      alt="logo"
      @click="redirectTo(paths.home)"
    />
    <section>
      <button v-if="!isAuth" class="button login" @click="login">
        <img src="../../assets/user.svg" alt="login button" />
        Login
      </button>
      <button v-else class="button login" @click="logout">
        <img src="../../assets/user.svg" alt="logout button" />
        {{ user.name }}
      </button>
      <button class="button cart" @click="goToCart">
        <img src="../../assets/cart.svg" alt="cart button" />
      </button>
    </section>
  </header>
  <ModalComponent />
</template>
