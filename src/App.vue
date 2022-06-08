<template>
<!--  manually created components through Vue Options API-->
  <MarketHeader />
  <MarketMain />
  <MarketFooter />
</template>

<script>
import MarketMain from '@/components/MarketMain.vue'
import MarketHeader from "@/components/MarketHeader";
import MarketFooter from "@/components/MarketFooter";

export default {
  name: 'App',
  components: {
    MarketFooter,
    MarketHeader,
    MarketMain
  },
  // Used this hook because Vue has no access to #app element and background-image can't be used in style
  // No need in this since ~@ to force webpack loading

  // beforeCreate () {
  //   const body = document.querySelector('body');
  //   body.style.background = 'url(' + require('@/assets/body-background.jpg') + ')';
  //   body.style.backgroundPosition = 'center';
  //   body.style.backgroundSize = '80vh';
  //   // body.style.opacity = '0.4';
  // }
}
</script>

<style>
@import '~@/assets/styles/variables.css';

*, :before, :after {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
html {
  height: 100%;
  /*DON'T FORGET NOT TO CHANGE FONT SIZE REM*/
}
body {
  height: inherit;
  background: url("~@/assets/body-background.jpg") center/80vh;
}
:where(a) {
  text-decoration: none;
  color: #001514;
}
:where(button) {
  cursor: pointer;
  display: block;
  background: none;
}
:where(img) {
  display: block;
  max-width: 100%;
  max-height: 100%;

  font-size: 16px;
}
#app {
  background: radial-gradient(rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.7) 70%);

  min-height: 100%;

  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #001514;

  display: flex;
  flex-direction: column;
}

/* decided not to use scrollbar- options, because it's support began only with Chrome 94+*/
/* width */
::-webkit-scrollbar {
  width: initial;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  background: rgba(241, 241, 241, .7);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 10px;
  transition: 2s;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
