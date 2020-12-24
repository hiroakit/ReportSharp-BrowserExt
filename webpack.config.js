
const path = require("path")
module.exports = {
  mode: "development",
  entry: "./src/content.js",
  output: {
    filename: 'content.js',
    path: path.join(__dirname, 'build')
  }  
}
