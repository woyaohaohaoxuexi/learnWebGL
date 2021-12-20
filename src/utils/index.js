// 创建着色器
export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);

  // 提供数据
  gl.shaderSource(shader, source);

  // 编译
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }
  console.error(`创建${type} shader Error: ${gl.getShaderInfoLog(shader)}`);
  gl.deleteShader(shader);
  return null;
};

// 创建着色程序
export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.error(`创建Program Error: ${gl.getProgramInfoLog(program)}`);
  gl.deleteProgram(program);

  return null;
};
