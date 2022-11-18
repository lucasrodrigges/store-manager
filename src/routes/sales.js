const route = require('express').Router();

const { salesController } = require('../controllers');
const { validateInputs } = require('../middlewares/valideSalesInputs');

route.get('/', salesController.getAllSales);

route.get('/:id', salesController.getSalesById);

route.post('/', validateInputs, salesController.registerSales);

route.put('/:id', validateInputs, salesController.updateSale);

route.delete('/:id', salesController.deleteSale);

module.exports = route;
