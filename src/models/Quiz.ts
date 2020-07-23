import Mongo from "./base/Mongo";
import Condition from "./base/Condition";
import { Database } from "./base/Database";
import { ObjectId } from "mongodb";
import { ConditionI } from "../interfaces";

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
        const db = await this.database.db();
        const collection = await db.collection(COLLECTION);
        const {user_id} = this.data;
        const insertMany = randomQuestions.map((rQ: any) => (
            {
                quiz_id: 1,
                user_id: new ObjectId(user_id),
                question_id: new ObjectId(rQ._id),
                response: 0,
                version: 1
            }
        ));

        if (insertMany.length > 0) {
            // Delete previous one
            const condition = new Condition({where: {}});
            await collection.deleteMany(condition?.where);
            const model = await collection.insertMany(insertMany);
            this.setResponse(
                true,
                model.ops
            );
        } else {
            this.setResponse(
                false,
                "Some error occurred"
            );
        }
        return this;
    }

    async readForUser(user_id: string) {
        const db = await this.database.db();
        const collection = await db.collection("vw_quizzes_details");
        const condition = new Condition({where: {user_id: new ObjectId(user_id)}});
        console.log("readForUser ", condition);
        const model = await collection.find(condition?.where);
        const arr = await model.toArray();
        console.log(arr);
        if (arr.length > 0) {
            this.setResponse(
                true,
                arr
            );
        } else {
            this.setResponse(
                false,
                ["No record found with condition " + JSON.stringify(condition?.where)]
            );
        }
        return this;
    }
}

export default Quiz;
