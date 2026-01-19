import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token recibido en middleware:", token);

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, falta token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado" });
    }
};