import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { db } from '../db'
import { sendOTP } from '../services/email.service'

export const login = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = request.body as any

  const user = await db.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )

  if (!user.rows.length) {
    return reply.status(401).send({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(
    password,
    user.rows[0].password
  )

  if (!valid) {
    return reply.status(401).send({ message: 'Invalid credentials' })
  }

  const code = crypto.randomInt(100000, 999999).toString()

  await db.query(
    `INSERT INTO otp_codes(email,code,expires_at)
     VALUES($1,$2,NOW() + interval '10 minutes')`,
    [email, code]
  )

  await sendOTP(email, code)

  return reply.send({
    requiresOTP: true
  })
}

export const verifyOTP = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, code } = request.body as any

  const otp = await db.query(
    `SELECT * FROM otp_codes
     WHERE email=$1
     AND code=$2
     ORDER BY id DESC
     LIMIT 1`,
    [email, code]
  )

}