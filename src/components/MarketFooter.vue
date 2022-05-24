<template>
  <footer>
    <section class="icon-links">
      <a href="https://www.instagram.com/1000_elephants/" target="_blank" class="icon-link">
        <img src="@/assets/icons/instagram.png" alt="instagram profile">
      </a>
      <a href="https://t.me/1000_elephants" target="_blank" class="icon-link">
        <img src="@/assets/icons/telegram.svg" alt="tg profile">
      </a>
      <a href="mailto:1000_elephants@gmail.com" class="icon-link">
        <img src="@/assets/icons/gmail.png" alt="gmail">
      </a>
      <a href="tel:+380951234567" class="icon-link">
        <img src="@/assets/icons/phone.png" alt="phone">
      </a>
    </section>
    <img src="@/assets/icons/instagram-logo.png" alt="1001_elephants logo" class="icon-logo">

    <section class="additional-funcs">
      <MarketDropdown
          v-model:currentOption="language.currentLanguage"
          :otherOptions="language.alternativeLanguages"
          :imgPath="language.assetPath"
          :id="language.$id"
          bottom
      />
    </section>
  </footer>
</template>

<script>
import {useLanguageStore} from "@/stores/useLanguageStore";

export default {
  name: "MarketFooter",
  setup() {
    const language = useLanguageStore();
    return {
      language
    }
  }
}
</script>

<style scoped>
footer {
  padding: 1vh 1.5vw;
  /*height: 6vh;*/
  min-height: 46px;
  width: auto;
  background-color: rgba(254, 252, 253, 0.85);
  transition: background-color 200ms;

  border: 1px rgba(0,0,0,.2) solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  flex-shrink: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
footer:hover {
  background-color: rgba(254, 252, 253, 1);
}

.icon-links {
  flex: 1;
  display: flex;
}
.icon-link {
  height: 28px;
  width: 28px;
  margin: 0 8px;

  display: flex;
  align-items: center;
}

.icon-logo {
  height: 50px;
}

.additional-funcs {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>