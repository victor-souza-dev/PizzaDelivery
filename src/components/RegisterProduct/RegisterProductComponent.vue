<script lang="ts">
import { paths } from "@/controllers/paths";
import { productsPost } from "@/queries/Products/productsPost";
import router from "@/router";
import store from "@/store";
import { ErrorMessage, Field, Form, SubmissionContext } from "vee-validate";
import { defineComponent } from "vue";
import "./registerProductComponent.scss";
import { schemaProduct } from "./schema";

interface DataForm {
  description: string;
  type: string;
  unitaryValue: string;
}

export default defineComponent({
  name: "RegisterProductComponent",
  components: { ErrorMessage, Field, Form },
  methods: {
    register() {
      router.push(paths.home);
      store.commit("toggleModal", true);
    },
    handleSubmit(
      { description, type, unitaryValue }: DataForm,
      ctx: SubmissionContext
    ) {
      productsPost({
        description,
        type,
        unitaryValue: unitaryValue.toString(),
      }).then(() => ctx.resetForm());
    },
  },
  data() {
    return {
      schemaProduct,
    };
  },
});
</script>

<template>
  <div class="registerProduct-container">
    <h1 class="registerProduct-title">
      Register Product <span>Pizza<span>Delivery</span></span>
    </h1>
    <Form
      class="registerProduct-form"
      @submit="(values, ctx) => handleSubmit(values as DataForm, ctx)"
      :validation-schema="schemaProduct"
      v-slot="{ errors }"
    >
      <section class="registerProduct-form--inputs">
        <Field
          type="text"
          placeholder="Descrição"
          name="description"
          minlength="1"
          maxlength="20"
          :class="{ 'invalid-input': errors.description }"
          required
        />
        <ErrorMessage name="description" class="error-message" />
        <Field
          type="text"
          minlength="3"
          placeholder="Tipo"
          name="type"
          :class="{ 'invalid-input': errors.type }"
          required
        />
        <ErrorMessage name="type" class="error-message" />
        <Field
          type="text"
          minlength="3"
          placeholder="Valor unitário"
          name="unitaryValue"
          :class="{ 'invalid-input': errors.unitaryValue }"
          required
        />
        <ErrorMessage name="unitaryValue" class="error-message" />
      </section>
      <button
        type="submit"
        :class="{
          'button-error': errors.description && errors.unitaryValue,
        }"
      >
        Confirm
      </button>
    </Form>
  </div>
</template>
