import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ObjectId } from "mongodb";

type QuizT = {
    _id?: string;
    user_id: string;
};

const COLLECTION = "quizzes";
const QUIZ_SIZE = 3;

class Quiz extends Mongo {

    constructor(database: Database, private quiz?: QuizT) {
        super(database, COLLECTION, quiz);
    }

    rules() {
        return {
            user_id: "required",
        };
    }

    async randomQuestions() {
        const db = await this.database.db();
        const collection = await db.collection("vw_questions_random");
        const model = await collection.find({}).limit(QUIZ_SIZE);
        return await model.toArray();
    }

    async create(): Promise<any> {
        // Get random questions ids
        const randomQuestions = await this.randomQuestions();
        console.log(randomQuestions);
        const db = await this.database.db();
        const collection = await db.collection(COLLECTION);
        const {user_id} = this.data;
        console.log("user_id", user_id);
        const insertMany = randomQuestions.map((rQ: any) => (
            {
                quiz_id: 1,
                user_id: new ObjectId(user_id),
                question_id: new ObjectId(rQ._id),
                response: 0,
                version: 1
            }
        ));

        const model = await collection.insertMany(insertMany);
        this.setResponse(
            true,
            model.ops[0]
        );
        return this;
    }
}

export default Quiz;
