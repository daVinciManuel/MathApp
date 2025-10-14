import jwt from "jsonwebtoken"

export function verifyToken(req, res, next){
    const token = req.headers["authorization"]
    if(!token) return res.status(403).json({message: "Token requerido."});

    jwt.verify(token, process.env.JWT_SAL, (err, decoded) => {
        if (err) return res.status(401).json({Message: "token invalido"});
        req.userId = decoded.id;
        next();
    })
}