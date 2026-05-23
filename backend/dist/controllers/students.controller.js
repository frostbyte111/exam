"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = exports.getStudents = void 0;
const db_1 = require("../db");
const getStudents = async (request, reply) => {
    const students = await db_1.db.query('SELECT * FROM students ORDER BY id DESC');
    return reply.send(students.rows);
};
exports.getStudents = getStudents;
const addStudent = async (request, reply) => {
    const { first_name, last_name, student_email, major, enrollment_year, gpa } = request.body;
    await db_1.db.query(`INSERT INTO students
    (first_name,last_name,student_email,major,enrollment_year,gpa)
    VALUES($1,$2,$3,$4,$5,$6)`, [
        first_name,
        last_name,
        student_email,
        major,
        enrollment_year,
        gpa
    ]);
    return reply.send({ success: true });
};
exports.addStudent = addStudent;
