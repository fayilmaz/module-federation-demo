const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

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
    publicPath: "http://localhost:3000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
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
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        shell: remoteURLs.shell,
        home: remoteURLs.home,
        auth: remoteURLs.auth,
        cart: remoteURLs.cart,
        checkout: remoteURLs.checkout,
        products: remoteURLs.products,
      },
      exposes: {
        "./Shell": "./src/Shell.tsx",
        "./useShellStore": "./src/store/shellStore.ts",
        "./ui/Button": "./components/ui/button.tsx",
      },
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
