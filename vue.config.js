module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
           '/api': {
               target: 'http://127.0.0.1:80/',
               changeOrigin: false,
               pathRewrite: {
                   '/api': ''
               }
           }
       }
    }
}

