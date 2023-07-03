const Router = require('express').Router();
const PostController = require('../Controllers/PostController');

Router.get('/', PostController.index);
Router.get('/find', PostController.find);
Router.post('/create', PostController.create);
Router.post('/update', PostController.update);
Router.delete('/delete', PostController.delete);

module.exports = Router;