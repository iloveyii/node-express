import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import User from "../models/User";
import { nRandomItems } from "../utils";
import Question from "./Question";


const database = new Database("shop");

class Quiz {
    public model: any = undefined;

    constructor(private user_id: string, private questions_count: number) {
    }

    // CRUD - new
    // create - create will add quiz to User with questions ids but will return full questions
    // read/:id integer - will read a quiz from User, fetch related questions and send it
    async create(): Promise<any> {
        const random_count = 5;
        const condition = new Condition({where: {id: this.user_id}});
        const model = new User(database, undefined);
        await model.read(condition);
        const {quiz} = model.response.data[0];
        const next_id = quiz.length + 1;
        const random_questions = await this.getRandomQuestions(random_count);
        const formatted = await this.formatRandomQuestions(random_questions);

        const q = {id: next_id, questions: formatted, result: 0, total: 0};
        quiz.push(q);
        console.log(JSON.stringify(model.response));
        const user = new User(database, model.response.data[0]);
        await user.update(condition);
        this.model = model;
        return this;
    }

    async getRandomQuestions(random_count: number) {
        const condition = new Condition({where: {}});
        const model = new Question(database, undefined);
        await model.read(condition);
        const questions = model.response.data;
        const random_question = nRandomItems(questions, random_count);
        return random_question;
    }

    formatRandomQuestions(random_question: any[]) {
        const formatted = random_question.map(q => ({id: q._id, response: 0}));
        return formatted;
    }

    get response(): any {
        return this.model.response;
    }
}

export default Quiz;
