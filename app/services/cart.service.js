const { ObjectId } = require("mongodb");

class CartService {
    constructor(ownerId, client) {
        this.ownerId = ObjectId.isValid(ownerId) ? new ObjectId(ownerId) : null;
        this.Cart = client.db().collection("carts");
    }

    async create(payload) {
        const cart = {
            cartItem: payload.cartItem,
            cartAddress: payload.cartAddress,
            cartPhone: payload.cartPhone,
            status: payload.status,
            ownerId: this.ownerId,
        };

        const result = await this.Cart.findOneAndUpdate(
            cart,
            { $set: { status: payload.status === true }},
            { returnDocutment: "after", upsert: true }
        );
        return result.value;
    };

    async find(fillter) {
        const cursor = await this.Cart.find({
            ...fillter,
            ownerId: this.ownerId,
        });
        return await cursor.toArray();
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            ownerId: this.ownerId,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({
            ownerId: this.ownerId,
        });
        return result.deleteCount;
    }
};

module.exports = CartService;