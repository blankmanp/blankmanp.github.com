const webpack = require('webpack');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  // 设置 sourcemaps 为 eval 模式，将模块封装到 eval 包裹起来
  devtool: 'eval',

  // 我们应用的入口, 在 `src` 目录 (我们添加到下面的 resolve.modules):
  entry: [
    'index.tsx'
  ],
  mode: 'development',

  // 配置 devServer 的输出目录和 publicPath
  output: {
    filename: 'index.js',
    publicPath: 'dist',
    path: path.resolve('dist')
  },

  // 配置 devServer
  devServer: {
    port: 3000,
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  // 告诉 Webpack 加载 TypeScript 文件
  resolve: {
    // 首先寻找模块中的 .ts(x) 文件, 然后是 .js 文件
    extensions: ['.ts', '.tsx', '.js'],

    // 在模块中添加 src, 当你导入文件时，可以将 src 作为相关路径
    modules: ['src', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // .ts(x) 文件应该首先经过 Typescript loader 的处理, 然后是 babel 的处理
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader', options: {
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
              })]
            })
          } }
        ],
        include: path.resolve('src')
      },
      // markdown 文件
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader' }
        ]
      }
    ]
  },
}