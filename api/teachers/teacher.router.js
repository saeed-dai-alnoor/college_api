const { createTeacher, getTeacherByTeacherId, getTeachers, updateTeacher, deleteTeacher,  login } = require('./teacher.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_vaildation');

router.post('/', checkToken, createTeacher);
router.get('/', checkToken,  getTeachers);
router.get('/:teacher_id', checkToken,  getTeacherByTeacherId);
router.patch('/' ,checkToken,  updateTeacher);
router.delete('/', checkToken,  deleteTeacher);
router.post('/login', login );

module.exports = router;