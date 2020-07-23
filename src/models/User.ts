import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import Quiz from "./Quiz";

type QuestionT = {
    id: string,
    response: number
};

type QuizT = {
    id: number,
    questions: QuestionT[],
    result: number,
    total: number
};

type UserT = {
    _id?: string;
    email: string;
    password: string;
    quiz?: QuizT[];
};

const COLLECTION = "users";

class User extends Mongo {

    constructor(protected database: Database, private user?: UserT) {
        super(database, COLLECTION, user);
    }

    rules() {
        return {
            email: "required|email",
            password: "required",
        };
    }

    async readQuiz(id: string) {
        const model = new Quiz(this.database, undefined);
        await model.readForUser(id);
        this._response = model.response;
        return this;
    }
}

export default User;


