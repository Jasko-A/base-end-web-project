const express = require('express');
const os = require('os');

const app = express();
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config.js');
var compiler = webpack(webpackConfig);
console.log("HERE" + __dirname);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
