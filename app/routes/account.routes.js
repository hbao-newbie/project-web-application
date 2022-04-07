const experss = require("express");
const account = require("../controllers/account.controller");

module.exports = app => {
    const router = experss.Router();

    // Create a new account
    router.post("/", account.createAccount);

    // Retrieve a single account with id
    router.get("/:id", account.findOneAccount);

    // Update a account with id
    router.put("/:id", account.updateAccount);

    // Deleta a account with id
    router.delete("/:id", account.deleteAccount);

    app.use("/api/accounts", router);
}