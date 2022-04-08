const { BadRequestError } = require("../errors");
const handlePromise = require("../helpers/promise.helper");
const Account = require("../models/account.model");

// Create and save a new Account
exports.createAccount = async (req, res, next) => {
    // Validate request
    if (!req.body.nameAccount && !req.body.passAccount){
        return next(new BadRequestError(400, "Name and password can not be empty"));
    }

    // Create a new Account
    const account = new Account({
        nameAccount: req.body.nameAccount,
        passAccount: req.body.passAccount,
        nameUser: req.body.nameUser,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
    });

    // Save account in the database
    const [error, documnet] = await handlePromise(account.save());

    if (error) {
        return next(new BadRequestError(500, "An error occurred while creating the Account"));
    }

    return res.send(documnet);
};


// Find a single product with an id
exports.findOneAccount = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handlePromise(Account.findOne(condition));

    if (error) {
        return next(new BadRequestError(500,
            `Error retrieving account with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Account not found"));
    }

    return res.send(document);
};

// Update a product by the id in the request
exports.updateAccount = async (req, res, next) => {
    if (!req.body) {
        return next(new BadRequestError(400,
            "Data to update can't be empty"));
    }

    const condition = {
        _id: req.params.id,
    }

    const [error, document] = await handlePromise(
        Account.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(new BadRequestError(500,
            `Error updating account with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Account not found"));
    }

    return res.send({ message: "Account was update successfully",});
}

// Delete a Account with the specified id in the request
exports.deleteAccount = async (req, res) => {
    const condition = {
        _id: req.params.id,
    }

    const [error, document] = await handlePromise(
        Account.findOneAndDelete(condition)
    );

    if (error) {
        return next(new BadRequestError(500,
            `Could not delete product with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Product not found"));
    }

    return res.send({ message: "Product was delete successfully",});
};