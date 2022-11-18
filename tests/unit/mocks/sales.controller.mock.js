const allSales = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2022-11-15T16:45:31.000Z',
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2022-11-15T16:45:31.000Z',
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: '2022-11-15T16:45:31.000Z',
    },
];

const salesId1 = [
    {
      productId: 1,
      quantity: 5,
      date: '2022-11-15T16:45:31.000Z',
    },
    {
      productId: 2,
      quantity: 10,
      date: '2022-11-15T16:45:31.000Z',
    },
];

const salesId1WithoutDate = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
];

const resultCreateSale = {
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

const editedSale = {
    saleId: '3',
    itemsUpdated: [
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 10,
      },
    ],
};

module.exports = {
  allSales,
  salesId1,
  salesId1WithoutDate,
  resultCreateSale,
  editedSale,
};
