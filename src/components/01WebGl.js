import getShader from "./UseShader";

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

export default function renderGL(gl) {
  const program = getShader(gl, vertex, fragment);

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

  const cont = 3; // 着色器运行次数
  gl.drawArrays(gl.TRIANGLES, 0, cont);

  return gl;
}
