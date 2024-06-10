"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../routes/auth/auth.routes");
const protect_routes_1 = require("../routes/auth/protect.routes");
const test_routes_1 = require("./test/test.routes");
const route = (0, express_1.Router)();
route.use(auth_routes_1.authRoute);
route.use(protect_routes_1.protectedRouter);
route.use(test_routes_1.testRoute);
route.get("/", auth_routes_1.authRoute);
route.get("/", protect_routes_1.protectedRouter);
route.get("/", test_routes_1.testRoute);
route.get('/', (req, res) => {
    res.send(`
      <h1>Login</h1>
      <a href=/auth/google>Login with Google</a>
    `);
});
exports.default = route;
//# sourceMappingURL=index.routes.js.map