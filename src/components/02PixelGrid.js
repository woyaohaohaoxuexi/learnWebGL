import getShader from "./UseShader";

const vertex = `
	attribute vec2 a_position;
	uniform vec2 u_resolution;

	void main() {
		vec2 zeroToOne = a_position / u_resolution;

		vec2 zeroToTwo = zeroToOne * 2.0;

		vec2 clipSpace = zeroToTwo - 1.0;

		gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
	}
`;

const fragment = `
	precision mediump float;

	uniform vec4 u_color;

	void main() {
		gl_FragColor = u_color;
	}
`;

const setRectangle = (gl, x, y, width, height) => {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
};

const randomInt = (range) => {
  return Math.floor(Math.random() * range);
};

export default function RenderGl(gl) {
  const program = getShader(gl, vertex, fragment);

  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.useProgram(program);

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const size = 2; // 每次取值数量
  const type = gl.FLOAT; // 数据类型
  const normalize = false; // 不需要归一化数据
  const stride = 0; // 移动单位数量 * 每个单位占用的内存（sizeof(type)），每次迭代运行运动多少内存到下一个数据开始点
  const offset = 0; // 从缓冲起始位置开始
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  for (let i = 0; i < 50; i++) {
    setRectangle(
      gl,
      randomInt(300),
      randomInt(300),
      randomInt(300),
      randomInt(300)
    );

    gl.uniform4f(
      colorUniformLocation,
      Math.random(),
      Math.random(),
      Math.random(),
      1
    );
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // const cont = 6; // 着色器运行次数
  // gl.drawArrays(gl.TRIANGLES, 0, cont);
}
