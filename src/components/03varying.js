import {ref, onMounted} from "vue";
import createProgram from "./UseShader";
import {projection, translate, rotate, scale} from "@/utils/m3";
import {setupSlider} from "@/utils/webgl-lessons-ui";

const vertex = `
	attribute vec2 a_position;

	uniform mat3 u_matrix;
	varying vec4 v_color;

	void main() {
		gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);

		v_color = gl_Position * 0.5 + 0.5;
	}
`;

const fragment = `
	precision mediump float;

	varying vec4 v_color;

	void main() {
		gl_FragColor = v_color;
	}
`;

const setGeometry = (gl) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, -100, 150, 125, -175, 100]),
    gl.STATIC_DRAW
  );
};

export default function RenderGL(gl) {
  const program = createProgram(gl, vertex, fragment);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setGeometry(gl);

  const translation = ref([200, 150]);
  const angleInRadians = ref(10);
  const scaleValue = ref([1.3, 1.3]);

  const drawScene = () => {
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    let matrix = projection(gl.canvas.width, gl.canvas.height);
    matrix = translate(matrix, translation.value[0], translation.value[1]);
    matrix = scale(matrix, scaleValue.value[0], scaleValue.value[1]);
    matrix = rotate(matrix, angleInRadians.value);
    console.log("matrix", matrix);
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  drawScene();

  const updatePosition = (index) => {
    return function (event, ui) {
      translation.value[index] = ui.value;
      drawScene();
    };
  };

  const updateAngle = (event, ui) => {
    const angleInDegress = 360 - ui.value;

    angleInRadians.value = (angleInDegress * Math.PI) / 180;

    drawScene();
  };

  const updateScale = (index) => {
    return (event, ui) => {
      scaleValue.value[index] = ui.value;
      drawScene();
    };
  };

  setupSlider("#x", {
    value: translation.value[0],
    slide: updatePosition(0),
    max: gl.canvas.width,
  });
  setupSlider("#y", {
    value: translation[1],
    slide: updatePosition(1),
    max: gl.canvas.height,
  });
  setupSlider("#angle", {slide: updateAngle, max: 360});
  setupSlider("#scaleX", {
    value: scale[0],
    slide: updateScale(0),
    min: -5,
    max: 5,
    step: 0.01,
    precision: 2,
  });
  setupSlider("#scaleY", {
    value: scale[1],
    slide: updateScale(1),
    min: -5,
    max: 5,
    step: 0.01,
    precision: 2,
  });
}
