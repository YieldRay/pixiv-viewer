// 注意：这个组件的属性 height 将指定为骨架的宽度和高度，单位 rem
// slide  margin: auto 2.5rem;
<template>
  <div
    class="container"
    :class="{
      'container-l': allowLeft,
    }"
    @mouseenter="display = true"
    @mouseleave="display = false"
  >
    <div
      :class="{
        'container-r': allowRight,
      }"
    >
      <transition name="fade">
        <div class="left" @click="left" v-if="display && allowLeft">
          <span class="tri-l"></span>
        </div>
      </transition>
      <transition name="fade">
        <div class="right" @click="right" v-if="display && allowRight">
          <span class="tri-r"></span>
        </div>
      </transition>

      <div class="slider" ref="slider">
        <slot>
          <template :key="_" v-for="_ in new Array(8)">
            <div class="loading" :style="skeletonStyle">{{ _ }}</div>
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allowLeft: false,
      allowRight: false,
      display: true,
      DISTANCE: 1,
    };
  },
  computed: {
    skeletonStyle() {
      return { width: this.height + "rem", height: this.height + "rem" };
    },
  },
  props: { height: Number },
  mounted() {
    this.check();
    // setInterval(this.check, 500);
  },
  methods: {
    left() {
      const slider = this.$refs.slider;
      const move = slider.clientWidth * 0.8;
      slider.scrollBy({
        left: -move,
        behavior: "smooth",
      });
      // check
      if (slider.scrollWidth > slider.clientWidth) {
        this.allowLeft = Boolean(slider.scrollLeft - move > this.DISTANCE);
        this.allowRight = Boolean(
          Math.ceil(slider.scrollLeft - move) <
            slider.scrollWidth - slider.clientWidth
        );
      } else {
        this.allowLeft = this.allowRight = false;
      }
    },
    right() {
      const slider = this.$refs.slider;
      const move = slider.clientWidth * 0.8;
      slider.scrollBy({
        left: move,
        behavior: "smooth",
      });
      //check
      if (slider.scrollWidth > slider.clientWidth) {
        this.allowLeft = Boolean(slider.scrollLeft + move > this.DISTANCE);
        this.allowRight = Boolean(
          Math.ceil(slider.scrollLeft + move) <
            slider.scrollWidth - slider.clientWidth
        );
      } else {
        this.allowLeft = this.allowRight = false;
      }
    },
    check() {
      const slider = this.$refs.slider;
      this.allowLeft = Boolean(slider.scrollLeft > this.DISTANCE);
      this.allowRight = Boolean(
        Math.ceil(slider.scrollLeft) < slider.scrollWidth - slider.clientWidth
      );
    },
  },
};
</script>


<style scoped>
.loading {
  --loading-grey: #ededed;
  width: 15rem;
  height: 15rem;
  margin: 1rem;
  background-color: var(--loading-grey);
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.slider::-webkit-scrollbar {
  width: 0;
}

.slider {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  margin: auto;
}

.slider > * {
  display: inline-block;
}

.container {
  position: relative;
  overflow: visible;
  max-width: 100%;
}

.container-l {
  mask: linear-gradient(to right, transparent, rgb(0, 0, 0) 72px) 0px 0px;
  transition: all 0.2s ease-in;
  position: relative;
  max-width: 100%;
}
.container-r {
  mask-image: linear-gradient(
    to right,
    rgb(0, 0, 0) calc(100% - 72px),
    transparent
  );
  transition: all 0.2s ease-in;
  max-width: 100%;
}

.left,
.right {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 5%;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
  user-select: none;
  transition: 0.4s;
  z-index: 1;
}
.right {
  left: 95%;
}

.tri-l,
.tri-r {
  width: 0;
  height: 0;
  border-color: transparent #fff transparent transparent;
  border-width: 0.75rem;
  border-style: solid;
  transform: translateX(-35%);
}
.tri-r {
  border-color: transparent transparent transparent #fff;
  transform: translateX(35%);
}

/* @import url("../../assets/transiton.css"); */
</style>