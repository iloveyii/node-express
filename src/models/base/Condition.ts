import { ObjectId } from "mongodb";
import { ConditionT } from "../../types";
import { ConditionI } from "../../interfaces";


const dialect = process.env.CONTROLLER_DIALECT || "mongodb";

class Condition implements ConditionI {
    constructor(private readonly condition: ConditionT) {
        if (dialect === "mongodb") {
            if (condition.where.id) {
                if (Array.isArray(condition.where.id)) {
                    const obj_ids = condition.where.id.map((id: string) => new ObjectId(id));
                    condition.where["_id"] = {$in: obj_ids};
                } else {
                    condition.where["_id"] = new ObjectId(condition.where.id);
                }
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
