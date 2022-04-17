const experss = require("express");
const cors = require("cors");
const setupProductRoutes = require("./app/routes/product.routes");
const { BadRequestError, errorHandler } = require("./app/errors");

const app = experss();

app.use(cors());
app.use(experss.json());

app.use(experss.urlencoded({ extended: true }));

// simple route
app.get("/",(req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

setupProductRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    next(new BadRequestError(404, "Resoure not found"));
});

// define erro-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next, error) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    errorHandler.handleError(error, res);
});

module.exports = app;