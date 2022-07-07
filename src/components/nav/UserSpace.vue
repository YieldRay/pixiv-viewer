<template>
  <div>
    <slot>
      <small @click="(isOpen = true), showAbout()" style="cursor: pointer">
        ⛏关于
      </small>
    </slot>
  </div>
  <PopUp v-model="isOpen"></PopUp>
</template>

<script>
import PopUp from "./PopUp.vue";
export default {
  components: [PopUp],
  data() {
    return { isOpen: false };
  },
  methods: {
    showAbout() {
      alert(`\
Made by YieldRay
Powered by Vue3

实现了Pixiv的简单操作，API来自pixiv.js.org项目
`);
    },
  },
};
</script>

<style scoped>
div {
  min-width: 40vw;
  max-width: 100%;
}
@media screen and (max-width: 32rem) {
  div {
    min-width: 10vw;
  }
}
</style>