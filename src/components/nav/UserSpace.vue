<template>
  <div>
    <slot>未完工⛏</slot>
  </div>
</template>



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