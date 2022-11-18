const productsSchemas = require('./schemas/productsSchemas');

const validateName = (name) => {
  const res = productsSchemas.checkName.validate(name);
  if (res.error) {
    return { err: res.error.details[0].type, message: res.error.details[0].message };
  }
  return { err: null };
};

module.exports = {
  validateName,
};
