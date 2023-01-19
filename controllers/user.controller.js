const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../models/User.model")

const signup = async (req, res) => {
    const { email, password, age } = req.body;
    const isUser = await UserModel.findOne({ email })
    if (isUser) {
        res.status(409).send({ status: false, msg: "User already exists, try logging in" })
    }
    else {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(409).send({ status: false, msg: "Something went wrong, please try again later" })
            }
            const user = new UserModel({
                email,
                password: hash,
                age
            })
            try {
                await user.save()
                res.status(200).send({ status: true, msg: "Signup successful" })
            }
            catch (err) {
                res.status(409).send({ status: false, msg: "Something went wrong, please try again later" })
            }
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.status(409).send({ status: false, msg: "Please signup first" })
    }
    else {
        const hash = user.password
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                res.status(409).send({ status: false, msg: "Something went wrong, try again later" })
            }
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.status(200).send({ status: true, message: "Login Successful", token })
            }
            else {
                res.status(409).send({ status: false, msg: "Invalid Credentials" })
            }
        });
    }
}
module.exports = { signup, login }