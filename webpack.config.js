const path = require('path');
const hwp = require('html-webpack-plugin');

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
  },

  devtool: 'source-map',

  entry: {
    bundle: path.resolve(__dirname, 'src/index.ts'),
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },

  plugins: [
    new hwp({
      title: 'Disney',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
  },
};
