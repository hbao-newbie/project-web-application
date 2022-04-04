const experss = require("express");
const cors = require("cors");

const app = experss();

app.use(cors());

//
app.use(experss.json());

//
app.use(experss.urlencoded({ extended: true }));

// simple route
app.get("/",(req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

module.exports = app;