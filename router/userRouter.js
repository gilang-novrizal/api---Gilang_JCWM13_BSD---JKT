const router = require("express").Router();
const { registValidator } = require("../helper/validator");

const { userController } = require("../controller");

router.post("/register", registValidator, userController.register);
router.post("/login", userController.login);
router.patch("/deactive/:id", userController.deactive);
router.patch("/close/:id", userController.close);
router.patch("/active/:id", userController.active);

module.exports = router;
