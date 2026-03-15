const validator = require("validator");

const validation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("Please enter the firstName");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("Please enter the firstName between 3-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "gender",
    "photoUrl",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};

const validateEditPassword = (req) => {
  const { password } = req.body;
  const isStrongPassword = validator.isStrongPassword(password);

  return isStrongPassword;
};
module.exports = { validation, validateEditProfileData, validateEditPassword };
