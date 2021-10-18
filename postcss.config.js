const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer,
        require('css-mqpacker'),
        require('cssnano')
    ]
}