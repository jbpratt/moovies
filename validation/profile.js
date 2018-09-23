const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // ensure data.x is a string, check with function created
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  // data.interests = !isEmpty(data.interests) ? data.interests : "";

  if (!Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }
  // if (Validator.isEmpty(data.interests)) {
  //   errors.interests = 'Interests field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};