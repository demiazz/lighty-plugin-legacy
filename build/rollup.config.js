import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';


const config = {
  entry: 'src/index.js',
  plugins: [buble()],
  sourceMap: true,
};

if (process.env.TARGET === 'commonjs') {
  config.dest = 'dist/lighty-plugin-legacy.js';
  config.format = 'cjs';
}

if (process.env.TARGET === 'es') {
  config.dest = 'dist/lighty-plugin-legacy.es.js';
  config.format = 'es';
}

if (process.env.TARGET === 'umd') {
  config.moduleName = 'lightyPluginLegacy';
  config.dest = process.env.NODE_ENV === 'production'
    ? 'dist/lighty-plugin-legacy.umd.min.js'
    : 'dist/lighty-plugin-legacy.umd.js';
  config.format = 'umd';
  config.globals = {
    jquery: 'jQuery',
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(uglify());
  }
}


export default config;
