<script lang="ts">
import CartAddressComponent from "@/components/CartAddress/CartAddressComponent.vue";
import CartItemComponent from "@/components/CartItem/CartItemComponent.vue";
import CartPaymentComponent from "@/components/CartPayment/CartPaymentComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CartPaymentComponent, CartAddressComponent, CartItemComponent },
});
</script>

<template>
  <main class="cart-container">
    <section class="cart-completedOrder">
      <h3>Complete seu pedido</h3>
      <CartAddressComponent />
      <CartPaymentComponent />
    </section>
    <CartItemComponent />
  </main>
</template>

<style lang="scss" scoped>
.cart-container {
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.cart-completedOrder {
  flex: 2;

  section {
    background-color: #f3f2f2;
    padding: 40px;
    border-radius: 6px;
    margin-top: 20px;
  }
}

@media (max-width: 1200px) {
  .cart-container {
    flex-direction: column;
  }
}
</style>
