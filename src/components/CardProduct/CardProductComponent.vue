<script lang="ts">
import { IProduct } from "@/Interfaces/IProduct";
import { productsDelete } from "@/queries/Products/productsDelete";
import { productsPatch } from "@/queries/Products/productsPatch";
import store from "@/store";
import { objectsEqual } from "@/utils/objectsEquals";
import { defineComponent, ref } from "vue";
import "./cardProductComponent.scss";

export default defineComponent({
  name: "CardProductComponent",
  props: {
    product: Object as () => IProduct,
  },
  setup(props) {
    const nameComponent = "product";
    const isDisabled = ref(true);
    const inputs = ref<Partial<IProduct>>({ ...props[nameComponent] });

    function resetFields() {
      inputs.value.description = props[nameComponent]?.description;
      inputs.value.type = props[nameComponent]?.type;
      inputs.value.unitaryValue = props[nameComponent]?.unitaryValue;
      isDisabled.value = true;
    }

    function deleted() {
      if (props[nameComponent]?.id) {
        confirm(`Tem certeza que deseja excluir esse produto?`) &&
          productsDelete(props[nameComponent]?.id as string).then(() =>
            store.commit("deleteProduct", props[nameComponent]?.id)
          );
      }
    }

    function edit() {
      if (!isDisabled.value) {
        const updated: any = { ...inputs.value };
        if (!objectsEqual(updated, props[nameComponent])) {
          const unitaryValue = parseFloat(
            updated.unitaryValue.replace(/[^0-9,.]/g, "").replace(",", ".")
          );

          if (updated.description.length <= 0 || unitaryValue <= 0) {
            return alert("Erro, valores inválidos");
          }

          productsPatch(updated as IProduct);
          inputs.value.unitaryValue = unitaryValue.toString().replace(".", ",");
          store.commit("updateProduct", {
            ...updated,
            unitaryValue: unitaryValue.toString().replace(".", ","),
          });
          isDisabled.value = true;
          return;
        }
        alert("Erro, nenhuma mudança detectada");
      }
    }

    return { isDisabled, inputs, edit, deleted, resetFields, nameComponent };
  },
});
</script>

<template>
  <div class="card-product">
    <section>
      <label :for="[nameComponent].id + [nameComponent].description"
        >Descrição:</label
      >
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].description"
        :disabled="isDisabled"
        :defaultValue="[nameComponent].description"
        v-model="inputs.description"
      />
    </section>
    <section>
      <label :for="[nameComponent].id + [nameComponent].type">Tipo:</label>
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].type"
        :defaultValue="[nameComponent].type"
        v-model="inputs.type"
        :disabled="isDisabled"
      />
    </section>
    <section>
      <label :for="[nameComponent].id + [nameComponent].unitaryValue"
        >Valor unitário:</label
      >
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].unitaryValue"
        :defaultValue="[nameComponent].unitaryValue"
        v-model="inputs.unitaryValue"
        :disabled="isDisabled"
      />
    </section>
    <div>
      <button @click="isDisabled = false" :disabled="!isDisabled">
        <img
          src="@/assets/edit.svg"
          alt="edit icon"
          :class="{ 'card-product-disabled': !isDisabled }"
        />
      </button>
      <button @click="edit([nameComponent])" :disabled="isDisabled">
        {{ !isDisabled ? "✔" : "" }}
      </button>
      <button :disabled="!isDisabled" @click="deleted">
        <img
          src="@/assets/delete.svg"
          alt="delete icon"
          :class="{ 'cardproduct-disabled': !isDisabled }"
        />
      </button>
      <button @click="resetFields" :disabled="isDisabled">✖</button>
    </div>
  </div>
</template>
@/queries/Product/productsDelete@/queries/Product/productsPatch
