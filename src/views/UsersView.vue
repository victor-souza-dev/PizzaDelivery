<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { usersGetAll } from "@/queries/Users/usersGetAll";
import { paths } from "@/controllers/paths";
import CardUserComponent from "@/components/CardUser/CardUserComponent.vue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  components: { CardUserComponent },
  setup() {
    const users = ref([]);
    const filterSearch = ref("");

    onMounted(async () => {
      store.commit("setUsers", await usersGetAll());
    });

    function redirectToRegisterUsers() {
      router.push(paths.registerUser);
    }

    return { users, redirectToRegisterUsers, store };
  },
});
</script>

<template>
  <section class="usersView-header">
    <h2>Usuários</h2>
    <button @click="redirectToRegisterUsers">+</button>
  </section>
  <!-- <input type="text" placeholder="Pesquisar..." /> -->
  <section v-for="user in store.state.users" :key="user.id">
    <CardUserComponent :user="user" />
  </section>
</template>

<style lang="scss" scoped>
.usersView-header {
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
