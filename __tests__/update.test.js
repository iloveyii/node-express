const request = require('supertest')
const db = require("../src/config/db");
const User = require("../src/models").User;


describe('UPDATE', () => {
    it('--> update a new user', async () => {
        const user = {email: 'update@email.com', password: 'update-pass1'};
        const {email, password} = user;
        let user_updated = {};
        const updated_password = 'update-pass1-updated';

        try {
            const user_created = await User.create({
                email, password
            });
            user_updated = await user_created.update({
                password: updated_password
            });
            user_updated = user_updated.dataValues;
        } catch (e) {
            return true;
        }
        const match = (user_updated.email === user.email) && (user_updated.password === updated_password);
        expect(match).toEqual(true);
    });
});

