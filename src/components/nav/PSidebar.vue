<template>
  <transition name="fade">
    <div class="mask" v-if="on" @click="$emit('toggle')"></div>
  </transition>

  <div class="sidebar" :class="{ ltr: on, rtl: !on }">
    <header>
      <RoundButton :on="on" @click="$emit('toggle')"></RoundButton>
      <PLogo></PLogo>
    </header>
  </div>
</template>

<script>
import RoundButton from "./ToggleButton.vue";
import PLogo from "./PLogo.vue";
export default {
  name: "PSidebar",
  props: {
    on: Boolean,
  },
  emits: ["toggle"],
  components: {
    RoundButton,
    PLogo,
  },
};
</script>

<style scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 15rem;
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
  transition: all 0.3s;
  z-index: 3;
}
.ltr {
  transform: translateX(0);
}
.rtl {
  transform: translateX(-100%);
}
header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1vw;
  height: 3.5rem;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
}
@import url("../../assets/transiton.css");
</style>
