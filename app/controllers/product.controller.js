const { BadRequestError } = require("../errors");
const  handlePromise = require("../helpers/promise.helper");
const Product = require("../models/product.model");

// Create and Save a new product
exports.createProduct = async (req, res, next) => {
    // Validate request
    if (!req.body.nameProduct) {
        return next(new BadRequestError(400, "Name product can not be empty"));
    }

    // Create a new product
    const product = new Product({
        nameProduct: req.body.nameProduct,
        codeProduct: req.body.codeProduct,
        description: req.body.description,
        imgProduct: req.body.imgProduct,
        costProduct: req.body.costProduct,
        status: String(req.body.status).toLowerCase() === "true",
    });

    // Save product in the database
    const [error, document] = await handlePromise(product.save());
    
    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while creating the product"));
    }

    return res.send(document);
};

// Retrieve all product of a user form the database
exports.findAllProduct = async (req, res, next) => {
    const condition = { };
    const nameProduct = req.query.nameProduct;
    if (nameProduct) {
        condition.nameProduct = { $regex: new RegExp(nameProduct), $option: "i"};
    }

    const [error, documents] = await handlePromise(Product.find(condition));

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving products"));
    }

    return res.send(documents);
};

// Find a single product with an id
exports.findOneProduct = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handlePromise(Product.findOne(condition));

    if (error) {
        return next(new BadRequestError(500,
            `Error retrieving product with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Product not found"));
    }

    return res.send(document);
};

// Update a product by the id in the request
exports.updateProduct = async (req, res, next) => {
    if (!req.body) {
        return next(new BadRequestError(400,
            "Data to update can't be empty"));
    }

    const condition = {
        _id: req.params.id,
    }

    const [error, document] = await handlePromise(
        Product.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(new BadRequestError(500,
            `Error updating product with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Product not found"));
    }

    return res.send({ message: "Product was update successfully",});
};

// Delete a product with the specified id in the request
exports.deleteProduct = async (req, res) => {
    const condition = {
        _id: req.params.id,
    }

    const [error, document] = await handlePromise(
        Product.findOneAndDelete(condition)
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

// Delete all products from the database
exports.deleteAllProduct = async (req, res, data) => {
    const [error, document] = await handlePromise(
        Product.deleteMany({ })
    )

    if (error) {
        return next(new BadRequestError(500,
            `An error occurred while remove all contacts`));
    }

    return res.send({
        message: `${data.deleteCount} product were deleted successfully`,
    });
};