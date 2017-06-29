var path = require("path");
module.exports = {
    entry: {
        app: "./app",
        test: "./test/filtroDeTipo.modulo.test"
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].dist.js"
    },
    devtool: "source-map"
}