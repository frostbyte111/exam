"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const auth_controller_1 = require("../controllers/auth.controller");
async function authRoutes(app) {
    app.post('/login', auth_controller_1.login);
    app.post('/verify-otp', auth_controller_1.verifyOTP);
}
