const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://restcountries.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove a parte '/api' da URL da rota
      },
    })
  );
};
