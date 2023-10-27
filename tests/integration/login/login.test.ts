import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 200 and the token', async function () {
    // Arrange
    const userToLogin = {
      username: 'username',
      password: bcrypt.hashSync('password', 8),
    };

    const user = UserModel.build({
      id: 1,
      ...userToLogin,
      vocation: 'Warrior',
      level: 1,
    });

    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(true);

    // Act
    const response = await chai.request(app).post('/login').send(userToLogin);

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });
});
