const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const BadRequestError = require("../errors");

// Create and save a new Cart
exports.create = async (req, res, next) => {
    if (!req.body?.cartItem) {
        return next(new BadRequestError(400, "Cart item can not be empty"));
    }

    try {
        const cartService = new CartService(req.userId, MongoDB.client);
        const document = await cartService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(500, "An error occurred while creating the cart")
        );
    }
};

// Retrieve all carts of a user form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const cartService = new CartService(req.userId, MongoDB.client);
        documents = await cartService.find({});
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(500, "An error occurred while retrieving carts")
        );
    }

    return res.send(documents);
};

exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(req.userId, MongoDB.client);
        const document = await cartService.delete(req.params.id);
        if (!document) {
            return next({ message: "Cart not found"});
        }
        return res.send({ message: "Cart was deleted successfully"});
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(
                500,
                `Could not delete cart with id=${req.params.id}`
            )
        );
    }
};

// Delete all carts of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const cartService = new CartService(req.userId, MongoDB.client);
        const deleteCount = await cartService.deleteAll();
        return res.send({
            message: `${deleteCount} carts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new BadRequestError(500, "An error occurred while removing all carts")
        );
    }
};