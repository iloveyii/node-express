let request = require('supertest');
require('dotenv').config();

// -------------------------------------------------------------------
// API Routes - DB must contain tables - Or run sequelize/npm run test
// -------------------------------------------------------------------

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
    });
});


describe('/GET a user with id', () => {
    let token = null;
    it('it should not get the user without token', async () => {
        const res = await request(null)
            .get('/api/v1/users/1')
            .send({})
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
    });

    it('it should get the use log in and get a token', async () => {
        const res = await request(null)
            .post('/api/v1/login')
            .send(
                {
                    "user": {
                        "email": "user1@email.com",
                        "password": "pass1"
                    }
                }
            )
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('token')
        token = res.body.data.token;

    });


    it('it should get the user with a token', async () => {
        const res = await request(null)
            .get('/api/v1/users/1')
            .set('Authorization', 'bearer ' + token)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('id')
        expect(res.body.data).toHaveProperty('email')
        expect(res.body.success).toBeTruthy()
    });
});


