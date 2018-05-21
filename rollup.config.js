import babel from 'rollup-plugin-babel'
import node from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  plugins: [
    node(),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'flow']
    })
  ],
  external: [
    '@most/core',
    '@most/types'
  ],
  output: [{
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }, {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true
  }]
}
