import { ObjectId } from "mongodb";
import { ConditionT } from "../../types";
import { ConditionI } from "../../interfaces";

class Condition implements ConditionI {
    constructor(private dialect: string, private readonly condition: ConditionT) {
        console.log("Inside Condition constructor : ", dialect, condition);
        if (dialect === "mongodb") {
            if (condition.where.id) {
                condition.where["_id"] = new ObjectId(condition.where.id);
                delete condition.where.id;
            }
            this.condition = condition.where;
        }
    }

    get where(): ConditionT | any {
        return this.condition;
    }
}

export default Condition;