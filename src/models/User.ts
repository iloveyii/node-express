import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import Question from "./Question";
import Condition from "./base/Condition";

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

    constructor(database: Database, private user?: UserT) {
        super(database, COLLECTION, user);
    }

    rules() {
        return {
            email: "required|email",
            password: "required",
        };
    }

    async latest_quiz(show_correct: boolean = false) {
        if (this.response.success === false) {
            return this.response;
        }
        const quizzes = this.response.data[0].quiz;
        const quiz_newest = quizzes[quizzes.length - 1];
        return this.idsToQuestions(quiz_newest, false);
    }

    async idsToQuestions(quiz: any, show_correct: boolean) {
        const question_ids = (quiz.questions.map((question: any) => question.id)).filter((id: any) => id);
        const model = new Question(this.database, undefined);
        await model.read(new Condition({where: {id: question_ids}}));
        return model.response.data;
    }
}

export default User;


