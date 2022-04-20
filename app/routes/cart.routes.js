const experss = require("express");
const { verifyToken } = require("../middlewares");
const Cart = require("../controllers/cart.controller");

const router = experss.Router();

router.use(verifyToken);

router
    .route("/")
    .get(Cart.findAll)
    .post(Cart.create)
    .delete(Cart.deleteAll);

router
    .route("/:id")
    .delete(Cart.delete);

module.exports = router;