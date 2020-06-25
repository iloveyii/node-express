import Token, { STATUS } from "../models/Token";

export const same_user_id = async (req: any, res: any, next: any) => {
    // Verify the token
    const {status, authData}: any = await Token.verify(req, true);

    if (status === STATUS.verified) {
        const {id} = req.params;
        const same = Number(id) === Number(authData.id);
        if (same) {
            next();
        } else {
            res.status(403).send({
                success: false,
                error: "The id in token and the id in query parameter mismatched"
            });
        }
    } else {
        res.status(403).send({
            success: false,
            error: "Access denied"
        });
    }
};