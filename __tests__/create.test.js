const request = require('supertest')
const db = require("../src/config/db");
const User = require("../src/models").User;


describe('CREATE', () => {
    it('--> create a new user', async () => {
        const user = {email: 'create@email.com', password: 'create-pass1'};
        const {email, password} = user;
        let new_user = {};
        try {
            const user = await User.create({
                email, password
            });
            const {email: new_email, password: new_password} = user.dataValues;
            new_user = {email: new_email, password: new_password};
        } catch (e) {
            return true;
        }
        expect(user).toEqual(new_user);
    });
});

