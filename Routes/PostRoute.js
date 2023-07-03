const Router = require('express').Router();
const PostController = require('../Controllers/PostController');

Router.get('/', PostController.index);

module.exports = Router;