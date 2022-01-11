<script setup>
import { ref, onMounted } from "vue";
import * as BABYLON from "babylonjs";
const canvas = ref(null);

onMounted(() => {
  console.log("canvas", canvas);
  const engine = new BABYLON.Engine(canvas.value, true);

  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    4,
    new BABYLON.Vector3(0, 0, 3),
    scene
  );
  camera.attachControl(canvas, true);

  // const light1 = new BABYLON.HemisphericLight(
  //   "light1",
  //   new BABYLON.Vector3(1, 0, 0),
  //   scene
  // );
  const light2 = new BABYLON.PointLight(
    "light2",
    new BABYLON.Vector3(1, 0, 0),
    scene
  );
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2 },
    scene
  );

  const box = BABYLON.MeshBuilder.CreateBox(
    "box",
    {
      size: 0.8,
      faceColors: [
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
        new BABYLON.Color4(0.6, 0.2, 0.3, 1),
      ],
    },
    scene
  );
  box.position = new BABYLON.Vector3(-1, 0, 3);

  engine.runRenderLoop(function () {
    scene.render();
  });
});
</script>

<template>
  <div class='wrapper'>
    <canvas ref="canvas"></canvas>
  </div>
</template>