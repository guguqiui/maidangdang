"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_index = require("../../common/api/index.js");
require("../../common/utils/request.js");
require("../../common/utils/config.js");
const _sfc_main = {
  __name: "goods",
  setup(__props) {
    const id = common_vendor.ref("");
    const name = common_vendor.ref("");
    const picUrl = common_vendor.ref("");
    const description = common_vendor.ref("");
    const price = common_vendor.ref(0);
    common_vendor.onLoad((e) => {
      id.value = String(e.id);
      queryData();
    });
    const queryData = async () => {
      try {
        const response = await common_api_index.getGoodInfo(id.value);
        if (!response.data.code) {
          name.value = response.data.data.dishInfo.Name;
          picUrl.value = response.data.data.dishInfo.Picture;
          description.value = response.data.data.dishInfo.Description;
          price.value = "￥" + response.data.data.dishInfo.Price;
        }
      } catch (error) {
        console.error("获取商品数据失败：", error);
      }
    };
    const addGoodToCart = async () => {
      const token = common_vendor.index.getStorageSync("token");
      const params = {
        dish_id: parseInt(id.value)
      };
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        try {
          const response = await common_api_index.addToCart(params);
          const cartId = response.data.data.cart_id;
          common_vendor.index.setStorageSync("cart_id", cartId);
          if (!response.data.code) {
            common_vendor.index.showToast({ title: "已加入购物车" });
          }
        } catch (error) {
          console.error("加入购物车失败：", error);
        }
      }
    };
    const buyNow = (e) => {
      const token = common_vendor.index.getStorageSync("token");
      let goodsId = e.currentTarget.dataset["id"];
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/order/order-confirm/order-confirm?id=" + goodsId
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: picUrl.value,
        b: common_vendor.t(price.value),
        c: common_vendor.t(name.value),
        d: common_vendor.t(description.value),
        e: common_vendor.o(addGoodToCart),
        f: id.value,
        g: common_vendor.o(buyNow),
        h: id.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
