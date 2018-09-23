const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReviewInput(data) {
  let errors = {};

  // ensure data.x is a string, check with function created
  data.title = !isEmpty(data.title) ? data.title : "";
  data.externalid = !isEmpty(data.externalid) ? data.externalid : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Review must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  // add more

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
