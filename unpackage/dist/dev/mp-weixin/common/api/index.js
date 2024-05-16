"use strict";
const common_utils_request = require("../utils/request.js");
function login(params) {
  return common_utils_request.request(params, "user/login", "post").then((resp) => resp);
}
function register(params) {
  return common_utils_request.request(params, "user/register", "post").then((resp) => resp);
}
exports.login = login;
exports.register = register;
