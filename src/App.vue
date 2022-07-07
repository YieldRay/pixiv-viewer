<template>
  <header>
    <PNav></PNav>
  </header>

  <router-view></router-view>

  <footer></footer>
</template>

<script>
import PNav from "./components/nav/PNav.vue";

export default {
  name: "App",
  components: {
    PNav,
  },
};
</script>

<style>
html,
body,
main {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
