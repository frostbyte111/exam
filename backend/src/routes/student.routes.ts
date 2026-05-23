import { FastifyInstance } from 'fastify'
import {
  getStudents,
  addStudent
} from '../controllers/students.controller'

export default async function studentRoutes(app: FastifyInstance) {
  app.get('/', getStudents)

  app.post(
    '/',
    {
      preHandler: [(app as any).authenticate]
    },
    addStudent
  )
}