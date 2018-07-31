const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require('./package.json');

const widgetConfig = {
    mode: 'none',
    entry: `./src/components/${pkg.widgetName}Container.tsx`,
    output: {
        path: path.resolve(__dirname, "dist/tmp/src/"),
        filename: `com/mendix/widget/custom/${pkg.name}/${pkg.widgetName}.js`,
        libraryTarget: "umd"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { enforce: "pre", test: /\.tsx?$/, loader: "tslint-loader" },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [{"React": "react"}, {"ReactDOM": "react-dom"}],
    plugins: [
        new CleanWebpackPlugin('dist'),
        new MiniCssExtractPlugin({
            filename: `com/mendix/widget/custom/${pkg.name}/ui/${pkg.widgetName}.css`,
        }),
        new CopyWebpackPlugin(
            [
                { from: 'src/**/*.xml', to: path.resolve(__dirname, 'dist/tmp') }
            ],
            { copyUnmodified: true }
        ),
        new ZipPlugin({
            path: `../../${pkg.version}`,
            filename: `${pkg.widgetName}`,
            extension: 'mpk',
        }),
        new webpack.LoaderOptionsPlugin({ debug: true }),
      ],
}

module.exports = [ widgetConfig ]
