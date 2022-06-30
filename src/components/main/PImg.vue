// 需要置于容器内，宽高由容器决定
<script>
export default {
  props: {
    src: String,
    alt: String,
    nohover: Boolean,
    width: Number,
    height: Number,
    gap: Number,
  },
};
</script>

<template>
  <img
    :style="{
      width: width + 'rem',
      height: height + 'rem',
      marginRight: gap + 'rem',
    }"
    :class="{ hover: !nohover, loading: true }"
    v-bind="$attrs"
    :src="src"
    :alt="alt"
  />
</template>

<style scoped>
@import url("../../assets/loading.css");

img {
  object-fit: cover;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transition: all 0.3s;
  display: inline-block;
}

img.hover:hover {
  opacity: 0.8;
}
</style>
