import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const sendOTP = async (email: string, code: string) => {
  await transporter.sendMail({
    from: 'Student Management <hadiafyouni9@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `
      <h1>Your OTP Code</h1>
      <p>${code}</p>
    `
  })
}