const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config");

const helper = {};

helper.isValidEmail = function (email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

helper.isValidName = function (sName) {
  const reName = /^[a-zA-Z](( )?[a-zA-Z]+)*$/;
  return reName.test(sName);
};

helper.isValidPassword = function (sPassword) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,64}$/;
  return re.test(sPassword);
};

helper.makeid = function (length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

helper.encryptPassword = function (password) {
  return crypto
    .createHmac("sha256", config.JWT_SECRET)
    .update(password)
    .digest("hex");
};

helper.clone = function (data = {}) {
  const originalData = data.toObject ? data.toObject() : data; // for mongodb result operations
  const eType = originalData ? originalData.constructor : "normal";
  if (eType === Object) return { ...originalData };
  if (eType === Array) return [...originalData];
  return data;
  // return JSON.parse(JSON.stringify(data));
};

helper.encodeToken = function (body, expTime) {
  try {
    return expTime
      ? jwt.sign(this.clone(body), config.JWT_SECRET, expTime)
      : jwt.sign(this.clone(body), config.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

module.exports = helper;
