import jwt from "jsonwebtoken";


enum STATUS {
    verified = 1,
    mismatch_id = 2,
    forbidden = 3
}

class Token {

    static async verify(req: any) {
        const token_secret = process.env.TOKEN_SECRET || "secret";
        const {id} = req.params;
        let status: 1 | 2 | 3 = STATUS.forbidden;
        try {
            const authData: any = await jwt.verify(req.token, token_secret);
            status = Number(id) === Number(authData.id) ? STATUS.verified : STATUS.mismatch_id;
        } catch (e) {
            console.log("Invalid token");
            status = STATUS.forbidden;
        }

        return status;
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
            case STATUS.mismatch_id:
                info = {
                    status: STATUS.mismatch_id,
                    message: "The id in token and the id in query parameter are mismatched"
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