<template>
  <TransitionGroup tag="div"
                   id="custom-scroll-bar"
                   name="list"
                   @before-leave="absoluteOffsetSaver"
                   @before-enter="customClassesTransitionsSaver"
                   @after-enter="customClassesTransitionsApplier"
                   appear
  >
    <button
        class="page"

        :class="[
            {selected: item === currentPage,
            boundary: item === visiblePages[0] && item !== 0 ||
            item === visiblePages[visiblePages.length-1] && item !== pagesCount-1}
            ]"
        v-for="(item, id) in visiblePages"
        :key="item"
        :data-index="id"
        @click="updateCurrentPage(item)"
    />
  </TransitionGroup>
</template>

<script>
export default {
  name: "PageList",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    let defaultPagesCount = 10;

    return {
      visiblePagesCount: defaultPagesCount,
      visiblePages: Array.from(Array(Math.min(defaultPagesCount, this.pagesCount)).keys())
    }
  },
  watch: {
    currentPage: {
      handler() {
        if (this.currentPage >= this.visiblePages[this.visiblePages.length - 1]) {
          for (let iter = this.visiblePages[this.visiblePages.length - 1] + 1;
               iter <= Math.min(this.currentPage + 1, this.pagesCount - 1); ++iter) {
            this.visiblePages.shift();
            this.visiblePages.push(iter);
          }
        }
        if (this.currentPage <= this.visiblePages[0]) {
          for (let iter = this.visiblePages[0] - 1; iter >= Math.max(this.currentPage - 1, 0); --iter) {
            this.visiblePages.unshift(iter);
            this.visiblePages.pop();
          }
        }
      },
      immediate: true
    },
    pagesCount: {
      handler() {
        if(this.pagesCount <= this.visiblePages[this.visiblePages.length - 1]) {
          for (let iter = this.pagesCount; iter <= this.visiblePages[this.visiblePages.length - 1]; ++iter) {
            this.visiblePages.unshift(this.visiblePages[0] - 1);
            this.visiblePages.pop();
          }
        }
        if (this.pagesCount < this.visiblePages.length) {
          this.visiblePages.splice(this.pagesCount, this.visiblePages.length - this.pagesCount);
        }
        else if (this.pagesCount > this.visiblePages.length) {
          this.visiblePages.push(
              ...Array.from(
              Array(Math.min(
                  this.pagesCount - this.visiblePages.length,
                  this.visiblePagesCount - this.visiblePages.length
              )).keys(),
              (_, x) => x + this.visiblePages[this.visiblePages.length - 1] + 1
          ));
        }
        this.visiblePagesCount = this.visiblePages.length;
      },
      immediate: true
    },
    visiblePagesCount(newValue, oldValue) {
      if(newValue > this.pagesCount) {
        newValue = this.pagesCount;
      } else if(newValue <= 2) {
        if(oldValue !== 2) this.visiblePages.splice(2, this.visiblePages.length-2);
        return;
      }

      if(this.currentPage === this.visiblePages[this.visiblePages.length - 1]) {
        this.visiblePages.shift();
      }
      else if(this.currentPage >= this.visiblePages[newValue-1]) {
        this.$emit('update:currentPage', this.visiblePages[newValue-2]);
      }

      if(this.visiblePages.length < newValue) {
        Array.from(
            {length: newValue - this.visiblePages.length},
            () => this.visiblePages[this.visiblePages.length-1] === this.pagesCount - 1 ?
                this.visiblePages.unshift(this.visiblePages[0] - 1) :
                this.visiblePages.push(this.visiblePages[this.visiblePages.length-1] + 1)
        );
      } else if(this.visiblePages.length > newValue) {
        Array.from(
            {length: this.visiblePages.length - newValue},
            () => this.visiblePages.pop()
        );
      }
    },
  },
  computed: {
    getScrollBar() {
      return document.getElementById('custom-scroll-bar');
    }
  },
  methods: {
    pagesOffsetsCalculation(index) {
      let varHolder = getComputedStyle(this.getScrollBar);

      return (parseInt(varHolder.getPropertyValue('--page-bar')) +
          parseInt(varHolder.getPropertyValue('--flex-gap'))) * index;
    },
    absoluteOffsetSaver(el) {
      // if(el.classList.contains('selected')) {
      //   el.classList.remove('selected')
      // }
      // el.classList.remove('boundary');

      el.style.left = `${this.pagesOffsetsCalculation(el.dataset.index)}px`;
    },
    customClassesTransitionsSaver(el) {
      if(el.classList.contains('selected')) {
        el.classList.remove('selected')
      }
      // if(el.classList.contains('boundary')) {
      //   el.classList.remove('boundary')
      // }
    },
    customClassesTransitionsApplier(el) {
      if(this.visiblePages[el.dataset.index] === this.currentPage) {
        el.classList.add('selected')
      }
      // else if(parseInt(el.dataset.index) === this.visiblePages.length-1 || parseInt(el.dataset.index) === 0) {
      //   el.classList.add('boundary')
      // }
    },

    updateCurrentPage(item) {
      this.$emit('update:currentPage', item);
    }
  }
}

</script>

<style scoped>
* {
  /*Size of page button, can't be more than products-list-padding*/
  --page-bar: 16px;
  --flex-gap: 8px;

  --transition-time: .4s;
}

#custom-scroll-bar {
  width: fit-content;

  display: flex;
  justify-content: center;
  gap: var(--flex-gap);

  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;

  bottom: calc((var(--products-list-padding) - min(var(--page-bar), var(--products-list-padding))) / 2);
  /*transform: translateY(calc(-(var(--products-list-padding) - var(--page-bar)) / 2));*/
}

:where(#custom-scroll-bar) > .page {
  width: min(var(--page-bar), var(--products-list-padding));
  aspect-ratio: 1/1;

  border-radius: 100%;

  background: hsla(225, 36%, 4%, .1) 100%;
  transition: transform var(--transition-time) ease-out, background-color calc(var(--transition-time) / 2) ease-out;
}
:where(#custom-scroll-bar) > :where(.page):hover {
  transform: scale(1.2);
  background: hsla(225, 36%, 4%, .5) 100%;
  transition: all calc(var(--transition-time) * .8) ease-out;
}
:where(#custom-scroll-bar) > :where(.page).selected {
  cursor: default;

  background: hsla(225, 36%, 4%, .5) 100%;
  transform: scale(1.3);
}
:where(#custom-scroll-bar) > :where(.page).boundary {
  transform: scale(.8);
}
:where(#custom-scroll-bar) > :where(.page:focus) {
  outline: none;
  border: 2px solid hsl(225, 36%, 4%, 1);

  transform: scale(1.2);
}

.list-move {
  transition: all calc(var(--transition-time));
}
.list-enter-from,
.list-leave-to {
  transition: all calc(var(--transition-time) / 2) ease-out;
  transform: scale(0.01);
}
.list-leave-from,
.list-enter-to {
  transition: all calc(var(--transition-time)) ease;
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>