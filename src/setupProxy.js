const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
       target: 'http://10.0.0.32:8667/' ,
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/"
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }));
};