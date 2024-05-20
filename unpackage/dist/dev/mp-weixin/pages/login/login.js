"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_index = require("../../common/api/index.js");
require("../../common/utils/request.js");
require("../../common/utils/config.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const inputChange = (e) => {
      const key = e.currentTarget.dataset.key;
      if (key === "username") {
        username.value = e.detail.value;
      } else if (key === "password") {
        password.value = e.detail.value;
      }
    };
    const onLogin = () => {
      const params = {
        username: username.value,
        password: password.value
      };
      common_api_index.login(params).then((resp) => {
        if (!resp.data.code) {
          common_vendor.index.setStorageSync("token", resp.data.data.token);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      });
    };
    const onRegister = () => {
      const params = {
        username: username.value,
        password: password.value
      };
      common_api_index.register(params).then((resp) => {
        console.log(resp.data.code);
        if (!resp.data.code) {
          common_vendor.index.setStorageSync("token", resp.data.data.token);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => username.value = $event.detail.value, inputChange]),
        b: username.value,
        c: common_vendor.o([($event) => password.value = $event.detail.value, inputChange]),
        d: password.value,
        e: common_vendor.o(onLogin),
        f: common_vendor.o(onRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
