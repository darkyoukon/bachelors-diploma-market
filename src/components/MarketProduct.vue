<template>
  <section>
    <div class="load">
      <!--    <img src="@/assets/toys/img.png" alt="іграшка" class="product-picture" loading="lazy"/>-->
    </div>
<!--    <div>-->
<!--      Привет-->
<!--    </div>-->
  </section>
</template>

<script>
export default {
  name: "MarketProduct"
}
</script>

<style scoped lang="scss">
@use "sass:math";

.load {
  $diagonal: math.sqrt(2) * var(--product-size);
  $sinus-diagonal: --product-size * 2;
  $percentage: 3.575%;

  border-radius: inherit;
  aspect-ratio: 1/1;

  /*background: repeating-radial-gradient(circle, #8E94F2 8%, #FEFCFD 15%, #8E94F2 16%);*/
  background: repeating-linear-gradient(
      45deg,
      #ff0030 $percentage * 0,
      #ff0030 $percentage * 2,
      #c000ff $percentage * 2,
      #c000ff $percentage * 4,
      #0066ff $percentage * 4,
      #0066ff $percentage * 6,
      #00baff $percentage * 6,
      #00baff $percentage * 8,
      #46f609 $percentage * 8,
      #46f609 $percentage * 10,
      #fffc00 $percentage * 10,
      #fffc00 $percentage * 12,
      #fea002 $percentage * 12,
      #fea002 $percentage * 14,
      #ff0030 $percentage * 14
  ) repeat;
  background-size: $diagonal 100%;
  animation: animatedBackground 2s linear infinite reverse;
}
@keyframes animatedBackground {
  0% {background-position: $sinus-diagonal 0;}
}
.product-picture {
  object-fit: cover;
  border-radius: inherit;
}
</style>