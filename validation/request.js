const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRequestInput(data) {
  let errors = {};

  // ensure data.x is a string, check with function created
  data.title = !isEmpty(data.title) ? data.title : "";
  data.externalid = !isEmpty(data.externalid) ? data.externalid : "";

  // empty string validators
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.externalid)) {
    errors.externalid = "External id field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};