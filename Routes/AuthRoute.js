const Route = require("express").Router();
const AuthController = require("../Controllers/AuthController");

Route.post("/register", AuthController.register);
Route.post("/login", AuthController.login);

module.exports = Route;
