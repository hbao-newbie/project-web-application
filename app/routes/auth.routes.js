const experss = require("express");
const auth = require("../controllers/auth.controller");
const { checkDuplicateUsernameOrEmail } = require("../middlewares");

const router = experss.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], auth.signup);
router.post("/signin", auth.sigin);

module.exports = router;