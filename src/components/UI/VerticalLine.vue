<template>
  <hr class="vertical">
</template>

<script>
export default {
  name: "VerticalLine",
  props: {
    height: {
      type: String,
      default: '20px'
    },
    colour: {
      type: String,
      default: '#757474'
    }
  }
}
</script>

<style scoped>
.vertical {
  margin: 0 0.5vw;
  border-radius: 100%;
  height: v-bind(height);
  width: 2px;
  background-color: v-bind(colour);
}
</style>