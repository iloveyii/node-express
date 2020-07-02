export type ConditionT = {
    where?: any;
};

export type UserT = {
    id?: string | number;
    email: string;
    password: string
};

export type ResultT = {
    success: boolean;
    data: UserT;
};

export type ResponseT = {
    success: boolean
    data: any[],
};