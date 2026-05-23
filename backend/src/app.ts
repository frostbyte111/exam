import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'
import helmet from '@fastify/helmet'

import authRoutes from './routes/auth.routes'
import studentRoutes from './routes/student.routes'

const app = Fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true
})

app.register(cookie)

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'secret'
})

app.register(helmet)

app.decorate(
  'authenticate',
  async (request: any, reply: any) => {
    try {
      await request.jwtVerify()
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
)

app.register(authRoutes, { prefix: '/api/auth' })
app.register(studentRoutes, { prefix: '/api/students' })

export default app