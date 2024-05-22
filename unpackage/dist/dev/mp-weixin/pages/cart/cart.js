"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_index = require("../../common/api/index.js");
require("../../common/utils/request.js");
require("../../common/utils/config.js");
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const id = common_vendor.ref("");
    const cartId = common_vendor.ref("");
    const dataList = common_vendor.ref([]);
    const selectedCartIndexes = common_vendor.ref([]);
    const selectedSum = common_vendor.ref("￥0");
    const isLoggedIn = common_vendor.ref(false);
    const gotoLoginPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const queryData = async () => {
      try {
        const response = await common_api_index.queryCart(cartId.value);
        if (response.data.code) {
          dataList.value = response.data.data.cartItems;
          selectedCartIndexes.value = [];
          selectedSum.value = "￥0";
        }
      } catch (error) {
        console.error("获取购物车数据失败：", error);
      }
    };
    const increaseQuantity = async (e) => {
      let index = e.currentTarget.dataset["index"];
      let cartItem = dataList.value[index];
      console.log(cartItem);
      let dishId = cartItem.DishID;
      cartItem.Quantity + 1;
      const params = {
        dish_id: parseInt(dishId)
      };
      await common_api_index.addToCart(params);
      updateSelectionSum();
    };
    const decreaseQuantity = async (e) => {
      let index = e.currentTarget.dataset["index"];
      let cartItem = dataList.value[index];
      let dishId = cartItem.DishID;
      let cartId2 = cartItem.CartID;
      const token = common_vendor.index.getStorageSync("token");
      console.log(token);
      console.log(dishId);
      console.log(cartId2);
      const params = {
        cart_id: 2,
        dish_id: 1
      };
      const response = await common_api_index.deleteCart(params);
      console.log(response);
      updateSelectionSum();
    };
    const changeSelection = (e) => {
      let index = e.currentTarget.dataset["index"];
      let isChecked = e.detail.value;
      if (isChecked === true && !selectedCartIndexes.value.includes(index)) {
        selectedCartIndexes.value.push(index);
      } else {
        let pos = selectedCartIndexes.value.indexOf(index);
        if (pos > -1) {
          selectedCartIndexes.value.splice(pos, 1);
        }
      }
      updateSelectionSum();
    };
    const updateSelectionSum = () => {
      var sum = 0;
      if (selectedCartIndexes.value != null && typeof selectedCartIndexes.value != "undefined") {
        selectedCartIndexes.value.forEach((elem, index) => {
          sum += dataList.value[elem].Quantity * dataList.value[elem].Price;
        });
      }
      selectedSum.value = "￥" + sum;
    };
    const gotoConfirmOrder = (e) => {
      var cartIds = "";
      if (selectedCartIndexes.value != null && typeof selectedCartIndexes.value != "undefined") {
        selectedCartIndexes.value.forEach((elem, index) => {
          cartIds += dataList.value[elem].id + ",";
        });
      }
      if (cartIds != "") {
        common_vendor.index.navigateTo({
          url: "/pages/order/order-confirm-from-cart/order-confirm-from-cart?ids=" + cartIds
        });
      }
    };
    common_vendor.onMounted(() => {
      var token = common_vendor.index.getStorageSync("token");
      cartId.value = common_vendor.index.getStorageSync("cart_id");
      if (token) {
        isLoggedIn.value = true;
        queryData();
      } else {
        isLoggedIn.value = false;
        dataList.value = [];
        selectedCartIndexes.value = [];
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(dataList.value, (item, bindex, i0) => {
          return {
            a: common_vendor.o(changeSelection, item.k),
            b: bindex,
            c: item.checked,
            d: item.squarePic,
            e: item.goodsId,
            f: common_vendor.t(item.Name),
            g: item.goodsId,
            h: common_vendor.t(item.Price),
            i: common_vendor.o(decreaseQuantity, item.k),
            j: bindex,
            k: common_vendor.t(item.Quantity),
            l: common_vendor.o(increaseQuantity, item.k),
            m: bindex,
            n: item.k
          };
        }),
        b: isLoggedIn.value
      }, isLoggedIn.value ? {
        c: common_vendor.t(selectedCartIndexes.value.length),
        d: common_vendor.t(selectedSum.value),
        e: id.value,
        f: common_vendor.n("buy-btn " + (selectedCartIndexes.value.length > 0 ? "btn-enabled" : "btn-disabled")),
        g: common_vendor.o(gotoConfirmOrder)
      } : {
        h: common_vendor.o(gotoLoginPage)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
