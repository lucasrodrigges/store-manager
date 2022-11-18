const camelize = require('camelize');
const { salesMsgs } = require('../utils/errorMsgs');
const conn = require('./connection');

const getAllSales = async () => {
  const [result] = await conn.execute(
    `SELECT sale_id, product_id, quantity, date FROM sales_products
    INNER JOIN sales
    ON sales_products.sale_id = sales.id`,
  );

  return { err: null, item: result.map((el) => camelize(el)) };
};

const getSalesById = async (id) => {
  const [result] = await conn.execute(
    'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?', [id],
  );

  if (!result.length) return { err: 'SALE_NOT_FOUND', message: salesMsgs.notFoud };

  return { err: null, item: result };
};

const getSalesByIdWithDate = async (id) => {
  const [result] = await conn.execute(
    `SELECT product_id, quantity, date FROM sales_products
    INNER JOIN sales
    ON sales_products.sale_id = sales.id
     WHERE id = ?`, [id],
  );

  if (!result.length) return { err: 'SALE_NOT_FOUND', message: salesMsgs.notFoud };

  return { err: null, item: result.map((el) => camelize(el)) };
};

const createNewSale = async () => {
  const [saleResult] = await conn.execute(
    'INSERT INTO sales (date) VALUES (?)', [new Date()],
  );

  return saleResult;
};

const insertInSalesProducts = async (sales, saleResult) => {
  const VALUES = sales.map(() => '(?, ?, ?)');
  const id = saleResult.insertId;
  const salesWithId = sales.map((el) => ({ id, ...el }));
  const newSales = salesWithId.reduce((acc, curr) => [...acc, ...Object.values(curr)], []);

  if (saleResult.affectedRows > 0) {
    const [salesProductsResult] = await conn.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${VALUES}`,
      newSales,
    );

    return salesProductsResult;
  }
};

const updateSale = async (id, sales) => {
  const updates = sales.map(async ({ quantity, productId }) => {
    const [result] = await conn.execute(
    `UPDATE sales_products
    SET quantity = ?
    WHERE product_id = ? AND sale_id = ?`, [quantity, productId, id],
    );

    return result;
  });

  const res = await Promise.all(updates);

  return res;
};

const deleteSale = async (id) => {
  const [result] = await conn.execute(
    'DELETE FROM sales WHERE id = ?', [id],
  );

  if (result.affectedRows > 0) return { err: null };
};

module.exports = {
  getAllSales,
  getSalesById,
  getSalesByIdWithDate,
  createNewSale,
  updateSale,
  deleteSale,
  insertInSalesProducts,
};
