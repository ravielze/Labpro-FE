<template>
  <el-container class="main-container">
    <Navbar />
    <el-main style="margin-right: 0px; padding-right: 0px">
      <el-scrollbar>
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
$font-stack: Avenir, Helvetica, Arial, sans-serif;
$bg-color: #2a324b;
$text-color: #e1e5ee;
$text-glowing-color: #c7ccdb;
//storage: 767B91

body {
  background: $bg-color;
}

.main-container {
  margin: 20px 0px 0px 0px;
}

#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: $text-color;
}
</style>
