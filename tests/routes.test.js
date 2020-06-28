const request = require('supertest')
const app = require('../sequelize/src/app')
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .get('/api/v1/users')
            .send({
                userId: 1,
                title: 'test is cool',
            })
        expect(res.statusCode).toEqual(200)
        // expect(res.body).toHaveProperty('post')
    })
})