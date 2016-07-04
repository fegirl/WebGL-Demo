// MultiAttributeSize.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute float a_PointSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw three points
  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3;

  var sizes = new Float32Array([
    10.0, 20.0, 30.0  // Point sizes
  ]);

  
  var vertexBuffer = gl.createBuffer();    //创建vertexBufffer缓冲区对象，用来存储顶点的坐标  
  var sizeBuffer = gl.createBuffer();     // 创建sizeBuffer缓冲区，用来存放顶点的尺寸             
  if (!vertexBuffer || !sizeBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);                         //绑定vertexBuffer缓冲区对象到target
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);             //向vertexBuffer缓冲区写入类型化数组vertices
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');      
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);         //将缓冲区分配给a_Position这个attribute变量
  gl.enableVertexAttribArray(a_Position);                               //开启attribute变量

  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);                           // 绑定sizeBuffer缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);                // 向sizeBuffer缓冲区写入类型化数组sizes
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');    
  if(a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return -1;
  }
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);        // 将缓冲区分配给a_PointSize这个attribute变量
  gl.enableVertexAttribArray(a_PointSize);                              //开启attribute变量

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}
