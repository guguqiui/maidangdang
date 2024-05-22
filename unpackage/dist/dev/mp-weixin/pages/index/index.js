"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_index = require("../../common/api/index.js");
require("../../common/utils/request.js");
require("../../common/utils/config.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const categories = common_vendor.ref([]);
    const goods = common_vendor.ref([]);
    const selectedCategory = common_vendor.ref(0);
    const getCategories = async () => {
      try {
        const response = await common_api_index.queryCategory();
        categories.value = response.data.data.categories;
        getGoodsByCategory();
      } catch (error) {
        console.error("获取菜品分类失败：", error);
      }
    };
    const getGoodsByCategory = async () => {
      try {
        const response = await common_api_index.queryGoodsByCategory(selectedCategory.value + 1);
        const dishes = response.data.data.dishes;
        for (const dish of dishes) {
          try {
            const imageResponse = await common_api_index.getDishImage(dish.DishId);
            dish.Picture = `data:image/jpeg;base64,${imageResponse.data.data.image}`;
          } catch (imageError) {
            console.error(`获取图片失败: ${imageError}`);
            dish.Picture = "";
          }
        }
        goods.value = dishes;
      } catch (error) {
        console.error("获取当前分类下的菜品失败：", error);
      }
    };
    const tabSelect = (e) => {
      selectedCategory.value = e.currentTarget.dataset.id;
      getGoodsByCategory();
    };
    const gotoSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const gotoGoodsDetail = (e) => {
      let goodsId = e.currentTarget.dataset["id"];
      common_vendor.index.navigateTo({
        url: "/pages/goods/goods?id=" + goodsId
      });
    };
    common_vendor.onMounted(() => {
      getCategories();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSearch),
        b: common_vendor.f(categories.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.Category),
            b: common_vendor.n("tab  " + (index == selectedCategory.value ? "tab-selected" : "")),
            c: common_vendor.o(tabSelect, item.k),
            d: index,
            e: item.k
          };
        }),
        c: common_vendor.f(goods.value, (item, index, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
