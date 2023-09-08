<script lang="ts">
import { IUser } from "@/Interfaces/IUser";
import { usersDelete } from "@/queries/Users/usersDelete";
import { usersPatch } from "@/queries/Users/usersPatch";
import store from "@/store";
import { objectsEqual } from "@/utils/objectsEquals";
import { defineComponent, ref } from "vue";
import "./cardUserComponent.scss";

export default defineComponent({
  name: "CardUserComponent",
  props: {
    user: Object as () => IUser,
  },
  setup(props) {
    const nameComponent = "user";
    const isDisabled = ref(true);
    const inputs = ref<Partial<IUser>>({ ...props.user });

    function resetFields() {
      inputs.value.cpf = props[nameComponent]?.cpf;
      inputs.value.birthDate = props[nameComponent]?.birthDate;
      inputs.value.name = props[nameComponent]?.name;
      isDisabled.value = true;
    }

    function deleted() {
      if (props[nameComponent]?.id) {
        confirm(`Tem certeza que deseja excluir esse usuário?`) &&
          usersDelete(props[nameComponent]?.id as string);
        store.commit("deleteUser", props[nameComponent]?.id);
      }
    }

    function edit() {
      if (!isDisabled.value) {
        const updated = { ...inputs.value };
        if (!objectsEqual(updated, props[nameComponent])) {
          usersPatch(updated as IUser);
          store.commit("updateUser", updated);
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
  <div class="cardUser">
    <section>
      <label :for="[nameComponent].id + [nameComponent].name">Nome:</label>
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].name"
        :disabled="isDisabled"
        :defaultValue="[nameComponent].name"
        v-model="inputs.name"
      />
    </section>
    <section>
      <label :for="[nameComponent].id + [nameComponent].cpf">CPF:</label>
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].cpf"
        :defaultValue="[nameComponent].cpf"
        v-model="inputs.cpf"
        :disabled="isDisabled"
      />
    </section>
    <section>
      <label :for="[nameComponent].id + [nameComponent].birthDate"
        >Data de Nascimento:</label
      >
      <input
        type="text"
        :id="[nameComponent].id + [nameComponent].birthDate"
        :defaultValue="[nameComponent].birthDate"
        v-model="inputs.birthDate"
        :disabled="isDisabled"
      />
    </section>
    <div>
      <button @click="isDisabled = false" :disabled="!isDisabled">
        <img
          src="@/assets/edit.svg"
          alt="edit icon"
          :class="{ 'cardUser-disabled': !isDisabled }"
        />
      </button>
      <button @click="edit([nameComponent])" :disabled="isDisabled">
        {{ !isDisabled ? "✔" : "" }}
      </button>
      <button :disabled="!isDisabled" @click="deleted">
        <img
          src="@/assets/delete.svg"
          alt="delete icon"
          :class="{ 'cardUser-disabled': !isDisabled }"
        />
      </button>
      <button @click="resetFields" :disabled="isDisabled">✖</button>
    </div>
  </div>
</template>
