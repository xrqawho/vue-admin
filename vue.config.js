module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
           '/api': {
			   /* 本地*/
                target: 'http://127.0.0.1:80/', 
			   /* 生产*/
               changeOrigin: false,
               pathRewrite: {
                   '/api': ''
               }
           }
       }
    }
}

