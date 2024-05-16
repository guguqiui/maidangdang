"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "settings",
  setup(__props) {
    const doLogout = () => {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(doLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
