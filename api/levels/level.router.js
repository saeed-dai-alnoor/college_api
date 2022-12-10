const { createLevel, getLevelByLevelId, getLevels, updateLevel, deleteLevel  } = require('./level.controller');
const router = require('express').Router();

router.post('/', createLevel);
router.get('/', getLevels);
router.get('/:id', getLevelByLevelId);
router.patch('/' ,updateLevel);
router.delete('/', deleteLevel);

module.exports = router;