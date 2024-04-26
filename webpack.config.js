const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = [
  {
    name: "public",
    entry: "./public/script/index.ts",
    // target: 'web', // by default
    output: {
      path: __dirname + "/dist/public",
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Orca",
        inject: "body",
        template: "./public/index.html",
      })
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "./tsconfig.webpack.json"),
      })],
      extensions: [".ts", ".js"]
    },
    devServer: {
      client: {
        overlay: {
          errors: false,
          warnings: false,
          runtimeErrors: false,
        },
      },
    },
    module: {
      rules: [
        { test: /\.([cm]?ts)$/, loader: "ts-loader" },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    }
  },
];
