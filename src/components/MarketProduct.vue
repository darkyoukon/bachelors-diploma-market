<template>
  <section>
    <Suspense>
      <MarketContent class="product-inner">
          <img src="@/assets/toys/img.png" alt="іграшка" class="product-picture" loading="lazy"/>
          <div class="product-bottom-description">
            <h4 class="product-name">Eduard</h4>
            <div class="price">
              <b>500</b>
              <img
                  :src="require(`@/assets/icons/currencies/${currency.currentCurrency}.svg`)"
                  :alt="currency.currentCurrency"
                  class="currency-icon"
              />
            </div>
          </div>
      </MarketContent>

      <template #fallback>
        <div class="load"/>
      </template>
    </Suspense>
  </section>
</template>

<script>
import {useCurrencyStore} from "@/stores/useCurrencyStore";
import MarketContent from "@/components/UI/MarketContent";

export default {
  name: "MarketProduct",
  components: {MarketContent},
  setup() {
    const currency = useCurrencyStore();
    return {
      currency
    }
  }
}
</script>

<style scoped lang="scss">
@use "sass:math";
.product-inner {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  border-radius: var(--product-border-radius);
  overflow: hidden;
  position: relative;
}
.product-picture {
  object-fit: cover;
}
.product-bottom-description {
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(45deg, rgba(228,220,249, 1) 15%, rgba(254,252,253, .9) 50%);

  width: 100%;
  padding: 8px 20px;
  transition: .1s ease-in-out;
}
.product-inner:hover .product-bottom-description {
  transform: translateY(0);
}
.product-bottom-description > .price {
  display: flex;
  align-items: center;
  column-gap: 8px;
}
.currency-icon {
  width: 14px;
}

.load {
  border-radius: inherit;

  --colours-quantity: 7;
  --proportion: calc(var(--product-size) * #{math.sqrt(2)} / var(--colours-quantity));

  aspect-ratio: 1/1;

  /*background: repeating-radial-gradient(circle, #8E94F2 8%, #FEFCFD 15%, #8E94F2 16%);*/
  background: repeating-linear-gradient(
          45deg,
          #ff0030 calc(var(--proportion) * 0),
          #ff0030 calc(var(--proportion) * 1),
          #c000ff calc(var(--proportion) * 1),
          #c000ff calc(var(--proportion) * 2),
          #0066ff calc(var(--proportion) * 2),
          #0066ff calc(var(--proportion) * 3),
          #00baff calc(var(--proportion) * 3),
          #00baff calc(var(--proportion) * 4),
          #46f609 calc(var(--proportion) * 4),
          #46f609 calc(var(--proportion) * 5),
          #fffc00 calc(var(--proportion) * 5),
          #fffc00 calc(var(--proportion) * 6),
          #fea002 calc(var(--proportion) * 6),
          #fea002 calc(var(--proportion) * 7),
  ) repeat left / calc(var(--product-size) * 2);

  @keyframes animatedBackground {
    from {
      background-position: calc(var(--product-size) * 2) 0;
    }
  }
  animation: animatedBackground 3s ease-in-out infinite alternate-reverse;

  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    border: 5px solid rgba(0, 0, 0, .1);
    border-radius: inherit;
  }
}
</style>