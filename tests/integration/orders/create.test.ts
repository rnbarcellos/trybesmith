import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5ODcxMDE2Nn0.6zgrz184tviLfKwaf9bAjHzdRXLCQkARzTdVeouUymU";

  it('should return 404 if user does not exist', async function () {
    const unexistentUserId = 999;
    const productIds = [1, 2, 3];
    const bodyResponse = {
      message: '"userId" not found',
    };

    sinon.stub(UserModel, 'findByPk').resolves(null);

    const response = await chai.request(app).post('/orders').send({
      productIds,
      userId: unexistentUserId,
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal(bodyResponse);
  });

  it('should return 201 if order is created', async function () {
    const productIds = [1];
    const userId = 1;
    const bodyResponse = {
      productIds,
      userId,
    };
    const user = UserModel.build(loginMock.validUser);
    const order = OrderModel.build({ id: 22, userId });

    sinon.stub(UserModel, 'findByPk').resolves(user);
    sinon.stub(OrderModel, 'create').resolves(order);
    sinon.stub(ProductModel, 'update').resolves([1]);

    const response = await chai.request(app).post('/orders').send({
      productIds,
      userId,
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(bodyResponse);
  });
});
