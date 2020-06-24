const User = require("@sequelize/models").User;

// @desc   Get all from User
// @route  GET /api/v1/user
export const getUser = (req: any, res: any, next: any) => {
    try {
        console.log("API User : GET /api/v1/user");
        const user = [{id: 1, name: "aaaa"}, {id: 2, name: "bbb"}];
        /*return res.status(200).json({
            success: true,
            data: user
        }); */

        User.findAll()
            .then((users: any[]) => {
                res.status(200).send(users);
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
        return res.status(201).json({
            success: true,
            data: user.getDataValue,
            status
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
        const status = model.update({
            email, password
        });

        const data = [{id, status}];
        return res.status(200).json({
            success: true,
            data
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
        return res.status(200).json({
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