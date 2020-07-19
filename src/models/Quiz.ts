import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import User from "../models/User";


const database = new Database("shop");

class Quiz {
    public model: any = undefined;

    constructor(private user_id: string, private questions_count: number) {
    }

    // CRUD - new
    // create - create will add quiz to User with questions ids but will return full questions
    // read/:id integer - will read a quiz from User, fetch related questions and send it
    async create(): Promise<any> {
        const condition = new Condition({where: {id: this.user_id}});
        const model = new User(database, undefined);
        await model.read(condition);
        const {quiz} = model.response.data[0];
        const next_id = quiz.length + 1;
        const q = {id: next_id, questions: [{id: "aaaa", response: 0}, {id: "bbbb", response: 0}], result: 0, total: 0};
        quiz.push(q);
        console.log(JSON.stringify(model.response));

        // model.response.data[0].quiz = quiz;
        // model.data = model.response.data;
        const user = new User(database, model.response.data[0]);
        await user.update(condition);
        // model.setResponse(
        //     true,
        //     model.response.data
        // );
        this.model = model;
        return this;
    }

    get response(): any {
        return this.model.response;
    }
}

export default Quiz;
