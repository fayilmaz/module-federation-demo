const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const remoteURLs = {
  shell:
    process.env.SHELL_REMOTE_URL ||
    "shell@http://localhost:3000/remoteEntry.js",
  home:
    process.env.HOME_REMOTE_URL || "home@http://localhost:3001/remoteEntry.js",
  auth:
    process.env.AUTH_REMOTE_URL || "auth@http://localhost:3002/remoteEntry.js",
  cart:
    process.env.CART_REMOTE_URL || "cart@http://localhost:3003/remoteEntry.js",
  checkout:
    process.env.CHECKOUT_REMOTE_URL ||
    "checkout@http://localhost:3004/remoteEntry.js",
  products:
    process.env.PRODUCTS_REMOTE_URL ||
    "products@http://localhost:3005/remoteEntry.js",
};

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3004/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3004,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Using 'asset/resource' instead of 'file-loader'
      },
    ],
  },

  plugins: [
    new Dotenv({
      path:
        process.env.NODE_ENV === "development" ? "./.env" : "./.env.production",
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
      silent: false,
    }),
    new ModuleFederationPlugin({
      name: "checkout",
      filename: "remoteEntry.js",
      remotes: {
        shell: remoteURLs.shell,
        home: remoteURLs.home,
        auth: remoteURLs.auth,
        cart: remoteURLs.cart,
        checkout: remoteURLs.checkout,
        products: remoteURLs.products,
      },
      exposes: { "./Checkout": "./src/components/Checkout.tsx" },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
});
