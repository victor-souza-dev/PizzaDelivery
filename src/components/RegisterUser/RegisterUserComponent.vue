<script lang="ts">
import { paths } from "@/controllers/paths";
import { usersPost } from "@/queries/Users/usersPost";
import router from "@/router";
import store from "@/store";
import { dateInfo } from "@/utils/dateInfo";
import { ErrorMessage, Field, Form, SubmissionContext } from "vee-validate";
import { defineComponent } from "vue";
import "./registerUserComponent.scss";
import { schemaRegisterUser } from "./schema";

interface DataForm {
  name: string;
  birthDate: string;
  cpf: string;
}

function registerRedirect() {
  router.push(paths.home);
  store.commit("toggleModal", true);
}

export default defineComponent({
  name: "RegisterUserComponent",
  components: { ErrorMessage, Field, Form },
  setup() {
    const {
      format: { enUs },
    } = dateInfo();

    const handleSubmit = (
      { name, cpf, birthDate }: DataForm,
      ctx: SubmissionContext
    ) => {
      try {
        usersPost({
          cpf,
          birthDate,
          name,
        });

        ctx.resetForm();
        registerRedirect();
      } catch (err) {
        console.log(err);
      }
    };

    return {
      registerRedirect,
      handleSubmit,
      enUs,
      schemaRegisterUser,
    };
  },
});
</script>

<template>
  <div class="registerClient-container">
    <h1 class="registerClient-title">
      Sign up <span>Pizza<span>Delivery</span></span>
    </h1>
    <Form
      class="registerClient-form"
      @submit="(values, ctx) => handleSubmit(values as DataForm, ctx)"
      :validation-schema="schemaRegisterUser"
      v-slot="{ errors }"
    >
      <section class="registerClient-form--inputs">
        <Field
          type="text"
          name="name"
          placeholder="Nome"
          minlength="1"
          maxlength="20"
          :class="{ 'invalid-input': errors.name }"
        />
        <ErrorMessage name="name" class="error-message" />
        <Field
          type="text"
          name="cpf"
          placeholder="CPF"
          :class="{ 'invalid-input': errors.cpf }"
          maxlength="14"
        />
        <ErrorMessage name="cpf" class="error-message" />
        <Field
          type="date"
          name="birthDate"
          placeholder="Data de Nascimento"
          :class="{ 'invalid-input': errors.birthDate }"
          min="1950-01-01"
          :max="enUs"
        />
        <ErrorMessage name="birthDate" class="error-message" />
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
        <strong @click="registerRedirect()">Login </strong>
        <span>Pizza<span>Delivery</span></span>
      </h4>
    </Form>
  </div>
</template>
