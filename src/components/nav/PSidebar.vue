<template>
  <transition name="fade">
    <div class="mask" v-if="on" @click="$emit('toggle')"></div>
  </transition>

  <div class="sidebar" :class="{ ltr: on, rtl: !on }">
    <header>
      <RoundButton :on="on" @click="$emit('toggle')"></RoundButton>
      <PLogo></PLogo>
    </header>
    <h2>
      画质调节<small>(仅对图片详情生效)</small>
      <br />
      <small> 当前: {{ quality }} </small>
    </h2>
    <ul>
      <li @click="setQuality('thumb_mini')">thumb_mini</li>
      <li @click="setQuality('small')">small</li>
      <li @click="setQuality('regular')">regular</li>
      <li @click="setQuality('original')">original</li>
    </ul>
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
  data() {
    return {
      quality: window.localStorage.getItem("quality") || "regular",
    };
  },
  methods: {
    setQuality(q) {
      window.localStorage.setItem("quality", q);
      this.quality = q;
      console.log("quality set to " + window.localStorage.getItem("quality"));
    },
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

ul {
  display: flex;
  flex-flow: column;
  margin: 0px;
  padding: 0px;
  list-style: none;
}
li {
  padding: 12px 0 12px 24px;
  transition: all 0.2s ease 0s;
}
li:hover {
  background: rgba(0, 0, 0, 0.04);
}
h2 {
  margin-left: 24px;
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  color: rgb(133, 133, 133);
}
@import url("../../assets/transiton.css");
</style>
