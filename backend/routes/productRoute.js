const express = require("express");
const { route } = require("../app");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../Controller/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
