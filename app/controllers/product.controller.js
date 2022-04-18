const MongoDB = require("../utils/mongodb.util")
const ProductService = require("../services/product.service");
const BadRequestError = require("../errors");

// Create and save a new product
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch(error) {
        console.log(error);
        return next(
            new BadRequestError(500, "An error occurred while creating the product")
        );
    }
};

// Retrieve all products form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if ( name ) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(500, "An error occurred while retrieving products")
        );
    }

    return res.send(documents);
}

// Find a single product with an id
exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new BadRequestError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(
                500,
                `Error retrieving product with id=${req.params.id}`
            )
        );
    }
};

// update a product by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400, "Data to update can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if(!document) {
            return next(new BadRequestError(404, "Product not found"));
        }
        return res.send({ message: "Product was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

// Delete a product with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new BadRequestError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully"});
    } catch (error) {
        console.log(error);
        return next(
            new BadRequestError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully.`,
        });
    } catch (error) {
        return next(
            new BadRequestError(500, "An error occurred while removing all products")
        );
    }
};