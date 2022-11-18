const statusMap = require('../utils/statusMap');
const { checkSale } = require('../utils/validations/schemas/salesSchemas');

const validateInputs = (req, res, next) => {
  const sales = req.body;
  const invalidSale = sales.find((sale) => checkSale.validate(sale).error);

  if (invalidSale) {
    const result = checkSale.validate(invalidSale);

    return res.status(statusMap[result.error.details[0].type])
      .json({ message: result.error.details[0].message });
  }

  next();
};

module.exports = {
  validateInputs,
};
