<script setup>
import WebGL from "./components/WebGl.vue";
import Babylon from "./babylon/index.vue";
</script>

<template>
  <!-- <WebGL /> -->
  <Babylon />
</template>

<style>
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
