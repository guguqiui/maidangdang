"use strict";
const common_vendor = require("../vendor.js");
const common_utils_config = require("./config.js");
function getType(data, method) {
  let type = {};
  const token = common_vendor.index.getStorageSync("token");
  const authHeader = "Bearer " + token;
  if (method == "post" || method == "put" || method == "delete") {
    type = {
      method,
      data: {
        ...data
      },
      header: {
        "content-type": "application/json",
        "Authorization": authHeader
      }
    };
  } else {
    type = {
      method,
      params: {
        ...data
      },
      header: {
        "Authorization": authHeader
      }
    };
  }
  return type;
}
function Request(data, url, method) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: common_utils_config.baseURL + url,
      ...getType(data, method),
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.log("err");
        reject(err);
      }
    });
  }).catch((err) => console.log(err));
}
function request(data, url, method) {
  return Request(data, url, method);
}
exports.request = request;
