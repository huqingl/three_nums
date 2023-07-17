const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/d", {
      target: "https://huqinlong.com/d/",
      // target: "http://shunyuanchat.site",
      changeOrigin: false,
      secure: false,
      // pathRewrite: { '^/api': '' }
    })
  );
};
