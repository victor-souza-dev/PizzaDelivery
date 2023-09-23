<script lang="ts">
import { defineComponent } from "vue";
import "./cartAddressComponent.scss";

export default defineComponent({
  name: "CartAddressComponent",
});
</script>

<template>
  <section class="cart-address">
    <h4>
      <img src="@/assets/address.svg" alt="address icon" />Endereço de entrega
    </h4>
    <p>Informe o endereço onde deseja receber seu pedido</p>
    <form class="cart-address--form">
      <input type="text" placeholder="CEP" />
      <input type="text" placeholder="Rua" />
      <input type="text" placeholder="Número" />
      <input type="text" placeholder="Complemento " />
      <input type="text" placeholder="Bairro" />
      <input type="text" placeholder="Cidade" />
      <input type="text" placeholder="UF" />
    </form>
  </section>
</template>
