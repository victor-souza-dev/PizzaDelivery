<template>
  <div class="presentation">
    <section class="presentation-content">
      <div class="presentation-desc">
        <section>
          <h1>Encontre a pizza perfeita</h1>
          <h4>
            Com a Pizza Delivery você recebe sua pizza onde estiver, a qualquer
            hora
          </h4>
        </section>
        <section class="benefits">
          <section>
            <img src="@/assets/white-cart.svg" alt="Compra simples e segura" />
            <p>Compra simples e segura</p>
          </section>
          <section>
            <img
              src="@/assets/white-box.svg"
              alt="Embalagem mantém a pizza intacta"
            />
            <p>Embalagem mantém a pizza intacta</p>
          </section>
          <section>
            <img
              src="@/assets/white-clock.svg"
              alt="Entrega rápida e rastreada"
            />
            <p>Entrega rápida e rastreada</p>
          </section>
          <section>
            <img
              src="@/assets/white-coffee.svg"
              alt="A pizza chega fresquinha até você"
            />
            <p>A pizza chega fresquinha até você</p>
          </section>
        </section>
      </div>
      <figure class="presentation-banner">
        <img src="@/assets/banner.svg" alt="banner" />
      </figure>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PresentationLayout",
});
</script>

<style lang="scss">
.presentation {
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.presentation-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.presentation-desc {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  section {
    h1 {
      font-weight: bold;
      font-size: 48px;
      line-height: 62.4px;
      margin-bottom: 20px;
    }
    h4 {
      margin-top: 0;
      font-size: 15px;
      line-height: 19.5px;
      font-weight: 400;
    }
  }
}

.presentation-banner {
  flex: 1;
}

.benefits {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  section {
    min-width: 260px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;

    img {
      height: 20px;
      padding: 10px;
      border-radius: 100%;
      margin-right: 10px;
    }

    &:first-child {
      img {
        background-color: #c47f17;
        padding: 10px 11px 10px 9px;
      }
    }

    &:nth-child(2) {
      img {
        background-color: #574f4d;
      }
    }

    &:nth-child(3) {
      img {
        background-color: #dbac2c;
      }
    }
    &:nth-child(4) {
      img {
        background-color: #8047f8;
      }
    }
  }
}

@media (max-width: 800px) {
  .presentation-banner {
    display: none;
  }
}
</style>
