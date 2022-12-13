const { createStudent, getStudents, getStudentByStudentId, updateStudent, deleteStudent, login } = require('./student.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_vaildation');

router.post('/', checkToken, createStudent);
router.get('/', checkToken,  getStudents);
router.get('/:student_id', checkToken, getStudentByStudentId);
router.patch('/' , checkToken,  updateStudent);
router.delete('/', checkToken,  deleteStudent);
router.post('/login', login );

module.exports = router;