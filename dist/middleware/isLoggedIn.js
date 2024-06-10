"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }
    else {
        return res.sendStatus(401);
    }
    ;
}
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map