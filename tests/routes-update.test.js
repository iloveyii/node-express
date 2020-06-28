let request = require('supertest');
require('dotenv').config();

// -------------------------------------------------------------------
// API Routes - DB must contain tables - Or run sequelize/npm run test
// -------------------------------------------------------------------

const PORT = process.env.NODE_ENV.PORT || 6600;
request = request.bind(request, `http://localhost:${PORT}`);

describe('/UPDATE a user with id', () => {
    let token = null;
    let id = 0;
    const user = {
        "email": "update-test-user1@email.com",
        "password": "update-test-user1-pass"
    };
    const user_update = {
        "email": "update-test-user@email.com",
        "password": "update-test-user-pass"
    };

    it('it should create a new user', async () => {
        const res = await request(null)
            .post('/api/v1/users')
            .send({user})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.success).toBeTruthy();
        id = res.body.data.id;
    });

    it('it should get the user logged in and get a token', async () => {
        const res = await request(null)
            .post('/api/v1/login')
            .send({user})

        expect(res.body).toHaveProperty('success')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('token')
        token = res.body.data.token;
    });


    it('it should update the user with the token', async () => {
        const res = await request(null)
            .put(`/api/v1/users/${id}`)
            .set('Authorization', 'bearer ' + token)
            .send({
                user: user_update
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.success).toBeTruthy()
    });
});


