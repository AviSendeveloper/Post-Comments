const Router = require('express').Router();
const CommentController = require('../Controllers/CommentController');

Router.get('/', CommentController.index);
Router.get('/find', CommentController.find);
Router.post('/create', CommentController.create);
Router.post('/update', CommentController.update);
Router.delete('/delete', CommentController.delete);

module.exports = Router;