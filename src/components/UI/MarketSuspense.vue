<template>
  <Suspense>
    <slot />

    <template #fallback>
      <div class="load"/>
    </template>
  </Suspense>
</template>

<script>
export default {
  name: "MarketSuspense",
}
</script>

<style scoped lang="scss">
@use "sass:math";

.load {
  width: var(--product-size);
  aspect-ratio: 1/1;
  border-radius: var(--product-border-radius);

  --colours-quantity: 7;
  --proportion: calc(var(--product-size) * #{math.sqrt(2)} / var(--colours-quantity));

  /*background: repeating-radial-gradient(circle, #8E94F2 8%, #FEFCFD 15%, #8E94F2 16%);*/
  background: repeating-linear-gradient(
      45deg,
      #ff0030 calc(var(--proportion) * 0),
      #ff0030 calc(var(--proportion) * 1),
      #c000ff calc(var(--proportion) * 1),
      #c000ff calc(var(--proportion) * 2),
      #0066ff calc(var(--proportion) * 2),
      #0066ff calc(var(--proportion) * 3),
      #00baff calc(var(--proportion) * 3),
      #00baff calc(var(--proportion) * 4),
      #46f609 calc(var(--proportion) * 4),
      #46f609 calc(var(--proportion) * 5),
      #fffc00 calc(var(--proportion) * 5),
      #fffc00 calc(var(--proportion) * 6),
      #fea002 calc(var(--proportion) * 6),
      #fea002 calc(var(--proportion) * 7),
  ) repeat left / calc(var(--product-size) * 2);

  @keyframes animatedBackground {
  from {
    background-position: calc(var(--product-size) * 2) 0;
  }
}
animation: animatedBackground 3s ease-in-out infinite alternate-reverse;
position: relative;
&:before {
   content: '';
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   border: 5px solid rgba(0, 0, 0, .1);
   border-radius: inherit;
 }
}
</style>