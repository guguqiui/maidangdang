"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_index = require("../../common/api/index.js");
require("../../common/utils/request.js");
require("../../common/utils/config.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const goodsList = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    common_vendor.useRouter();
    const _bindinput = (e) => {
      keyword.value = e.detail.value;
    };
    const searchGoods = async () => {
      try {
        const response = await common_api_index.search(keyword.value);
        if (!response.data.code) {
          goodsList.value = response.data.data.dishes;
        }
      } catch (error) {
        console.error("搜索商品失败：", error);
      }
    };
    const gotoGoodsDetail = (e) => {
      let goodsId = e.currentTarget.dataset["id"];
      common_vendor.index.navigateTo({
        url: "/pages/goods/goods?id=" + goodsId
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_bindinput),
        b: common_vendor.o(searchGoods),
        c: common_vendor.f(goodsList.value, (item, index, i0) => {
          return {
            a: item.Picture,
            b: common_vendor.t(item.Name),
            c: common_vendor.t(item.Price),
            d: common_vendor.o(gotoGoodsDetail, item.k),
            e: item.DishId,
            f: item.k
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
