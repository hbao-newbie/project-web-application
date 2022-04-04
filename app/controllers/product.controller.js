// Create and Save a new product
exports.createProduct = async (req, res) => {
    res.send({ message: "Create a new product"});
};

// Retrieve all product of a user form the database
exports.findAllProduct = async (req, res) => {
    res.send({ message: "Find all product"});
};

// Find a single product with an id
exports.findOneProduct = async (req, res) => {
    res.send({ message: "Find one product"});
};

// Update a product by the id in the request
exports.updateProduct = async (req, res) => {
    res.send({ message: "Update product by id"});
};

// Delete a produve with the specified id in the request
exports.deleteProduct = async (req, res) => {
    res.send({ message: "Delete product"});
};

// Delete all products from the database
exports.deleteAllProduct = async (req, res) => {
    res.send({ message: "Delete all products"});
};