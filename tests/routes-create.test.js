let request = require('supertest');
require('dotenv').config();

// -------------------------------------------------------------------
// API Routes - DB must contain tables - Or run sequelize/npm run test
// -------------------------------------------------------------------

const PORT = process.env.NODE_ENV.PORT || 6600;
request = request.bind(request, `http://localhost:${PORT}`);
const user = {
    "email": "create-test-user@email.com",
    "password": "create-test-user-pass"
};

describe('/POST users', () => {
    it('it should create a user', async () => {
        const res = await request(null)
            .post('/api/v1/users')
            .send({user})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success')
        expect(res.body.success).toBeTruthy()
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0].email).toBe(user.email)
    });
});

