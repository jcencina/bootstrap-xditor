// config is the default configuration
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export default ({ config }) => {
    const { plugins, entry, mode, output } = config;
    // This is how you can distinguish the `build` command from the `serve`
    const isBuild = mode === "production";
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    );
    return {
        ...config,

        entry: {
            'index': entry,
            'vars': path.resolve(__dirname, './src/vars'),
        },
        output: {
            // ...output,
            path: path.resolve(path.join(__dirname, "./dist")),
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            // Extracts CSS for each JS file that includes CSS
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            // Interprets `@import` and `url()` like `import/require()` and will resolve them
                            loader: "css-loader",
                        },
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: function () {
                                        return [require("autoprefixer")];
                                    },
                                },
                            },
                        },
                        {
                            // Loads a SASS/SCSS file and compiles it to CSS
                            loader: "sass-loader",
                        },
                    ],
                },

                ...config.module.rules,
            ],
        },
    };
};
