const { createSemester, getSemesterBySemesterId, getSemesters, updateSemester, deleteSemester } = require('./semester.controller');
const router = require('express').Router();

router.post('/',  createSemester);
router.get('/',   getSemesters);
router.post('/subjects',   getSemesterBySemesterId);
router.patch('/' , updateSemester);
router.delete('/', deleteSemester);

module.exports = router;