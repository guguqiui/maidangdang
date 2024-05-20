"use strict";
const common_utils_request = require("../utils/request.js");
function queryCategory() {
  return common_utils_request.request("", "/api/category/list", "get").then((resp) => resp);
}
function queryGoodsByCategory(category_id) {
  return common_utils_request.request("", `/api/dish/category?category_id=${category_id}`, "get").then((resp) => resp);
}
function getGoodInfo(id) {
  return common_utils_request.request("", `/api/dish/info?id=${id}`, "get").then((resp) => resp);
}
function getDishImage(dishId) {
  return common_utils_request.request("", `/api/dish/image?id=${dishId}`, "GET").then((resp) => resp);
}
function addToCart(params) {
  return common_utils_request.request(params, "/api/cart/add", "post").then((resp) => resp);
}
function queryCart(cart_id) {
  return common_utils_request.request("", `/api/cart/info?cart_id=${cart_id}`, "get").then((resp) => resp);
}
function deleteCart(params) {
  return common_utils_request.request(params, "/api/cart/delete", "delete").then((resp) => resp);
}
function search(keyword) {
  return common_utils_request.request("", `/api/dish/search?keyword=${keyword}`, "get").then((resp) => resp);
}
function login(params) {
  return common_utils_request.request(params, "/api/auth/login", "post").then((resp) => resp);
}
function register(params) {
  return common_utils_request.request(params, "/api/auth/register", "post").then((resp) => resp);
}
exports.addToCart = addToCart;
exports.deleteCart = deleteCart;
exports.getDishImage = getDishImage;
exports.getGoodInfo = getGoodInfo;
exports.login = login;
exports.queryCart = queryCart;
exports.queryCategory = queryCategory;
exports.queryGoodsByCategory = queryGoodsByCategory;
exports.register = register;
exports.search = search;
