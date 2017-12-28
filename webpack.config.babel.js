import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

let config = {
  entry: {
    app: './src/client/test.js',
    // print: './src/client/print.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'This is from Webpack',
      template: './src/client/test.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/'
  }
};

export default config
