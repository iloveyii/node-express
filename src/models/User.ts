import Mongo from "./base/Mongo";
import { Database } from "./base/Database";

type QuizT = {
    id: number,
    questions: string[],
    responses?: number[],
    result: number,
    total: number
};

type UserT = {
    _id?: string;
    email: string;
    password: string;
    quiz?: QuizT[];
};


class User extends Mongo {

    constructor(database: Database, collection: string, private data?: any) {
        super(database, collection, data);
    }

    rules() {
        return {
            email: "required",
            password: "required",
        };
    }
}

export default User;
