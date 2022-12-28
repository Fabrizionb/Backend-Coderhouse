const fs = require("fs");

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getProducts() {
        return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
}

module.exports = ProductManager;

// const productManager = new ProductManager("database/db.json")
// console.log(productManager.getProducts())
