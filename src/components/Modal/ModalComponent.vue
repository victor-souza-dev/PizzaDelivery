<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersLogin } from "@/queries/Users/usersLogin";
import router from "@/router";
import store from "@/store";
import { defineComponent, ref } from "vue";
import "./modalComponent.scss";

export default defineComponent({
  name: "ModalComponent",
  setup() {
    const fields = ref({
      cpf: "",
      birthDate: "",
    });

    const hasErrors = ref({
      cpf: false,
      birthDate: false,
    });

    function resetFields() {
      fields.value.cpf = "";
      fields.value.birthDate = "";
    }
    function closeModal() {
      store.commit("toggleModal", false);
    }

    function redirectToRegisterUsers() {
      router.push(paths.registerUser);
      closeModal();
    }

    function handleSubmit(event: Event) {
      event.preventDefault();
      const cpfRegex = /^[0-9]{11}$/;

      if (!cpfRegex.test(fields.value.cpf)) {
        hasErrors.value.cpf = true;
      } else {
        hasErrors.value.cpf = false;
      }

      if (Object.values(hasErrors.value).every((value) => value === false)) {
        usersLogin({
          cpf: fields.value.cpf,
          birthDate: fields.value.birthDate,
        }).then((data) => {
          store.commit("login", data);
          resetFields();
          closeModal();
          window.location.reload();
        });
      }
    }

    return {
      store,
      closeModal,
      redirectToRegisterUsers,
      handleSubmit,
      fields,
      hasErrors,
    };
  },
});
</script>

<template>
  <div
    class="modal-container"
    :class="{ 'modal-open': store.state.isModalLogin }"
  >
    <header class="modal-header">
      <button class="modal-close-button" @click="closeModal">
        <img src="../../assets/close.svg" alt="close button" />
      </button>
    </header>
    <h1 class="modal-title">
      Sign in into <span>Pizza<span>Delivery</span></span>
    </h1>
    <form class="modal-form" @submit="handleSubmit">
      <section class="modal-form--inputs">
        <input type="text" v-model="fields.cpf" placeholder="CPF" required />
        <span v-if="hasErrors.cpf" class="error-message">Campo inválido</span
        ><input
          type="date"
          v-model="fields.birthDate"
          placeholder="Data de Nascimento"
          required
        />
        <span v-if="hasErrors.birthDate" class="error-message"
          >Campo inválido</span
        >
        <span class="modal-form--forgot">Forgot password?</span>
      </section>
      <button type="submit">Sign in</button>
      <h4 class="modal-footerMessage">
        Don't have an account?
        <strong @click="redirectToRegisterUsers">Sign up to </strong>
        <span>Pizza<span>Delivery</span></span>
      </h4>
    </form>
  </div>
</template>
