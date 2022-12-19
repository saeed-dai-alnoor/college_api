const { createLevel, getLevelByLevelId, getLevels, updateLevel, deleteLevel  } = require('./level.controller');
const router = require('express').Router();

router.post('/', createLevel);
router.get('/', getLevels);
router.post('/students', getLevelByLevelId);
router.patch('/' ,updateLevel);
router.delete('/', deleteLevel);

module.exports = router;