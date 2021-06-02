const path = require('path');

module.exports = {
  entry: './src/frontend/script.ts',
  mode: 'development',
  resolve: {
    alias: {
      frontend: path.resolve(__dirname, 'src', 'frontend'),
      shared: path.resolve(__dirname, 'src', 'shared'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', ''],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src/frontend'), path.resolve(__dirname, 'src/shared')],
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.frontend.json"
          }
        }],
      },
    ],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};
