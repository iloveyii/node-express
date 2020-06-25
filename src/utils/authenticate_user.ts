import jwt from "jsonwebtoken";

export const authenticate_user = (req: any, res: any, next: any) => {
    // Check if the header has a token
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        // Set token in header
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send({
            success: false,
            error: "Access denied"
        });
    }
};

export const verify = async (req: any, res: any, id: number) => {
    const token_secret = process.env.TOKEN_SECRET || "secret";
    try {
        const authData: any = await jwt.verify(req.token, token_secret);
        if (Number(id) !== Number(authData.id)) {
            return 403;
        }
        return 1;
    } catch (e) {
        console.log("Invalid token");
        return 0;
    }
};


