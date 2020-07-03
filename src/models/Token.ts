import jwt from "jsonwebtoken";


export enum STATUS {
    verified = 1,
    forbidden = 2
}

class Token {

    static async verify(req: any, auth_data: boolean = false) {
        const token_secret = process.env.TOKEN_SECRET || "secret";
        const {id} = req.params;
        let status: 1 | 2  = STATUS.forbidden;
        let authData: any = undefined;
        try {
            console.log(req.token, token_secret);
            authData = await jwt.verify(req.token, token_secret);
            status = STATUS.verified;
        } catch (e) {
            console.log("Invalid token");
            status = STATUS.forbidden;
        }

        return auth_data ? {status, authData} : status;
    }

    static async isVerified(req: any) {
        const status = await Token.verify(req);
        return status === STATUS.verified;
    }

    static async info(req: any) {
        const status = await Token.verify(req);
        let info = {};
        switch (status) {
            case STATUS.verified:
                info = {
                    status: STATUS.verified,
                    message: "The token is verified"
                };
                break;
            case STATUS.forbidden:
                info = {
                    status: STATUS.forbidden,
                    message: "Invalid token, The user is forbidden with 403 code"
                };
                break;
        }

        return info;
    }

}

export default Token;