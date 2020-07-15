import Mongo from "./base/Mongo";
import { Database } from "./base/Database";

type CodeT = {
    type: string,
    paras: string
};

type ParaT = {
    type: string,
    title: string,
    paras: string
};

type ArticleT = {
    id?: string;
    category?: string;
    subcategory?: string;
    title?: string;
    paras?: string;
    body?: ParaT | CodeT [] ;
};


class Article extends Mongo {

    constructor(database: Database, collection: string, private article?: ArticleT) {
        super(database, collection, article);
    }

    rules() {
        return {
        };
    }
}

export default Article;
