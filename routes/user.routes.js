const { Router } = require("express")
const userRouter = Router();
const { signup, login } = require("../controllers/user.controller")

userRouter.post("/signup", signup)
userRouter.post("/login", login)

module.exports = { userRouter }