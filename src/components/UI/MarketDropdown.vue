<template>
  <MarketContent class="dropdown" v-show="show">
    <slot>Пусто</slot>
  </MarketContent>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "MarketDropdown",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    content: {
      type: Object,
      default() {
        return {img: 'none.png', description: 'Пусто'}
      }
    }
  },
  mounted() {
    console.log(this.show);
  }
})
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  bottom: -300%;

  width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
  margin: auto;
}

.dropdown :nth-child(n+1):before {
  content: '';
  height: 2px;
  width: var(--border-between-products);
  background-color: var(--line-color);
  border-radius: var(--product-border-radius);
}
</style>