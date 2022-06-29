<template>
  <header><PNav></PNav></header>
  <main><PMain></PMain></main>
  <footer></footer>
</template>

<script>
import PNav from "./components/nav/PNav.vue";
import PMain from "./components/main/PMain.vue";

export default {
  name: "App",
  components: {
    PNav,
    PMain,
  },
};
</script>

<style>
html,
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  margin: 2vh 0;
  z-index: 1;
}
</style>
