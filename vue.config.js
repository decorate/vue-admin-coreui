const path = require('path')

module.exports = {
    configureWebpack: config => {
        delete config.devtool
        delete config.output.libraryExport
        config.resolve.alias = {
            '@': path.join(__dirname, './src'),
            '~': path.join(__dirname, './src'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    // chainWebpack: config => {
    //     config.externals({
    //         axios: true
    //     })
    // }
}
