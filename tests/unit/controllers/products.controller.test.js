const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const statusMap = require('../../../src/utils/statusMap');

const { allProducts, productsByQuery, resultCreateProducts, editedProduct } = require('../mocks/products.model.mock');

describe('Testes para productController', function () {
  describe('Testa funcionamento de "getAllProducts"', function () {
    it('Testa se retorna um array com todos os produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAllProducts').resolves({ err: null, item: allProducts });

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(statusMap.OK);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Testa funcionamento de "getProductsById"', function () {
    afterEach(function () { return sinon.restore(); });

    it('Testa se retorna produto com id passado como parâmetro', async function () {
      const productId = 1;
      const res = {};
      const req = { params: productId };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductsById').resolves({ err: null, item: allProducts[0] });
      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(statusMap.OK);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

     it('Testa se retorna erro ao passar id de produto inexistente', async function () {
      const productId = 999;
      const res = {};
      const req = { params: productId };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductsById')
        .resolves({ err: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(statusMap.PRODUCT_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  it('Testa requisição via query', async function () {
    const res = {};
    const req = {
      query: {
        q: 'Ma',
      } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductsByName')
        .resolves({ err: null, item: productsByQuery });

    await productsController.getProductsByName(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.OK);
    expect(res.json).to.have.been.calledWith(productsByQuery);
  });

  it('Testa requisição de cadastro de novo produto', async function () {
    const res = {};
    const req = { name: 'ProdutoX' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct')
        .resolves({ err: null, item: resultCreateProducts });

    await productsController.createProduct(req, res);

     expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_CREATED_PRODUCT);
    expect(res.json).to.have.been.calledWith(resultCreateProducts);
  });

   it('Testa requisição de update de produto existente', async function () {
    const res = {};
    const req = { params: { id: 4 }, name: 'ProdutoY' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct')
        .resolves({ err: null, item: editedProduct });

    await productsController.updateProduct(req, res);

     expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_UPDATED_PRODUCT);
    expect(res.json).to.have.been.calledWith(editedProduct);
   });

  it('Testa requisição de deletar produto existente', async function () {
    const res = {};
    const req = { params: { id: 4 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct')
        .resolves({ err: null });

    await productsController.deleteProduct(req, res);

     expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_DELETED_PRODUCT);
  });
});
