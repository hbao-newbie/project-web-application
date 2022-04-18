const experss = require("express");
const cors = require("cors");
const productsRouter = require("./app/routes/product.routes");
const authRouter = require("./app/routes/auth.routes");
const BadRequestError = require("./app/errors");

const app = experss();

app.use(cors());
app.use(experss.json());

// simple route
app.get("/",(req, res) => {
    res.json({ message: "Welcome to product application." });
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    next(new BadRequestError(404, "Resoure not found"));
});

// define erro-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    })
});

module.exports = app;