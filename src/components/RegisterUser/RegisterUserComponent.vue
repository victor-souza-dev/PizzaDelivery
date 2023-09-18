<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersPost } from "@/queries/Users/usersPost";
import router from "@/router";
import store from "@/store";
import { dateInfo } from "@/utils/dateInfo";
import { useForm } from "vee-validate";
import { defineComponent } from "vue";
import "./registerUserComponent.scss";
import { schemaRegisterUser } from "./schema";

export default defineComponent({
  name: "RegisterUserComponent",
  setup() {
    const {
      format: { enUs },
    } = dateInfo();

    const { handleSubmit, errors, defineInputBinds, resetForm } = useForm({
      validationSchema: schemaRegisterUser,
    });

    const cpf = defineInputBinds("cpf");
    const birthDate = defineInputBinds("birthDate");
    const name = defineInputBinds("name");

    function register() {
      router.push(paths.home);
      store.commit("toggleModal", true);
    }

    const onSubmit = handleSubmit(({ cpf, birthDate, name }) => {
      usersPost({
        cpf,
        birthDate,
        name,
      }).then((data) => {
        store.commit("login", data);
        resetForm();
        register();
      });
    });

    return {
      store,
      register,
      onSubmit,
      errors,
      name,
      birthDate,
      cpf,
      enUs,
    };
  },
});
</script>

<template>
  <div class="registerClient-container">
    <h1 class="registerClient-title">
      Sign up <span>Pizza<span>Delivery</span></span>
    </h1>
    <form class="registerClient-form" @submit="onSubmit">
      <section class="registerClient-form--inputs">
        <input
          type="text"
          placeholder="Nome"
          v-bind="name"
          minlength="1"
          maxlength="20"
          :class="{ 'invalid-input': errors.name }"
        />
        <span class="error-message">{{ errors.name }}</span>
        <input
          name="cpf"
          v-bind="cpf"
          placeholder="CPF"
          :class="{ 'invalid-input': errors.cpf }"
          maxlength="14"
        />
        <span class="error-message">{{ errors.cpf }}</span>
        <input
          type="date"
          name="birthDate"
          v-bind="birthDate"
          placeholder="Data de Nascimento"
          :class="{ 'invalid-input': errors.birthDate }"
          min="1950-01-01"
          :max="enUs"
        />
        <span class="error-message">{{ errors.birthDate }}</span>
      </section>
      <button
        type="submit"
        :class="{
          'button-error': errors.birthDate || errors.name || errors.cpf,
        }"
      >
        Confirmar
      </button>
      <h4 class="registerClient-footerMessage">
        Você já tem uma conta?
        <strong @click="register()">Login </strong>
        <span>Pizza<span>Delivery</span></span>
      </h4>
    </form>
  </div>
</template>
