"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userDesc = common_vendor.ref("");
    const checkUserStatus = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (token) {
        userDesc.value = "尊贵会员";
      } else {
        userDesc.value = "登录/注册 >";
      }
    };
    const onClickUserDesc = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    const gotoSettings = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/settings/settings"
        });
      }
    };
    const gotoOrderPage = (status) => {
      common_vendor.index.navigateTo({
        url: "/pages/order/order-list/order-list?status=" + status
      });
    };
    common_vendor.onMounted(() => {
      checkUserStatus();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSettings),
        b: common_vendor.t(userDesc.value),
        c: common_vendor.o(onClickUserDesc),
        d: common_vendor.o(gotoOrderPage)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
