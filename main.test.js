const request = require('supertest');
const app = require('./app');

describe('POST /findMedianPrimes', () => {
  it('should return the median prime numbers for a valid input', async () => {
    const response = await request(app)
      .post('/findMedianPrimes')
      .send({ n: 10 });
    expect(response.status).toBe(200);
    
    expect(response.body).toEqual({ medianPrimes: [3, 5] });
  });

  it('should return an error for an invalid input', async () => {
    const response = await request(app)
      .post('/findMedianPrimes')
      .query({ n: -1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid input' });
  });
});
