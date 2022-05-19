<template>
  <main>
    <MarketContent class="category-list">
      <div class="category">
        <div class="icon"><img src="@/assets/icons/new-category.png" alt=""></div>
        <VerticalLine></VerticalLine>
        <div class="chosen">Новеньке</div>
      </div>
      <a href="" class="category">
        <div class="icon"><img src="@/assets/icons/elephants-category.jpg" alt=""></div>
        <VerticalLine></VerticalLine>
        <div class="choose">Слоненята</div>
      </a>
      <a href="" class="category">
        <div class="icon"><img src="@/assets/icons/all-category.png" alt=""></div>
        <VerticalLine></VerticalLine>
        <div class="choose">Усе</div>
      </a>
    </MarketContent>
    <ProductList/>
<!--    <ProductList/>-->
  </main>
</template>

<script>
import ProductList from "@/components/MarketProductsList";

export default {
  name: 'MarketMain',
  components: {ProductList},
  props: {
    
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: calc(var(--page-bar)) 0 calc(2.5 * var(--page-bar));
  row-gap: 2vh;
}
.category-list {
  border-radius: 10px;
  padding: 8px 24px;

  display: flex;
  align-items: center;
}
.category {
  display: flex;
  align-items: center;
  padding: 0 6px;
}
.choose {
  border: 2px rgba(0,0,0,0) solid;
  border-radius: 5px;
  transition: border 0.2s ease, padding 0.5s ease;
}
.category:hover .choose {
  border-color: var(--border-color);
  padding: 0 5px;
}
.chosen {
  border: 2px var(--border-color) solid;
  padding: 0 5px;
  border-radius: 5px;
}
.icon {
  height: 46px;
  width: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border: 2px var(--line-color) solid;
  border-radius: 10px;
}
</style>
