const productsSchemas = require('../utils/validations/schemas/productsSchemas');
const status = require('../utils/statusMap');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const result = productsSchemas.checkName.validate(name);

  if (result.error) {
    return res.status(status[result.error.details[0].type])
      .json({ message: result.error.details[0].message });
  }

  next();
};

module.exports = {
    validateName,
  };
