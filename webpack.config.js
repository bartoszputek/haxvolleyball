const path = require('path');

module.exports = {
  entry: './src/scripts/script.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src/scripts')],
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};
