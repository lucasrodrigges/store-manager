const { saleService } = require('../services');
const statusMap = require('../utils/statusMap');

const getAllSales = async (_req, res) => {
  const response = await saleService.getAllSales();
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.OK).json(item);
};

const getSalesById = async (req, res) => {
  const response = await saleService.getSalesById(req.params.id);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.OK).json(item);
};

const registerSales = async (req, res) => {
  const response = await saleService.registerSales(req.body);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_CREATED_SALE).json(item);
};

const updateSale = async (req, res) => {
  const response = await saleService.updateSale(req.params.id, req.body);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_EDITED_SALE).json({ ...item });
};

const deleteSale = async (req, res) => {
  const response = await saleService.deleteSale(req.params.id);
  const { err, message, item } = response;

  if (err) return res.status(statusMap[err]).json({ message });

  return res.status(statusMap.SUCCESSFULLY_DELETED_SALE).json(item);
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
  updateSale,
  deleteSale,
};
