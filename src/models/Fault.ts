import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type FaultT = {
    id?: string;
    product_id: string;
    service_id: string;
    price: number;
};

const COLLECTION = "faults";

class Fault extends Mongo {
    constructor(database: Database, private fault?: FaultT) {
        super(database, COLLECTION, fault);
    }

    rules() {
        return {
            name: "required"
        };
    }
}

export default Fault;
