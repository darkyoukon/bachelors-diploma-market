<template>
  <header>
    <nav class="subsites">
      <a href="" class="chosen">Каталог</a>
      <!--      <a href="" class="k_small" style="margin-left: 0;">К&К</a>-->
      <VerticalLine/>
      <a href="" class="choose">Про мене</a>
    </nav>
    <p class="logo">1000_elephants</p>
    <section class="buttons">
      <MarketDropdown
          v-model:currentOption="currency.currentCurrency"
          :otherOptions="currency.alternativeCurrencies"
          :imgPath="currency.assetsPath"
          :id="currency.$id"
      />
      <a href="" class="search">
        <!--        input type search-->
        <img src="@/assets/icons/search.svg" alt="search" class="icon"/>
      </a>
      <a href="" class="bag">
        <img src="@/assets/icons/bag.png" class="icon" alt="bag"/>
        <div class="bag_products"><b>9</b></div>
      </a>
      <a href="" class="hamburger"/>
    </section>
  </header>
</template>

<script>
import { useCurrencyStore } from '@/stores/useCurrencyStore'
export default {
  name: "MarketHeader",
  setup() {
    const currency = useCurrencyStore();
    return {
      currency
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--header-padding) 1.5vw;

  background-color: rgba(254, 252, 253, 0.85);
  transition: background-color 200ms;

  border: 1px rgba(0, 0, 0, .2) solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  font-size: 22px;
}

header:hover {
  background-color: rgba(254, 252, 253, 1);
}

.subsites {
  flex: 1;
  display: flex;
  align-items: center;
}

.chosen {
  border: 2px #001514 solid;
  padding: 0 5px;
  border-radius: 12px;
}

.choose {
  border: 2px rgba(0, 0, 0, 0) solid;
  border-radius: 12px;
  transition: border 0.2s ease, padding 0.5s ease;
}

.choose:hover {
  border-color: #001514;
  padding: 0 5px;
}

.logo {
  border: 2px #001514 solid;
  padding: 2px 4px;
  border-radius: 10px;
}

.buttons {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search {
  margin-left: 0.6vw;
}

.bag {
  position: relative;
  margin-left: 1vw;
}

.bag_products {
  position: absolute;
  bottom: -9px;
  right: -6px;

  background-color: rgb(239, 118, 116);
  border-radius: 50%;

  height: 22px;
  width: 24px;
  font-size: 16px;
}

.hamburger {
  display: none;
}

.icon {
  width: var(--icon-size);
  aspect-ratio: 1/1;
}
</style>