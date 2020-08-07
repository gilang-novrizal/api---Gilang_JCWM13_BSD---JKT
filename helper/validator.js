const { body } = require("express-validator");

const registValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is Required")
    .isLength({ min: 6 })
    .withMessage("Username minimal 6 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email doesn't valid"),
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .matches(/[!@#$%^&*;]/)
    .withMessage("Password must include special characters")
    .matches(/[0-9]/)
    .withMessage("Password must include number")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 characters"),
];

module.exports = {
  registValidator,
};
