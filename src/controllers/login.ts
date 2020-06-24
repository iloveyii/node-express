import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = require("../../sequelize/src/models").User;


// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: any, res: any, next: any) => {
    let token = undefined;

    try {
        console.log("API User : POST /api/v1/login/");
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        const model = await User.findOne({where: {email}});
        let loginSuccess = false;

        if (model && await bcrypt.compare(password, model.password)) {
            if (req.session && req.session.userId) {
                req.session.userId = model.id;
            }
            loginSuccess = true;
            // Set jwt token in header
            const token_secret = process.env.TOKEN_SECRET || "secret";
            token = await jwt.sign({id: model.id, email}, token_secret);
        }
        return res.status(200).send({
            success: loginSuccess,
            data: {email, token},
        });

    } catch (error) {
        console.log("Error at login ", error);
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

