"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: 'http://localhost:3000',
    credentials: true
});
app.register(cookie_1.default);
app.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || 'secret'
});
app.register(helmet_1.default);
app.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify();
    }
    catch {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
});
app.register(auth_routes_1.default, { prefix: '/api/auth' });
app.register(student_routes_1.default, { prefix: '/api/students' });
exports.default = app;
