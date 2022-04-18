const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/products",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "products-secret-key",
    },
};

module.exports = config;