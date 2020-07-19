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

const COLLECTION = "questions";

class Question extends Mongo {

    constructor(database: Database, private question?: QuestionT) {
        super(database, COLLECTION, question);
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
