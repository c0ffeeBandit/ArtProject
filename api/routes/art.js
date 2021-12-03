const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');
router.get('/', controllers.art.get);
router.post('/', auth(), controllers.art.post); // to create an art post to begin with 
router.put('/:id', auth(), controllers.art.put); // to change values
router.delete('/:id', auth(), controllers.art.delete);
module.exports = router;