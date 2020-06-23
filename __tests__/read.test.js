const request = require('supertest')
const db = require("../src/config/db");
const User = require("../src/models").User;


describe('READ', () => {
    it('--> read a new user', async () => {
        const user = {email: 'read@email.com', password: 'read-pass1'};
        const {email, password} = user;
        let new_user = {};
        try {
            await User.create({
                email, password
            });
            new_user = await User.findOne({where: {email: "read@email.com"}});
            new_user = new_user.dataValues;
        } catch (e) {
            return true;
        }
        const match = (new_user.email === user.email) && (new_user.password === user.password);
        expect(match).toEqual(true);
    });
});

