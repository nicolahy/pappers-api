const path = require('path');
const glob = require('glob');

const tsFiles = glob.sync(path.resolve(__dirname, "ts", "*.ts"));
const entry = tsFiles.reduce((acc, filePath) => {
    const fileName = path.basename(filePath, '.ts');
    acc[fileName] = filePath;
    return acc;
}, {});

module.exports = {
    mode: "production",
    entry: entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
};