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
        expect(res.body.data.length).toBeGreaterThanOrEqual(0)
    });
});

// -------------------------------------------------------------------
// API Routes - Get a user only when logged in token is present
// -------------------------------------------------------------------

describe('/GET a user with id', () => {
    let id = 0;
    let token = null;

    const user = {
        "email": "read-test-user1@email.com",
        "password": "read-test-user1-pass"
    };


    it('it should create a new user to read later', async () => {
        const res = await request(null)
            .post('/api/v1/users')
            .send({user})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        console.log('read test ', res.body)
        expect(res.body.success).toBeTruthy();
        id = res.body.data[0].id;
    });

    it('it should not get the user without token', async () => {
        const res = await request(null)
            .get(`/api/v1/users/${id}`)
            .send({})
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
    });

    it('it should get the use log in and get a token', async () => {
        const res = await request(null)
            .post('/api/v1/login')
            .send({user})
        expect(res.body).toHaveProperty('success')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('token')
        token = res.body.data[0].token;
    });


    it('it should get the user with a token', async () => {
        const res = await request(null)
            .get(`/api/v1/users/${id}`)
            .set('Authorization', 'bearer ' + token)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('email')
        expect(res.body.success).toBeTruthy()
    });
});


