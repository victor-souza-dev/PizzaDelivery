<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersLogin } from "@/queries/Users/usersLogin";
import router from "@/router";
import store from "@/store";
import { ErrorMessage, Field, Form, SubmissionContext } from "vee-validate";
import { defineComponent } from "vue";
import { dateInfo } from "../../utils/dateInfo";
import "./modalComponent.scss";
import { schemaModal } from "./schema";

interface DataForm {
  birthDate: string;
  cpf: string;
}

export default defineComponent({
  name: "ModalComponent",
  components: { Form, Field, ErrorMessage },
  methods: {
    closeModal() {
      store.commit("toggleModal", false);
    },
    redirectToRegisterUsers() {
      router.push(paths.registerUser);
      this.closeModal();
    },
    async handleSubmit({ cpf, birthDate }: DataForm, ctx: SubmissionContext) {
      const data = await usersLogin({ cpf, birthDate });

      if (data) {
        store.commit("login", data);
        this.closeModal();
        ctx.resetForm();
        window.location.reload();
      } else {
        alert("Usuário inválido!");
      }
    },
  },
  data() {
    const {
      format: { enUs },
    } = dateInfo();

    return {
      store,
      enUs,
      schemaModal,
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
    <Form
      class="modal-form"
      @submit="(values, ctx) => handleSubmit(values as DataForm, ctx)"
      :validation-schema="schemaModal"
      v-slot="{ errors }"
    >
      <section class="modal-form--inputs">
        <Field
          name="cpf"
          placeholder="CPF"
          class="modal-form--input"
          :class="{ 'invalid-input': errors.cpf }"
          maxlength="14"
        />
        <ErrorMessage name="cpf" class="error-message" />
        <Field
          type="date"
          name="birthDate"
          placeholder="Data de Nascimento"
          class="modal-form--input"
          :class="{ 'invalid-input': errors.birthDate }"
          min="1950-01-01"
          :max="enUs"
        />
        <ErrorMessage name="birthDate" class="error-message" />
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
    </Form>
  </div>
</template>
