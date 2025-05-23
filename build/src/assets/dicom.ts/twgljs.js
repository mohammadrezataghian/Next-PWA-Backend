/* @license twgl.js 4.19.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */
let VecType = Float32Array;
function setDefaultType(ctor) {
  const oldType = VecType;
  VecType = ctor;
  return oldType;
}
function create(x, y, z) {
  const dst = new VecType(3);
  if (x) {
    dst[0] = x;
  }
  if (y) {
    dst[1] = y;
  }
  if (z) {
    dst[2] = z;
  }
  return dst;
}
function add(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] + b[0];
  dst[1] = a[1] + b[1];
  dst[2] = a[2] + b[2];
  return dst;
}
function subtract(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] - b[0];
  dst[1] = a[1] - b[1];
  dst[2] = a[2] - b[2];
  return dst;
}
function lerp(a, b, t, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] + t * (b[0] - a[0]);
  dst[1] = a[1] + t * (b[1] - a[1]);
  dst[2] = a[2] + t * (b[2] - a[2]);
  return dst;
}
function lerpV(a, b, t, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] + t[0] * (b[0] - a[0]);
  dst[1] = a[1] + t[1] * (b[1] - a[1]);
  dst[2] = a[2] + t[2] * (b[2] - a[2]);
  return dst;
}
function max(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = Math.max(a[0], b[0]);
  dst[1] = Math.max(a[1], b[1]);
  dst[2] = Math.max(a[2], b[2]);
  return dst;
}
function min(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = Math.min(a[0], b[0]);
  dst[1] = Math.min(a[1], b[1]);
  dst[2] = Math.min(a[2], b[2]);
  return dst;
}
function mulScalar(v, k, dst) {
  dst = dst || new VecType(3);
  dst[0] = v[0] * k;
  dst[1] = v[1] * k;
  dst[2] = v[2] * k;
  return dst;
}
function divScalar(v, k, dst) {
  dst = dst || new VecType(3);
  dst[0] = v[0] / k;
  dst[1] = v[1] / k;
  dst[2] = v[2] / k;
  return dst;
}
function cross(a, b, dst) {
  dst = dst || new VecType(3);
  const t1 = a[2] * b[0] - a[0] * b[2];
  const t2 = a[0] * b[1] - a[1] * b[0];
  dst[0] = a[1] * b[2] - a[2] * b[1];
  dst[1] = t1;
  dst[2] = t2;
  return dst;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function length$1(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}
function lengthSq(v) {
  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function distanceSq(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}
function normalize(a, dst) {
  dst = dst || new VecType(3);
  const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  const len = Math.sqrt(lenSq);
  if (len > 1e-5) {
    dst[0] = a[0] / len;
    dst[1] = a[1] / len;
    dst[2] = a[2] / len;
  } else {
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
  }
  return dst;
}
function negate(v, dst) {
  dst = dst || new VecType(3);
  dst[0] = -v[0];
  dst[1] = -v[1];
  dst[2] = -v[2];
  return dst;
}
function copy(v, dst) {
  dst = dst || new VecType(3);
  dst[0] = v[0];
  dst[1] = v[1];
  dst[2] = v[2];
  return dst;
}
function multiply(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
  dst[2] = a[2] * b[2];
  return dst;
}
function divide(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] / b[0];
  dst[1] = a[1] / b[1];
  dst[2] = a[2] / b[2];
  return dst;
}
var v3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  add,
  copy,
  create,
  cross,
  distance,
  distanceSq,
  divide,
  divScalar,
  dot,
  lerp,
  lerpV,
  length: length$1,
  lengthSq,
  max,
  min,
  mulScalar,
  multiply,
  negate,
  normalize,
  setDefaultType,
  subtract
});
let MatType = Float32Array;
function setDefaultType$1(ctor) {
  const oldType = MatType;
  MatType = ctor;
  return oldType;
}
function negate$1(m, dst) {
  dst = dst || new MatType(16);
  dst[0] = -m[0];
  dst[1] = -m[1];
  dst[2] = -m[2];
  dst[3] = -m[3];
  dst[4] = -m[4];
  dst[5] = -m[5];
  dst[6] = -m[6];
  dst[7] = -m[7];
  dst[8] = -m[8];
  dst[9] = -m[9];
  dst[10] = -m[10];
  dst[11] = -m[11];
  dst[12] = -m[12];
  dst[13] = -m[13];
  dst[14] = -m[14];
  dst[15] = -m[15];
  return dst;
}
function copy$1(m, dst) {
  dst = dst || new MatType(16);
  dst[0] = m[0];
  dst[1] = m[1];
  dst[2] = m[2];
  dst[3] = m[3];
  dst[4] = m[4];
  dst[5] = m[5];
  dst[6] = m[6];
  dst[7] = m[7];
  dst[8] = m[8];
  dst[9] = m[9];
  dst[10] = m[10];
  dst[11] = m[11];
  dst[12] = m[12];
  dst[13] = m[13];
  dst[14] = m[14];
  dst[15] = m[15];
  return dst;
}
function identity(dst) {
  dst = dst || new MatType(16);
  dst[0] = 1;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 1;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function transpose(m, dst) {
  dst = dst || new MatType(16);
  if (dst === m) {
    let t;
    t = m[1];
    m[1] = m[4];
    m[4] = t;
    t = m[2];
    m[2] = m[8];
    m[8] = t;
    t = m[3];
    m[3] = m[12];
    m[12] = t;
    t = m[6];
    m[6] = m[9];
    m[9] = t;
    t = m[7];
    m[7] = m[13];
    m[13] = t;
    t = m[11];
    m[11] = m[14];
    m[14] = t;
    return dst;
  }
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  dst[0] = m00;
  dst[1] = m10;
  dst[2] = m20;
  dst[3] = m30;
  dst[4] = m01;
  dst[5] = m11;
  dst[6] = m21;
  dst[7] = m31;
  dst[8] = m02;
  dst[9] = m12;
  dst[10] = m22;
  dst[11] = m32;
  dst[12] = m03;
  dst[13] = m13;
  dst[14] = m23;
  dst[15] = m33;
  return dst;
}
function inverse(m, dst) {
  dst = dst || new MatType(16);
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  const tmp_0 = m22 * m33;
  const tmp_1 = m32 * m23;
  const tmp_2 = m12 * m33;
  const tmp_3 = m32 * m13;
  const tmp_4 = m12 * m23;
  const tmp_5 = m22 * m13;
  const tmp_6 = m02 * m33;
  const tmp_7 = m32 * m03;
  const tmp_8 = m02 * m23;
  const tmp_9 = m22 * m03;
  const tmp_10 = m02 * m13;
  const tmp_11 = m12 * m03;
  const tmp_12 = m20 * m31;
  const tmp_13 = m30 * m21;
  const tmp_14 = m10 * m31;
  const tmp_15 = m30 * m11;
  const tmp_16 = m10 * m21;
  const tmp_17 = m20 * m11;
  const tmp_18 = m00 * m31;
  const tmp_19 = m30 * m01;
  const tmp_20 = m00 * m21;
  const tmp_21 = m20 * m01;
  const tmp_22 = m00 * m11;
  const tmp_23 = m10 * m01;
  const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  dst[0] = d * t0;
  dst[1] = d * t1;
  dst[2] = d * t2;
  dst[3] = d * t3;
  dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
  dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
  dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
  dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
  dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
  dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
  dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
  dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
  dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
  dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
  dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
  dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
  return dst;
}
function multiply$1(a, b, dst) {
  dst = dst || new MatType(16);
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4 + 0];
  const a11 = a[4 + 1];
  const a12 = a[4 + 2];
  const a13 = a[4 + 3];
  const a20 = a[8 + 0];
  const a21 = a[8 + 1];
  const a22 = a[8 + 2];
  const a23 = a[8 + 3];
  const a30 = a[12 + 0];
  const a31 = a[12 + 1];
  const a32 = a[12 + 2];
  const a33 = a[12 + 3];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[4 + 0];
  const b11 = b[4 + 1];
  const b12 = b[4 + 2];
  const b13 = b[4 + 3];
  const b20 = b[8 + 0];
  const b21 = b[8 + 1];
  const b22 = b[8 + 2];
  const b23 = b[8 + 3];
  const b30 = b[12 + 0];
  const b31 = b[12 + 1];
  const b32 = b[12 + 2];
  const b33 = b[12 + 3];
  dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
  dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
  dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
  dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
  dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
  dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
  dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
  dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
  dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
  dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
  return dst;
}
function setTranslation(a, v, dst) {
  dst = dst || identity();
  if (a !== dst) {
    dst[0] = a[0];
    dst[1] = a[1];
    dst[2] = a[2];
    dst[3] = a[3];
    dst[4] = a[4];
    dst[5] = a[5];
    dst[6] = a[6];
    dst[7] = a[7];
    dst[8] = a[8];
    dst[9] = a[9];
    dst[10] = a[10];
    dst[11] = a[11];
  }
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}
function getTranslation(m, dst) {
  dst = dst || create();
  dst[0] = m[12];
  dst[1] = m[13];
  dst[2] = m[14];
  return dst;
}
function getAxis(m, axis, dst) {
  dst = dst || create();
  const off = axis * 4;
  dst[0] = m[off + 0];
  dst[1] = m[off + 1];
  dst[2] = m[off + 2];
  return dst;
}
function setAxis(a, v, axis, dst) {
  if (dst !== a) {
    dst = copy$1(a, dst);
  }
  const off = axis * 4;
  dst[off + 0] = v[0];
  dst[off + 1] = v[1];
  dst[off + 2] = v[2];
  return dst;
}
function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
  dst = dst || new MatType(16);
  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
  const rangeInv = 1 / (zNear - zFar);
  dst[0] = f / aspect;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = f;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = (zNear + zFar) * rangeInv;
  dst[11] = -1;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = zNear * zFar * rangeInv * 2;
  dst[15] = 0;
  return dst;
}
function ortho(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);
  dst[0] = 2 / (right - left);
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 2 / (top - bottom);
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 2 / (near - far);
  dst[11] = 0;
  dst[12] = (right + left) / (left - right);
  dst[13] = (top + bottom) / (bottom - top);
  dst[14] = (far + near) / (near - far);
  dst[15] = 1;
  return dst;
}
function frustum(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);
  const dx = right - left;
  const dy = top - bottom;
  const dz = near - far;
  dst[0] = 2 * near / dx;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 2 * near / dy;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = (left + right) / dx;
  dst[9] = (top + bottom) / dy;
  dst[10] = far / dz;
  dst[11] = -1;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = near * far / dz;
  dst[15] = 0;
  return dst;
}
let xAxis;
let yAxis;
let zAxis;
function lookAt(eye, target, up, dst) {
  dst = dst || new MatType(16);
  xAxis = xAxis || create();
  yAxis = yAxis || create();
  zAxis = zAxis || create();
  normalize(subtract(eye, target, zAxis), zAxis);
  normalize(cross(up, zAxis, xAxis), xAxis);
  normalize(cross(zAxis, xAxis, yAxis), yAxis);
  dst[0] = xAxis[0];
  dst[1] = xAxis[1];
  dst[2] = xAxis[2];
  dst[3] = 0;
  dst[4] = yAxis[0];
  dst[5] = yAxis[1];
  dst[6] = yAxis[2];
  dst[7] = 0;
  dst[8] = zAxis[0];
  dst[9] = zAxis[1];
  dst[10] = zAxis[2];
  dst[11] = 0;
  dst[12] = eye[0];
  dst[13] = eye[1];
  dst[14] = eye[2];
  dst[15] = 1;
  return dst;
}
function translation(v, dst) {
  dst = dst || new MatType(16);
  dst[0] = 1;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 1;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}
function translate(m, v, dst) {
  dst = dst || new MatType(16);
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  if (m !== dst) {
    dst[0] = m00;
    dst[1] = m01;
    dst[2] = m02;
    dst[3] = m03;
    dst[4] = m10;
    dst[5] = m11;
    dst[6] = m12;
    dst[7] = m13;
    dst[8] = m20;
    dst[9] = m21;
    dst[10] = m22;
    dst[11] = m23;
  }
  dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
  dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
  dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
  dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
  return dst;
}
function rotationX(angleInRadians, dst) {
  dst = dst || new MatType(16);
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[0] = 1;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = c;
  dst[6] = s;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = -s;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function rotateX(m, angleInRadians, dst) {
  dst = dst || new MatType(16);
  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[4] = c * m10 + s * m20;
  dst[5] = c * m11 + s * m21;
  dst[6] = c * m12 + s * m22;
  dst[7] = c * m13 + s * m23;
  dst[8] = c * m20 - s * m10;
  dst[9] = c * m21 - s * m11;
  dst[10] = c * m22 - s * m12;
  dst[11] = c * m23 - s * m13;
  if (m !== dst) {
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }
  return dst;
}
function rotationY(angleInRadians, dst) {
  dst = dst || new MatType(16);
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[0] = c;
  dst[1] = 0;
  dst[2] = -s;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 1;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = s;
  dst[9] = 0;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function rotateY(m, angleInRadians, dst) {
  dst = dst || new MatType(16);
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[0] = c * m00 - s * m20;
  dst[1] = c * m01 - s * m21;
  dst[2] = c * m02 - s * m22;
  dst[3] = c * m03 - s * m23;
  dst[8] = c * m20 + s * m00;
  dst[9] = c * m21 + s * m01;
  dst[10] = c * m22 + s * m02;
  dst[11] = c * m23 + s * m03;
  if (m !== dst) {
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[7] = m[7];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }
  return dst;
}
function rotationZ(angleInRadians, dst) {
  dst = dst || new MatType(16);
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[0] = c;
  dst[1] = s;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = -s;
  dst[5] = c;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function rotateZ(m, angleInRadians, dst) {
  dst = dst || new MatType(16);
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  dst[0] = c * m00 + s * m10;
  dst[1] = c * m01 + s * m11;
  dst[2] = c * m02 + s * m12;
  dst[3] = c * m03 + s * m13;
  dst[4] = c * m10 - s * m00;
  dst[5] = c * m11 - s * m01;
  dst[6] = c * m12 - s * m02;
  dst[7] = c * m13 - s * m03;
  if (m !== dst) {
    dst[8] = m[8];
    dst[9] = m[9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }
  return dst;
}
function axisRotation(axis, angleInRadians, dst) {
  dst = dst || new MatType(16);
  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;
  dst[0] = xx + (1 - xx) * c;
  dst[1] = x * y * oneMinusCosine + z * s;
  dst[2] = x * z * oneMinusCosine - y * s;
  dst[3] = 0;
  dst[4] = x * y * oneMinusCosine - z * s;
  dst[5] = yy + (1 - yy) * c;
  dst[6] = y * z * oneMinusCosine + x * s;
  dst[7] = 0;
  dst[8] = x * z * oneMinusCosine + y * s;
  dst[9] = y * z * oneMinusCosine - x * s;
  dst[10] = zz + (1 - zz) * c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function axisRotate(m, axis, angleInRadians, dst) {
  dst = dst || new MatType(16);
  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;
  const r00 = xx + (1 - xx) * c;
  const r01 = x * y * oneMinusCosine + z * s;
  const r02 = x * z * oneMinusCosine - y * s;
  const r10 = x * y * oneMinusCosine - z * s;
  const r11 = yy + (1 - yy) * c;
  const r12 = y * z * oneMinusCosine + x * s;
  const r20 = x * z * oneMinusCosine + y * s;
  const r21 = y * z * oneMinusCosine - x * s;
  const r22 = zz + (1 - zz) * c;
  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
  dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
  dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
  dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
  dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
  dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
  dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
  dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
  dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
  dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
  dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
  dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }
  return dst;
}
function scaling(v, dst) {
  dst = dst || new MatType(16);
  dst[0] = v[0];
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = v[1];
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = v[2];
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function scale(m, v, dst) {
  dst = dst || new MatType(16);
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * m[0 * 4 + 0];
  dst[1] = v0 * m[0 * 4 + 1];
  dst[2] = v0 * m[0 * 4 + 2];
  dst[3] = v0 * m[0 * 4 + 3];
  dst[4] = v1 * m[1 * 4 + 0];
  dst[5] = v1 * m[1 * 4 + 1];
  dst[6] = v1 * m[1 * 4 + 2];
  dst[7] = v1 * m[1 * 4 + 3];
  dst[8] = v2 * m[2 * 4 + 0];
  dst[9] = v2 * m[2 * 4 + 1];
  dst[10] = v2 * m[2 * 4 + 2];
  dst[11] = v2 * m[2 * 4 + 3];
  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }
  return dst;
}
function transformPoint(m, v, dst) {
  dst = dst || create();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
  return dst;
}
function transformDirection(m, v, dst) {
  dst = dst || create();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
  return dst;
}
function transformNormal(m, v, dst) {
  dst = dst || create();
  const mi = inverse(m);
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
  return dst;
}
var m4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  axisRotate,
  axisRotation,
  copy: copy$1,
  frustum,
  getAxis,
  getTranslation,
  identity,
  inverse,
  lookAt,
  multiply: multiply$1,
  negate: negate$1,
  ortho,
  perspective,
  rotateX,
  rotateY,
  rotateZ,
  rotationX,
  rotationY,
  rotationZ,
  scale,
  scaling,
  setAxis,
  setDefaultType: setDefaultType$1,
  setTranslation,
  transformDirection,
  transformNormal,
  transformPoint,
  translate,
  translation,
  transpose
});
const BYTE = 5120;
const UNSIGNED_BYTE = 5121;
const SHORT = 5122;
const UNSIGNED_SHORT = 5123;
const INT = 5124;
const UNSIGNED_INT = 5125;
const FLOAT = 5126;
const UNSIGNED_SHORT_4_4_4_4 = 32819;
const UNSIGNED_SHORT_5_5_5_1 = 32820;
const UNSIGNED_SHORT_5_6_5 = 33635;
const HALF_FLOAT = 5131;
const UNSIGNED_INT_2_10_10_10_REV = 33640;
const UNSIGNED_INT_10F_11F_11F_REV = 35899;
const UNSIGNED_INT_5_9_9_9_REV = 35902;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
const UNSIGNED_INT_24_8 = 34042;
const glTypeToTypedArray = {};
{
  const tt = glTypeToTypedArray;
  tt[BYTE] = Int8Array;
  tt[UNSIGNED_BYTE] = Uint8Array;
  tt[SHORT] = Int16Array;
  tt[UNSIGNED_SHORT] = Uint16Array;
  tt[INT] = Int32Array;
  tt[UNSIGNED_INT] = Uint32Array;
  tt[FLOAT] = Float32Array;
  tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
  tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
  tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
  tt[HALF_FLOAT] = Uint16Array;
  tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
  tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
  tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
  tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
  tt[UNSIGNED_INT_24_8] = Uint32Array;
}
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array) {
    return BYTE;
  }
  if (typedArray instanceof Uint8Array) {
    return UNSIGNED_BYTE;
  }
  if (typedArray instanceof Uint8ClampedArray) {
    return UNSIGNED_BYTE;
  }
  if (typedArray instanceof Int16Array) {
    return SHORT;
  }
  if (typedArray instanceof Uint16Array) {
    return UNSIGNED_SHORT;
  }
  if (typedArray instanceof Int32Array) {
    return INT;
  }
  if (typedArray instanceof Uint32Array) {
    return UNSIGNED_INT;
  }
  if (typedArray instanceof Float32Array) {
    return FLOAT;
  }
  throw new Error("unsupported typed array type");
}
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return BYTE;
  }
  if (typedArrayType === Uint8Array) {
    return UNSIGNED_BYTE;
  }
  if (typedArrayType === Uint8ClampedArray) {
    return UNSIGNED_BYTE;
  }
  if (typedArrayType === Int16Array) {
    return SHORT;
  }
  if (typedArrayType === Uint16Array) {
    return UNSIGNED_SHORT;
  }
  if (typedArrayType === Int32Array) {
    return INT;
  }
  if (typedArrayType === Uint32Array) {
    return UNSIGNED_INT;
  }
  if (typedArrayType === Float32Array) {
    return FLOAT;
  }
  throw new Error("unsupported typed array type");
}
function getTypedArrayTypeForGLType(type) {
  const CTOR = glTypeToTypedArray[type];
  if (!CTOR) {
    throw new Error("unknown gl type");
  }
  return CTOR;
}
const isArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
  return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function isArrayBuffer2(a) {
  return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
var typedarrays = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getGLTypeForTypedArray,
  getGLTypeForTypedArrayType,
  getTypedArrayTypeForGLType,
  isArrayBuffer
});
function copyNamedProperties(names, src, dst) {
  names.forEach(function(name) {
    const value = src[name];
    if (value !== void 0) {
      dst[name] = value;
    }
  });
}
function copyExistingProperties(src, dst) {
  Object.keys(dst).forEach(function(key) {
    if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {
      dst[key] = src[key];
    }
  });
}
function error(...args) {
  console.error(...args);
}
function warn(...args) {
  console.warn(...args);
}
function isBuffer(gl, t) {
  return typeof WebGLBuffer !== "undefined" && t instanceof WebGLBuffer;
}
function isRenderbuffer(gl, t) {
  return typeof WebGLRenderbuffer !== "undefined" && t instanceof WebGLRenderbuffer;
}
function isShader(gl, t) {
  return typeof WebGLShader !== "undefined" && t instanceof WebGLShader;
}
function isTexture(gl, t) {
  return typeof WebGLTexture !== "undefined" && t instanceof WebGLTexture;
}
function isSampler(gl, t) {
  return typeof WebGLSampler !== "undefined" && t instanceof WebGLSampler;
}
const STATIC_DRAW = 35044;
const ARRAY_BUFFER = 34962;
const ELEMENT_ARRAY_BUFFER = 34963;
const BUFFER_SIZE = 34660;
const BYTE$1 = 5120;
const UNSIGNED_BYTE$1 = 5121;
const SHORT$1 = 5122;
const UNSIGNED_SHORT$1 = 5123;
const INT$1 = 5124;
const UNSIGNED_INT$1 = 5125;
const FLOAT$1 = 5126;
const defaults = {
  attribPrefix: ""
};
function setAttributePrefix(prefix) {
  defaults.attribPrefix = prefix;
}
function setDefaults(newDefaults) {
  copyExistingProperties(newDefaults, defaults);
}
function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType || STATIC_DRAW);
}
function createBufferFromTypedArray(gl, typedArray, type, drawType) {
  if (isBuffer(gl, typedArray)) {
    return typedArray;
  }
  type = type || ARRAY_BUFFER;
  const buffer = gl.createBuffer();
  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
  return buffer;
}
function isIndices(name) {
  return name === "indices";
}
function getNormalizationForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array) {
    return true;
  }
  if (typedArray instanceof Uint8Array) {
    return true;
  }
  return false;
}
function getNormalizationForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return true;
  }
  if (typedArrayType === Uint8Array) {
    return true;
  }
  return false;
}
function getArray(array) {
  return array.length ? array : array.data;
}
const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;
function guessNumComponentsFromName(name, length2) {
  let numComponents;
  if (texcoordRE.test(name)) {
    numComponents = 2;
  } else if (colorRE.test(name)) {
    numComponents = 4;
  } else {
    numComponents = 3;
  }
  if (length2 % numComponents > 0) {
    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length2} values is not evenly divisible by ${numComponents}. You should specify it.`);
  }
  return numComponents;
}
function getNumComponents(array, arrayName) {
  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}
function makeTypedArray(array, name) {
  if (isArrayBuffer(array)) {
    return array;
  }
  if (isArrayBuffer(array.data)) {
    return array.data;
  }
  if (Array.isArray(array)) {
    array = {
      data: array
    };
  }
  let Type = array.type;
  if (!Type) {
    if (isIndices(name)) {
      Type = Uint16Array;
    } else {
      Type = Float32Array;
    }
  }
  return new Type(array.data);
}
function createAttribsFromArrays(gl, arrays) {
  const attribs = {};
  Object.keys(arrays).forEach(function(arrayName) {
    if (!isIndices(arrayName)) {
      const array = arrays[arrayName];
      const attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
      if (array.value) {
        if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) {
          throw new Error("array.value is not array or typedarray");
        }
        attribs[attribName] = {
          value: array.value
        };
      } else {
        let buffer;
        let type;
        let normalization;
        let numComponents;
        if (array.buffer && array.buffer instanceof WebGLBuffer) {
          buffer = array.buffer;
          numComponents = array.numComponents || array.size;
          type = array.type;
          normalization = array.normalize;
        } else if (typeof array === "number" || typeof array.data === "number") {
          const numValues = array.data || array;
          const arrayType = array.type || Float32Array;
          const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
          type = getGLTypeForTypedArrayType(arrayType);
          normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArrayType(arrayType);
          numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
          buffer = gl.createBuffer();
          gl.bindBuffer(ARRAY_BUFFER, buffer);
          gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
        } else {
          const typedArray = makeTypedArray(array, arrayName);
          buffer = createBufferFromTypedArray(gl, typedArray, void 0, array.drawType);
          type = getGLTypeForTypedArray(typedArray);
          normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArray(typedArray);
          numComponents = getNumComponents(array, arrayName);
        }
        attribs[attribName] = {
          buffer,
          numComponents,
          type,
          normalize: normalization,
          stride: array.stride || 0,
          offset: array.offset || 0,
          divisor: array.divisor === void 0 ? void 0 : array.divisor,
          drawType: array.drawType
        };
      }
    }
  });
  gl.bindBuffer(ARRAY_BUFFER, null);
  return attribs;
}
function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
  array = makeTypedArray(array);
  if (offset !== void 0) {
    gl.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
    gl.bufferSubData(ARRAY_BUFFER, offset, array);
  } else {
    setBufferFromTypedArray(gl, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
  }
}
function getBytesPerValueForGLType(gl, type) {
  if (type === BYTE$1)
    return 1;
  if (type === UNSIGNED_BYTE$1)
    return 1;
  if (type === SHORT$1)
    return 2;
  if (type === UNSIGNED_SHORT$1)
    return 2;
  if (type === INT$1)
    return 4;
  if (type === UNSIGNED_INT$1)
    return 4;
  if (type === FLOAT$1)
    return 4;
  return 0;
}
const positionKeys = ["position", "positions", "a_position"];
function getNumElementsFromNonIndexedArrays(arrays) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in arrays) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(arrays)[0];
  }
  const array = arrays[key];
  const length2 = getArray(array).length;
  const numComponents = getNumComponents(array, key);
  const numElements = length2 / numComponents;
  if (length2 % numComponents > 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length2}`);
  }
  return numElements;
}
function getNumElementsFromAttributes(gl, attribs) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in attribs) {
      break;
    }
    key = defaults.attribPrefix + key;
    if (key in attribs) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(attribs)[0];
  }
  const attrib = attribs[key];
  gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
  const numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
  gl.bindBuffer(ARRAY_BUFFER, null);
  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
  const totalElements = numBytes / bytesPerValue;
  const numComponents = attrib.numComponents || attrib.size;
  const numElements = totalElements / numComponents;
  if (numElements % 1 !== 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}
function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
  const newAttribs = createAttribsFromArrays(gl, arrays);
  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
  const indices = arrays.indices;
  if (indices) {
    const newIndices = makeTypedArray(indices, "indices");
    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
    bufferInfo.numElements = newIndices.length;
    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
  } else if (!bufferInfo.numElements) {
    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
  }
  return bufferInfo;
}
function createBufferFromArray(gl, array, arrayName) {
  const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
  const typedArray = makeTypedArray(array, arrayName);
  return createBufferFromTypedArray(gl, typedArray, type);
}
function createBuffersFromArrays(gl, arrays) {
  const buffers = {};
  Object.keys(arrays).forEach(function(key) {
    buffers[key] = createBufferFromArray(gl, arrays[key], key);
  });
  if (arrays.indices) {
    buffers.numElements = arrays.indices.length;
    buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
  } else {
    buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
  }
  return buffers;
}
var attributes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createAttribsFromArrays,
  createBuffersFromArrays,
  createBufferFromArray,
  createBufferFromTypedArray,
  createBufferInfoFromArrays,
  setAttribInfoBufferFromArray,
  setAttributePrefix,
  setAttributeDefaults_: setDefaults,
  getNumComponents_: getNumComponents,
  getArray_: getArray
});
const getArray$1 = getArray;
const getNumComponents$1 = getNumComponents;
function augmentTypedArray(typedArray, numComponents) {
  let cursor = 0;
  typedArray.push = function() {
    for (let ii = 0; ii < arguments.length; ++ii) {
      const value = arguments[ii];
      if (value instanceof Array || isArrayBuffer(value)) {
        for (let jj = 0; jj < value.length; ++jj) {
          typedArray[cursor++] = value[jj];
        }
      } else {
        typedArray[cursor++] = value;
      }
    }
  };
  typedArray.reset = function(opt_index) {
    cursor = opt_index || 0;
  };
  typedArray.numComponents = numComponents;
  Object.defineProperty(typedArray, "numElements", {
    get: function() {
      return this.length / this.numComponents | 0;
    }
  });
  return typedArray;
}
function createAugmentedTypedArray(numComponents, numElements, opt_type) {
  const Type = opt_type || Float32Array;
  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}
function allButIndices(name) {
  return name !== "indices";
}
function deindexVertices(vertices) {
  const indices = vertices.indices;
  const newVertices = {};
  const numElements = indices.length;
  function expandToUnindexed(channel) {
    const srcBuffer = vertices[channel];
    const numComponents = srcBuffer.numComponents;
    const dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
    for (let ii = 0; ii < numElements; ++ii) {
      const ndx = indices[ii];
      const offset = ndx * numComponents;
      for (let jj = 0; jj < numComponents; ++jj) {
        dstBuffer.push(srcBuffer[offset + jj]);
      }
    }
    newVertices[channel] = dstBuffer;
  }
  Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
  return newVertices;
}
function flattenNormals(vertices) {
  if (vertices.indices) {
    throw new Error("can not flatten normals of indexed vertices. deindex them first");
  }
  const normals = vertices.normal;
  const numNormals = normals.length;
  for (let ii = 0; ii < numNormals; ii += 9) {
    const nax = normals[ii + 0];
    const nay = normals[ii + 1];
    const naz = normals[ii + 2];
    const nbx = normals[ii + 3];
    const nby = normals[ii + 4];
    const nbz = normals[ii + 5];
    const ncx = normals[ii + 6];
    const ncy = normals[ii + 7];
    const ncz = normals[ii + 8];
    let nx = nax + nbx + ncx;
    let ny = nay + nby + ncy;
    let nz = naz + nbz + ncz;
    const length2 = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= length2;
    ny /= length2;
    nz /= length2;
    normals[ii + 0] = nx;
    normals[ii + 1] = ny;
    normals[ii + 2] = nz;
    normals[ii + 3] = nx;
    normals[ii + 4] = ny;
    normals[ii + 5] = nz;
    normals[ii + 6] = nx;
    normals[ii + 7] = ny;
    normals[ii + 8] = nz;
  }
  return vertices;
}
function applyFuncToV3Array(array, matrix, fn) {
  const len = array.length;
  const tmp = new Float32Array(3);
  for (let ii = 0; ii < len; ii += 3) {
    fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
    array[ii] = tmp[0];
    array[ii + 1] = tmp[1];
    array[ii + 2] = tmp[2];
  }
}
function transformNormal$1(mi, v, dst) {
  dst = dst || create();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
  return dst;
}
function reorientDirections(array, matrix) {
  applyFuncToV3Array(array, matrix, transformDirection);
  return array;
}
function reorientNormals(array, matrix) {
  applyFuncToV3Array(array, inverse(matrix), transformNormal$1);
  return array;
}
function reorientPositions(array, matrix) {
  applyFuncToV3Array(array, matrix, transformPoint);
  return array;
}
function reorientVertices(arrays, matrix) {
  Object.keys(arrays).forEach(function(name) {
    const array = arrays[name];
    if (name.indexOf("pos") >= 0) {
      reorientPositions(array, matrix);
    } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
      reorientDirections(array, matrix);
    } else if (name.indexOf("norm") >= 0) {
      reorientNormals(array, matrix);
    }
  });
  return arrays;
}
function createXYQuadVertices(size, xOffset, yOffset) {
  size = size || 2;
  xOffset = xOffset || 0;
  yOffset = yOffset || 0;
  size *= 0.5;
  return {
    position: {
      numComponents: 2,
      data: [
        xOffset + -1 * size,
        yOffset + -1 * size,
        xOffset + 1 * size,
        yOffset + -1 * size,
        xOffset + -1 * size,
        yOffset + 1 * size,
        xOffset + 1 * size,
        yOffset + 1 * size
      ]
    },
    normal: [
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1
    ],
    texcoord: [
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ],
    indices: [0, 1, 2, 2, 1, 3]
  };
}
function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
  width = width || 1;
  depth = depth || 1;
  subdivisionsWidth = subdivisionsWidth || 1;
  subdivisionsDepth = subdivisionsDepth || 1;
  matrix = matrix || identity();
  const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  for (let z = 0; z <= subdivisionsDepth; z++) {
    for (let x = 0; x <= subdivisionsWidth; x++) {
      const u = x / subdivisionsWidth;
      const v = z / subdivisionsDepth;
      positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
      normals.push(0, 1, 0);
      texcoords.push(u, v);
    }
  }
  const numVertsAcross = subdivisionsWidth + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
  for (let z = 0; z < subdivisionsDepth; z++) {
    for (let x = 0; x < subdivisionsWidth; x++) {
      indices.push((z + 0) * numVertsAcross + x, (z + 1) * numVertsAcross + x, (z + 0) * numVertsAcross + x + 1);
      indices.push((z + 1) * numVertsAcross + x, (z + 1) * numVertsAcross + x + 1, (z + 0) * numVertsAcross + x + 1);
    }
  }
  const arrays = reorientVertices({
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  }, matrix);
  return arrays;
}
function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
  if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
    throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
  }
  opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
  opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
  opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
  opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
  const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
  const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
  const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  for (let y = 0; y <= subdivisionsHeight; y++) {
    for (let x = 0; x <= subdivisionsAxis; x++) {
      const u = x / subdivisionsAxis;
      const v = y / subdivisionsHeight;
      const theta = longRange * u + opt_startLongitudeInRadians;
      const phi = latRange * v + opt_startLatitudeInRadians;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const ux = cosTheta * sinPhi;
      const uy = cosPhi;
      const uz = sinTheta * sinPhi;
      positions.push(radius * ux, radius * uy, radius * uz);
      normals.push(ux, uy, uz);
      texcoords.push(1 - u, v);
    }
  }
  const numVertsAround = subdivisionsAxis + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
  for (let x = 0; x < subdivisionsAxis; x++) {
    for (let y = 0; y < subdivisionsHeight; y++) {
      indices.push((y + 0) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x);
      indices.push((y + 1) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x + 1);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
const CUBE_FACE_INDICES = [
  [3, 7, 5, 1],
  [6, 2, 0, 4],
  [6, 7, 3, 2],
  [0, 1, 5, 4],
  [7, 6, 4, 5],
  [2, 3, 1, 0]
];
function createCubeVertices(size) {
  size = size || 1;
  const k = size / 2;
  const cornerVertices = [
    [-k, -k, -k],
    [+k, -k, -k],
    [-k, +k, -k],
    [+k, +k, -k],
    [-k, -k, +k],
    [+k, -k, +k],
    [-k, +k, +k],
    [+k, +k, +k]
  ];
  const faceNormals = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  const uvCoords = [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1]
  ];
  const numVertices = 6 * 4;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, 6 * 2, Uint16Array);
  for (let f = 0; f < 6; ++f) {
    const faceIndices = CUBE_FACE_INDICES[f];
    for (let v = 0; v < 4; ++v) {
      const position = cornerVertices[faceIndices[v]];
      const normal = faceNormals[f];
      const uv = uvCoords[v];
      positions.push(position);
      normals.push(normal);
      texcoords.push(uv);
    }
    const offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
  if (radialSubdivisions < 3) {
    throw new Error("radialSubdivisions must be 3 or greater");
  }
  if (verticalSubdivisions < 1) {
    throw new Error("verticalSubdivisions must be 1 or greater");
  }
  const topCap = opt_topCap === void 0 ? true : opt_topCap;
  const bottomCap = opt_bottomCap === void 0 ? true : opt_bottomCap;
  const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
  const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
  const vertsAroundEdge = radialSubdivisions + 1;
  const slant = Math.atan2(bottomRadius - topRadius, height);
  const cosSlant = Math.cos(slant);
  const sinSlant = Math.sin(slant);
  const start = topCap ? -2 : 0;
  const end = verticalSubdivisions + (bottomCap ? 2 : 0);
  for (let yy = start; yy <= end; ++yy) {
    let v = yy / verticalSubdivisions;
    let y = height * v;
    let ringRadius;
    if (yy < 0) {
      y = 0;
      v = 1;
      ringRadius = bottomRadius;
    } else if (yy > verticalSubdivisions) {
      y = height;
      v = 1;
      ringRadius = topRadius;
    } else {
      ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
    }
    if (yy === -2 || yy === verticalSubdivisions + 2) {
      ringRadius = 0;
      v = 0;
    }
    y -= height / 2;
    for (let ii = 0; ii < vertsAroundEdge; ++ii) {
      const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
      const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
      positions.push(sin * ringRadius, y, cos * ringRadius);
      if (yy < 0) {
        normals.push(0, -1, 0);
      } else if (yy > verticalSubdivisions) {
        normals.push(0, 1, 0);
      } else if (ringRadius === 0) {
        normals.push(0, 0, 0);
      } else {
        normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
      }
      texcoords.push(ii / radialSubdivisions, 1 - v);
    }
  }
  for (let yy = 0; yy < verticalSubdivisions + extra; ++yy) {
    if (yy === 1 && topCap || yy === verticalSubdivisions + extra - 2 && bottomCap) {
      continue;
    }
    for (let ii = 0; ii < radialSubdivisions; ++ii) {
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 0) + 1 + ii, vertsAroundEdge * (yy + 1) + 1 + ii);
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 1) + 1 + ii, vertsAroundEdge * (yy + 1) + 0 + ii);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function expandRLEData(rleData, padding) {
  padding = padding || [];
  const data = [];
  for (let ii = 0; ii < rleData.length; ii += 4) {
    const runLength = rleData[ii];
    const element = rleData.slice(ii + 1, ii + 4);
    element.push.apply(element, padding);
    for (let jj = 0; jj < runLength; ++jj) {
      data.push.apply(data, element);
    }
  }
  return data;
}
function create3DFVertices() {
  const positions = [
    0,
    0,
    0,
    0,
    150,
    0,
    30,
    0,
    0,
    0,
    150,
    0,
    30,
    150,
    0,
    30,
    0,
    0,
    30,
    0,
    0,
    30,
    30,
    0,
    100,
    0,
    0,
    30,
    30,
    0,
    100,
    30,
    0,
    100,
    0,
    0,
    30,
    60,
    0,
    30,
    90,
    0,
    67,
    60,
    0,
    30,
    90,
    0,
    67,
    90,
    0,
    67,
    60,
    0,
    0,
    0,
    30,
    30,
    0,
    30,
    0,
    150,
    30,
    0,
    150,
    30,
    30,
    0,
    30,
    30,
    150,
    30,
    30,
    0,
    30,
    100,
    0,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    100,
    0,
    30,
    100,
    30,
    30,
    30,
    60,
    30,
    67,
    60,
    30,
    30,
    90,
    30,
    30,
    90,
    30,
    67,
    60,
    30,
    67,
    90,
    30,
    0,
    0,
    0,
    100,
    0,
    0,
    100,
    0,
    30,
    0,
    0,
    0,
    100,
    0,
    30,
    0,
    0,
    30,
    100,
    0,
    0,
    100,
    30,
    0,
    100,
    30,
    30,
    100,
    0,
    0,
    100,
    30,
    30,
    100,
    0,
    30,
    30,
    30,
    0,
    30,
    30,
    30,
    100,
    30,
    30,
    30,
    30,
    0,
    100,
    30,
    30,
    100,
    30,
    0,
    30,
    30,
    0,
    30,
    60,
    30,
    30,
    30,
    30,
    30,
    30,
    0,
    30,
    60,
    0,
    30,
    60,
    30,
    30,
    60,
    0,
    67,
    60,
    30,
    30,
    60,
    30,
    30,
    60,
    0,
    67,
    60,
    0,
    67,
    60,
    30,
    67,
    60,
    0,
    67,
    90,
    30,
    67,
    60,
    30,
    67,
    60,
    0,
    67,
    90,
    0,
    67,
    90,
    30,
    30,
    90,
    0,
    30,
    90,
    30,
    67,
    90,
    30,
    30,
    90,
    0,
    67,
    90,
    30,
    67,
    90,
    0,
    30,
    90,
    0,
    30,
    150,
    30,
    30,
    90,
    30,
    30,
    90,
    0,
    30,
    150,
    0,
    30,
    150,
    30,
    0,
    150,
    0,
    0,
    150,
    30,
    30,
    150,
    30,
    0,
    150,
    0,
    30,
    150,
    30,
    30,
    150,
    0,
    0,
    0,
    0,
    0,
    0,
    30,
    0,
    150,
    30,
    0,
    0,
    0,
    0,
    150,
    30,
    0,
    150,
    0
  ];
  const texcoords = [
    0.22,
    0.19,
    0.22,
    0.79,
    0.34,
    0.19,
    0.22,
    0.79,
    0.34,
    0.79,
    0.34,
    0.19,
    0.34,
    0.19,
    0.34,
    0.31,
    0.62,
    0.19,
    0.34,
    0.31,
    0.62,
    0.31,
    0.62,
    0.19,
    0.34,
    0.43,
    0.34,
    0.55,
    0.49,
    0.43,
    0.34,
    0.55,
    0.49,
    0.55,
    0.49,
    0.43,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  ];
  const normals = expandRLEData([
    18,
    0,
    0,
    1,
    18,
    0,
    0,
    -1,
    6,
    0,
    1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    -1,
    0,
    0
  ]);
  const colors = expandRLEData([
    18,
    200,
    70,
    120,
    18,
    80,
    70,
    200,
    6,
    70,
    200,
    210,
    6,
    200,
    200,
    70,
    6,
    210,
    100,
    70,
    6,
    210,
    160,
    70,
    6,
    70,
    180,
    210,
    6,
    100,
    70,
    210,
    6,
    76,
    210,
    100,
    6,
    140,
    210,
    80,
    6,
    90,
    130,
    110,
    6,
    160,
    160,
    220
  ], [255]);
  const numVerts = positions.length / 3;
  const arrays = {
    position: createAugmentedTypedArray(3, numVerts),
    texcoord: createAugmentedTypedArray(2, numVerts),
    normal: createAugmentedTypedArray(3, numVerts),
    color: createAugmentedTypedArray(4, numVerts, Uint8Array),
    indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
  };
  arrays.position.push(positions);
  arrays.texcoord.push(texcoords);
  arrays.normal.push(normals);
  arrays.color.push(colors);
  for (let ii = 0; ii < numVerts; ++ii) {
    arrays.indices.push(ii);
  }
  return arrays;
}
function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
  if (subdivisionsDown <= 0) {
    throw new Error("subdivisionDown must be > 0");
  }
  startOffset = startOffset || 0;
  endOffset = endOffset || 1;
  const subdivisionsThick = 2;
  const offsetRange = endOffset - startOffset;
  const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  function lerp2(a, b, s) {
    return a + (b - a) * s;
  }
  function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
    for (let z = 0; z <= subdivisionsDown; z++) {
      const uBack = x / (subdivisionsThick - 1);
      const v = z / subdivisionsDown;
      const xBack = (uBack - 0.5) * 2;
      const angle = (startOffset + v * offsetRange) * Math.PI;
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const radius = lerp2(verticalRadius, arcRadius, s);
      const px = xBack * thickness;
      const py = c * verticalRadius;
      const pz = s * radius;
      positions.push(px, py, pz);
      const n = add(multiply([0, s, c], normalMult), normalAdd);
      normals.push(n);
      texcoords.push(uBack * uMult + uAdd, v);
    }
  }
  for (let x = 0; x < subdivisionsThick; x++) {
    const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
    createArc(outerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
    createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
    createArc(innerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
    createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
  }
  const indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
  function createSurface(leftArcOffset, rightArcOffset) {
    for (let z = 0; z < subdivisionsDown; ++z) {
      indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
      indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
    }
  }
  const numVerticesDown = subdivisionsDown + 1;
  createSurface(numVerticesDown * 0, numVerticesDown * 4);
  createSurface(numVerticesDown * 5, numVerticesDown * 7);
  createSurface(numVerticesDown * 6, numVerticesDown * 2);
  createSurface(numVerticesDown * 3, numVerticesDown * 1);
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
  return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
}
function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
  if (radialSubdivisions < 3) {
    throw new Error("radialSubdivisions must be 3 or greater");
  }
  if (bodySubdivisions < 3) {
    throw new Error("verticalSubdivisions must be 3 or greater");
  }
  startAngle = startAngle || 0;
  endAngle = endAngle || Math.PI * 2;
  const range = endAngle - startAngle;
  const radialParts = radialSubdivisions + 1;
  const bodyParts = bodySubdivisions + 1;
  const numVertices = radialParts * bodyParts;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
  for (let slice = 0; slice < bodyParts; ++slice) {
    const v = slice / bodySubdivisions;
    const sliceAngle = v * Math.PI * 2;
    const sliceSin = Math.sin(sliceAngle);
    const ringRadius = radius + sliceSin * thickness;
    const ny = Math.cos(sliceAngle);
    const y = ny * thickness;
    for (let ring = 0; ring < radialParts; ++ring) {
      const u = ring / radialSubdivisions;
      const ringAngle = startAngle + u * range;
      const xSin = Math.sin(ringAngle);
      const zCos = Math.cos(ringAngle);
      const x = xSin * ringRadius;
      const z = zCos * ringRadius;
      const nx = xSin * sliceSin;
      const nz = zCos * sliceSin;
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      texcoords.push(u, 1 - v);
    }
  }
  for (let slice = 0; slice < bodySubdivisions; ++slice) {
    for (let ring = 0; ring < radialSubdivisions; ++ring) {
      const nextRingIndex = 1 + ring;
      const nextSliceIndex = 1 + slice;
      indices.push(radialParts * slice + ring, radialParts * nextSliceIndex + ring, radialParts * slice + nextRingIndex);
      indices.push(radialParts * nextSliceIndex + ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice + nextRingIndex);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
  if (divisions < 3) {
    throw new Error("divisions must be at least 3");
  }
  stacks = stacks ? stacks : 1;
  stackPower = stackPower ? stackPower : 1;
  innerRadius = innerRadius ? innerRadius : 0;
  const numVertices = (divisions + 1) * (stacks + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
  let firstIndex = 0;
  const radiusSpan = radius - innerRadius;
  const pointsPerStack = divisions + 1;
  for (let stack = 0; stack <= stacks; ++stack) {
    const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
    for (let i = 0; i <= divisions; ++i) {
      const theta = 2 * Math.PI * i / divisions;
      const x = stackRadius * Math.cos(theta);
      const z = stackRadius * Math.sin(theta);
      positions.push(x, 0, z);
      normals.push(0, 1, 0);
      texcoords.push(1 - i / divisions, stack / stacks);
      if (stack > 0 && i !== divisions) {
        const a = firstIndex + (i + 1);
        const b = firstIndex + i;
        const c = firstIndex + i - pointsPerStack;
        const d = firstIndex + (i + 1) - pointsPerStack;
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }
    firstIndex += divisions + 1;
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function randInt(range) {
  return Math.random() * range | 0;
}
function makeRandomVertexColors(vertices, options) {
  options = options || {};
  const numElements = vertices.position.numElements;
  const vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
  const rand = options.rand || function(ndx, channel) {
    return channel < 3 ? randInt(256) : 255;
  };
  vertices.color = vColors;
  if (vertices.indices) {
    for (let ii = 0; ii < numElements; ++ii) {
      vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    }
  } else {
    const numVertsPerColor = options.vertsPerColor || 3;
    const numSets = numElements / numVertsPerColor;
    for (let ii = 0; ii < numSets; ++ii) {
      const color = [rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3)];
      for (let jj = 0; jj < numVertsPerColor; ++jj) {
        vColors.push(color);
      }
    }
  }
  return vertices;
}
function createBufferFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
    return createBuffersFromArrays(gl, arrays);
  };
}
function createBufferInfoFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
    return createBufferInfoFromArrays(gl, arrays);
  };
}
const arraySpecPropertyNames = [
  "numComponents",
  "size",
  "type",
  "normalize",
  "stride",
  "offset",
  "attrib",
  "name",
  "attribName"
];
function copyElements(src, dst, dstNdx, offset) {
  offset = offset || 0;
  const length2 = src.length;
  for (let ii = 0; ii < length2; ++ii) {
    dst[dstNdx + ii] = src[ii] + offset;
  }
}
function createArrayOfSameType(srcArray, length2) {
  const arraySrc = getArray$1(srcArray);
  const newArray = new arraySrc.constructor(length2);
  let newArraySpec = newArray;
  if (arraySrc.numComponents && arraySrc.numElements) {
    augmentTypedArray(newArray, arraySrc.numComponents);
  }
  if (srcArray.data) {
    newArraySpec = {
      data: newArray
    };
    copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
  }
  return newArraySpec;
}
function concatVertices(arrayOfArrays) {
  const names = {};
  let baseName;
  for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
    const arrays = arrayOfArrays[ii];
    Object.keys(arrays).forEach(function(name) {
      if (!names[name]) {
        names[name] = [];
      }
      if (!baseName && name !== "indices") {
        baseName = name;
      }
      const arrayInfo = arrays[name];
      const numComponents = getNumComponents$1(arrayInfo, name);
      const array = getArray$1(arrayInfo);
      const numElements = array.length / numComponents;
      names[name].push(numElements);
    });
  }
  function getLengthOfCombinedArrays(name) {
    let length2 = 0;
    let arraySpec;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray$1(arrayInfo);
      length2 += array.length;
      if (!arraySpec || arrayInfo.data) {
        arraySpec = arrayInfo;
      }
    }
    return {
      length: length2,
      spec: arraySpec
    };
  }
  function copyArraysToNewArray(name, base2, newArray) {
    let baseIndex = 0;
    let offset = 0;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray$1(arrayInfo);
      if (name === "indices") {
        copyElements(array, newArray, offset, baseIndex);
        baseIndex += base2[ii];
      } else {
        copyElements(array, newArray, offset);
      }
      offset += array.length;
    }
  }
  const base = names[baseName];
  const newArrays = {};
  Object.keys(names).forEach(function(name) {
    const info = getLengthOfCombinedArrays(name);
    const newArraySpec = createArrayOfSameType(info.spec, info.length);
    copyArraysToNewArray(name, base, getArray$1(newArraySpec));
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}
function duplicateVertices(arrays) {
  const newArrays = {};
  Object.keys(arrays).forEach(function(name) {
    const arraySpec = arrays[name];
    const srcArray = getArray$1(arraySpec);
    const newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
    copyElements(srcArray, getArray$1(newArraySpec), 0);
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}
const create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
const create3DFBuffers = createBufferFunc(create3DFVertices);
const createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
const createCubeBuffers = createBufferFunc(createCubeVertices);
const createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
const createPlaneBuffers = createBufferFunc(createPlaneVertices);
const createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
const createSphereBuffers = createBufferFunc(createSphereVertices);
const createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
const createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
const createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
const createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
const createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
const createCrescentBuffers = createBufferFunc(createCrescentVertices);
const createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
const createCylinderBuffers = createBufferFunc(createCylinderVertices);
const createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
const createTorusBuffers = createBufferFunc(createTorusVertices);
const createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
const createDiscBuffers = createBufferFunc(createDiscVertices);
const createCresentBufferInfo = createCrescentBufferInfo;
const createCresentBuffers = createCrescentBuffers;
const createCresentVertices = createCrescentVertices;
var primitives = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  create3DFBufferInfo,
  create3DFBuffers,
  create3DFVertices,
  createAugmentedTypedArray,
  createCubeBufferInfo,
  createCubeBuffers,
  createCubeVertices,
  createPlaneBufferInfo,
  createPlaneBuffers,
  createPlaneVertices,
  createSphereBufferInfo,
  createSphereBuffers,
  createSphereVertices,
  createTruncatedConeBufferInfo,
  createTruncatedConeBuffers,
  createTruncatedConeVertices,
  createXYQuadBufferInfo,
  createXYQuadBuffers,
  createXYQuadVertices,
  createCresentBufferInfo,
  createCresentBuffers,
  createCresentVertices,
  createCrescentBufferInfo,
  createCrescentBuffers,
  createCrescentVertices,
  createCylinderBufferInfo,
  createCylinderBuffers,
  createCylinderVertices,
  createTorusBufferInfo,
  createTorusBuffers,
  createTorusVertices,
  createDiscBufferInfo,
  createDiscBuffers,
  createDiscVertices,
  deindexVertices,
  flattenNormals,
  makeRandomVertexColors,
  reorientDirections,
  reorientNormals,
  reorientPositions,
  reorientVertices,
  concatVertices,
  duplicateVertices
});
function isWebGL2(gl) {
  return !!gl.texStorage2D;
}
function isWebGL1(gl) {
  return !gl.texStorage2D;
}
const glEnumToString = function() {
  const haveEnumsForType = {};
  const enums = {};
  function addEnums(gl) {
    const type = gl.constructor.name;
    if (!haveEnumsForType[type]) {
      for (const key in gl) {
        if (typeof gl[key] === "number") {
          const existing = enums[gl[key]];
          enums[gl[key]] = existing ? `${existing} | ${key}` : key;
        }
      }
      haveEnumsForType[type] = true;
    }
  }
  return function glEnumToString2(gl, value) {
    addEnums(gl);
    return enums[value] || (typeof value === "number" ? `0x${value.toString(16)}` : value);
  };
}();
var utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  glEnumToString,
  isWebGL1,
  isWebGL2
});
const defaults$1 = {
  textureColor: new Uint8Array([128, 192, 255, 255]),
  textureOptions: {},
  crossOrigin: void 0
};
const isArrayBuffer$1 = isArrayBuffer;
const getShared2DContext = function() {
  let s_ctx;
  return function getShared2DContext2() {
    s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
    return s_ctx;
  };
}();
const ALPHA = 6406;
const RGB = 6407;
const RGBA = 6408;
const LUMINANCE = 6409;
const LUMINANCE_ALPHA = 6410;
const DEPTH_COMPONENT = 6402;
const DEPTH_STENCIL = 34041;
const CLAMP_TO_EDGE = 33071;
const NEAREST = 9728;
const LINEAR = 9729;
const TEXTURE_2D = 3553;
const TEXTURE_CUBE_MAP = 34067;
const TEXTURE_3D = 32879;
const TEXTURE_2D_ARRAY = 35866;
const TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
const TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
const TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
const TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
const TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
const TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
const TEXTURE_MIN_FILTER = 10241;
const TEXTURE_MAG_FILTER = 10240;
const TEXTURE_WRAP_S = 10242;
const TEXTURE_WRAP_T = 10243;
const TEXTURE_WRAP_R = 32882;
const TEXTURE_MIN_LOD = 33082;
const TEXTURE_MAX_LOD = 33083;
const TEXTURE_BASE_LEVEL = 33084;
const TEXTURE_MAX_LEVEL = 33085;
const UNPACK_ALIGNMENT = 3317;
const UNPACK_ROW_LENGTH = 3314;
const UNPACK_IMAGE_HEIGHT = 32878;
const UNPACK_SKIP_PIXELS = 3316;
const UNPACK_SKIP_ROWS = 3315;
const UNPACK_SKIP_IMAGES = 32877;
const UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
const UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
const UNPACK_FLIP_Y_WEBGL = 37440;
const R8 = 33321;
const R8_SNORM = 36756;
const R16F = 33325;
const R32F = 33326;
const R8UI = 33330;
const R8I = 33329;
const RG16UI = 33338;
const RG16I = 33337;
const RG32UI = 33340;
const RG32I = 33339;
const RG8 = 33323;
const RG8_SNORM = 36757;
const RG16F = 33327;
const RG32F = 33328;
const RG8UI = 33336;
const RG8I = 33335;
const R16UI = 33332;
const R16I = 33331;
const R32UI = 33334;
const R32I = 33333;
const RGB8 = 32849;
const SRGB8 = 35905;
const RGB565 = 36194;
const RGB8_SNORM = 36758;
const R11F_G11F_B10F = 35898;
const RGB9_E5 = 35901;
const RGB16F = 34843;
const RGB32F = 34837;
const RGB8UI = 36221;
const RGB8I = 36239;
const RGB16UI = 36215;
const RGB16I = 36233;
const RGB32UI = 36209;
const RGB32I = 36227;
const RGBA8 = 32856;
const SRGB8_ALPHA8 = 35907;
const RGBA8_SNORM = 36759;
const RGB5_A1 = 32855;
const RGBA4 = 32854;
const RGB10_A2 = 32857;
const RGBA16F = 34842;
const RGBA32F = 34836;
const RGBA8UI = 36220;
const RGBA8I = 36238;
const RGB10_A2UI = 36975;
const RGBA16UI = 36214;
const RGBA16I = 36232;
const RGBA32I = 36226;
const RGBA32UI = 36208;
const DEPTH_COMPONENT16 = 33189;
const DEPTH_COMPONENT24 = 33190;
const DEPTH_COMPONENT32F = 36012;
const DEPTH32F_STENCIL8 = 36013;
const DEPTH24_STENCIL8 = 35056;
const BYTE$2 = 5120;
const UNSIGNED_BYTE$2 = 5121;
const SHORT$2 = 5122;
const UNSIGNED_SHORT$2 = 5123;
const INT$2 = 5124;
const UNSIGNED_INT$2 = 5125;
const FLOAT$2 = 5126;
const UNSIGNED_SHORT_4_4_4_4$1 = 32819;
const UNSIGNED_SHORT_5_5_5_1$1 = 32820;
const UNSIGNED_SHORT_5_6_5$1 = 33635;
const HALF_FLOAT$1 = 5131;
const HALF_FLOAT_OES = 36193;
const UNSIGNED_INT_2_10_10_10_REV$1 = 33640;
const UNSIGNED_INT_10F_11F_11F_REV$1 = 35899;
const UNSIGNED_INT_5_9_9_9_REV$1 = 35902;
const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 36269;
const UNSIGNED_INT_24_8$1 = 34042;
const RG = 33319;
const RG_INTEGER = 33320;
const RED = 6403;
const RED_INTEGER = 36244;
const RGB_INTEGER = 36248;
const RGBA_INTEGER = 36249;
const formatInfo = {};
{
  const f = formatInfo;
  f[ALPHA] = {numColorComponents: 1};
  f[LUMINANCE] = {numColorComponents: 1};
  f[LUMINANCE_ALPHA] = {numColorComponents: 2};
  f[RGB] = {numColorComponents: 3};
  f[RGBA] = {numColorComponents: 4};
  f[RED] = {numColorComponents: 1};
  f[RED_INTEGER] = {numColorComponents: 1};
  f[RG] = {numColorComponents: 2};
  f[RG_INTEGER] = {numColorComponents: 2};
  f[RGB] = {numColorComponents: 3};
  f[RGB_INTEGER] = {numColorComponents: 3};
  f[RGBA] = {numColorComponents: 4};
  f[RGBA_INTEGER] = {numColorComponents: 4};
  f[DEPTH_COMPONENT] = {numColorComponents: 1};
  f[DEPTH_STENCIL] = {numColorComponents: 2};
}
let s_textureInternalFormatInfo;
function getTextureInternalFormatInfo(internalFormat) {
  if (!s_textureInternalFormatInfo) {
    const t = {};
    t[ALPHA] = {textureFormat: ALPHA, colorRenderable: true, textureFilterable: true, bytesPerElement: [1, 2, 2, 4], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2]};
    t[LUMINANCE] = {textureFormat: LUMINANCE, colorRenderable: true, textureFilterable: true, bytesPerElement: [1, 2, 2, 4], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2]};
    t[LUMINANCE_ALPHA] = {textureFormat: LUMINANCE_ALPHA, colorRenderable: true, textureFilterable: true, bytesPerElement: [2, 4, 4, 8], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2]};
    t[RGB] = {textureFormat: RGB, colorRenderable: true, textureFilterable: true, bytesPerElement: [3, 6, 6, 12, 2], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2, UNSIGNED_SHORT_5_6_5$1]};
    t[RGBA] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4, 8, 8, 16, 2, 2], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2, UNSIGNED_SHORT_4_4_4_4$1, UNSIGNED_SHORT_5_5_5_1$1]};
    t[DEPTH_COMPONENT] = {textureFormat: DEPTH_COMPONENT, colorRenderable: true, textureFilterable: false, bytesPerElement: [2, 4], type: [UNSIGNED_INT$2, UNSIGNED_SHORT$2]};
    t[R8] = {textureFormat: RED, colorRenderable: true, textureFilterable: true, bytesPerElement: [1], type: [UNSIGNED_BYTE$2]};
    t[R8_SNORM] = {textureFormat: RED, colorRenderable: false, textureFilterable: true, bytesPerElement: [1], type: [BYTE$2]};
    t[R16F] = {textureFormat: RED, colorRenderable: false, textureFilterable: true, bytesPerElement: [4, 2], type: [FLOAT$2, HALF_FLOAT$1]};
    t[R32F] = {textureFormat: RED, colorRenderable: false, textureFilterable: false, bytesPerElement: [4], type: [FLOAT$2]};
    t[R8UI] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [1], type: [UNSIGNED_BYTE$2]};
    t[R8I] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [1], type: [BYTE$2]};
    t[R16UI] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [2], type: [UNSIGNED_SHORT$2]};
    t[R16I] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [2], type: [SHORT$2]};
    t[R32UI] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_INT$2]};
    t[R32I] = {textureFormat: RED_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [INT$2]};
    t[RG8] = {textureFormat: RG, colorRenderable: true, textureFilterable: true, bytesPerElement: [2], type: [UNSIGNED_BYTE$2]};
    t[RG8_SNORM] = {textureFormat: RG, colorRenderable: false, textureFilterable: true, bytesPerElement: [2], type: [BYTE$2]};
    t[RG16F] = {textureFormat: RG, colorRenderable: false, textureFilterable: true, bytesPerElement: [8, 4], type: [FLOAT$2, HALF_FLOAT$1]};
    t[RG32F] = {textureFormat: RG, colorRenderable: false, textureFilterable: false, bytesPerElement: [8], type: [FLOAT$2]};
    t[RG8UI] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [2], type: [UNSIGNED_BYTE$2]};
    t[RG8I] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [2], type: [BYTE$2]};
    t[RG16UI] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_SHORT$2]};
    t[RG16I] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [SHORT$2]};
    t[RG32UI] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [8], type: [UNSIGNED_INT$2]};
    t[RG32I] = {textureFormat: RG_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [8], type: [INT$2]};
    t[RGB8] = {textureFormat: RGB, colorRenderable: true, textureFilterable: true, bytesPerElement: [3], type: [UNSIGNED_BYTE$2]};
    t[SRGB8] = {textureFormat: RGB, colorRenderable: false, textureFilterable: true, bytesPerElement: [3], type: [UNSIGNED_BYTE$2]};
    t[RGB565] = {textureFormat: RGB, colorRenderable: true, textureFilterable: true, bytesPerElement: [3, 2], type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_5_6_5$1]};
    t[RGB8_SNORM] = {textureFormat: RGB, colorRenderable: false, textureFilterable: true, bytesPerElement: [3], type: [BYTE$2]};
    t[R11F_G11F_B10F] = {textureFormat: RGB, colorRenderable: false, textureFilterable: true, bytesPerElement: [12, 6, 4], type: [FLOAT$2, HALF_FLOAT$1, UNSIGNED_INT_10F_11F_11F_REV$1]};
    t[RGB9_E5] = {textureFormat: RGB, colorRenderable: false, textureFilterable: true, bytesPerElement: [12, 6, 4], type: [FLOAT$2, HALF_FLOAT$1, UNSIGNED_INT_5_9_9_9_REV$1]};
    t[RGB16F] = {textureFormat: RGB, colorRenderable: false, textureFilterable: true, bytesPerElement: [12, 6], type: [FLOAT$2, HALF_FLOAT$1]};
    t[RGB32F] = {textureFormat: RGB, colorRenderable: false, textureFilterable: false, bytesPerElement: [12], type: [FLOAT$2]};
    t[RGB8UI] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [3], type: [UNSIGNED_BYTE$2]};
    t[RGB8I] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [3], type: [BYTE$2]};
    t[RGB16UI] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [6], type: [UNSIGNED_SHORT$2]};
    t[RGB16I] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [6], type: [SHORT$2]};
    t[RGB32UI] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [12], type: [UNSIGNED_INT$2]};
    t[RGB32I] = {textureFormat: RGB_INTEGER, colorRenderable: false, textureFilterable: false, bytesPerElement: [12], type: [INT$2]};
    t[RGBA8] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4], type: [UNSIGNED_BYTE$2]};
    t[SRGB8_ALPHA8] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4], type: [UNSIGNED_BYTE$2]};
    t[RGBA8_SNORM] = {textureFormat: RGBA, colorRenderable: false, textureFilterable: true, bytesPerElement: [4], type: [BYTE$2]};
    t[RGB5_A1] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4, 2, 4], type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_5_5_5_1$1, UNSIGNED_INT_2_10_10_10_REV$1]};
    t[RGBA4] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4, 2], type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_4_4_4_4$1]};
    t[RGB10_A2] = {textureFormat: RGBA, colorRenderable: true, textureFilterable: true, bytesPerElement: [4], type: [UNSIGNED_INT_2_10_10_10_REV$1]};
    t[RGBA16F] = {textureFormat: RGBA, colorRenderable: false, textureFilterable: true, bytesPerElement: [16, 8], type: [FLOAT$2, HALF_FLOAT$1]};
    t[RGBA32F] = {textureFormat: RGBA, colorRenderable: false, textureFilterable: false, bytesPerElement: [16], type: [FLOAT$2]};
    t[RGBA8UI] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_BYTE$2]};
    t[RGBA8I] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [BYTE$2]};
    t[RGB10_A2UI] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_INT_2_10_10_10_REV$1]};
    t[RGBA16UI] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [8], type: [UNSIGNED_SHORT$2]};
    t[RGBA16I] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [8], type: [SHORT$2]};
    t[RGBA32I] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [16], type: [INT$2]};
    t[RGBA32UI] = {textureFormat: RGBA_INTEGER, colorRenderable: true, textureFilterable: false, bytesPerElement: [16], type: [UNSIGNED_INT$2]};
    t[DEPTH_COMPONENT16] = {textureFormat: DEPTH_COMPONENT, colorRenderable: true, textureFilterable: false, bytesPerElement: [2, 4], type: [UNSIGNED_SHORT$2, UNSIGNED_INT$2]};
    t[DEPTH_COMPONENT24] = {textureFormat: DEPTH_COMPONENT, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_INT$2]};
    t[DEPTH_COMPONENT32F] = {textureFormat: DEPTH_COMPONENT, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [FLOAT$2]};
    t[DEPTH24_STENCIL8] = {textureFormat: DEPTH_STENCIL, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [UNSIGNED_INT_24_8$1]};
    t[DEPTH32F_STENCIL8] = {textureFormat: DEPTH_STENCIL, colorRenderable: true, textureFilterable: false, bytesPerElement: [4], type: [FLOAT_32_UNSIGNED_INT_24_8_REV$1]};
    Object.keys(t).forEach(function(internalFormat2) {
      const info = t[internalFormat2];
      info.bytesPerElementMap = {};
      info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
        const type = info.type[ndx];
        info.bytesPerElementMap[type] = bytesPerElement;
      });
    });
    s_textureInternalFormatInfo = t;
  }
  return s_textureInternalFormatInfo[internalFormat];
}
function getBytesPerElementForInternalFormat(internalFormat, type) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  const bytesPerElement = info.bytesPerElementMap[type];
  if (bytesPerElement === void 0) {
    throw "unknown internal format";
  }
  return bytesPerElement;
}
function getFormatAndTypeForInternalFormat(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return {
    format: info.textureFormat,
    type: info.type[0]
  };
}
function isPowerOf2(value) {
  return (value & value - 1) === 0;
}
function canGenerateMipmap(gl, width, height, internalFormat) {
  if (!isWebGL2(gl)) {
    return isPowerOf2(width) && isPowerOf2(height);
  }
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return info.colorRenderable && info.textureFilterable;
}
function canFilter(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return info.textureFilterable;
}
function getNumComponentsForFormat(format) {
  const info = formatInfo[format];
  if (!info) {
    throw "unknown format: " + format;
  }
  return info.numColorComponents;
}
function getTextureTypeForArrayType(gl, src, defaultType) {
  if (isArrayBuffer$1(src)) {
    return getGLTypeForTypedArray(src);
  }
  return defaultType || UNSIGNED_BYTE$2;
}
function guessDimensions(gl, target, width, height, numElements) {
  if (numElements % 1 !== 0) {
    throw "can't guess dimensions";
  }
  if (!width && !height) {
    const size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
    if (size % 1 === 0) {
      width = size;
      height = size;
    } else {
      width = numElements;
      height = 1;
    }
  } else if (!height) {
    height = numElements / width;
    if (height % 1) {
      throw "can't guess dimensions";
    }
  } else if (!width) {
    width = numElements / height;
    if (width % 1) {
      throw "can't guess dimensions";
    }
  }
  return {
    width,
    height
  };
}
function setDefaultTextureColor(color) {
  defaults$1.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}
function setDefaults$1(newDefaults) {
  copyExistingProperties(newDefaults, defaults$1);
  if (newDefaults.textureColor) {
    setDefaultTextureColor(newDefaults.textureColor);
  }
}
function setPackState(gl, options) {
  if (options.colorspaceConversion !== void 0) {
    gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
  }
  if (options.premultiplyAlpha !== void 0) {
    gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
  }
  if (options.flipY !== void 0) {
    gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
  }
}
function setSkipStateToDefault(gl) {
  gl.pixelStorei(UNPACK_ALIGNMENT, 4);
  if (isWebGL2(gl)) {
    gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
    gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
    gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
    gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
    gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
  }
}
function setTextureSamplerParameters(gl, target, parameteriFn, options) {
  if (options.minMag) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
  }
  if (options.min) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
  }
  if (options.mag) {
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
  }
  if (options.wrap) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
    if (target === TEXTURE_3D || isSampler(gl, target)) {
      parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
    }
  }
  if (options.wrapR) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
  }
  if (options.wrapS) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
  }
  if (options.wrapT) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
  }
  if (options.minLod) {
    parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
  }
  if (options.maxLod) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
  }
  if (options.baseLevel) {
    parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
  }
  if (options.maxLevel) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
  }
}
function setTextureParameters(gl, tex, options) {
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}
function setSamplerParameters(gl, sampler, options) {
  setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}
function createSampler(gl, options) {
  const sampler = gl.createSampler();
  setSamplerParameters(gl, sampler, options);
  return sampler;
}
function createSamplers(gl, samplerOptions) {
  const samplers = {};
  Object.keys(samplerOptions).forEach(function(name) {
    samplers[name] = createSampler(gl, samplerOptions[name]);
  });
  return samplers;
}
function make1Pixel(color) {
  color = color || defaults$1.textureColor;
  if (isArrayBuffer$1(color)) {
    return color;
  }
  return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}
function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
  options = options || defaults$1.textureOptions;
  internalFormat = internalFormat || RGBA;
  const target = options.target || TEXTURE_2D;
  width = width || options.width;
  height = height || options.height;
  gl.bindTexture(target, tex);
  if (canGenerateMipmap(gl, width, height, internalFormat)) {
    gl.generateMipmap(target);
  } else {
    const filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
    gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
  }
}
function shouldAutomaticallySetTextureFilteringForSize(options) {
  return options.auto === true || options.auto === void 0 && options.level === void 0;
}
function getCubeFaceOrder(gl, options) {
  options = options || {};
  return options.cubeFaceOrder || [
    TEXTURE_CUBE_MAP_POSITIVE_X,
    TEXTURE_CUBE_MAP_NEGATIVE_X,
    TEXTURE_CUBE_MAP_POSITIVE_Y,
    TEXTURE_CUBE_MAP_NEGATIVE_Y,
    TEXTURE_CUBE_MAP_POSITIVE_Z,
    TEXTURE_CUBE_MAP_NEGATIVE_Z
  ];
}
function getCubeFacesWithNdx(gl, options) {
  const faces = getCubeFaceOrder(gl, options);
  const facesWithNdx = faces.map(function(face, ndx) {
    return {face, ndx};
  });
  facesWithNdx.sort(function(a, b) {
    return a.face - b.face;
  });
  return facesWithNdx;
}
function setTextureFromElement(gl, tex, element, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  const level = options.level || 0;
  let width = element.width;
  let height = element.height;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  setPackState(gl, options);
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP) {
    const imgWidth = element.width;
    const imgHeight = element.height;
    let size;
    let slices;
    if (imgWidth / 6 === imgHeight) {
      size = imgHeight;
      slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
    } else if (imgHeight / 6 === imgWidth) {
      size = imgWidth;
      slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
    } else if (imgWidth / 3 === imgHeight / 2) {
      size = imgWidth / 3;
      slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
    } else if (imgWidth / 2 === imgHeight / 3) {
      size = imgWidth / 2;
      slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
    } else {
      throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
    }
    const ctx = getShared2DContext();
    if (ctx) {
      ctx.canvas.width = size;
      ctx.canvas.height = size;
      width = size;
      height = size;
      getCubeFacesWithNdx(gl, options).forEach(function(f) {
        const xOffset = slices[f.ndx * 2 + 0] * size;
        const yOffset = slices[f.ndx * 2 + 1] * size;
        ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
        gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
      });
      ctx.canvas.width = 1;
      ctx.canvas.height = 1;
    } else if (typeof createImageBitmap !== "undefined") {
      width = size;
      height = size;
      getCubeFacesWithNdx(gl, options).forEach(function(f) {
        const xOffset = slices[f.ndx * 2 + 0] * size;
        const yOffset = slices[f.ndx * 2 + 1] * size;
        gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
        createImageBitmap(element, xOffset, yOffset, size, size, {
          premultiplyAlpha: "none",
          colorSpaceConversion: "none"
        }).then(function(imageBitmap) {
          setPackState(gl, options);
          gl.bindTexture(target, tex);
          gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
            setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
          }
        });
      });
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    const smallest = Math.min(element.width, element.height);
    const largest = Math.max(element.width, element.height);
    const depth = largest / smallest;
    if (depth % 1 !== 0) {
      throw "can not compute 3D dimensions of element";
    }
    const xMult = element.width === largest ? 1 : 0;
    const yMult = element.height === largest ? 1 : 0;
    gl.pixelStorei(UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
    gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
    gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
    gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
    for (let d = 0; d < depth; ++d) {
      const srcX = d * smallest * xMult;
      const srcY = d * smallest * yMult;
      gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
      gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
      gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
    }
    setSkipStateToDefault(gl);
  } else {
    gl.texImage2D(target, level, internalFormat, format, type, element);
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
  }
  setTextureParameters(gl, tex, options);
}
function noop() {
}
function urlIsSameOrigin(url) {
  if (typeof document !== "undefined") {
    const a = document.createElement("a");
    a.href = url;
    return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
  } else {
    const localOrigin = new URL(location.href).origin;
    const urlOrigin = new URL(url, location.href).origin;
    return urlOrigin === localOrigin;
  }
}
function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
  return crossOrigin === void 0 && !urlIsSameOrigin(url) ? "anonymous" : crossOrigin;
}
function loadImage(url, crossOrigin, callback) {
  callback = callback || noop;
  let img;
  crossOrigin = crossOrigin !== void 0 ? crossOrigin : defaults$1.crossOrigin;
  crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
  if (typeof Image !== "undefined") {
    img = new Image();
    if (crossOrigin !== void 0) {
      img.crossOrigin = crossOrigin;
    }
    const clearEventHandlers = function clearEventHandlers2() {
      img.removeEventListener("error", onError);
      img.removeEventListener("load", onLoad);
      img = null;
    };
    const onError = function onError2() {
      const msg = "couldn't load image: " + url;
      error(msg);
      callback(msg, img);
      clearEventHandlers();
    };
    const onLoad = function onLoad2() {
      callback(null, img);
      clearEventHandlers();
    };
    img.addEventListener("error", onError);
    img.addEventListener("load", onLoad);
    img.src = url;
    return img;
  } else if (typeof ImageBitmap !== "undefined") {
    let err;
    let bm;
    const cb = function cb2() {
      callback(err, bm);
    };
    const options = {};
    if (crossOrigin) {
      options.mode = "cors";
    }
    fetch(url, options).then(function(response) {
      if (!response.ok) {
        throw response;
      }
      return response.blob();
    }).then(function(blob) {
      return createImageBitmap(blob, {
        premultiplyAlpha: "none",
        colorSpaceConversion: "none"
      });
    }).then(function(bitmap) {
      bm = bitmap;
      setTimeout(cb);
    }).catch(function(e) {
      err = e;
      setTimeout(cb);
    });
    img = null;
  }
  return img;
}
function isTexImageSource(obj) {
  return typeof ImageBitmap !== "undefined" && obj instanceof ImageBitmap || typeof ImageData !== "undefined" && obj instanceof ImageData || typeof HTMLElement !== "undefined" && obj instanceof HTMLElement;
}
function loadAndUseImage(obj, crossOrigin, callback) {
  if (isTexImageSource(obj)) {
    setTimeout(function() {
      callback(null, obj);
    });
    return obj;
  }
  return loadImage(obj, crossOrigin, callback);
}
function setTextureTo1PixelColor(gl, tex, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  if (options.color === false) {
    return;
  }
  const color = make1Pixel(options.color);
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
  } else {
    gl.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
  }
}
function loadTextureFromUrl(gl, tex, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  setTextureTo1PixelColor(gl, tex, options);
  options = Object.assign({}, options);
  const img = loadAndUseImage(options.src, options.crossOrigin, function(err, img2) {
    if (err) {
      callback(err, tex, img2);
    } else {
      setTextureFromElement(gl, tex, img2, options);
      callback(null, tex, img2);
    }
  });
  return img;
}
function loadCubemapFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  if (urls.length !== 6) {
    throw "there must be 6 urls for a cubemap";
  }
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$2;
  const target = options.target || TEXTURE_2D;
  if (target !== TEXTURE_CUBE_MAP) {
    throw "target must be TEXTURE_CUBE_MAP";
  }
  setTextureTo1PixelColor(gl, tex, options);
  options = Object.assign({}, options);
  let numToLoad = 6;
  const errors = [];
  const faces = getCubeFaceOrder(gl, options);
  let imgs;
  function uploadImg(faceTarget) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        if (img.width !== img.height) {
          errors.push("cubemap face img is not a square: " + img.src);
        } else {
          setPackState(gl, options);
          gl.bindTexture(target, tex);
          if (numToLoad === 5) {
            getCubeFaceOrder().forEach(function(otherTarget) {
              gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
            });
          } else {
            gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
          }
          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
            gl.generateMipmap(target);
          }
        }
      }
      if (numToLoad === 0) {
        callback(errors.length ? errors : void 0, tex, imgs);
      }
    };
  }
  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
  });
}
function loadSlicesFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$2;
  const target = options.target || TEXTURE_2D_ARRAY;
  if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) {
    throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
  }
  setTextureTo1PixelColor(gl, tex, options);
  options = Object.assign({}, options);
  let numToLoad = urls.length;
  const errors = [];
  let imgs;
  const level = options.level || 0;
  let width = options.width;
  let height = options.height;
  const depth = urls.length;
  let firstImage = true;
  function uploadImg(slice) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        setPackState(gl, options);
        gl.bindTexture(target, tex);
        if (firstImage) {
          firstImage = false;
          width = options.width || img.width;
          height = options.height || img.height;
          gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
          for (let s = 0; s < depth; ++s) {
            gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
          }
        } else {
          let src = img;
          let ctx;
          if (img.width !== width || img.height !== height) {
            ctx = getShared2DContext();
            src = ctx.canvas;
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
          }
          gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
          if (ctx && src === ctx.canvas) {
            ctx.canvas.width = 0;
            ctx.canvas.height = 0;
          }
        }
        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
          gl.generateMipmap(target);
        }
      }
      if (numToLoad === 0) {
        callback(errors.length ? errors : void 0, tex, imgs);
      }
    };
  }
  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
  });
}
function setTextureFromArray(gl, tex, src, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  let width = options.width;
  let height = options.height;
  let depth = options.depth;
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  if (!isArrayBuffer$1(src)) {
    const Type = getTypedArrayTypeForGLType(type);
    src = new Type(src);
  } else if (src instanceof Uint8ClampedArray) {
    src = new Uint8Array(src.buffer);
  }
  const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
  const numElements = src.byteLength / bytesPerElement;
  if (numElements % 1) {
    throw "length wrong size for format: " + glEnumToString(gl, format);
  }
  let dimensions;
  if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    if (!width && !height && !depth) {
      const size = Math.cbrt(numElements);
      if (size % 1 !== 0) {
        throw "can't guess cube size of array of numElements: " + numElements;
      }
      width = size;
      height = size;
      depth = size;
    } else if (width && (!height || !depth)) {
      dimensions = guessDimensions(gl, target, height, depth, numElements / width);
      height = dimensions.width;
      depth = dimensions.height;
    } else if (height && (!width || !depth)) {
      dimensions = guessDimensions(gl, target, width, depth, numElements / height);
      width = dimensions.width;
      depth = dimensions.height;
    } else {
      dimensions = guessDimensions(gl, target, width, height, numElements / depth);
      width = dimensions.width;
      height = dimensions.height;
    }
  } else {
    dimensions = guessDimensions(gl, target, width, height, numElements);
    width = dimensions.width;
    height = dimensions.height;
  }
  setSkipStateToDefault(gl);
  gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
  setPackState(gl, options);
  if (target === TEXTURE_CUBE_MAP) {
    const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
    const faceSize = numElements / 6 * elementsPerElement;
    getCubeFacesWithNdx(gl, options).forEach((f) => {
      const offset = faceSize * f.ndx;
      const data = src.subarray(offset, offset + faceSize);
      gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
    });
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
  } else {
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
  }
  return {
    width,
    height,
    depth,
    type
  };
}
function setEmptyTexture(gl, tex, options) {
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  setPackState(gl, options);
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
  } else {
    gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
  }
}
function createTexture(gl, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  const tex = gl.createTexture();
  const target = options.target || TEXTURE_2D;
  let width = options.width || 1;
  let height = options.height || 1;
  const internalFormat = options.internalFormat || RGBA;
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP) {
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
  }
  let src = options.src;
  if (src) {
    if (typeof src === "function") {
      src = src(gl, options);
    }
    if (typeof src === "string") {
      loadTextureFromUrl(gl, tex, options, callback);
    } else if (isArrayBuffer$1(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer$1(src[0]))) {
      const dimensions = setTextureFromArray(gl, tex, src, options);
      width = dimensions.width;
      height = dimensions.height;
    } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
      if (target === TEXTURE_CUBE_MAP) {
        loadCubemapFromUrls(gl, tex, options, callback);
      } else {
        loadSlicesFromUrls(gl, tex, options, callback);
      }
    } else {
      setTextureFromElement(gl, tex, src, options);
      width = src.width;
      height = src.height;
    }
  } else {
    setEmptyTexture(gl, tex, options);
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
  }
  setTextureParameters(gl, tex, options);
  return tex;
}
function resizeTexture(gl, tex, options, width, height, depth) {
  width = width || options.width;
  height = height || options.height;
  depth = depth || options.depth;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  let type;
  const src = options.src;
  if (!src) {
    type = options.type || formatType.type;
  } else if (isArrayBuffer$1(src) || Array.isArray(src) && typeof src[0] === "number") {
    type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  } else {
    type = options.type || formatType.type;
  }
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
  } else {
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
  }
}
function isAsyncSrc(src) {
  return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
}
function createTextures(gl, textureOptions, callback) {
  callback = callback || noop;
  let numDownloading = 0;
  const errors = [];
  const textures2 = {};
  const images = {};
  function callCallbackIfReady() {
    if (numDownloading === 0) {
      setTimeout(function() {
        callback(errors.length ? errors : void 0, textures2, images);
      }, 0);
    }
  }
  Object.keys(textureOptions).forEach(function(name) {
    const options = textureOptions[name];
    let onLoadFn;
    if (isAsyncSrc(options.src)) {
      onLoadFn = function(err, tex, img) {
        images[name] = img;
        --numDownloading;
        if (err) {
          errors.push(err);
        }
        callCallbackIfReady();
      };
      ++numDownloading;
    }
    textures2[name] = createTexture(gl, options, onLoadFn);
  });
  callCallbackIfReady();
  return textures2;
}
var textures = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setTextureDefaults_: setDefaults$1,
  createSampler,
  createSamplers,
  setSamplerParameters,
  createTexture,
  setEmptyTexture,
  setTextureFromArray,
  loadTextureFromUrl,
  setTextureFromElement,
  setTextureFilteringForSize,
  setTextureParameters,
  setDefaultTextureColor,
  createTextures,
  resizeTexture,
  canGenerateMipmap,
  canFilter,
  getNumComponentsForFormat,
  getBytesPerElementForInternalFormat,
  getFormatAndTypeForInternalFormat
});
const error$1 = error;
const warn$1 = warn;
function getElementById(id) {
  return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
}
const TEXTURE0 = 33984;
const DYNAMIC_DRAW = 35048;
const ARRAY_BUFFER$1 = 34962;
const ELEMENT_ARRAY_BUFFER$1 = 34963;
const UNIFORM_BUFFER = 35345;
const TRANSFORM_FEEDBACK_BUFFER = 35982;
const TRANSFORM_FEEDBACK = 36386;
const COMPILE_STATUS = 35713;
const LINK_STATUS = 35714;
const FRAGMENT_SHADER = 35632;
const VERTEX_SHADER = 35633;
const SEPARATE_ATTRIBS = 35981;
const ACTIVE_UNIFORMS = 35718;
const ACTIVE_ATTRIBUTES = 35721;
const TRANSFORM_FEEDBACK_VARYINGS = 35971;
const ACTIVE_UNIFORM_BLOCKS = 35382;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
const UNIFORM_BLOCK_DATA_SIZE = 35392;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
const FLOAT$3 = 5126;
const FLOAT_VEC2 = 35664;
const FLOAT_VEC3 = 35665;
const FLOAT_VEC4 = 35666;
const INT$3 = 5124;
const INT_VEC2 = 35667;
const INT_VEC3 = 35668;
const INT_VEC4 = 35669;
const BOOL = 35670;
const BOOL_VEC2 = 35671;
const BOOL_VEC3 = 35672;
const BOOL_VEC4 = 35673;
const FLOAT_MAT2 = 35674;
const FLOAT_MAT3 = 35675;
const FLOAT_MAT4 = 35676;
const SAMPLER_2D = 35678;
const SAMPLER_CUBE = 35680;
const SAMPLER_3D = 35679;
const SAMPLER_2D_SHADOW = 35682;
const FLOAT_MAT2x3 = 35685;
const FLOAT_MAT2x4 = 35686;
const FLOAT_MAT3x2 = 35687;
const FLOAT_MAT3x4 = 35688;
const FLOAT_MAT4x2 = 35689;
const FLOAT_MAT4x3 = 35690;
const SAMPLER_2D_ARRAY = 36289;
const SAMPLER_2D_ARRAY_SHADOW = 36292;
const SAMPLER_CUBE_SHADOW = 36293;
const UNSIGNED_INT$3 = 5125;
const UNSIGNED_INT_VEC2 = 36294;
const UNSIGNED_INT_VEC3 = 36295;
const UNSIGNED_INT_VEC4 = 36296;
const INT_SAMPLER_2D = 36298;
const INT_SAMPLER_3D = 36299;
const INT_SAMPLER_CUBE = 36300;
const INT_SAMPLER_2D_ARRAY = 36303;
const UNSIGNED_INT_SAMPLER_2D = 36306;
const UNSIGNED_INT_SAMPLER_3D = 36307;
const UNSIGNED_INT_SAMPLER_CUBE = 36308;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
const TEXTURE_2D$1 = 3553;
const TEXTURE_CUBE_MAP$1 = 34067;
const TEXTURE_3D$1 = 32879;
const TEXTURE_2D_ARRAY$1 = 35866;
const typeMap = {};
function getBindPointForSamplerType(gl, type) {
  return typeMap[type].bindPoint;
}
function floatSetter(gl, location2) {
  return function(v) {
    gl.uniform1f(location2, v);
  };
}
function floatArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1fv(location2, v);
  };
}
function floatVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2fv(location2, v);
  };
}
function floatVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3fv(location2, v);
  };
}
function floatVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4fv(location2, v);
  };
}
function intSetter(gl, location2) {
  return function(v) {
    gl.uniform1i(location2, v);
  };
}
function intArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1iv(location2, v);
  };
}
function intVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2iv(location2, v);
  };
}
function intVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3iv(location2, v);
  };
}
function intVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4iv(location2, v);
  };
}
function uintSetter(gl, location2) {
  return function(v) {
    gl.uniform1ui(location2, v);
  };
}
function uintArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1uiv(location2, v);
  };
}
function uintVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2uiv(location2, v);
  };
}
function uintVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3uiv(location2, v);
  };
}
function uintVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4uiv(location2, v);
  };
}
function floatMat2Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2fv(location2, false, v);
  };
}
function floatMat3Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3fv(location2, false, v);
  };
}
function floatMat4Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4fv(location2, false, v);
  };
}
function floatMat23Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2x3fv(location2, false, v);
  };
}
function floatMat32Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3x2fv(location2, false, v);
  };
}
function floatMat24Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2x4fv(location2, false, v);
  };
}
function floatMat42Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4x2fv(location2, false, v);
  };
}
function floatMat34Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3x4fv(location2, false, v);
  };
}
function floatMat43Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4x3fv(location2, false, v);
  };
}
function samplerSetter(gl, type, unit, location2) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  return isWebGL2(gl) ? function(textureOrPair) {
    let texture;
    let sampler;
    if (isTexture(gl, textureOrPair)) {
      texture = textureOrPair;
      sampler = null;
    } else {
      texture = textureOrPair.texture;
      sampler = textureOrPair.sampler;
    }
    gl.uniform1i(location2, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
    gl.bindSampler(unit, sampler);
  } : function(texture) {
    gl.uniform1i(location2, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
  };
}
function samplerArraySetter(gl, type, unit, location2, size) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  const units = new Int32Array(size);
  for (let ii = 0; ii < size; ++ii) {
    units[ii] = unit + ii;
  }
  return isWebGL2(gl) ? function(textures2) {
    gl.uniform1iv(location2, units);
    textures2.forEach(function(textureOrPair, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      let texture;
      let sampler;
      if (isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.bindSampler(unit, sampler);
      gl.bindTexture(bindPoint, texture);
    });
  } : function(textures2) {
    gl.uniform1iv(location2, units);
    textures2.forEach(function(texture, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      gl.bindTexture(bindPoint, texture);
    });
  };
}
typeMap[FLOAT$3] = {Type: Float32Array, size: 4, setter: floatSetter, arraySetter: floatArraySetter};
typeMap[FLOAT_VEC2] = {Type: Float32Array, size: 8, setter: floatVec2Setter};
typeMap[FLOAT_VEC3] = {Type: Float32Array, size: 12, setter: floatVec3Setter};
typeMap[FLOAT_VEC4] = {Type: Float32Array, size: 16, setter: floatVec4Setter};
typeMap[INT$3] = {Type: Int32Array, size: 4, setter: intSetter, arraySetter: intArraySetter};
typeMap[INT_VEC2] = {Type: Int32Array, size: 8, setter: intVec2Setter};
typeMap[INT_VEC3] = {Type: Int32Array, size: 12, setter: intVec3Setter};
typeMap[INT_VEC4] = {Type: Int32Array, size: 16, setter: intVec4Setter};
typeMap[UNSIGNED_INT$3] = {Type: Uint32Array, size: 4, setter: uintSetter, arraySetter: uintArraySetter};
typeMap[UNSIGNED_INT_VEC2] = {Type: Uint32Array, size: 8, setter: uintVec2Setter};
typeMap[UNSIGNED_INT_VEC3] = {Type: Uint32Array, size: 12, setter: uintVec3Setter};
typeMap[UNSIGNED_INT_VEC4] = {Type: Uint32Array, size: 16, setter: uintVec4Setter};
typeMap[BOOL] = {Type: Uint32Array, size: 4, setter: intSetter, arraySetter: intArraySetter};
typeMap[BOOL_VEC2] = {Type: Uint32Array, size: 8, setter: intVec2Setter};
typeMap[BOOL_VEC3] = {Type: Uint32Array, size: 12, setter: intVec3Setter};
typeMap[BOOL_VEC4] = {Type: Uint32Array, size: 16, setter: intVec4Setter};
typeMap[FLOAT_MAT2] = {Type: Float32Array, size: 16, setter: floatMat2Setter};
typeMap[FLOAT_MAT3] = {Type: Float32Array, size: 36, setter: floatMat3Setter};
typeMap[FLOAT_MAT4] = {Type: Float32Array, size: 64, setter: floatMat4Setter};
typeMap[FLOAT_MAT2x3] = {Type: Float32Array, size: 24, setter: floatMat23Setter};
typeMap[FLOAT_MAT2x4] = {Type: Float32Array, size: 32, setter: floatMat24Setter};
typeMap[FLOAT_MAT3x2] = {Type: Float32Array, size: 24, setter: floatMat32Setter};
typeMap[FLOAT_MAT3x4] = {Type: Float32Array, size: 48, setter: floatMat34Setter};
typeMap[FLOAT_MAT4x2] = {Type: Float32Array, size: 32, setter: floatMat42Setter};
typeMap[FLOAT_MAT4x3] = {Type: Float32Array, size: 48, setter: floatMat43Setter};
typeMap[SAMPLER_2D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1};
typeMap[SAMPLER_CUBE] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1};
typeMap[SAMPLER_3D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1};
typeMap[SAMPLER_2D_SHADOW] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1};
typeMap[SAMPLER_2D_ARRAY] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1};
typeMap[SAMPLER_2D_ARRAY_SHADOW] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1};
typeMap[SAMPLER_CUBE_SHADOW] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1};
typeMap[INT_SAMPLER_2D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1};
typeMap[INT_SAMPLER_3D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1};
typeMap[INT_SAMPLER_CUBE] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1};
typeMap[INT_SAMPLER_2D_ARRAY] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1};
typeMap[UNSIGNED_INT_SAMPLER_2D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1};
typeMap[UNSIGNED_INT_SAMPLER_3D] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1};
typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1};
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1};
function floatAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      switch (b.value.length) {
        case 4:
          gl.vertexAttrib4fv(index, b.value);
          break;
        case 3:
          gl.vertexAttrib3fv(index, b.value);
          break;
        case 2:
          gl.vertexAttrib2fv(index, b.value);
          break;
        case 1:
          gl.vertexAttrib1fv(index, b.value);
          break;
        default:
          throw new Error("the length of a float constant value must be between 1 and 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
      if (b.divisor !== void 0) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function intAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4iv(index, b.value);
      } else {
        throw new Error("The length of an integer constant value must be 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== void 0) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function uintAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4uiv(index, b.value);
      } else {
        throw new Error("The length of an unsigned integer constant value must be 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== void 0) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function matAttribSetter(gl, index, typeInfo) {
  const defaultSize = typeInfo.size;
  const count = typeInfo.count;
  return function(b) {
    gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
    const numComponents = b.size || b.numComponents || defaultSize;
    const size = numComponents / count;
    const type = b.type || FLOAT$3;
    const typeInfo2 = typeMap[type];
    const stride = typeInfo2.size * numComponents;
    const normalize2 = b.normalize || false;
    const offset = b.offset || 0;
    const rowOffset = stride / count;
    for (let i = 0; i < count; ++i) {
      gl.enableVertexAttribArray(index + i);
      gl.vertexAttribPointer(index + i, size, type, normalize2, stride, offset + rowOffset * i);
      if (b.divisor !== void 0) {
        gl.vertexAttribDivisor(index + i, b.divisor);
      }
    }
  };
}
const attrTypeMap = {};
attrTypeMap[FLOAT$3] = {size: 4, setter: floatAttribSetter};
attrTypeMap[FLOAT_VEC2] = {size: 8, setter: floatAttribSetter};
attrTypeMap[FLOAT_VEC3] = {size: 12, setter: floatAttribSetter};
attrTypeMap[FLOAT_VEC4] = {size: 16, setter: floatAttribSetter};
attrTypeMap[INT$3] = {size: 4, setter: intAttribSetter};
attrTypeMap[INT_VEC2] = {size: 8, setter: intAttribSetter};
attrTypeMap[INT_VEC3] = {size: 12, setter: intAttribSetter};
attrTypeMap[INT_VEC4] = {size: 16, setter: intAttribSetter};
attrTypeMap[UNSIGNED_INT$3] = {size: 4, setter: uintAttribSetter};
attrTypeMap[UNSIGNED_INT_VEC2] = {size: 8, setter: uintAttribSetter};
attrTypeMap[UNSIGNED_INT_VEC3] = {size: 12, setter: uintAttribSetter};
attrTypeMap[UNSIGNED_INT_VEC4] = {size: 16, setter: uintAttribSetter};
attrTypeMap[BOOL] = {size: 4, setter: intAttribSetter};
attrTypeMap[BOOL_VEC2] = {size: 8, setter: intAttribSetter};
attrTypeMap[BOOL_VEC3] = {size: 12, setter: intAttribSetter};
attrTypeMap[BOOL_VEC4] = {size: 16, setter: intAttribSetter};
attrTypeMap[FLOAT_MAT2] = {size: 4, setter: matAttribSetter, count: 2};
attrTypeMap[FLOAT_MAT3] = {size: 9, setter: matAttribSetter, count: 3};
attrTypeMap[FLOAT_MAT4] = {size: 16, setter: matAttribSetter, count: 4};
const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = "", lineOffset = 0) {
  const matches = [...log.matchAll(errorRE)];
  const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
    const lineNo = parseInt(m[1]);
    const next = matches[ndx + 1];
    const end = next ? next.index : log.length;
    const msg = log.substring(m.index, end);
    return [lineNo - 1, msg];
  }));
  return src.split("\n").map((line, lineNo) => {
    const err = lineNoToErrorMap.get(lineNo);
    return `${lineNo + 1 + lineOffset}: ${line}${err ? `

^^^ ${err}` : ""}`;
  }).join("\n");
}
const spaceRE = /^[ \t]*\n/;
function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error$1;
  const shader = gl.createShader(shaderType);
  let lineOffset = 0;
  if (spaceRE.test(shaderSource)) {
    lineOffset = 1;
    shaderSource = shaderSource.replace(spaceRE, "");
  }
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
  if (!compiled) {
    const lastError = gl.getShaderInfoLog(shader);
    errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}
Error compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
  let transformFeedbackVaryings;
  let transformFeedbackMode;
  if (typeof opt_locations === "function") {
    opt_errorCallback = opt_locations;
    opt_locations = void 0;
  }
  if (typeof opt_attribs === "function") {
    opt_errorCallback = opt_attribs;
    opt_attribs = void 0;
  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
    if (opt_attribs.errorCallback) {
      return opt_attribs;
    }
    const opt = opt_attribs;
    opt_errorCallback = opt.errorCallback;
    opt_attribs = opt.attribLocations;
    transformFeedbackVaryings = opt.transformFeedbackVaryings;
    transformFeedbackMode = opt.transformFeedbackMode;
  }
  const options = {
    errorCallback: opt_errorCallback || error$1,
    transformFeedbackVaryings,
    transformFeedbackMode
  };
  if (opt_attribs) {
    let attribLocations = {};
    if (Array.isArray(opt_attribs)) {
      opt_attribs.forEach(function(attrib, ndx) {
        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
      });
    } else {
      attribLocations = opt_attribs;
    }
    options.attribLocations = attribLocations;
  }
  return options;
}
const defaultShaderType = [
  "VERTEX_SHADER",
  "FRAGMENT_SHADER"
];
function getShaderTypeFromScriptType(gl, scriptType) {
  if (scriptType.indexOf("frag") >= 0) {
    return FRAGMENT_SHADER;
  } else if (scriptType.indexOf("vert") >= 0) {
    return VERTEX_SHADER;
  }
  return void 0;
}
function deleteShaders(gl, shaders) {
  shaders.forEach(function(shader) {
    gl.deleteShader(shader);
  });
}
function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const realShaders = [];
  const newShaders = [];
  for (let ndx = 0; ndx < shaders.length; ++ndx) {
    let shader = shaders[ndx];
    if (typeof shader === "string") {
      const elem = getElementById(shader);
      const src = elem ? elem.text : shader;
      let type = gl[defaultShaderType[ndx]];
      if (elem && elem.type) {
        type = getShaderTypeFromScriptType(gl, elem.type) || type;
      }
      shader = loadShader(gl, src, type, progOptions.errorCallback);
      newShaders.push(shader);
    }
    if (isShader(gl, shader)) {
      realShaders.push(shader);
    }
  }
  if (realShaders.length !== shaders.length) {
    progOptions.errorCallback("not enough shaders for program");
    deleteShaders(gl, newShaders);
    return null;
  }
  const program = gl.createProgram();
  realShaders.forEach(function(shader) {
    gl.attachShader(program, shader);
  });
  if (progOptions.attribLocations) {
    Object.keys(progOptions.attribLocations).forEach(function(attrib) {
      gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
  }
  let varyings = progOptions.transformFeedbackVaryings;
  if (varyings) {
    if (varyings.attribs) {
      varyings = varyings.attribs;
    }
    if (!Array.isArray(varyings)) {
      varyings = Object.keys(varyings);
    }
    gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
  }
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, LINK_STATUS);
  if (!linked) {
    const lastError = gl.getProgramInfoLog(program);
    progOptions.errorCallback(`${realShaders.map((shader) => {
      const src = addLineNumbersWithError(gl.getShaderSource(shader), "", 0);
      const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
      return `${glEnumToString(gl, type)}
${src}}`;
    }).join("\n")}
Error in program linking: ${lastError}`);
    gl.deleteProgram(program);
    deleteShaders(gl, newShaders);
    return null;
  }
  return program;
}
function createShaderFromScript(gl, scriptId, opt_shaderType, opt_errorCallback) {
  let shaderSource = "";
  const shaderScript = getElementById(scriptId);
  if (!shaderScript) {
    throw new Error(`unknown script element: ${scriptId}`);
  }
  shaderSource = shaderScript.text;
  const shaderType = opt_shaderType || getShaderTypeFromScriptType(gl, shaderScript.type);
  if (!shaderType) {
    throw new Error("unknown shader type");
  }
  return loadShader(gl, shaderSource, shaderType, opt_errorCallback);
}
function createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (let ii = 0; ii < shaderScriptIds.length; ++ii) {
    const shader = createShaderFromScript(gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
    if (!shader) {
      return null;
    }
    shaders.push(shader);
  }
  return createProgram(gl, shaders, progOptions);
}
function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (let ii = 0; ii < shaderSources.length; ++ii) {
    const shader = loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
    if (!shader) {
      return null;
    }
    shaders.push(shader);
  }
  return createProgram(gl, shaders, progOptions);
}
function isBuiltIn(info) {
  const name = info.name;
  return name.startsWith("gl_") || name.startsWith("webgl_");
}
function createUniformSetters(gl, program) {
  let textureUnit = 0;
  function createUniformSetter(program2, uniformInfo, location2) {
    const isArray = uniformInfo.name.endsWith("[0]");
    const type = uniformInfo.type;
    const typeInfo = typeMap[type];
    if (!typeInfo) {
      throw new Error(`unknown type: 0x${type.toString(16)}`);
    }
    let setter;
    if (typeInfo.bindPoint) {
      const unit = textureUnit;
      textureUnit += uniformInfo.size;
      if (isArray) {
        setter = typeInfo.arraySetter(gl, type, unit, location2, uniformInfo.size);
      } else {
        setter = typeInfo.setter(gl, type, unit, location2, uniformInfo.size);
      }
    } else {
      if (typeInfo.arraySetter && isArray) {
        setter = typeInfo.arraySetter(gl, location2);
      } else {
        setter = typeInfo.setter(gl, location2);
      }
    }
    setter.location = location2;
    return setter;
  }
  const uniformSetters = {};
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  for (let ii = 0; ii < numUniforms; ++ii) {
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      continue;
    }
    let name = uniformInfo.name;
    if (name.endsWith("[0]")) {
      name = name.substr(0, name.length - 3);
    }
    const location2 = gl.getUniformLocation(program, uniformInfo.name);
    if (location2) {
      uniformSetters[name] = createUniformSetter(program, uniformInfo, location2);
    }
  }
  return uniformSetters;
}
function createTransformFeedbackInfo(gl, program) {
  const info = {};
  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
  for (let ii = 0; ii < numVaryings; ++ii) {
    const varying = gl.getTransformFeedbackVarying(program, ii);
    info[varying.name] = {
      index: ii,
      type: varying.type,
      size: varying.size
    };
  }
  return info;
}
function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
  if (transformFeedbackInfo.transformFeedbackInfo) {
    transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
  }
  if (bufferInfo.attribs) {
    bufferInfo = bufferInfo.attribs;
  }
  for (const name in bufferInfo) {
    const varying = transformFeedbackInfo[name];
    if (varying) {
      const buf = bufferInfo[name];
      if (buf.offset) {
        gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
      } else {
        gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
      }
    }
  }
}
function createTransformFeedback(gl, programInfo, bufferInfo) {
  const tf = gl.createTransformFeedback();
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
  gl.useProgram(programInfo.program);
  bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
  return tf;
}
function createUniformBlockSpecFromProgram(gl, program) {
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  const uniformData = [];
  const uniformIndices = [];
  for (let ii = 0; ii < numUniforms; ++ii) {
    uniformIndices.push(ii);
    uniformData.push({});
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      break;
    }
    uniformData[ii].name = uniformInfo.name;
  }
  [
    ["UNIFORM_TYPE", "type"],
    ["UNIFORM_SIZE", "size"],
    ["UNIFORM_BLOCK_INDEX", "blockNdx"],
    ["UNIFORM_OFFSET", "offset"]
  ].forEach(function(pair) {
    const pname = pair[0];
    const key = pair[1];
    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
      uniformData[ndx][key] = value;
    });
  });
  const blockSpecs = {};
  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
  for (let ii = 0; ii < numUniformBlocks; ++ii) {
    const name = gl.getActiveUniformBlockName(program, ii);
    const blockSpec = {
      index: gl.getUniformBlockIndex(program, name),
      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
    };
    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
    blockSpecs[name] = blockSpec;
  }
  return {
    blockSpecs,
    uniformData
  };
}
const arraySuffixRE = /\[\d+\]\.$/;
const pad = (v, padding) => ((v + (padding - 1)) / padding | 0) * padding;
function createUniformBlockUniformSetter(view, Type, typeSize, paddedSize, isArray) {
  if (isArray) {
    const numElements = typeSize / Type.BYTES_PER_ELEMENT;
    const numPaddedElements = paddedSize / Type.BYTES_PER_ELEMENT;
    return function(value) {
      let dst = 0;
      for (let src = 0; src < value.length; src += numElements) {
        for (let i = 0; i < numElements; ++i) {
          view[dst + i] = value[src + i];
        }
        dst += numPaddedElements;
      }
    };
  } else {
    return function(value) {
      if (value.length) {
        view.set(value);
      } else {
        view[0] = value;
      }
    };
  }
}
function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
  const blockSpecs = uniformBlockSpec.blockSpecs;
  const uniformData = uniformBlockSpec.uniformData;
  const blockSpec = blockSpecs[blockName];
  if (!blockSpec) {
    warn$1("no uniform block object named:", blockName);
    return {
      name: blockName,
      uniforms: {}
    };
  }
  const array = new ArrayBuffer(blockSpec.size);
  const buffer = gl.createBuffer();
  const uniformBufferIndex = blockSpec.index;
  gl.bindBuffer(UNIFORM_BUFFER, buffer);
  gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
  let prefix = blockName + ".";
  if (arraySuffixRE.test(prefix)) {
    prefix = prefix.replace(arraySuffixRE, ".");
  }
  const uniforms = {};
  const setters = {};
  blockSpec.uniformIndices.forEach(function(uniformNdx) {
    const data = uniformData[uniformNdx];
    const typeInfo = typeMap[data.type];
    const Type = typeInfo.Type;
    const paddedSize = pad(typeInfo.size, 16);
    const length2 = typeInfo.size + (data.size - 1) * paddedSize;
    let name = data.name;
    if (name.startsWith(prefix)) {
      name = name.substr(prefix.length);
    }
    const isArray = name.endsWith("[0]");
    if (isArray) {
      name = name.substr(0, name.length - 3);
    }
    const uniformView = new Type(array, data.offset, length2 / Type.BYTES_PER_ELEMENT);
    uniforms[name] = uniformView;
    setters[name] = createUniformBlockUniformSetter(uniformView, Type, typeInfo.size, paddedSize, isArray);
  });
  return {
    name: blockName,
    array,
    asFloat: new Float32Array(array),
    buffer,
    uniforms,
    setters
  };
}
function createUniformBlockInfo(gl, programInfo, blockName) {
  return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
}
function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
  const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
  const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
  if (blockSpec) {
    const bufferBindIndex = blockSpec.index;
    gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
    return true;
  }
  return false;
}
function setUniformBlock(gl, programInfo, uniformBlockInfo) {
  if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) {
    gl.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
  }
}
function setBlockUniforms(uniformBlockInfo, values) {
  const setters = uniformBlockInfo.setters;
  for (const name in values) {
    const setter = setters[name];
    if (setter) {
      const value = values[name];
      setter(value);
    }
  }
}
function setUniforms(setters, values) {
  const actualSetters = setters.uniformSetters || setters;
  const numArgs = arguments.length;
  for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
    const values2 = arguments[aNdx];
    if (Array.isArray(values2)) {
      const numValues = values2.length;
      for (let ii = 0; ii < numValues; ++ii) {
        setUniforms(actualSetters, values2[ii]);
      }
    } else {
      for (const name in values2) {
        const setter = actualSetters[name];
        if (setter) {
          setter(values2[name]);
        }
      }
    }
  }
}
const setUniformsAndBindTextures = setUniforms;
function createAttributeSetters(gl, program) {
  const attribSetters = {};
  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
  for (let ii = 0; ii < numAttribs; ++ii) {
    const attribInfo = gl.getActiveAttrib(program, ii);
    if (isBuiltIn(attribInfo)) {
      continue;
    }
    const index = gl.getAttribLocation(program, attribInfo.name);
    const typeInfo = attrTypeMap[attribInfo.type];
    const setter = typeInfo.setter(gl, index, typeInfo);
    setter.location = index;
    attribSetters[attribInfo.name] = setter;
  }
  return attribSetters;
}
function setAttributes(setters, buffers) {
  for (const name in buffers) {
    const setter = setters[name];
    if (setter) {
      setter(buffers[name]);
    }
  }
}
function setBuffersAndAttributes(gl, programInfo, buffers) {
  if (buffers.vertexArrayObject) {
    gl.bindVertexArray(buffers.vertexArrayObject);
  } else {
    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
  }
}
function createProgramInfoFromProgram(gl, program) {
  const uniformSetters = createUniformSetters(gl, program);
  const attribSetters = createAttributeSetters(gl, program);
  const programInfo = {
    program,
    uniformSetters,
    attribSetters
  };
  if (isWebGL2(gl)) {
    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
  }
  return programInfo;
}
function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  let good = true;
  shaderSources = shaderSources.map(function(source) {
    if (source.indexOf("\n") < 0) {
      const script = getElementById(source);
      if (!script) {
        progOptions.errorCallback("no element with id: " + source);
        good = false;
      } else {
        source = script.text;
      }
    }
    return source;
  });
  if (!good) {
    return null;
  }
  const program = createProgramFromSources(gl, shaderSources, progOptions);
  if (!program) {
    return null;
  }
  return createProgramInfoFromProgram(gl, program);
}
var programs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createAttributeSetters,
  createProgram,
  createProgramFromScripts,
  createProgramFromSources,
  createProgramInfo,
  createProgramInfoFromProgram,
  createUniformSetters,
  createUniformBlockSpecFromProgram,
  createUniformBlockInfoFromProgram,
  createUniformBlockInfo,
  createTransformFeedback,
  createTransformFeedbackInfo,
  bindTransformFeedbackInfo,
  setAttributes,
  setBuffersAndAttributes,
  setUniforms,
  setUniformsAndBindTextures,
  setUniformBlock,
  setBlockUniforms,
  bindUniformBlock
});
const TRIANGLES = 4;
const UNSIGNED_SHORT$3 = 5123;
function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
  type = type === void 0 ? TRIANGLES : type;
  const indices = bufferInfo.indices;
  const elementType = bufferInfo.elementType;
  const numElements = count === void 0 ? bufferInfo.numElements : count;
  offset = offset === void 0 ? 0 : offset;
  if (elementType || indices) {
    if (instanceCount !== void 0) {
      gl.drawElementsInstanced(type, numElements, elementType === void 0 ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
    } else {
      gl.drawElements(type, numElements, elementType === void 0 ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    }
  } else {
    if (instanceCount !== void 0) {
      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    } else {
      gl.drawArrays(type, offset, numElements);
    }
  }
}
function drawObjectList(gl, objectsToDraw) {
  let lastUsedProgramInfo = null;
  let lastUsedBufferInfo = null;
  objectsToDraw.forEach(function(object) {
    if (object.active === false) {
      return;
    }
    const programInfo = object.programInfo;
    const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
    let bindBuffers = false;
    const type = object.type === void 0 ? TRIANGLES : object.type;
    if (programInfo !== lastUsedProgramInfo) {
      lastUsedProgramInfo = programInfo;
      gl.useProgram(programInfo.program);
      bindBuffers = true;
    }
    if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
      if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
        gl.bindVertexArray(null);
      }
      lastUsedBufferInfo = bufferInfo;
      setBuffersAndAttributes(gl, programInfo, bufferInfo);
    }
    setUniforms(programInfo, object.uniforms);
    drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
  });
  if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
    gl.bindVertexArray(null);
  }
}
var draw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  drawBufferInfo,
  drawObjectList
});
const FRAMEBUFFER = 36160;
const RENDERBUFFER = 36161;
const TEXTURE_2D$2 = 3553;
const UNSIGNED_BYTE$3 = 5121;
const DEPTH_COMPONENT$1 = 6402;
const RGBA$1 = 6408;
const DEPTH_COMPONENT24$1 = 33190;
const DEPTH_COMPONENT32F$1 = 36012;
const DEPTH24_STENCIL8$1 = 35056;
const DEPTH32F_STENCIL8$1 = 36013;
const RGBA4$1 = 32854;
const RGB5_A1$1 = 32855;
const RGB565$1 = 36194;
const DEPTH_COMPONENT16$1 = 33189;
const STENCIL_INDEX = 6401;
const STENCIL_INDEX8 = 36168;
const DEPTH_STENCIL$1 = 34041;
const COLOR_ATTACHMENT0 = 36064;
const DEPTH_ATTACHMENT = 36096;
const STENCIL_ATTACHMENT = 36128;
const DEPTH_STENCIL_ATTACHMENT = 33306;
const CLAMP_TO_EDGE$1 = 33071;
const LINEAR$1 = 9729;
const defaultAttachments = [
  {format: RGBA$1, type: UNSIGNED_BYTE$3, min: LINEAR$1, wrap: CLAMP_TO_EDGE$1},
  {format: DEPTH_STENCIL$1}
];
const attachmentsByFormat = {};
attachmentsByFormat[DEPTH_STENCIL$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
function getAttachmentPointForFormat(format, internalFormat) {
  return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
}
const renderbufferFormats = {};
renderbufferFormats[RGBA4$1] = true;
renderbufferFormats[RGB5_A1$1] = true;
renderbufferFormats[RGB565$1] = true;
renderbufferFormats[DEPTH_STENCIL$1] = true;
renderbufferFormats[DEPTH_COMPONENT16$1] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;
function isRenderbufferFormat(format) {
  return renderbufferFormats[format];
}
function createFramebufferInfo(gl, attachments, width, height) {
  const target = FRAMEBUFFER;
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(target, fb);
  width = width || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  attachments = attachments || defaultAttachments;
  let colorAttachmentCount = 0;
  const framebufferInfo = {
    framebuffer: fb,
    attachments: [],
    width,
    height
  };
  attachments.forEach(function(attachmentOptions) {
    let attachment = attachmentOptions.attachment;
    const format = attachmentOptions.format;
    let attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
    if (!attachmentPoint) {
      attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
    }
    if (!attachment) {
      if (isRenderbufferFormat(format)) {
        attachment = gl.createRenderbuffer();
        gl.bindRenderbuffer(RENDERBUFFER, attachment);
        gl.renderbufferStorage(RENDERBUFFER, format, width, height);
      } else {
        const textureOptions = Object.assign({}, attachmentOptions);
        textureOptions.width = width;
        textureOptions.height = height;
        if (textureOptions.auto === void 0) {
          textureOptions.auto = false;
          textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR$1;
          textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR$1;
          textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE$1;
          textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE$1;
        }
        attachment = createTexture(gl, textureOptions);
      }
    }
    if (isRenderbuffer(gl, attachment)) {
      gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
    } else if (isTexture(gl, attachment)) {
      if (attachmentOptions.layer !== void 0) {
        gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
      } else {
        gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D$2, attachment, attachmentOptions.level || 0);
      }
    } else {
      throw new Error("unknown attachment type");
    }
    framebufferInfo.attachments.push(attachment);
  });
  return framebufferInfo;
}
function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
  width = width || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  framebufferInfo.width = width;
  framebufferInfo.height = height;
  attachments = attachments || defaultAttachments;
  attachments.forEach(function(attachmentOptions, ndx) {
    const attachment = framebufferInfo.attachments[ndx];
    const format = attachmentOptions.format;
    if (isRenderbuffer(gl, attachment)) {
      gl.bindRenderbuffer(RENDERBUFFER, attachment);
      gl.renderbufferStorage(RENDERBUFFER, format, width, height);
    } else if (isTexture(gl, attachment)) {
      resizeTexture(gl, attachment, attachmentOptions, width, height);
    } else {
      throw new Error("unknown attachment type");
    }
  });
}
function bindFramebufferInfo(gl, framebufferInfo, target) {
  target = target || FRAMEBUFFER;
  if (framebufferInfo) {
    gl.bindFramebuffer(target, framebufferInfo.framebuffer);
    gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
  } else {
    gl.bindFramebuffer(target, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
}
var framebuffers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  bindFramebufferInfo,
  createFramebufferInfo,
  resizeFramebufferInfo
});
const ELEMENT_ARRAY_BUFFER$2 = 34963;
function createVertexArrayInfo(gl, programInfos, bufferInfo) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  if (!programInfos.length) {
    programInfos = [programInfos];
  }
  programInfos.forEach(function(programInfo) {
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
  });
  gl.bindVertexArray(null);
  return {
    numElements: bufferInfo.numElements,
    elementType: bufferInfo.elementType,
    vertexArrayObject: vao
  };
}
function createVAOAndSetAttributes(gl, setters, attribs, indices) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  setAttributes(setters, attribs);
  if (indices) {
    gl.bindBuffer(ELEMENT_ARRAY_BUFFER$2, indices);
  }
  gl.bindVertexArray(null);
  return vao;
}
function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
  return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}
var vertexArrays = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createVertexArrayInfo,
  createVAOAndSetAttributes,
  createVAOFromBufferInfo
});
const defaults$2 = {
  addExtensionsToContext: true
};
function setDefaults$2(newDefaults) {
  copyExistingProperties(newDefaults, defaults$2);
  setDefaults(newDefaults);
  setDefaults$1(newDefaults);
}
const prefixRE = /^(.*?)_/;
function addExtensionToContext(gl, extensionName) {
  glEnumToString(gl, 0);
  const ext = gl.getExtension(extensionName);
  if (ext) {
    const enums = {};
    const fnSuffix = prefixRE.exec(extensionName)[1];
    const enumSuffix = "_" + fnSuffix;
    for (const key in ext) {
      const value = ext[key];
      const isFunc = typeof value === "function";
      const suffix = isFunc ? fnSuffix : enumSuffix;
      let name = key;
      if (key.endsWith(suffix)) {
        name = key.substring(0, key.length - suffix.length);
      }
      if (gl[name] !== void 0) {
        if (!isFunc && gl[name] !== value) {
          warn(name, gl[name], value, key);
        }
      } else {
        if (isFunc) {
          gl[name] = function(origFn) {
            return function() {
              return origFn.apply(ext, arguments);
            };
          }(value);
        } else {
          gl[name] = value;
          enums[name] = value;
        }
      }
    }
    enums.constructor = {
      name: ext.constructor.name
    };
    glEnumToString(enums, 0);
  }
  return ext;
}
const supportedExtensions = [
  "ANGLE_instanced_arrays",
  "EXT_blend_minmax",
  "EXT_color_buffer_float",
  "EXT_color_buffer_half_float",
  "EXT_disjoint_timer_query",
  "EXT_disjoint_timer_query_webgl2",
  "EXT_frag_depth",
  "EXT_sRGB",
  "EXT_shader_texture_lod",
  "EXT_texture_filter_anisotropic",
  "OES_element_index_uint",
  "OES_standard_derivatives",
  "OES_texture_float",
  "OES_texture_float_linear",
  "OES_texture_half_float",
  "OES_texture_half_float_linear",
  "OES_vertex_array_object",
  "WEBGL_color_buffer_float",
  "WEBGL_compressed_texture_atc",
  "WEBGL_compressed_texture_etc1",
  "WEBGL_compressed_texture_pvrtc",
  "WEBGL_compressed_texture_s3tc",
  "WEBGL_compressed_texture_s3tc_srgb",
  "WEBGL_depth_texture",
  "WEBGL_draw_buffers"
];
function addExtensionsToContext(gl) {
  for (let ii = 0; ii < supportedExtensions.length; ++ii) {
    addExtensionToContext(gl, supportedExtensions[ii]);
  }
}
function create3DContext(canvas, opt_attribs) {
  const names = ["webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults$2.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}
function getWebGLContext(canvas, opt_attribs) {
  const gl = create3DContext(canvas, opt_attribs);
  return gl;
}
function createContext(canvas, opt_attribs) {
  const names = ["webgl2", "webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults$2.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}
function getContext(canvas, opt_attribs) {
  const gl = createContext(canvas, opt_attribs);
  return gl;
}
function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  multiplier = Math.max(0, multiplier);
  const width = canvas.clientWidth * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}
export {addExtensionsToContext, attributes, bindFramebufferInfo, bindTransformFeedbackInfo, bindUniformBlock, canFilter, canGenerateMipmap, createAttribsFromArrays, createAttributeSetters, createBufferFromArray, createBufferFromTypedArray, createBufferInfoFromArrays, createBuffersFromArrays, createFramebufferInfo, createProgram, createProgramFromScripts, createProgramFromSources, createProgramInfo, createProgramInfoFromProgram, createSampler, createSamplers, createTexture, createTextures, createTransformFeedback, createTransformFeedbackInfo, createUniformBlockInfo, createUniformBlockInfoFromProgram, createUniformBlockSpecFromProgram, createUniformSetters, createVAOAndSetAttributes, createVAOFromBufferInfo, createVertexArrayInfo, draw, drawBufferInfo, drawObjectList, framebuffers, getArray as getArray_, getBytesPerElementForInternalFormat, getContext, getFormatAndTypeForInternalFormat, getGLTypeForTypedArray, getGLTypeForTypedArrayType, getNumComponentsForFormat, getNumComponents as getNumComponents_, getTypedArrayTypeForGLType, getWebGLContext, glEnumToString, isArrayBuffer, isWebGL1, isWebGL2, loadTextureFromUrl, m4, primitives, programs, resizeCanvasToDisplaySize, resizeFramebufferInfo, resizeTexture, setAttribInfoBufferFromArray, setDefaults as setAttributeDefaults_, setAttributePrefix, setAttributes, setBlockUniforms, setBuffersAndAttributes, setDefaultTextureColor, setDefaults$2 as setDefaults, setEmptyTexture, setSamplerParameters, setDefaults$1 as setTextureDefaults_, setTextureFilteringForSize, setTextureFromArray, setTextureFromElement, setTextureParameters, setUniformBlock, setUniforms, setUniformsAndBindTextures, textures, typedarrays, utils, v3, vertexArrays};
export default null;
