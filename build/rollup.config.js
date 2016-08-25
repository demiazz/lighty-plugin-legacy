import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';


const config = {
  entry: 'src/index.js',
  plugins: [buble()],
  sourceMap: true,
};

if (process.env.TARGET === 'commonjs') {
  config.dest = 'lib/index.js';
  config.format = 'cjs';
}

if (process.env.TARGET === 'es') {
  config.dest = 'es/index.js';
  config.format = 'es';
}

if (process.env.TARGET === 'umd') {
  config.moduleName = 'lightyPluginLegacy';
  config.dest = process.env.NODE_ENV === 'production'
    ? 'dist/lighty-plugin-legacy.min.js'
    : 'dist/lighty-plugin-legacy.js';
  config.format = 'umd';

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(uglify());
  }
}


export default config;
