// config is the default configuration
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export default ({ config }) => {
    const { plugins, entry, mode, output } = config;
    // This is how you can distinguish the `build` command from the `serve`
    const isBuild = mode === "production";
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "./styles/[name].css",
            chunkFilename: "[id].css",
        })
    );
    console.log(config)
    
    const configWebpack = {
        ...config,

        entry: {
            index: entry,
            vars: path.resolve(__dirname, './src/vars.js'),
        },
        output: {
            // ...output,
            path: path.resolve(path.join(__dirname, "./dist")),
            filename: '[name].js',
            chunkFilename: '[name].js',
            library: 'bootstrap-xditor',
            libraryTarget: 'umd',
            globalObject: "typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this)"
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
    console.log(configWebpack)
    return configWebpack;
};
