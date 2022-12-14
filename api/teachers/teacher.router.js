const { createTeacher, getTeacherByTeacherId, getTeachers, updateTeacher, deleteTeacher,  login } = require('./teacher.controller');
const router = require('express').Router();

router.post('/', createTeacher);
router.get('/',  getTeachers);
router.get('/:teacher_id',  getTeacherByTeacherId);
router.patch('/',  updateTeacher);
router.delete('/',  deleteTeacher);
router.post('/login', login );

module.exports = router;