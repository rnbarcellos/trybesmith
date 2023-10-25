import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 201 and the created product', async function () {
    // Arrange
    const productToCreate = {
      name: 'Product 1',
      price: '10.00',
      orderId: 1,
    };

    const createdProduct = ProductModel.build({
      id: 1,
      ...productToCreate,
    });

    const { name, price } = productToCreate;
    const bodyResponse = {
      id: 1,
      name,
      price,
    }

    sinon.stub(ProductModel, 'create').resolves(createdProduct);

    // Act
    const response = await chai.request(app).post('/products').send(productToCreate);

    // Assert
    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(bodyResponse);
  });
});
