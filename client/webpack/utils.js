const path = require('path');


const resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
        '@ui': path.resolve(__dirname, '../src/ui//'),
        '@tools': path.resolve(__dirname, '../src/tools/'),
        '@hooks': path.resolve(__dirname, '../src/tools/hooks/'),
    }
};

module.exports = {
    resolve
}