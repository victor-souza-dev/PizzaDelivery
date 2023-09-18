<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersLogin } from "@/queries/Users/usersLogin";
import router from "@/router";
import store from "@/store";
import { useForm } from "vee-validate";
import { defineComponent } from "vue";
import { dateInfo } from "../../utils/dateInfo";
import "./modalComponent.scss";
import { schemaModal } from "./schema";

export default defineComponent({
  name: "ModalComponent",
  setup() {
    const {
      format: { enUs },
    } = dateInfo();

    const { handleSubmit, errors, defineInputBinds, resetForm } = useForm({
      validationSchema: schemaModal,
    });

    const cpf = defineInputBinds("cpf");
    const birthDate = defineInputBinds("birthDate");

    function closeModal() {
      store.commit("toggleModal", false);
    }

    function redirectToRegisterUsers() {
      router.push(paths.registerUser);
      closeModal();
    }

    const onSubmit = handleSubmit(({ cpf, birthDate }) => {
      usersLogin({
        cpf,
        birthDate,
      }).then((data) => {
        store.commit("login", data);
        resetForm();
        closeModal();
        window.location.reload();
      });
    });

    return {
      store,
      closeModal,
      redirectToRegisterUsers,
      onSubmit,
      errors,
      cpf,
      birthDate,
      enUs,
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
    <form class="modal-form" @submit="onSubmit">
      <section class="modal-form--inputs">
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
        <div class="modal-form--forgot">
          <span>Forgot password?</span>
        </div>
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
../../utils/dateInfo
