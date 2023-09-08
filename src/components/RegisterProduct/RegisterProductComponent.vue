<script lang="ts">
import { paths } from "@/controllers/paths";
import router from "@/router";
import store from "@/store";
import { defineComponent, ref } from "vue";
import { productsPost } from "@/queries/Products/productsPost";
import "./registerProductComponent.scss";

export default defineComponent({
  name: "RegisterProductComponent",
  setup() {
    const fields = ref({
      description: "",
      type: "",
      unitaryValue: "0",
    });

    const hasErrors = ref({
      description: false,
      type: false,
      unitaryValue: false,
    });

    function resetFields() {
      fields.value.description = "";
      fields.value.type = "";
      fields.value.unitaryValue = "0";
    }

    function register() {
      router.push(paths.home);
      store.commit("toggleModal", true);
    }

    function handleSubmit(event: Event) {
      event.preventDefault();

      const unitaryValue = parseFloat(
        fields.value.unitaryValue.replace(/[^0-9,.]/g, "").replace(",", ".")
      );

      fields.value.unitaryValue = unitaryValue.toString().replace(".", ",");

      if (fields.value.description.length <= 0) {
        hasErrors.value.description = true;
      } else {
        hasErrors.value.description = false;
      }

      if (unitaryValue <= 0) {
        hasErrors.value.unitaryValue = true;
      } else {
        hasErrors.value.unitaryValue = false;
      }

      if (Object.values(hasErrors.value).every((value) => value === false)) {
        productsPost({
          description: fields.value.description,
          type: fields.value.type,
          unitaryValue: unitaryValue.toString(),
        }).then(() => resetFields());
      }
    }

    return {
      store,
      register,
      fields,
      hasErrors,
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="registerProduct-container">
    <h1 class="registerProduct-title">
      Register Product <span>Pizza<span>Delivery</span></span>
    </h1>
    <form class="registerProduct-form" @submit="handleSubmit">
      <section class="registerProduct-form--inputs">
        <input
          type="text"
          placeholder="Descrição"
          v-model="fields.description"
          minlength="1"
          maxlength="20"
          required
        />
        <span v-if="hasErrors.description" class="error-message"
          >Campo inválido</span
        >
        <input
          type="text"
          minlength="3"
          placeholder="Tipo"
          v-model="fields.type"
          required
        />
        <span v-if="hasErrors.type" class="error-message">Campo inválido</span>
        <input
          type="text"
          minlength="3"
          placeholder="Valor unitário"
          v-model="fields.unitaryValue"
          required
        />
        <span v-if="hasErrors.unitaryValue" class="error-message"
          >Campo inválido</span
        >
      </section>
      <button
        type="submit"
        :class="{
          'button-error': hasErrors.description && hasErrors.unitaryValue,
        }"
      >
        Confirm
      </button>
    </form>
  </div>
</template>
@/queries/Product/productsPost
