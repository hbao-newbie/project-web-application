const mongoose = require("mongoose");

const account = mongoose.Schema(
    {
        nameAccount: {
            type: String,
            require: [true, "Accout name is require"],
        },
        passAccount: {
            type: String,
            require: [true, "Password is require"],
        },
        phoneNumber: Number,
        email: String,
        address: String,
    },
    { timestamps: true },
);

account.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("account", account);