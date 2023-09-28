const express = require('express');
const middleware = require('../middlewares/global.middleware');
const controller = require('./items.controller');

const router = express.Router();

router.use(middleware.apiKeyAuth);

//GET STUDENTS
router.get('/', controller.GetItems);
//POST STUDENTS
router.post('/', middleware.checkAdmin, controller.CreateItem);
// GET UPDATE ONE ITEM BY ID
router.patch('/:id', middleware.checkAdmin, controller.UpdateItem);
// GET ONE STUDENT ID
router.get('/:id', controller.GetOneItem);
// DELETE ONE ITEM BY ID
router.delete('/:id', middleware.checkAdmin, controller.DeleteItem);

module.exports = router;