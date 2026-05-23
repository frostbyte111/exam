"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = studentRoutes;
const students_controller_1 = require("../controllers/students.controller");
async function studentRoutes(app) {
    app.get('/', students_controller_1.getStudents);
    app.post('/', {
        preHandler: [app.authenticate]
    }, students_controller_1.addStudent);
}
