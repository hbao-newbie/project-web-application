const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    async create(payload) {
        const product = {
            name: payload.name,
            cost: payload.cost,
            code: payload.code,
            image: payload.image,
            status: payload.status,
            description: payload.description,
        };

        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: { status: payload.status === true }},
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(fillter) {
        const cursor = await this.Product.find(fillter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const { _id, ...update } = payload;
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProductService;