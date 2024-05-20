"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/mine/mine.js";
  "./pages/settings/settings.js";
  "./pages/cart/cart.js";
  "./pages/order/order-list/order-list.js";
  "./pages/search/search.js";
  "./pages/goods/goods.js";
  "./pages/order/order-confirm/order-confirm.js";
  "./pages/order/order-detail/order-detail.js";
  "./pages/order/order-confirm-from-cart/order-confirm-from-cart.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
