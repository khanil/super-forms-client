var path = require('path');
var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DefinePlugin = webpack.DefinePlugin;
var ContextReplacementPlugin = webpack.ContextReplacementPlugin;
var env = process.env.WEBPACK_ENV;
var plugins = [], devtool;
var output = {
  path: path.join(__dirname, './dist'),
  filename: '[name].js'
}

plugins.push(new ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru)$/));

if (env == 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  plugins.push(new DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }));
  output.path = path.join(__dirname, './dist/min');
  devtool = null;
} else {
  devtool = 'eval';
}

var config = {
  entry: {
    generation: ['babel-polyfill', './src/entries/generation'],
    interview: ['babel-polyfill', './src/entries/interview'],
    report: ['babel-polyfill', './src/entries/responses'],
    main: ['babel-polyfill', './src/entries/main']
  },
  output: output,
  devtool: devtool,
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;