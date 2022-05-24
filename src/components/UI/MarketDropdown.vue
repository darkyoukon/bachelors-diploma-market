<template>
  <div class="currency">
    <button class="chosen-option" @click="show = !show">
      <img class="icon"
           :src="id === 'currency' ?
           require(`@/assets/icons/${imgPath + currentOption}.svg`) :
           require(`@/assets/icons/${imgPath}`)"

           :alt="id === 'currency' ? currentOption : imgPath"/>
      <span v-if="id === 'language'" class="chosen-description">{{currentOption}}</span>
      <i class="icon down_arrow" :class="{reverted: show}"/>
    </button>

    <transition name="dropdown-fade" appear>
      <MarketContent class="dropdown" v-show="show" :data-position="bottom">
        <div class="option" v-for="option in otherOptions" :key="option">
          <button @click="show = !show; this.$emit('update:currentOption', option);">
            <img
                class="icon"
                v-if="id !== 'language'"
                :src="require(`@/assets/icons/${imgPath + option}.svg`)"
                :alt="option"
            />
            <VerticalLine v-if="id !== 'language' && id !== 'currency'"/>
            <span class="dropdown-option_description"
                  v-if="id === 'language'">
              {{ option }}
            </span>
          </button>
        </div>
      </MarketContent>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MarketDropdown",
  props: {
    bottom: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    currentOption: {
      type: String,
      required: true
    },
    otherOptions: {
      type: Array,
      required: true
    },
    imgPath: {
      type: String,
      default: ''
    }
    // options: {
    //   type: Array,
    //   // should add typescript for custom class type and constructor concatenating with assets path
    //   default: () => [{id: 0, img: 'usd.svg', description: ''}, {id: 1, img: 'eur.svg', description: ''}]
    // }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {},
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.currency {
  position: relative;
}

.chosen-option {
  display: flex;
  border-radius: 20%;
  padding: 10px;
}
.chosen-description {
  margin: auto 10px;
  font-size: 22px;
}

.icon {
  width: var(--icon-size);
  aspect-ratio: 1/1;
}

.down_arrow {
  background: url('~@/assets/icons/down_arrow.png') center/100% no-repeat;
  transition: .4s;

  &.reverted {
    transform: rotate(-180deg);
  }
}

.dropdown {
  position: absolute;
  width: fit-content;
  left: 0; right: 0;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: var(--gap-between-products);

  padding: calc(var(--gap-between-products) / 2);
  border-radius: var(--product-border-radius);
}
.dropdown[data-position=false] {
  top: calc(100% + var(--header-padding) * 3);
}
.dropdown[data-position=true] {
  bottom: calc(100% + var(--header-padding) * 3);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.option {
  display: flex;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--gap-between-products);

    padding: 4px;
    border-radius: 100%;
  }

  position: relative;
  &:not(:first-child):before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(-1 * var(--gap-between-products) / 2);

    height: 2px;
    width: 100%;
    background-color: var(--line-color);
    border-radius: var(--product-border-radius);
  }
}

.dropdown-option_description {
  font-size: 22px;
}
</style>