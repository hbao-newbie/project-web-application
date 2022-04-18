const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const BadRequestError = require("../errors");
const MongoDB = require("../utils/mongodb.util");
const User = require("../services/user.service");

exports.signup = async (req, res, next) => {
    if (!req.body?.password) {
        throw new BadRequestError(400, "Password is required");
    }

    try {
        const password = await bcrypt.hash(req.body.password, 8);
        const userService = new User(MongoDB.client);
        await userService.create({
            username: req.body.username,
            email: req.body.email,
            password,
        });

        return res.send({ message: "User was successfully registered"});
    } catch (error) {
        let stattusCode = 400;
        let { username = {}, email = {}, password = {} } = error.errors;

        const errorMassage =
            username.message ||
            email.message ||
            password.message ||
            error.message;
        if (!errorMassage) {
            stattusCode = 500;
        }

        throw new BadRequestError(stattusCode, errorMassage);
    }
};

exports.sigin = async (req, res, next) => {
    try {
        const userService = new User(MongoDB.client);
        const user = await userService.findOne({
            username: req.body.username,
        });

        if (!user) {
            throw new BadRequestError(401, "Incorrect username or password");
        }

        const passwordIsVaild = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!passwordIsVaild) {
            throw new BadRequestError(401, "Incorrect username or password");
        }

        //
        //
        const token = jwt.sign({ id: user._id}, config.jwt.secret, {
            expiresIn: 86400,
        });

        return res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
        });
    } catch (error) {
        console.log(error);
        throw new BadRequestError(500);
    }
};