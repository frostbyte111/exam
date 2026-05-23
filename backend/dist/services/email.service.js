"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const sendOTP = async (email, code) => {
    await transporter.sendMail({
        from: 'Student Management <hadiafyouni9@gmail.com>',
        to: email,
        subject: 'Your OTP Code',
        html: `
      <h1>Your OTP Code</h1>
      <p>${code}</p>
    `
    });
};
exports.sendOTP = sendOTP;
