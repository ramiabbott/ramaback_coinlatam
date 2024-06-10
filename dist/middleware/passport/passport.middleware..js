"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
// Middleware para verificar si el usuario está autenticado
const ensureAuthenticated = (req, res, next) => {
    // Passport.js agrega el método isAuthenticated() al objeto req
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, continúa con la solicitud
        return next();
    }
    else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        res.redirect('/login');
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=passport.middleware..js.map