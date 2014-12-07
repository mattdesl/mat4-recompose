var recompose = require('./')
var test = require('tape').test

var mat4 = require('gl-mat4')

test("recomposes a 4x4 matrix", function(t) {
    var m = clean(mat4.create())
    var m2 = clean(mat4.create())

    var translation = [0, 0, 0],
        scale = [1, 1, 1],
        skew = [0, 0, 0],
        perspective = [0, 0, 0, 1],
        quaternion = [0, 0, 0, 1]

    recompose(m2, translation, scale, skew, perspective, quaternion)
    t.deepEqual(m2, m, 'recomposes to an identity matrix')


    mat4.identity(m)
    translation = [10, 5, 20]
    mat4.translate(m, m, translation)
    recompose(m2, translation, scale, skew, perspective, quaternion)
    t.deepEqual(m2, m, 'recomposes translation')

    scale = [2, 0.5, -10]
    mat4.scale(m, m, scale)
    recompose(m2, translation, scale, skew, perspective, quaternion)
    t.deepEqual(m2, m, 'recomposes scale')

    skew = [1, 0, 0]
    m[4] = 0.5
    recompose(m2, translation, scale, skew, perspective, quaternion)
    t.deepEqual(m2, m, 'recomposes skew')

    perspective = [0, 0, 0, 10]
    m[15] = 10
    recompose(m2, translation, scale, skew, perspective, quaternion)
    t.deepEqual(m2, m, 'recomposes perspective')

    translation = [0, 0, 0]
    scale = [1, 1, 1]
    skew = [0, 0, 0]
    perspective = [0,0,0,1]
    quaternion = quatRotateX([], [0, 0, 0, 1], Math.PI/2)

    mat4.identity(m)
    mat4.rotateX(m, m, Math.PI/2)

    t.deepEqual(mat4.fromQuat([], quaternion), m)
    // recompose(m2, translation, scale, skew, perspective, quaternion)
    // t.deepEqual(m2, m, 'recomposes rotation')

    t.end()
})

function quatAxisAngle (out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}

function quatRotateX(out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}


function clean(m) { //for easier console logging
    return Array.prototype.slice.call(m)
}