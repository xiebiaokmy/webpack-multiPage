const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entry = require("./webpack.entry.js");
const webpack = require("webpack");
let html = [];

Object.keys(entry).forEach(k => {
  let h = new HtmlWebpackPlugin({
    title: k,
    filename: `./${k}.html`,
    template: `./src/${k}.html`,
    inject: true,
    chunks: [k, 'commons']
  });
  html.push(h);
});
module.exports = [
  new CleanWebpackPlugin(),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
].concat(html);