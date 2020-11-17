const entry = require("./webpack.entry");
const path = require("path");
const plugins = require("./webpack.plugins");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
    //打出来是index-bundle.js
    //和index2-bundle.js
    filename: "./js/[name]-bundle.js"
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, "css-loader", "less-loader"]
      },

      {
        //使用file-loader 可以图片 嵌入 到css中
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            esModule: false, // 该项默认为true，改为false即可
            // outputPath: './images',
          }
        }],

      },
      {
        test: /.html$/, //所有html结尾的文件添加此 loader 处理
        use: ["html-withimg-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: plugins.concat(
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "[id].css"
    })
  ),
  optimization: {
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: 'commons' //提取出来的文件命名
        }
      }
    }
  }
};