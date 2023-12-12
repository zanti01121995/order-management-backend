import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ msg: "not authorized, no token" });
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({ msg: "Wrong or Token expired" })
            else {
                req.user = data;
                next();
            }
        })
    }
}

const verifyTokenAdmin = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ msg: "not authorized, no token" });
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({ msg: "Wrong or Token expired" })
            else {
                if (!data.isAdmin) return res.status(403).json({ msg: "You are not admin" })
                req.user = data;
                next();
            }
        })
    }
}

export { verifyToken, verifyTokenAdmin }