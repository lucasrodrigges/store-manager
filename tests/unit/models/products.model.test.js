const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts } = require('../mocks/products.model.mock');

describe('Testes para productsModel', function () {
  describe('Testa funcionamento de "getAllProducts"', function () {
    it('Testa se retorna um array com todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const products = await productsModel.getAllProducts();

      expect(products.item).to.be.a('array');
      expect(products.item).to.be.deep.equal(allProducts);
    });
  });

  describe('Testa funcionamento de "getProductsById"', function () {
    it('Testa se retorna produto com id passado como parâmetro', async function () {
      const productId = 1;
      const product = await productsModel.getProductsById(productId);
      expect(product.item).to.be.a('object');
      expect(product.item).to.be.deep.equal(allProducts[0]);
    });
  });

  describe('testa funcionamento do model de criação de produto', function () {
  beforeEach(function () { return sinon.restore(); });

    it('testa funcionamento de createProduct', async function () {
      sinon.stub(connection, 'execute').resolves([{
        affectedRows: 1,
        insertId: 5,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      }]);

      const result = await productsModel.createProduct('Novo produto');

      expect(result).to.be.deep.equal({ affectedRows: 1,
        insertId: 5,
        info: '',
        serverStatus: 2,
        warningStatus: 0 });
    });

    it('testa funcionamento de updateProduct', async function () {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        info: 'Rows matched: 0  Changed: 0  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0,
      }]);
      const result = await productsModel.updateProduct(10, 'Nome alterado');

      expect(result).to.be.deep.equal({
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        info: 'Rows matched: 0  Changed: 0  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0,
      });
    });

    it('Testa model que deleta produto do banco de dados', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productsModel.deleteProduct(10);

      expect(result).to.be.deep.equal({ affectedRows: 1 });
    });
  });
});
