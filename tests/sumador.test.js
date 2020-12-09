const request = require('supertest')
const app = require('../server')


describe('Get Endpoints', () => {
 

  it('sumador ', async () => {
    const sumador1 = 15;
    const sumador2 = 90;
    
    const res = await request(app).get(`/retoibm/sumar/${sumador1}/${sumador2}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('resultado');
  });

})