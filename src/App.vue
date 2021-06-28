<template>
  <el-container>
    <Navbar />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
$font-stack: Avenir, Helvetica, Arial, sans-serif;
$bg-color: #2a324b;
$text-color: #e1e5ee;
$text-glowing-color: #c7ccdb;
//storage: 767B91

* {
  background: $bg-color;
}

#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: $text-color;
}
</style>
