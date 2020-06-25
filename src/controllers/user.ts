import User from "../models/User";


// @desc   Get all from User
// @route  GET /api/v1/user
export const getUsers = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.read();

    return res.status(200).send(model.response);
};

// @desc   Get a User
// @route  GET /api/v1/user/:id
export const getUser = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.read();

    return res.status(200).send(model.response);
};

// @desc   Register/Create a User - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.create();

    return res.status(200).send(model.response);
};

// @desc   Update a User
// @route  UPDATE /api/v1/user
export const updateUser = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.update();

    return res.status(200).send(model.response);
};

// @desc   Delete User
// @route  DELETE /api/v1/user
export const deleteUser = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.delete();

    return res.status(200).send(model.response);
};
