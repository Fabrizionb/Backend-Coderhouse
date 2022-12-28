const express = require("express");
const ProductManager = require("../ProductManager");
const app = express();
const PORT = 8080
const productManager = new ProductManager("../database/db.json");

app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    const {
        limit
    } = req.query;

    if (limit) return res.json(products.slice(0, limit));
    else return res.json(products);
});

app.get("/products/:pid", async (req, res) => {
    const products = await productManager.getProducts();
    const {
        pid
    } = req.params;
    const product = products.find((product) => product.id === Number(pid));

    if (product) return res.status(200).json(product);
    else return res.status(404).json({
        mensaje: "producto no encontrado"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${8080}`);
});