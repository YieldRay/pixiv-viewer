<template>
  <teleport to="body">
    <div class="popup" v-if="isOpen">
      <div class="flex">
        <span>{{ title }}</span>
        <span @click="$emit('update:isOpen', false)">[close]</span>
      </div>
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: {
      type: String,
      default: "提示",
    },
  },
  emits: ["update:isOpen"],
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  width: 50vw;
  min-height: 50vh;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>