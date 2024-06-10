import { Request, Response, NextFunction } from 'express';

// Middleware para verificar si el usuario está autenticado
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Passport.js agrega el método isAuthenticated() al objeto req
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, continúa con la solicitud
        return next();
    } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        res.redirect('/login');
    }
};

