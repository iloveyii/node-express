const Model = require("../../sequelize/src/models").User;

type UserT = {
    id?: number;
    email: string;
    password: string;
};

type StatusT = {
    user: UserT | UserT[],
    users?: any[],
    success: boolean
};

interface UserI {
    isNewRecord: boolean;

    create(): StatusT;

    readOne(id: number): StatusT;

    readAll(): any;

    update(): StatusT;

    delete(): StatusT;
}


class User implements UserI {
    isNewRecord: boolean = true;

    constructor(private user: UserT) {
    }

    create(): StatusT {
        const user: UserT = {email: "", password: ""};
        const status: StatusT = {user, success: true};
        return status;
    }

    readOne(id: number): StatusT {
        const user: UserT = {email: "", password: ""};
        const status: StatusT = {user, success: true};
        return status;
    }

    async readAll() {
        const doSync = async () => {
            const users = await Model.findAll().then((users: any[]) => users);
            return users;
        };
        const users = await doSync();
        console.log("in class", users);

        const user: UserT = {email: "", password: ""};
        const status: StatusT = {user, success: true};
        return status;
    }

    update(): StatusT {
        const user: UserT = {email: "", password: ""};
        const status: StatusT = {user, success: true};
        return status;
    }

    delete(): StatusT {
        const user: UserT = {email: "", password: ""};
        const status: StatusT = {user, success: true};
        return status;
    }

}

export default User;