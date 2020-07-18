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
    image_url: string;
    options: OptionT[];
    correct: number[];
    explanation: string;
};


class Question extends Mongo {

    constructor(database: Database, collection: string, private question?: QuestionT) {
        super(database, collection, question);
    }

    rules() {
        return {
            type: "required",
            text: "required",
            image_url: "required",
            options: "required",
            correct: "required",
        };
    }
}

export default Question;
