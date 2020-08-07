const router = require("express").Router();

const { prodCatController } = require("../controller");

router.get("/produk-kategori/get", prodCatController.getProdCat);
router.get("/produk-kategori/get/:id", prodCatController.getProdCatById);
router.post("/produk-kategori/add", prodCatController.addProdCat);
router.delete(
  "/produk-kategori/delete/:id",
  prodCatController.deleteProductCategory
);
router.patch("/produk-kategori/update/:id", prodCatController.editProdCat);

module.exports = router;
