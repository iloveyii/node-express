let request = require('supertest');
require('dotenv').config();

// -------------------------------------------------------------------
// API Routes - DB must contain tables - Or run sequelize/npm run test
// -------------------------------------------------------------------

const PORT = process.env.NODE_ENV.PORT || 6600;
request = request.bind(request, `http://localhost:${PORT}`);
const user = {
    "email": "delete-test-user@email.com",
    "password": "delete-test-user-pass"
};

describe('/DELETE a user with id', () => {
    let token = null;
    let id;

    it('it should create a user', async () => {
        const res = await request(null)
            .post('/api/v1/users')
            .send({user})
        console.log('delete test', res.body);
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success')
        expect(res.body.success).toBeTruthy()
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0].email).toBe(user.email)
        id = res.body.data[0].id
    });

    it('it should not delete the user without a token', async () => {
        const res = await request(null)
            .delete(`/api/v1/users/${id}`)
            .send({})
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
    });

    it('it should get the user log in and get a token', async () => {
        const res = await request(null)
            .post('/api/v1/login')
            .send({user})
        console.log('delete test', res.body);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body.success).toBeTruthy()
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('token')
        token = res.body.data[0].token;
    });


    it('it should delete the user with the token', async () => {
        const res = await request(null)
            .delete(`/api/v1/users/${id}`)
            .set('Authorization', 'bearer ' + token)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.success).toBeTruthy()
    });
});


