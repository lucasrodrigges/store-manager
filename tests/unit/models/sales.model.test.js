const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { salesModel } = require('../../../src/models');
const { allSales, salesId1, salesId1WithoutDate } = require('../mocks/sales.controller.mock');
const connection = require('../../../src/models/connection');
const { salesMsgs } = require('../../../src/utils/errorMsgs');
const {
  saleRequest,
  resolvesNewSale,
  resolversInsertSaleProducts,
  resolvesDeleteSale, resultUpdate } = require('../mocks/sales.model.mock');

chai.use(sinonChai);

describe('Testa funcinamento do salesModel', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Testa se retorna todas as vendas sem id passado por parâmetro', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const sales = await salesModel.getAllSales();

    expect(sales.item).to.be.a('array');
    expect(sales.item).to.be.deep.equal(allSales);
  });

  it('Testa se retorna as vendas referente ao id passado pro parâmetro', async function () {
     sinon.stub(connection, 'execute').resolves([salesId1]);
    const sales = await salesModel.getSalesByIdWithDate(1);

    expect(sales.err).to.be.equal(null);
    expect(sales.item).to.be.a('array');
    expect(sales.item).to.be.deep.equal(salesId1);
    expect(sales.message).to.be.equal(undefined);
  });

  it('Testa se retorna erro com id de venda inexistente', async function () {
    sinon.stub(connection, 'execute')
      .resolves([[]]);
    const sales = await salesModel.getSalesByIdWithDate(9999);

    expect(sales.err).to.be.equal('SALE_NOT_FOUND');
    expect(sales.message).to.be.equal(salesMsgs.notFoud);
    expect(sales.item).to.be.equal(undefined);
  });

  it('Testa funcionamento de "getSalesById"', async function () {
    sinon.stub(connection, 'execute')
      .resolves([salesId1WithoutDate]);
    const sales = await salesModel.getSalesById(1);

    expect(sales.err).to.be.equal(null);
    expect(sales.message).to.be.equal(undefined);
    expect(sales.item).to.be.deep.equal(salesId1WithoutDate);
  });

  it('testa funcionamento de createNewSale', async function () {
    sinon.stub(connection, 'execute').resolves([resolvesNewSale]);
    const saleResult = await salesModel.createNewSale();

    expect(saleResult).to.be.deep.equal(resolvesNewSale);
  });

  it('testa funcionamento de insertInSalesProducts', async function () {
    sinon.stub(connection, 'execute').resolves([resolversInsertSaleProducts]);
    const salesProductsResult = await salesModel
      .insertInSalesProducts(saleRequest, resolversInsertSaleProducts);

    expect(salesProductsResult).to.be.deep.equal(resolversInsertSaleProducts);
  });

  it('testa funcionamento de updateSale', async function () {
    sinon.stub(connection, 'execute').resolves(resultUpdate);
    const deleteResult = await salesModel
      .updateSale(4, saleRequest);

    expect(deleteResult).to.be.deep.equal(resultUpdate);
  });

  it('testa funcionamento de deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves([resolvesDeleteSale]);
    const deleteResult = await salesModel
      .deleteSale(4, resolvesDeleteSale);

    expect(deleteResult).to.be.deep.equal({ err: null });
  });
});
