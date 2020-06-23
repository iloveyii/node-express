const request = require('supertest')
const db = require("../src/config/db");
const User = require("../src/models").User;


describe('DELETE', () => {
    it('--> delete a new user', async () => {
        const user = {email: 'delete@email.com', password: 'delete-pass1'};
        const {email, password} = user;
        let user_deleted = {};

        try {
            const user_created = await User.create({
                email, password
            });

            user_deleted = await user_created.destroy({
                where: {email: user.email}
            });

            const deleted_id = user_deleted.dataValues.id;
            user_deleted = await User.findOne({where: {id: deleted_id}});
        } catch (e) {
            console.log('Error :', e);
            return true;
        }

        expect(user_deleted).toEqual(null);
    });
});

