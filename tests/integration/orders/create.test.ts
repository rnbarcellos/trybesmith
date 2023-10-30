import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 404 if user does not exist', async function () {
    const unexistentUserId = 999;
    const productIds = [1, 2, 3];
    const bodyResponse = {
      message: '"userId" not found',
    };

    sinon.stub(UserModel, 'findByPk').resolves(null);

    //get token
    const result = await chai.request(app).post('/login').send({
      username: 'Hagar',
      password: 'terrível',
    });
    const token = result.body.token;

    const response = await chai.request(app).post('/orders').send({
      productIds,
      userId: unexistentUserId,
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal(bodyResponse);
  });
});
