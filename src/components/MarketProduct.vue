<template>
  <section>
      <MarketContent class="product-inner">
        <img :src="require(`@/assets/${productPath}`)" :alt="productPath" class="product-picture" loading="lazy"/>
        <div class="product-bottom-description">
          <h4 class="product-name">{{ productName }}</h4>
          <div class="price">
            <b>{{ productPrice }}</b>
            <img
                :src="require(`@/assets/icons/currencies/${currency.currentCurrency}.svg`)"
                :alt="currency.currentCurrency"
                class="currency-icon"
            />
          </div>
        </div>
      </MarketContent>
    </section>
</template>

<script>
import {useCurrencyStore} from "@/stores/useCurrencyStore";
import MarketContent from "@/components/UI/MarketContent";

export default {
  name: "MarketProduct",
  components: {MarketContent},
  props: {
    productName: {
      type: String,
      required: true
    },
    productPath: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    }
  },
  async setup() {
    const currency = useCurrencyStore();

    await new Promise(resolve => setTimeout(resolve, 200 * Math.floor(Math.random() * 15)));

    return {
      currency
    }
  }
}
</script>

<style scoped lang="scss">
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

  background: linear-gradient(45deg, rgba(228, 220, 249, 1) 15%, rgba(254, 252, 253, .9) 50%);

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
</style>