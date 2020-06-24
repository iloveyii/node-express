const User = require("@sequelize/models").User;


// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: any, res: any, next: any) => {
    try {
        console.log("API User : POST /api/v1/login/");
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        const model = await User.findOne({where: {email, password}});
        console.log(model);
        return res.status(200).send({
            success: model ? true : false,
            data: email,
        });

    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

