const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { allProducts } = require('../mocks/products.model.mock');
const { deleteResult } = require('../mocks/products.service.mock');

describe('Testes para productService', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Testa funcionamento de getAllProducts', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves({ item: allProducts });
    const products = await productService.getAllProducts();

    expect(products.item).to.be.a('array');
    expect(products.item).to.be.deep.equal(allProducts);
  });

  it('Testa funcionamento de getProductsById', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves({ item: allProducts[0] });

    const productId = 1;
    const product = await productService.getProductsById(productId);

    expect(product.item).to.be.a('object');
    expect(product.item).to.be.deep.equal(allProducts[0]);
  });

  it('Testa funcionamento de createProduct', async function () {
    sinon.stub(productsModel, 'createProduct')
      .resolves({
        fieldCount: 0,
        affectedRows: 1,
        insertId: 5,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      });
    sinon.stub(productsModel, 'getProductsById')
      .resolves({ err: null, item: { id: 1, name: 'Martelo de Thor' } });

    const product = await productService.createProduct('Novo Produto');

    expect(product.item).to.be.a('object');
    expect(product.item).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  it('Testa funcionamento de updateProduct', async function () {
    sinon.stub(productsModel, 'getProductsById')
      .resolves({ err: null, item: { id: 1, name: 'Martelo de Thor' } });
    sinon.stub(productsModel, 'updateProduct')
      .resolves({
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1,
      });

    const product = await productService.updateProduct(1, 'Novo Nome');

    expect(product.item).to.be.a('object');
    expect(product.item).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  it('Testa funcionamento de deleteProduct', async function () {
     sinon.stub(productsModel, 'getProductsById')
       .resolves({ err: null, item: { id: 1, name: 'Martelo de Thor' } });
     sinon.stub(productsModel, 'deleteProduct')
      .resolves(deleteResult);

    const deleteResponse = await productService.deleteProduct(1);

    expect(deleteResponse).to.be.deep.equal({ err: null });
  });

   it('Testa funcionamento de getProductsByName', async function () {
     sinon.stub(productsModel, 'getAllProducts')
       .resolves({ err: null, item: allProducts });

    const deleteResponse = await productService.getProductsByName('Ma');

     expect(deleteResponse).to.be.deep
       .equal({ err: null, item: [{ id: 1, name: 'Martelo de Thor' }] });
  });
});
