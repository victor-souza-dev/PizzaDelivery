<script lang="ts">
import CartItemComponentVue from "@/components/CartItem/CartItemComponent.vue";
import { paths } from "@/controllers/paths";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: CartItemComponentVue,
  setup() {
    const countItem = ref(0);

    return { countItem };
  },
  methods: {
    addItem() {
      this.countItem++;
    },
    substractItem() {
      if (this.countItem > 0) {
        this.countItem--;
      }
    },
    redirectToOrder() {
      this.$router.push(paths.success);
    },
  },
});
</script>

<template>
  <main class="cart-container">
    <section class="cart-completedOrder">
      <h3>Complete seu pedido</h3>
      <section class="cart-address">
        <h4>
          <img src="@/assets/address.svg" alt="address icon" />Endereço de
          entrega
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
      <section class="cart-payment">
        <h4><img src="@/assets/sign.svg" alt="sign icon" />Pagamento</h4>
        <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
        <div>
          <button>
            <img src="@/assets/creditCard.svg" alt="credit card icon" />Cartão
            de crédito
          </button>
          <button>
            <img src="@/assets/debitCard.svg" alt="debit card icon" />Cartão de
            débito
          </button>
          <button>
            <img src="@/assets/money.svg" alt="money icon" />Dinheiro
          </button>
        </div>
      </section>
    </section>
    <section class="cart-items">
      <h3>Pizzas selecionadas</h3>
      <section>
        <div class="cart-items--item">
          <div class="cart-item">
            <img src="@/assets/pizza.svg" alt="item" />
            <div class="cart-item--configs">
              <span>Frango</span>
              <div>
                <section class="card-counter cart-items--counter">
                  <button
                    @click="substractItem"
                    :disabled="countItem === 0 ? true : false"
                  >
                    -
                  </button>
                  <span>{{ countItem }}</span>
                  <button @click="addItem">+</button>
                </section>
                <button class="cart-items--removeButton">
                  <img src="@/assets/delete.svg" alt="remove icon" />REMOVER
                </button>
              </div>
            </div>
          </div>
          <p>R$ 9,90</p>
        </div>
        <div class="cart-items--divider" />
        <div class="cart-items--prices">
          <section>
            <span>Total de Itens</span>
            <p>R$ 29,70</p>
          </section>
          <section>
            <span>Entrega</span>
            <p>R$ 3,50</p>
          </section>
          <section>
            <h4>Total</h4>
            <h4>R$ 33,20</h4>
          </section>
        </div>
        <button class="cart-items--submit" @click="redirectToOrder">
          Confirmar pedido
        </button>
      </section>
    </section>
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

    &:last-child {
      margin-top: 20px;
    }
  }
}

.cart-address {
  h4 {
    display: flex;
    margin: 0;
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 400;

    img {
      margin-right: 10px;
    }
  }

  p {
    margin-top: 5px;
    margin-bottom: 40px;
    margin-left: 32px;
    font-size: 14px;
    line-height: 18.2px;
    font-weight: 400;
  }
}

.cart-address--form {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;

  input {
    height: 25px;
    border-radius: 4px;
    padding: 12px;
    background-color: #ededed;
    border: 1px solid #dddddd;
    color: #8d8686;
    outline-color: #b1b1b1;
  }

  input:nth-child(2) {
    grid-column: span 4;
  }

  input:nth-child(4) {
    grid-column: span 3;
  }

  input:nth-child(6) {
    grid-column: span 2;
  }
}

.cart-payment {
  h4 {
    display: flex;
    margin: 0;
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 400;

    img {
      margin-right: 10px;
    }
  }

  p {
    margin-top: 5px;
    margin-bottom: 40px;
    margin-left: 32px;
    font-size: 14px;
    line-height: 18.2px;
    font-weight: 400;
  }
  div {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  button {
    height: 51px;
    border-radius: 6px;
    padding: 16px;
    background-color: #e6e5e5;
    border: none;
    transition: filter 0.3s ease;
    color: #574f4d;
    font-size: 12px;
    line-height: 19.2px;
    white-space: nowrap;
    text-align: start;
    display: flex;

    &:hover {
      outline: 2px solid rgba(127, 71, 248, 0.38);
    }

    img {
      margin-right: 10px;
    }
  }
}

.cart-items {
  flex: 1;
  margin-left: 30px;
  & > section {
    background-color: #f3f2f2;
    padding: 40px;
    border-radius: 6px 44px 6px 44px;
  }
}

.cart-items--item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  img {
    width: 62.59px;
    height: 64px;
  }

  p {
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 700;
    color: #574f4d;
    margin: 0;
    white-space: nowrap;
  }
}

.cart-items--counter {
  height: 20px !important;
  padding: 10px !important;
  background-color: #e6e5e5 !important;

  span {
    margin-bottom: 0 !important;
  }
}

.cart-items--removeButton {
  margin-left: 10px;
  height: 40px;
  border-radius: 6px;
  padding: 0px 8px 0px 8px;
  background-color: #e6e5e5 !important;
  display: flex;
  align-items: center;
  border: none;
  font-size: 12px;
  line-height: 19.2px;
  font-weight: 400;

  &:hover {
    outline: 2px solid #c1c1c1;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}

.cart-items--divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}

.cart-items--prices {
  margin-top: 50px;
  section {
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #574f4d;
    height: 30px;

    &:last-child {
      margin-top: 5px;
    }
  }

  span {
    font-size: 14px;
    line-height: 18.2px;
    font-weight: 400;
  }

  p {
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 400;
  }

  h4 {
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #403937;
  }
}

.cart-items--submit {
  width: 100%;
  height: 46px;
  border-radius: 6px;
  padding: 12px 8px;
  background-color: #2ea80f;
  border: none;
  color: white;
  margin-top: 25px;
}

.cart-item {
  display: flex;
}

.cart-item--configs {
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 20.8px;
    font-weight: 400;
  }

  div {
    display: flex;
    flex-direction: row;
  }
}

@media (max-width: 575px) {
  .cart-payment {
    button {
      grid-column: span 3;
    }
  }
}

@media (max-width: 1200px) {
  .cart-items {
    margin-left: 0px !important;
  }

  .cart-container {
    flex-direction: column;
  }
}
</style>
