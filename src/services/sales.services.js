const camelize = require('camelize');
const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  const res = await salesModel.getAllSales();

  return res;
};

const getSalesById = async (id) => {
  const res = await salesModel.getSalesByIdWithDate(id);

  return res;
};

const registerSales = async (sales) => {
  const invalidProduct = await sales
    .map(async (el) => ((productsModel.getProductsById(el.productId))));
  const result = (await Promise.all(invalidProduct)).find((el) => el.err);

  if (result) return result;

  const saleResult = await salesModel.createNewSale();
  const id = saleResult.insertId;
  const salesProductsResult = await salesModel.insertInSalesProducts(sales, saleResult);

  if (salesProductsResult.affectedRows > 0) {
    const res = await salesModel.getSalesById(id);
    const item = { id, itemsSold: res.item.map((el) => camelize(el)) };

      return { err: null, item };
    }
};

const updateSale = async (id, sales) => {
  const validSale = await salesModel.getSalesById(id);

  if (validSale.err) return validSale;

  const invalidProduct = await sales
    .map(async (el) => ((productsModel.getProductsById(el.productId))));
  const result = (await Promise.all(invalidProduct)).find((el) => el.err);

  if (result) return result;

  const res = await salesModel.updateSale(id, sales);

  if (res.every((el) => el.changedRows)) {
    const updateResult = await salesModel.getSalesById(id);

    return {
      err: null,
      item: { saleId: id, itemsUpdated: updateResult.item.map((el) => camelize(el)) },
    };
  }
};

const deleteSale = async (id) => {
  const findProduct = await salesModel.getSalesById(id);

  if (findProduct.err) return findProduct;

  const res = await salesModel.deleteSale(id);

  return res;
 };

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
  updateSale,
  deleteSale,
};
