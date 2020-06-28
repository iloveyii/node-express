let request = require('supertest');
require('dotenv').config();


const PORT = process.env.NODE_ENV.PORT || 6600;
request = request.bind(request, `http://localhost:${PORT}`);

describe('/GET users', () => {
    it('it should get all the users', async () => {
        const res = await request(null)
            .get('/api/v1/users')
            .send({
                userId: 1,
                title: 'test is cool',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.length).toBeGreaterThan(0)
    })
})