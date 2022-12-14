const { createStudent, getStudents, getStudentByStudentId, updateStudent, deleteStudent, login } = require('./student.controller');
const router = require('express').Router();

router.post('/', createStudent);
router.get('/',  getStudents);
router.get('/:student_id', getStudentByStudentId);
router.patch('/' ,  updateStudent);
router.delete('/',  deleteStudent);
router.post('/login', login );

module.exports = router;