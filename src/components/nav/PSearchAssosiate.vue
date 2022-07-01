<template>
  <transition name="fade">
    <div class="assosiate" v-if="on">
      <div class="history">
        <strong>历史记录</strong>
        <small style="cursor: pointer" @click="clearHistory"
          >清除历史记录</small
        >
      </div>
      <div class="list"></div>
      <div style="display: flex; justify-content: center; align-items: center">
        目前仅能查询id，请输入数字
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PSearchAssosiate",
  props: {
    on: Boolean,
  },
  emits: ["toggle"],
  methods: {
    clearHistory() {
      window.alert("暂不可用");
    },
  },
};
</script>

<style>
.assosiate {
  position: absolute;
  overflow-y: auto;
  background: #fff;
  height: calc(100vh - 5rem);
  min-width: 20rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  left: 30%;
  width: 35vw;
  top: 3.6rem;
  z-index: 2;
}
@media screen and (max-width: 64rem) {
  .assosiate {
    left: 20vw;
    width: 24rem;
  }
}
@media screen and (max-width: 32rem) {
  .assosiate {
    left: 5vw;
    width: 85vw;
  }
}

.history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1.5rem;
}
</style>