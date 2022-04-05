const express = require("express");
const product = require("../controllers/product.controller");

module.exports = app => {
    const router = express.Router();

    // Create a new product
    router.post("/", product.createProduct);

    // Retrieve all products
    router.get("/", product.findAllProduct);

    // Retrieve a single product with id
    router.get("/:id", product.findOneProduct);

    // Update a product with id
    router.put("/:id", product.updateProduct);

    // Delete a product with id
    router.delete("/:id", product.deleteProduct);

    // Delete all products
    router.delete("/", product.deleteAllProduct);
    
    app.use("/api/products", router);
};