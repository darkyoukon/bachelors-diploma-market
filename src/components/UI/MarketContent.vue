<template>
  <div class="content">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MarketContent"
}
</script>

<style scoped>
.content {
  background-color: var(--background-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transition: .3s;
}
.content:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}
</style>