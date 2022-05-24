<template>
  <section class="products-content">
    <button
        v-show="getPagesCount > 1"
        id="prev-page"
        @click="--currentPage"
    />

    <MarketContent id="inner-content">
      <div
          id="products-list"

          @wheel.prevent="speed = 1000; horizontalProductListScroll($event, Math.min(2, visibleProductsColsQuan))"

          @mouseenter="activeHover = true"
          @mouseleave="activeHover = false"

          @mousedown="(evt) => {if(evt.button === 1) this.activeScroll = true}"
          @mouseup="(evt) => {if(evt.button === 1) this.activeScroll = false}"

          @touchstart="activeScroll = true; activeHover = true; speed=100"
          @touchend="activeScroll = false; activeHover = true"

          @scroll="scrollController"
      >
        <!--      need to add :key for v-for like date of the created post-->
        <!--      also need to add v-if v-else to check if there is no products and draw relevant warning-->
        <MarketProduct v-for="(item) in productsQuantity" :key="item" class="product"></MarketProduct>
      </div>
    </MarketContent>
    <PageList
        v-show="getPagesCount > 1"
        :pages-count="getPagesCount"

        v-model:current-page="currentPage"
    />
    <button
        v-show="getPagesCount > 1"
        id="next-page"
        @click.prevent="++currentPage"
    />
  </section>
</template>

<script>
import {useAnimation} from "@/hooks/useAnimation";
import {useDebounceFn} from "@vueuse/core"
import MarketProduct from "@/components/MarketProduct";

export default {
  name: "ProductList",
  components: {MarketProduct},
  data() {
    return {
      productsQuantity: 45,
      visibleProductsColsQuan: 3,

      speed: 1000,
      debounceAfter: 300,

      currentPage: 0,
      currentScroll: 0,
      scrollTo: 0,

      activeHover: false,
      activeScroll: false
    }
  },
  computed: {
    getProductsList() {
      return document.getElementById('products-list');
    },
    getPagesCount() {
      return Math.max(Math.ceil(this.productsQuantity / 2) - (this.visibleProductsColsQuan - 1), 1);
    }
  },
  watch: {
    currentPage() {
      if (this.getPagesCount <= 1) {
        return;
      }
      if (this.currentPage < 0) this.currentPage = this.getPagesCount - 1;
      if (this.currentPage >= this.getPagesCount) this.currentPage = 0;

      this.scrollList();
    },
    productsQuantity() {
      if(this.getPagesCount <= this.currentPage) {
        this.currentPage = this.getPagesCount - 1;
      }
    }
  },
  methods: {
    scrollList() {
      // current position of product list layout
      this.currentScroll = this.getProductsList.scrollLeft;
      this.scrollTo =
          this.getProductsList.children[this.currentPage * 2].getBoundingClientRect().left -
          this.getProductsList.children[0].getBoundingClientRect().left;
      if (Math.abs(this.currentScroll - this.scrollTo) < 1e-1) {
        return;
      }

      // run animation
      this.animate({
        duration: this.speed,
        timing: this.makeEaseOut(this.curve),
        draw: (progress) => {
          this.getProductsList.scrollLeft +=
              (this.scrollTo - this.currentScroll) * progress -
              (this.getProductsList.scrollLeft - this.currentScroll);
        }
      });
    },

    // must be called with {passive: false} argument in eventListener (to remove warning), well, v-on is modern thing
    horizontalProductListScroll(evt, scrollColsQuan) {
      if (evt.deltaY > 0 && this.currentPage >= this.getPagesCount - 1 || evt.deltaY < 0 && this.currentPage <= 0) {
        return;
      }
      // if (this.animating) {
      //   return;
      // }

      if (evt.deltaY > 0 && this.currentPage + scrollColsQuan >= this.getPagesCount) {
        this.currentPage = this.getPagesCount - 1;
      } else if (evt.deltaY < 0 && this.currentPage - scrollColsQuan < 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = evt.deltaY > 0 ?
            this.currentPage + scrollColsQuan :
            this.currentPage - scrollColsQuan;
      }
    },
    // this method is debounced in created hook to share debounce on each component instance and save this context
    scrollController() {
      if (this.animating || this.activeScroll) {
        return;
      }

      const boundChecker = this.getProductsList.scrollLeft % this.columnScrollMeasure() / this.columnScrollMeasure();
      if (boundChecker < 2e-2 || boundChecker > 99e-2) {
        return;
      }

      this.currentPage = this.activeHover ? Math.ceil(
          Math.floor(this.getProductsList.scrollLeft / this.columnScrollMeasure() * 2) / 2) : this.currentPage;

      this.scrollList();
    },
    columnScrollMeasure() {
      return this.getProductsList.children[0].getBoundingClientRect().width +
          this.getProductsList.children[2].getBoundingClientRect().left -
          this.getProductsList.children[0].getBoundingClientRect().right
    }
  },
  setup() {
    const {makeEaseOut, curve, animate, animating} = useAnimation();
    return {
      makeEaseOut, curve, animate, animating
    };
  },
  created() {
    this.scrollController = useDebounceFn(this.scrollController, this.debounceAfter);
  }
}
</script>

<style scoped>
.products-content {
  display: flex;
  gap: var(--products-list-padding);
  align-items: center;

  position: relative;
}

.products-content > button {
  height: max(calc(var(--gap-between-products) * 2 + var(--border-between-products)),
              var(--products-list-padding));
  aspect-ratio: 1/1;

  border-radius: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.21);

  background: url("~@/assets/icons/down_arrow.png") var(--background-color) center/100%;
}

.products-content > button:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

button#prev-page {
  left: 0;
  transform: rotate(90deg);

  transition: .3s;
}

button#next-page {
  right: 0;
  transform: rotate(-90deg);

  transition: .3s;
}

#inner-content {
  border-radius: calc(var(--product-border-radius) + var(--products-list-padding));

  --plus-border: max(var(--products-list-padding) + var(--couple-overlay-px) - var(--gap-between-products), 0px);

  padding: 0 var(--plus-border);

  position: relative;
  z-index: 0;
}
#inner-content:before {
  position: absolute;
  content: '';
  left: var(--plus-border);
  top: var(--products-list-padding); bottom: var(--products-list-padding);

  width: calc(var(--gap-between-products) - var(--couple-overlay-px));

  background-image: linear-gradient(to right, var(--background-color) 1%, rgba(0, 0, 0, 0) 40%);
  z-index: 1;
}
#inner-content:after {
  position: absolute;
  content: '';
  right: var(--plus-border);
  top: var(--products-list-padding); bottom: var(--products-list-padding);

  width: calc(var(--gap-between-products) - var(--couple-overlay-px));

  background-image: linear-gradient(to left, var(--background-color) 1%, rgba(0, 0, 0, 0) 40%);
  z-index: 1;
}
#products-list {
  /*scroll-behavior: smooth;*/
  padding: var(--products-list-padding) min(var(--gap-between-products) - var(--couple-overlay-px), var(--products-list-padding));

  overflow: auto;
  /*white-space: nowrap;*/

  /*hide scrollbar for firefox and IE*/
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  min-width: calc(
      var(--product-size)
  );
  min-height: calc(
      var(--product-size)
  );

  --visible-columns: v-bind(visibleProductsColsQuan);
  max-width: calc(
      var(--product-size) * var(--visible-columns) +
      var(--gap-between-products) * (var(--visible-columns) - 1) * 2 +
      var(--border-between-products) * (var(--visible-columns) - 1) +

      min(var(--gap-between-products) * 2 - var(--couple-overlay-px) * 2, var(--products-list-padding) * 2)
  );

  display: grid;
  place-items: center;
  align-content: center;
  /*grid-gap: 2rem;*/ /*delete?*/
  /*grid-template-columns: repeat(auto-fit, minmax(150px, 20fr));*/
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: calc(var(--gap-between-products) * 2 + var(--border-between-products));
}

#products-list::-webkit-scrollbar {
  display: none;
}

#products-list > .product {
  width: var(--product-size);
  aspect-ratio: 1/1;

  position: relative;
}

#products-list > .product:only-child {
  grid-row: 1 / -1;
}

#products-list > .product:nth-child(2n):before {
  content: '';
  height: var(--border-between-products);
  background-color: var(--line-color);
  border-radius: var(--product-border-radius);

  transform: translateY(calc(-1 * var(--gap-between-products) - var(--border-between-products)));
  width: calc(var(--product-size) - var(--product-border-radius) - var(--products-list-padding));

  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
}

#products-list > .product:nth-child(n+3):after {
  content: '';
  width: var(--border-between-products);
  background-color: var(--line-color);
  border-radius: var(--product-border-radius);

  left: 0;
  transform: translateX(calc(-1 * var(--gap-between-products) - var(--border-between-products)));
  height: calc(var(--product-size) - var(--product-border-radius) - var(--products-list-padding));

  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
}
</style>