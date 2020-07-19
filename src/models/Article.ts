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
    body?: ParaT | CodeT [];
};

const COLLECTION = "articles";

class Article extends Mongo {

    constructor(database: Database, private article?: ArticleT) {
        super(database, COLLECTION, article);
    }

    rules() {
        return {};
    }
}

export default Article;
