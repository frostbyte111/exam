"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../db");
const email_service_1 = require("../services/email.service");
const login = async (request, reply) => {
    const { email, password } = request.body;
    const user = await db_1.db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!user.rows.length) {
        return reply.status(401).send({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt_1.default.compare(password, user.rows[0].password);
    if (!valid) {
        return reply.status(401).send({ message: 'Invalid credentials' });
    }
    const code = crypto_1.default.randomInt(100000, 999999).toString();
    await db_1.db.query(`INSERT INTO otp_codes(email,code,expires_at)
     VALUES($1,$2,NOW() + interval '10 minutes')`, [email, code]);
    await (0, email_service_1.sendOTP)(email, code);
    return reply.send({
        requiresOTP: true
    });
};
exports.login = login;
const verifyOTP = async (request, reply) => {
    const { email, code } = request.body;
    const otp = await db_1.db.query(`SELECT * FROM otp_codes
     WHERE email=$1
     AND code=$2
     ORDER BY id DESC
     LIMIT 1`, [email, code]);
};
exports.verifyOTP = verifyOTP;
