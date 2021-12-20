<template>
  <div class=''>
    <canvas
      ref="canvas"
      class="canvas-wrapper"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { createShader, createProgram } from "@/utils/index";

const canvas = ref("");

const vertex = `
	attribute vec4 a_position;

	void main() {
		gl_Position = a_position;
	}
`;
const fragment = `
	precision mediump float;
	void main() {
		gl_FragColor = vec4(1, 0, 0.5, 1);
	}
`;

onMounted(() => {
  // canvas.value.width = 400;
  // canvas.value.height = 400;
  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;

  canvas.value.width = width;
  canvas.value.height = height;

  const gl = canvas.value.getContext("webgl");

  // 创建可以在 GPU 上运行的 GLSL 着色程序
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  console.log("drawingBuffer", gl.drawingBufferWidth, gl.drawingBufferHeight);

  const program = createProgram(gl, vertexShader, fragmentShader);

  // 找到 GLSL 着色程序中存放数据的变量属性值的位置
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // 属性值从缓冲中获取数据
  // 1. 创建缓冲
  const positionBuffer = gl.createBuffer();
  // 2. 把缓冲绑定到 gl 上面
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // 3. 通过第 2 步中创建的绑定点向 gl 内传递定点数据
  const positions = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  // 启用着色程序中存放数据的变量
  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
});
</script>

<style scoped lang="scss">
.canvas-wrapper {
  width: 500px;
  height: 500px;
}
</style>