const {createManager , getManagerByManagerId, getManagers, updateManager, deleteManager,  login } = require('./manager.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_vaildation');

router.post('/',checkToken,  createManager);
router.get('/',  checkToken, getManagers);
router.get('/:manager_id',  checkToken, getManagerByManagerId);
router.patch('/', checkToken, updateManager);
router.delete('/', checkToken, deleteManager);
router.post('/login', login );

module.exports = router;