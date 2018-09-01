/**
 * Created by zad on 17/7/10.
 */
const json = require('rollup-plugin-json');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const { version, author, homepage } = require('./package.json');
const { libName, fileName } = require('./lib.config');

const banner = `/**
 * ${fileName}.js v${version}
 * author: ${author}
 * homepage: ${homepage}
 */`;

// 外部直接依赖的库
const externals = ['lodash'];

const configs = {
  'umd-dev': {
    entry: 'src/index.js',
    dest: `dist/${fileName}.js`,
    format: 'umd',
    env: 'development',
    banner,
  },
  'umd-prod': {
    entry: 'src/index.js',
    dest: `dist/${fileName}.min.js`,
    format: 'umd',
    env: 'production',
    banner,
  },
  esm: {
    entry: 'src/index.js',
    dest: `dist/${fileName}.esm.js`,
    format: 'es',
    external: id => externals.some(o => (new RegExp(o)).test(id)),
    banner,
  },
  cjs: {
    entry: 'src/index.js',
    dest: `dist/${fileName}.cjs.js`,
    format: 'cjs',
    external: id => externals.some(o => (new RegExp(o)).test(id)),
    banner,
  },
};

const getConfig = (name) => {
  const opts = configs[name];
  const config = {
    input: opts.entry,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: libName,
    },
    external: opts.external,
    plugins: [
      json(),
      replace({
        __VERSION__: version,
      }),
      buble(),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
    ].concat(opts.plugins || []),
  };

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }));
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name,
  });

  return config;
};

exports.getAllConfigs = () => Object.keys(configs).map(getConfig);
