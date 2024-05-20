"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_index = require("../../../common/api/index.js");
require("../../../common/utils/request.js");
require("../../../common/utils/config.js");
const _sfc_main = {
  __name: "order-confirm",
  setup(__props) {
    const id = common_vendor.ref("");
    const costSum = common_vendor.ref(0);
    common_vendor.onLoad((e) => {
      id.value = String(e.id);
      queryData();
    });
    const queryData = async () => {
      try {
        const response = await common_api_index.getGoodInfo(id.value);
        if (!response.data.code) {
          costSum.value = "￥" + response.data.data.dishInfo.Price;
        }
      } catch (error) {
        console.error("获取商品数据失败：", error);
      }
    };
    const createOrder = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(costSum.value),
        b: common_vendor.t(costSum.value),
        c: id.value,
        d: common_vendor.n("buy-btn btn-enabled"),
        e: common_vendor.o(createOrder)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/order/order-confirm/order-confirm.vue"]]);
wx.createPage(MiniProgramPage);
