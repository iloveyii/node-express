import { ConditionT, UserT } from "../types";


// -------------------------------------------------------------
// Class interface - used in specific model class e.g Controller, Mongo
// -------------------------------------------------------------
export interface ModelI {

    create(): Promise<any>;

    read(condition: ConditionI): Promise<any>;

    update(condition: ConditionI): Promise<any>;

    delete(condition: ConditionI): Promise<any>;
}

// -------------------------------------------
// Controller's user interface - used in Model
// -------------------------------------------
export interface ControllerI {
    isNewRecord: boolean;

    create(): any;

    read(): any;

    update(): any;

    delete(): any;
}

// -------------------------------------------
// Condition's class interface
// -------------------------------------------
export interface ConditionI {
    where(): ConditionT | any;
}