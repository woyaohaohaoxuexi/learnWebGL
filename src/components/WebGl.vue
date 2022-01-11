<template>
  <div
    class=''
    style="display: flex"
  >
    <canvas
      ref="canvas"
      class="canvas-wrapper"
    ></canvas>

    <div id="uiContainer">
      <div id="ui">
        <div id="x"></div>
        <div id="y"></div>
        <div id="angle"></div>
        <div id="scaleX"></div>
        <div id="scaleY"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import RenderGL from "./03varying";

const canvas = ref("");

onMounted(() => {
  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;

  canvas.value.width = width;
  canvas.value.height = height;

  const gl = canvas.value.getContext("webgl");

  RenderGL(gl);
});
</script>

<style scoped lang="scss">
.canvas-wrapper {
  width: 500px;
  height: 500px;
}
</style>