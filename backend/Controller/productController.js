const Product = require("../models/productModel");
const ErrorHander = require("../Utils/errorhander");
const AsyncErrors = require("../middleware/CatchAsyncError");
const ApiFeatures = require("../Utils/apifeatures");

//create Product--Admin
exports.createProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// update product---Admin

exports.updateProduct = AsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not available", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product

exports.deleteProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not available", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});

// Get All Product
exports.getAllProducts = AsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//Get Product Details

exports.getProductDetails = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not available", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
