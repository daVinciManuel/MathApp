import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Token requerido." });
  }

  jwt.verify(token, process.env.JWT_SAL, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}
