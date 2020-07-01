const entry = require("./webpack.entry");
const path = require("path");
const plugins = require("./webpack.plugins");
module.exports = {
  mode: "production",
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
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        //less loader
        test: /\.less$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        //使用file-loader 可以图片 嵌入 到css中
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
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
  plugins: plugins
};