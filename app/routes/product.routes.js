const experss = require("express");
const Product = require("../controllers/product.controller");

const router = experss.Router();

router
    .route("/")
    .get(Product.findAll)
    .post(Product.create)
    .delete(Product.deleteAll);

router
    .route("/:id")
    .get(Product.findOne)
    .put(Product.update)
    .delete(Product.delete);

module.exports = router;