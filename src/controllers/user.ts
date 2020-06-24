import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = require("../../sequelize/src/models").User;

// @desc   Get all from User
// @route  GET /api/v1/user
export const getUsers = async (req: any, res: any, next: any) => {
    try {
        console.log("API User : GET /api/v1/user");
        const user = [{id: 1, name: "aaaa"}, {id: 2, name: "bbb"}];
        const models = await User.findAll();
        return res.status(200).send({
            success: true,
            data: models
        });

    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};


// @desc   Get a User
// @route  GET /api/v1/user/:id
export const getUser = async (req: any, res: any, next: any) => {
    try {
        console.log("API User : GET /api/v1/user/:id");
        const {id} = req.params;
        const model = await User.findOne({where: {id}});

        return res.status(200).send({
            success: true,
            data: model,
        });

    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Add to User
// @route  POST /api/v1/user
export const addUser = async (req: any, res: any, next: any) => {
    try {
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        console.log({email, password});
        const user: any = await User.create({email, password});
        console.log("API User : POST /api/v1/user");
        return res.status(201).send({
            success: true,
            data: user,
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Register a User - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const registerUser = async (req: any, res: any, next: any) => {
    try {
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        console.log("API User : POST /api/v1/register");
        console.log({email, password});

        // Check if email already registered
        const model = await User.findOne({where: {email}});

        if (model) {
            return res.status(201).send({
                success: false,
                data: email,
                error: "Email already registered"
            });
        } else {
            // Register new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: any = await User.create({email, password: hashedPassword});

            return res.status(201).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};


// @desc   Update User
// @route  PUT /api/v1/user/1
export const updateUser = async (req: any, res: any, next: any) => {
    try {
        const token_secret = process.env.TOKEN_SECRET || "secret";
        jwt.verify(req.token, token_secret, async (err: any, authData: any) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    error: "Access denied"
                });
            } else {
                const {id} = req.params;
                if (Number(id) !== Number(authData.id)) {
                    return res.status(403).send({
                        success: false,
                        error: "Forbidden ids different " + id + " vs " + authData.id
                    });
                }
                const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
                    email: "email",
                    password: "pass"
                };
                console.log({email, password});
                const model = await User.findOne({where: {id}});
                const status = await model.update({
                    email, password
                });

                return res.status(200).send({
                    success: true,
                    data: model
                });
            }
        });


    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Delete User
// @route  DELETE /api/v1/user
export const deleteUser = async (req: any, res: any, next: any) => {
    try {
        const {id} = req.params;
        const status = await User.destroy({where: {id}});
        const user = [{id, name: "delete", status}];
        return res.status(200).send({
            success: true,
            data: user
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};