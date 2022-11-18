const saleRequest = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
const resolvesNewSale = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
};

const resolversInsertSaleProducts = {
  fieldCount: 0,
  affectedRows: 2,
  insertId: 0,
  info: 'Records: 2  Duplicates: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
};

const resultUpdate = [
   {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
   {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
];

const resolvesDeleteSale = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
};

module.exports = {
  saleRequest,
  resolvesNewSale,
  resolversInsertSaleProducts,
  resolvesDeleteSale,
  resultUpdate,
};
