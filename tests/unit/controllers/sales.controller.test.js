const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { allSales, salesId1, resultCreateSale, editedSale } = require('../mocks/sales.controller.mock');
const statusMap = require('../../../src/utils/statusMap');
const { salesController } = require('../../../src/controllers');
const { salesMsgs } = require('../../../src/utils/errorMsgs');

chai.use(sinonChai);

describe('Testa funcionalidade do salesController', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Testa se retorna todas as vendas na rota get sem id', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getAllSales').resolves({ err: null, item: allSales });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.OK);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Testa se retorna as vendas referente ao id passado por parametro', async function () {
    const res = {};
    const req = {
      params: {
      id: 1,
    } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getSalesById').resolves({ err: null, item: salesId1 });

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.OK);
    expect(res.json).to.have.been.calledWith(salesId1);
  });

   it('Testa se retorna erro com id de venda inexistente', async function () {
    const res = {};
    const req = {
      params: {
      id: 999,
    } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getSalesById')
      .resolves({ err: 'SALE_NOT_FOUND', message: salesMsgs.notFoud });

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.SALE_NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: salesMsgs.notFoud });
   });

  it('Testa requisição para registrar nova compra', async function () {
    const res = {};
    const req = { body: [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'registerSales')
      .resolves({ err: null, item: resultCreateSale });

    await salesController.registerSales(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_CREATED_SALE);
    expect(res.json).to.have.been.calledWith(resultCreateSale);
  });

  it('Testa requisição para editar compra', async function () {
    const res = {};
    const req = { params: { id: 3 },
body: [
  {
    productId: 1,
    quantity: 6,
  },
  {
    productId: 2,
    quantity: 10,
  },
] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'updateSale')
      .resolves({ err: null, item: editedSale });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_EDITED_SALE);
    expect(res.json).to.have.been.calledWith(editedSale);
  });

  it('Testa requisição para excluir compra', async function () {
     const res = {};
    const req = { params: { id: 3 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'deleteSale')
      .resolves({ err: null });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(statusMap.SUCCESSFULLY_DELETED_SALE);
  });
});
