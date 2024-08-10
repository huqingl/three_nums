const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/d", {
      target: "http://yuduntech.com:8070/d/",
      // target: "http://shunyuanchat.site",
      changeOrigin: false,
      secure: false,
      // pathRewrite: { '^/api': '' }
    })
  );
};
