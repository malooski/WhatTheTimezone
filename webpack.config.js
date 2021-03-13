const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

module.exports = (env, args) => {
    const MODE = args.mode || "development";
    const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
    const TIMESTAMP = new Date().toUTCString();

    const isDevMode = MODE === "development";

    console.log("Mode:        ", MODE);
    console.log("Public Path: ", PUBLIC_PATH);
    console.log("Timestamp:   ", TIMESTAMP);

    const styleLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            esModule: true,
        },
    };

    return {
        // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
        target: process.env.NODE_ENV !== "production" ? "web" : "browserslist",
        entry: {
            index: "./src/index.tsx",
        },
        mode: MODE,
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.css$/i,
                    use: [styleLoader, "css-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [styleLoader, "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|eot)$/i,
                    use: [{ loader: "file-loader", options: { esModule: false } }],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            alias: {},
        },
        output: {
            filename: isDevMode ? "[name].bundle.js" : "[name].[contenthash].bundle.js",
            chunkFilename: isDevMode ? "[name].bundle.js" : "[name].[contenthash].bundle.js",
            publicPath: PUBLIC_PATH,
            path: outputPath,
        },
        devtool: isDevMode ? "eval-source-map" : "none",
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDevMode ? "[name].css" : "[name].[hash].css",
                chunkFilename: isDevMode ? "[id].css" : "[id].[hash].css",
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new ForkTsCheckerPlugin(),
            new CleanWebpackPlugin(),
            isDevMode && new webpack.HotModuleReplacementPlugin(),
            isDevMode && new ReactRefreshWebpackPlugin(),
        ].filter(Boolean),
        watchOptions: {
            ignored: /node_modules/,
        },
        devServer: {
            contentBase: outputPath,
            hot: true,
        },
    };
};
