"use strict";
const common_vendor = require("../vendor.js");
const common_utils_config = require("./config.js");
function getType(data, method) {
  let type = {};
  if (method == "post" || method == "put") {
    type = {
      method,
      data: {
        ...data
      },
      header: {
        "content-type": "application/json",
        "Authorization": common_vendor.index.getStorageSync("token")
      }
    };
  } else {
    type = {
      method,
      params: {
        ...data
      },
      header: {
        "Authorization": common_vendor.index.getStorageSync("token")
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
