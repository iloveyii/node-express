import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type ProductT = {
    id?: string;
    name: string;
    price: number;
    currency: string;
};

const COLLECTION = "products";

class Product extends Mongo {
    constructor(database: Database, private product?: ProductT) {
        super(database, COLLECTION, product);
    }

    rules() {
        return {
            name: "required",
            price: "required|between:1,999",
            currency: "required|in:sek,euro,usd",
        };
    }
}

export default Product;
