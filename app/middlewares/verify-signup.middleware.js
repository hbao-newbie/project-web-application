const BadRequestError = require("../errors");
const MongoDB = require("../utils/mongodb.util");
const User = require("../services/user.service");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userService = new User(MongoDB.client);
        const [userByUsername, userByEmail ] = await Promise.all([
            userService.findOne({
                username: req.body.username,
            }),
            userService.findOne({
                email: req.body.email,
            }),
        ]);

        if (userByUsername || userByEmail) {
            return next(
                new BadRequestError(422, "Username or email is already in user")
            );
        }

        return next();
    } catch (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }
};

module.exports = {
    checkDuplicateUsernameOrEmail,
};