const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const uglify = require('uglify-js');
const ora = require('ora');
const chalk = require('chalk');
const rollupConfigs = require('./rollup.configs').getAllConfigs();
const { version } = require('./package.json');
const { libName } = require('./lib.config');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const resolve = p => path.resolve(__dirname, p);

const getSize = code => `${(code.length / 1024).toFixed(2)}kb`;

const write = (dest, code) => {
  fs.writeFileSync(resolve(dest), code, { flag: 'w+' });
  const fileName = chalk.whiteBright.bgBlue(path.relative(__dirname, dest));
  const size = getSize(code);
  console.log(chalk.blue(`  Generate ${fileName} ${size}`));
};

const build = (configs) => {
  if (!fs.existsSync(BUILD_PATH)) {
    fs.mkdirSync(BUILD_PATH);
  }
  const now = +new Date();
  const spinner = ora('building for production...');
  spinner.start();
  const codePromises = configs.map(async (config) => {
    const bundle = await rollup.rollup(config);
    return bundle.generate(config);
  });

  Promise.all(codePromises).then((codes) => {
    console.log(''); // add padding
    codes.forEach(({ code }, i) => {
      const config = configs[i];
      const { output: { file, banner } } = config;
      const isProd = /min\.js$/.test(file);
      if (isProd) {
        const minified = (banner ? `${banner}\n` : '') + uglify.minify(code, {
          output: {
            ascii_only: true,
          },
          compress: {
            pure_funcs: ['makeMap'],
          },
        }).code;
        return write(file, `${minified}\n`);
      }
      return write(file, code);
    });
    console.log(chalk.cyan(`  Build ${libName} v${version} complete.`));
    console.log(chalk.cyan(`  Time: ${chalk.bold(+new Date() - now)} ms.`));
    spinner.succeed('Done!');
  }).catch((e) => {
    spinner.fail('Fail!');
    throw e;
  });
};

build(rollupConfigs);
