const Joi = require('joi');

const checkSale = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({});

module.exports = {
  checkSale,
};
