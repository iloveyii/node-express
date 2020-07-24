import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type MakeT = {
    id?: string;
    name: string;
};

const COLLECTION = "makes";

class Make extends Mongo {
    constructor(database: Database, private product?: MakeT) {
        super(database, COLLECTION, product);
    }

    rules() {
        return {
            name: "required"
        };
    }
}

export default Make;
