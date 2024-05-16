"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const categories = common_vendor.ref([]);
    const goods = common_vendor.ref([]);
    const selectedCategory = common_vendor.ref("");
    const fetchCategories = () => {
      console.log("自我测试");
      common_vendor.axios.get("http://82.156.104.168:80/api/dish/list").then((res) => {
        categories.value = res.data;
        console.log(res);
      });
    };
    common_vendor.onMounted(() => {
      fetchCategories();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categories.value, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: category.id
          };
        }),
        b: common_vendor.f(categories.value, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: category.id,
            c: category.id
          };
        }),
        c: selectedCategory.value,
        d: common_vendor.o(($event) => selectedCategory.value = $event.target.value),
        e: goods.value.length > 0
      }, goods.value.length > 0 ? {
        f: common_vendor.f(goods.value, (good, k0, i0) => {
          return {
            a: common_vendor.t(good.name),
            b: good.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/lvqiuyuan/Desktop/前端/uni-app/maidangdang/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
