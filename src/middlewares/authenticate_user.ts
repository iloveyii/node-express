export const authenticate_user = (req: any, res: any, next: any) => {
    // Check if the header has a token - send/set it to req.token
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



