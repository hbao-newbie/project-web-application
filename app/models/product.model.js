const mongoose = require("mongoose");

const products = mongoose.Schema(
    {
        nameProduct: {
            type: String,
            required: [true, "Product name is required"],
        },
        codeProduct: String,
        description: String,
        imgProduct: String,
        costProduct: {
            type: Number,
            required: [true, "Product cost is required"],
        },
        status: Boolean,
    },
    { timestamps: true },
);

// Replace _id with id and remove __V
products.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id =_id;
    return object;
});

module.exports = mongoose.model("product", products);