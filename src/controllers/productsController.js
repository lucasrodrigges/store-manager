const { productService } = require('../services');
const statusMap = require('../utils/statusMap');

const getAllProducts = async (_req, res) => {
  const response = await productService.getAllProducts();
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.OK).json(item);
 };

const getProductsById = async (req, res) => {
  const response = await productService.getProductsById(req.params.id);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.OK).json(item);
};

const getProductsByName = async (req, res) => {
  const response = await productService.getProductsByName(req.query.q);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.OK).json(item);
};

const createProduct = async (req, res) => {
  const response = await productService.createProduct(req.body);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_CREATED_PRODUCT).json(item);
};

const updateProduct = async (req, res) => {
  const response = await productService.updateProduct(req.params.id, req.body);
   const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_UPDATED_PRODUCT).json(item);
};

const deleteProduct = async (req, res) => {
  const response = await productService.deleteProduct(req.params.id);
   const { err, message } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_DELETED_PRODUCT).json();
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
