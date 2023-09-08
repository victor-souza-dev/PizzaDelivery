<template>
  <main class="success-container">
    <section>
      <h1>Uhu! Pedido Confirmado</h1>
      <h2>Agora é só aguardar que logo o café chegará até você</h2>
      <div class="success-infos">
        <div>
          <section class="success-infos-item">
            <img src="@/assets/localization.svg" alt="Localização" />
            <p>
              Entrega em Rua João Daniel Martinelli
              <strong>Farrapos - Porto Alegre</strong>
            </p>
          </section>
          <section class="success-infos-item">
            <img src="@/assets/clock-withBackground.svg" alt="Localização" />
            <p>
              Previsão de entrega
              <strong>20 min - 30min</strong>
            </p>
          </section>
          <section class="success-infos-item">
            <img src="@/assets/priceIcon.svg" alt="Localização" />
            <p>
              Pagamento na entrega
              <strong>Cartão de Crédito</strong>
            </p>
          </section>
        </div>
      </div>
    </section>
    <section class="success-figure">
      <figure>
        <img src="@/assets/deliveryman.svg" alt="Delivery Man image" />
      </figure>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.success-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  h1 {
    color: #c47f17;
    font-weight: 800;
    font-size: 32px;
    line-height: 41.6px;
  }

  h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #403937;
  }

  section {
    flex: 1;
  }
}

.success-infos {
  border-radius: 6px 36px 6px 36px;
  height: 200px;
  background-image: linear-gradient(20deg, #dbac2c 2.61%, #8047f8 98.76%);
  padding: 1px;

  div {
    width: 99.9%;
    height: 99.9%;
    background-color: white;
    border-radius: 6px 36px 6px 36px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    p {
      margin: 0;
    }
  }
}

.success-infos-item {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 10px;
  }

  strong {
    display: block;
  }
}

@media (max-width: 1040px) {
  .success-figure {
    display: none;
  }
}
</style>
