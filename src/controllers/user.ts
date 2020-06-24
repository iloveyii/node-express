import bcrypt from "bcrypt";
const User = require("@sequelize/models").User;

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
        console.log(model);
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
        const model = User.findOne({where: {email, password}});
        if(model) {
            return res.status(201).send({
                success: true,
                data: email,
                error: "Email already registered"
            });
        }

        // Register new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const user: any = await User.create({email, password:hashedPassword});

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


// @desc   Update User
// @route  PUT /api/v1/user/1
export const updateUser = async (req: any, res: any, next: any) => {
    try {
        const {id} = req.params;
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