const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://api.jisuapi.com/",
      // target: "http://shunyuanchat.site",
      changeOrigin: false,
      secure: false,
      // pathRewrite: { '^/api': '' }
    })
  );
};
