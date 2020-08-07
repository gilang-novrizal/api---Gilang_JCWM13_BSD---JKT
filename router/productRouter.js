const router = require("express").Router();

const { productController } = require("../controller");

router.get("/produk/get", productController.getProduct);
// router.get("/produk/get", productController.getProductByQuery);
router.get("/produk/get/:id", productController.getProductById);
router.get("/produk/get/page/:limit/:page", productController.getProductPage);
router.post("/produk/add", productController.addProduct);
router.patch("/produk/edit/:id", productController.editProduct);
router.delete("/produk/delete/:id", productController.deleteProduct);

module.exports = router;
