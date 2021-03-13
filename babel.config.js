module.exports = {
    presets: [
        ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3, targets: { node: 14 } }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    plugins: [
        "babel-plugin-styled-components",
        "lodash",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        "react-refresh/babel",
    ],
};
