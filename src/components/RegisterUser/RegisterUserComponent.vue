<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersPost } from "@/queries/Users/usersPost";
import router from "@/router";
import store from "@/store";
import { defineComponent, ref } from "vue";
import "./registerUserComponent.scss";

export default defineComponent({
  name: "RegisterUserComponent",
  setup() {
    const fields = ref({
      name: "",
      cpf: "",
      birthDate: "",
    });

    const hasErrors = ref({
      name: false,
      cpf: false,
      birthDate: false,
    });

    function resetFields() {
      fields.value.name = "";
      fields.value.cpf = "";
      fields.value.birthDate = "";
    }

    function register() {
      router.push(paths.home);
      store.commit("toggleModal", true);
    }

    function handleSubmit(event: Event) {
      event.preventDefault();
      const cpfRegex = /^[0-9]{11}$/;

      if (!cpfRegex.test(fields.value.cpf)) {
        hasErrors.value.cpf = true;
      } else {
        hasErrors.value.cpf = false;
      }

      if (fields.value.name.length <= 0) {
        hasErrors.value.name = true;
      } else {
        hasErrors.value.name = false;
      }

      if (Object.values(hasErrors.value).every((value) => value === false)) {
        usersPost({
          name: fields.value.name,
          cpf: fields.value.cpf,
          birthDate: fields.value.birthDate,
        }).then(() => resetFields());
      }
    }

    return { store, register, fields, hasErrors, handleSubmit };
  },
});
</script>

<template>
  <div class="registerClient-container">
    <h1 class="registerClient-title">
      Sign up <span>Pizza<span>Delivery</span></span>
    </h1>
    <form class="registerClient-form" @submit="handleSubmit">
      <section class="registerClient-form--inputs">
        <input
          type="text"
          placeholder="Name"
          v-model="fields.name"
          minlength="1"
          maxlength="20"
          required
        />
        <span v-if="hasErrors.name" class="error-message">Campo inválido</span>
        <input type="text" placeholder="CPF" v-model="fields.cpf" required />
        <span v-if="hasErrors.cpf" class="error-message">Campo inválido</span>
        <input
          type="date"
          placeholder="Data de Nascimento"
          v-model="fields.birthDate"
          required
        />
        <span v-if="hasErrors.birthDate" class="error-message"
          >Campo inválido</span
        >
      </section>
      <button
        type="submit"
        :class="{
          'button-error':
            hasErrors.cpf && hasErrors.name && hasErrors.birthDate,
        }"
      >
        Confirm
      </button>
      <h4 class="registerClient-footerMessage">
        You already have an account?
        <strong @click="register()">Sign in to </strong>
        <span>Pizza<span>Delivery</span></span>
      </h4>
    </form>
  </div>
</template>
