const produtByIdResult = [{ err: null, item: { id: 1, name: 'Martelo de Thor' } },
  { err: null, item: { id: 2, name: 'Traje de encolhimento' } }];

const newSaleResult = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 3,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
};

const insertSaleResult = {
        fieldCount: 0,
        affectedRows: 2,
        insertId: 0,
        info: 'Records: 2  Duplicates: 0  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
};

const getSalesByIdResult = {
         err: null,
          item: [{ product_id: 1, quantity: 1 },
         { product_id: 2, quantity: 5 }],
};

const bodyReqNewSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const responseResult = {
          id: 3,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ],
      };

module.exports = {
  produtByIdResult,
  newSaleResult,
  insertSaleResult,
  getSalesByIdResult,
  bodyReqNewSale,
  responseResult,
};
