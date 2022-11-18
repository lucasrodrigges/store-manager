const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { allSales, salesId1 } = require('../mocks/sales.controller.mock');
const { produtByIdResult, newSaleResult, insertSaleResult, getSalesByIdResult, bodyReqNewSale, responseResult } = require('../mocks/sales.service.mock');

describe('Testa funcionamento de salesService', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Testa retorno de "getAllSales"', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves({ err: null, item: allSales });
    const sales = await saleService.getAllSales();

    expect(sales.err).to.be.equal(null);
    expect(sales.item).to.be.a('array');
    expect(sales.item).to.be.deep.equal(allSales);
    expect(sales.message).to.be.equal(undefined);
  });

  it('Testa retorno de "getSalesById"', async function () {
    sinon.stub(salesModel, 'getSalesByIdWithDate').resolves({ err: null, item: salesId1 });
    const sales = await saleService.getSalesById(1);

    expect(sales.err).to.be.equal(null);
    expect(sales.item).to.be.a('array');
    expect(sales.item).to.be.deep.equal(salesId1);
    expect(sales.message).to.be.equal(undefined);
  });

  it('Testa retorno de "registerSales"', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(produtByIdResult);
    sinon.stub(salesModel, 'createNewSale').resolves(newSaleResult);
    sinon.stub(salesModel, 'insertInSalesProducts').resolves(insertSaleResult);
    sinon.stub(salesModel, 'getSalesById').resolves(getSalesByIdResult);

    const sales = await saleService.registerSales(bodyReqNewSale);

    expect(sales.err).to.be.equal(null);
    expect(sales.item).to.be.a('object');
    expect(sales.item).to.be.deep.equal(responseResult);
    expect(sales.message).to.be.equal(undefined);
  });

  // it('Testa retorno de "updateSale"', async function () {
  //   sinon.stub(salesModel, 'getSalesById').resolves({
  //       err: null,
  //       item: [
  //         { product_id: 1, quantity: 5 },
  //         { product_id: 2, quantity: 10 },
  //       ],
  //     });
  //   sinon.stub(productsModel, 'getProductsById').resolves([
  //       { err: null, item: { id: 1, name: 'Martelo de Thor' } },
  //       {
  //         err: null,
  //         item: { id: 2, name: 'Traje de encolhimento' },
  //       },
  //     ]);
  //   sinon.stub(salesModel, 'updateSale').resolves([
  //     {
  //       fieldCount: 0,
  //       affectedRows: 1,
  //       insertId: 0,
  //       info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  //       serverStatus: 2,
  //       warningStatus: 0,
  //       changedRows: 1,
  //     },
  //     {
  //       fieldCount: 0,
  //       affectedRows: 1,
  //       insertId: 0,
  //       info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  //       serverStatus: 2,
  //       warningStatus: 0,
  //       changedRows: 0,
  //     },
  //   ]);

  //   const updateResult = await salesModel.updateSale(1, [
  //       {
  //         productId: 1,
  //         quantity: 12,
  //       },
  //       {
  //         productId: 2,
  //         quantity: 2,
  //       },
  //   ]);

  //   sinon.reset();

  //   sinon.stub(salesModel, 'getSalesById').resolves({
  //       err: null,
  //       item: [
  //         { product_id: 1, quantity: 12 },
  //         { product_id: 2, quantity: 2 },
  //       ],
  //     });

  //   // expect(updateResult.err).to.be.equal(null);
  //   // expect(updateResult.item).to.be.a('object');
  //   // expect(updateResult.item).to.be.deep.equal(responseResult);
  //   // expect(updateResult.message).to.be.equal(undefined);
  // });
});
