const { productsMsgs } = require('../utils/errorMsgs');
const conn = require('./connection');

const getAllProducts = async () => {
  const [products] = await conn.execute(
    'SELECT * FROM products',
  );
  return { err: null, item: products };
};

const getProductsById = async (id) => {
  const [[product]] = await conn.execute(
    'SELECT * FROM products WHERE id = ?', [id],
  );

  if (!product) return { err: 'PRODUCT_NOT_FOUND', message: productsMsgs.notFound };
  return { err: null, item: product };
};

const createProduct = async (productName) => {
const [result] = await conn.execute(
    'INSERT INTO products (name) VALUES(?)', [productName],
);
  return result;
};

const updateProduct = async (id, name) => {
  const [result] = await conn.execute(
    'UPDATE products SET name = ? WHERE id = ?', [name, id],
  );

  return result;
};

const deleteProduct = async (id) => {
  const [result] = await conn.execute(
    'DELETE FROM products WHERE id = ?', [id],
  );

  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
