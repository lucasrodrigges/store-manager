const { checkSale } = require('./schemas/salesSchemas');

const validateSales = (sale) => {
  const res = checkSale.validate(sale);
  if (res.error) {
    return { err: res.error.details[0].type, message: res.error.details[0].message };
  }

   return { err: null };
};

module.exports = {
  validateSales,
};
