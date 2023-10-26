import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import orderMocks from '../../mocks/orders.mock';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return all orders', async function () {
    const orders = await OrderModel.findAll();

    const response = await chai.request(app).get('/orders');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(orderMocks.findAllResponse);
  });
});
