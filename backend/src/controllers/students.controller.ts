import { FastifyReply, FastifyRequest } from 'fastify'
import { db } from '../db'

export const getStudents = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const students = await db.query(
    'SELECT * FROM students ORDER BY id DESC'
  )

  return reply.send(students.rows)
}

export const addStudent = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    first_name,
    last_name,
    student_email,
    major,
    enrollment_year,
    gpa
  } = request.body as any

  await db.query(
    `INSERT INTO students
    (first_name,last_name,student_email,major,enrollment_year,gpa)
    VALUES($1,$2,$3,$4,$5,$6)`,
    [
      first_name,
      last_name,
      student_email,
      major,
      enrollment_year,
      gpa
    ]
  )

  return reply.send({ success: true })
}