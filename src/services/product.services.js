const { productsModel } = require('../models');

const getAllProducts = async () => {
  const res = await productsModel.getAllProducts();

  return res;
};

const getProductsById = async (id) => {
  const res = await productsModel.getProductsById(id);

  return res;
};

const createProduct = async ({ name }) => {
  const result = await productsModel.createProduct(name);

  if (result.affectedRows > 0) {
    const res = await productsModel.getProductsById(result.insertId);

    return res;
  }
};

const updateProduct = async (id, { name }) => {
  const res = await productsModel.getProductsById(id);
  if (res.err) return res;

  const result = await productsModel.updateProduct(id, name);

  if (result.affectedRows > 0) {
    const { item } = await productsModel.getProductsById(id);

    return { err: null, item };
  }
};

const deleteProduct = async (id) => {
  const res = await productsModel.getProductsById(id);

  if (res.err) return res;

  const result = await productsModel.deleteProduct(id);

   if (result.affectedRows > 0) return { err: null };
};

const getProductsByName = async (query) => {
  const { item } = await productsModel.getAllProducts();
  const filterdProducts = item.filter(({ name }) => (
    name.toLowerCase().includes(query.toLowerCase())
  ));

  return { err: null, item: filterdProducts };
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
