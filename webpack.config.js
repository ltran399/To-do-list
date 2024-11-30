// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // CSS files
        use: ['style-loader', 'css-loader'], // CSS loaders
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans dist folder
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template HTML
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
  },
  mode: 'development', // Development mode
};
