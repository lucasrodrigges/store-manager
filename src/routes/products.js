const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validateName');

route.get('/search', productsController.getProductsByName);

route.get('/', productsController.getAllProducts);

route.get('/:id', productsController.getProductsById);

route.post('/', validateName, productsController.createProduct);

route.put('/:id', validateName, productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;
