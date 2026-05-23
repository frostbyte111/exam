import { FastifyInstance } from 'fastify'
import {
  login,
  verifyOTP
} from '../controllers/auth.controller'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/login', login)
  app.post('/verify-otp', verifyOTP)
}