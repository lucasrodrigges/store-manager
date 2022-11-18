const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productsByQuery = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
];

const resultCreateProducts = {
    id: 4,
    name: 'ProdutoX',
};

const editedProduct = {
    id: 4,
    name: 'ProdutoY',
};

const newProduct = { id: 10, name: 'Novo produto' };

const editedProductModel = { id: 10, name: 'Nome alterado' };

module.exports = {
  allProducts,
  productsByQuery,
  resultCreateProducts,
  editedProduct,
  newProduct,
  editedProductModel,
};
