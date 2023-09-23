<script lang="ts">
import { defineComponent, ref } from "vue";
import "./cartPaymentComponent.scss";

type IPayment = "credit" | "debit" | "money" | null;

export default defineComponent({
  name: "CartPaymentComponent",
  data() {
    return {
      payment: null as IPayment,
    };
  },
  methods: {
    setPayment(value: IPayment) {
      this.payment = value;
    },
  },
});
</script>

<template>
  <section class="cart-payment">
    <h4><img src="@/assets/sign.svg" alt="sign icon" />Pagamento</h4>
    <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
    <div>
      <button
        :class="{ focused: payment === 'credit' }"
        @click="setPayment('credit')"
      >
        <img src="@/assets/creditCard.svg" alt="credit card icon" />Cartão de
        crédito
      </button>
      <button
        :class="{ focused: payment === 'debit' }"
        @click="setPayment('debit')"
      >
        <img src="@/assets/debitCard.svg" alt="debit card icon" />Cartão de
        débito
      </button>
      <button
        :class="{ focused: payment === 'money' }"
        @click="setPayment('money')"
      >
        <img src="@/assets/money.svg" alt="money icon" />Dinheiro
      </button>
    </div>
  </section>
</template>
