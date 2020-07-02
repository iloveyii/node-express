let request = require('supertest');
require('dotenv').config();

// -------------------------------------------------------------------
// API Routes - DB must contain tables - Or run sequelize/npm run test
// -------------------------------------------------------------------

const PORT = process.env.NODE_ENV.PORT || 6600;
request = request.bind(request, `http://localhost:${PORT}`);


describe('/DELETE a user with id', () => {
    let token = null;
    it('it should not delete the user without a token', async () => {
        const res = await request(null)
            .delete('/api/v1/users/1')
            .send({})
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
    });

    it('it should get the user log in and get a token', async () => {
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
        expect(res.body.data[0]).toHaveProperty('token')
        token = res.body.data[0].token;
    });


    it('it should delete the user with the token', async () => {
        const res = await request(null)
            .delete('/api/v1/users/1')
            .set('Authorization', 'bearer ' + token)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.success).toBeTruthy()
    });
});


