# mat4-recompose

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Recompose a 4x4 matrix from translation, scale, skew, perspective, and rotation. This is commonly used in matrix animations (i.e. after [decompose](https://github.com/mattdesl/mat4-decompose) and interpolation).

## Usage

[![NPM](https://nodei.co/npm/mat4-recompose.png)](https://nodei.co/npm/mat4-recompose/)

#### `recompose(matrix, translation, scale, skew, perspective, quaternion)`

Recomposes a matrix with the given vectors, storing the result into `matrix` (a 16 float array). 

- `translation` [x, y, z]
- `scale` [x, y, z]
- `skew` [xy, xz, yz] skew factors
- `perspective` [x, y, z, w]
- `quaternion` [x, y, z, w]

Returns the `matrix` being recomposed.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mat4-recompose/blob/master/LICENSE.md) for details.
