import Mongo from "./base/Mongo";
import { Database } from "./base/Database";

type OptionT = {
    id: number,
    text: string
};

type QuestionT = {
    _id?: string;
    type: string;
    text: string;
    options: OptionT[];
    correct: number[];
    explanation: string;
};


class Question extends Mongo {

    constructor(database: Database, collection: string, private data?: any) {
        super(database, collection, data);
    }

    rules() {
        return {
            type: "required",
            text: "required",
            options: "required",
            correct: "required",
        };
    }
}

export default Question;
