<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>

<template>
  <img v-bind="$attrs" :src="src" :alt="alt" />
</template>

<style scoped>
img {
  object-fit: cover;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
