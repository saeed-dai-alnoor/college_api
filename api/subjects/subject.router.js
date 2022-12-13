const { createSubject, getSubjects, getSubjectBySubjectId, updateSubject, deleteSubject } = require('./subject.controller');
const router = require('express').Router();

router.post('/',  createSubject);
router.get('/',   getSubjects);
router.get('/:subject_id',   getSubjectBySubjectId);
router.patch('/' , updateSubject);
router.delete('/', deleteSubject);

module.exports = router;