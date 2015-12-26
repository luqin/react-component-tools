import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import getServerIP from '../../getServerIP';

export default function (webpackConfig, serverConfig) {
  let {port} = serverConfig;
  const serverIP = getServerIP();
  return function (callback) {
    new WebpackDevServer(webpack(webpackConfig), {
      contentBase: '../build',
      hot: true,
      publicPath: webpackConfig.output.publicPath,
      // Unfortunately quiet swallows everything even error so it can't be used.
      quiet: false,
      // No info filters only initial compilation it seems.
      noInfo: false,
      // Remove console.log mess during watch.
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
      // Why '0.0.0.0' and 'localhost'? Because it works for remote machines.
      // https://github.com/webpack/webpack-dev-server/issues/151#issuecomment-104643642
    }).listen(port, '0.0.0.0', function (err) {
      // Callback is called only once, can't be used to catch compilation errors.
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', `${serverIP}:${port}/dist/app.js`);

      callback();
    });
  };
}
