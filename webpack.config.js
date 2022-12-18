const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);
  
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[contenthash].js',
        sourceMapFilename: "[name].[contenthash].map",
        chunkFilename: "[id].[contenthash].js",
        publicPath: "/",
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: './public/favicon.ico',
        manifest: './public/manifest.json'
      }),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    module: {
        rules: [
          {
            test: /\.(js)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack', 'url-loader'],
            // type: 'asset/resource',
          },
          {
            test: /\.(less|css|scss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              "css-loader",
              "sass-loader"
            ],
          },
          {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
            use: "file-loader",
          },
          {
            test: /\.(png|jpe?g|git|ico)$/i,
            use: [
              {
                loader: "img-optimize-loader",
              },
            ],
          },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    devtool: 'inline-source-map',
    mode: env.ENVIRONMENT,
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        open: true
    }
  };
}