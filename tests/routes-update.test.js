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

    it('it should create a new user that we login later', async () => {
        const res = await request(null)
            .post('/api/v1/users')
            .send({user})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        console.log(res.body);
        expect(res.body.success).toBeTruthy();
        id = res.body.data[0].id;
    });

    it('it should get the user logged in and get a token', async () => {
        const res = await request(null)
            .post('/api/v1/login')
            .send({user})
        console.log(res.body)
        expect(res.body).toHaveProperty('success')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('token')
        token = res.body.data[0].token;
    });


    it('it should update the user with the token', async () => {
        const res = await request(null)
            .put(`/api/v1/users/${id}`)
            .set('Authorization', 'bearer ' + token)
            .send({
                user: user_update
            })
        console.log(res.body, id);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.success).toBeTruthy()
    });
});


