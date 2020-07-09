import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type ArticleT = {
    id?: string;
    name: string;
    price: number;
    currency: string;
};


class Article extends Mongo {

    constructor(database: Database, collection: string, private product?: ArticleT) {
        super(database, collection, product);
    }

    rules() {
        return {
            name: "required",
            price: "required|between:1,999",
            currency: "required|in:sek,euro,usd",
        };
    }
}

export default Article;
