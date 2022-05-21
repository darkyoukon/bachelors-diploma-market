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
        if (this.currentPage < 0 || this.currentPage > this.pagesCount - 1) {
          return;
        }

        if (this.currentPage >= this.visiblePages[this.visiblePages.length - 1]) {
          for (let iter = this.visiblePages[this.visiblePages.length - 1] + 1;
               iter <= Math.min(this.currentPage + 1, this.pagesCount - 1); ++iter) {
            this.visiblePages.shift();
            this.visiblePages.push(iter);
          }
        } else if (this.currentPage <= this.visiblePages[0]) {
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
        if (this.pagesCount <= this.visiblePages[this.visiblePages.length - 1]) {
          for (let iter = this.pagesCount; iter <= this.visiblePages[this.visiblePages.length - 1]; ++iter) {
            this.visiblePages.unshift(this.visiblePages[0] - 1);
            this.visiblePages.pop();
          }
        }
        if (this.pagesCount < this.visiblePages.length) {
          this.visiblePages.splice(this.pagesCount, this.visiblePages.length - this.pagesCount);
        } else if (this.pagesCount > this.visiblePages.length) {
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
      if (newValue > this.pagesCount) {
        newValue = this.pagesCount;
      } else if (newValue <= 2) {
        if (oldValue !== 2) this.visiblePages.splice(2, this.visiblePages.length - 2);
        return;
      }

      if (this.currentPage === this.visiblePages[this.visiblePages.length - 1]) {
        this.visiblePages.shift();
      } else if (this.currentPage >= this.visiblePages[newValue - 1]) {
        this.$emit('update:currentPage', this.visiblePages[newValue - 2]);
      }

      if (this.visiblePages.length < newValue) {
        Array.from(
            {length: newValue - this.visiblePages.length},
            () => this.visiblePages[this.visiblePages.length - 1] === this.pagesCount - 1 ?
                this.visiblePages.unshift(this.visiblePages[0] - 1) :
                this.visiblePages.push(this.visiblePages[this.visiblePages.length - 1] + 1)
        );
      } else if (this.visiblePages.length > newValue) {
        Array.from(
            {length: this.visiblePages.length - newValue},
            () => this.visiblePages.pop()
        );
      }
    },
  },
  computed: {
    getPagesOffsets() {
      let scrollBar = document.getElementById('custom-scroll-bar');

      return Array.from(
          {length: this.visiblePagesCount},
          (_, i) => scrollBar.children[i].offsetLeft
      );
    }
  },
  methods: {
    absoluteOffsetSaver(el) {
      if(this.getPagesOffsets[el.dataset.index] != null) {
        el.style.left = `${this.getPagesOffsets[el.dataset.index]}px`;
      } else {
        el.style.right = '0px';
      }
    },

    customClassesTransitionsSaver(el) {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected')
      }
    },
    customClassesTransitionsApplier(el) {
      if (this.visiblePages[el.dataset.index] === this.currentPage) {
        el.classList.add('selected')
      }
    },

    updateCurrentPage(item) {
      this.$emit('update:currentPage', item);
    },

    dropdownPageListChecker() {
      if (parseInt(getComputedStyle(document.getElementById('inner-content')).paddingBottom) <
          parseInt(getComputedStyle(document.getElementsByClassName('page')[0]).height) * 1.5) {
        document.getElementById('custom-scroll-bar').classList.add('drop-down');
      }
    }
  },
  mounted() {
    this.dropdownPageListChecker();
  },
  updated() {
    this.dropdownPageListChecker();
  }
}

</script>

<style scoped>
#custom-scroll-bar {
  width: fit-content;

  display: flex;
  justify-content: center;
  gap: var(--page-bar-flex-gap);

  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;

  bottom: calc((var(--products-list-padding) - min(var(--page-bar), var(--products-list-padding))) / 2);
}

#custom-scroll-bar.drop-down {
  bottom: calc(-2 * var(--page-bar));

  --page-bar-quan: max(v-bind(visiblePagesCount), 10);
  padding: calc(.5 * var(--page-bar))
           max(calc((var(--product-size) -
                 var(--page-bar) * var(--page-bar-quan) -
                 var(--page-bar-flex-gap) * (var(--page-bar-quan) - 1)) / 2),
               var(--page-bar-flex-gap));

  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  transition: .3s;

  background-color: var(--background-color);
  border-bottom-left-radius: var(--product-border-radius);
  border-bottom-right-radius: var(--product-border-radius);
}

.inner-content:hover + #custom-scroll-bar.drop-down, #custom-scroll-bar.drop-down:hover {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

#custom-scroll-bar.drop-down:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;

  width: calc(var(--page-bar) * 2 + var(--page-bar-flex-gap) * 2);
  height: 2px;

  background: var(--line-color);
}

:where(#custom-scroll-bar) > .page {
  height: var(--page-bar);
  aspect-ratio: 1/1;

  border-radius: 100%;

  background: hsla(225, 36%, 4%, .1) 100%;
  transition: transform var(--page-bar-transition-time) ease-out, background-color calc(var(--page-bar-transition-time) / 2) ease-out;
}

:where(#custom-scroll-bar) > :where(.page):hover {
  transform: scale(1.2);
  background: hsla(225, 36%, 4%, .5) 100%;
  transition: all calc(var(--page-bar-transition-time) * .8) ease-out;
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
  transition: all calc(var(--page-bar-transition-time));
}

.list-enter-from,
.list-leave-to {
  transition: all calc(var(--page-bar-transition-time) / 2) ease-out;
  transform: scale(0.01);
}

.list-leave-from,
.list-enter-to {
  transition: all calc(var(--page-bar-transition-time)) ease;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>