const { throws } = require("assert");
const fs = require("fs");

class ProductManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.filepath, "utf-8");
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log(error);
    }
  }

  async #checkProductCode(code) {
    const fileContent = await this.#readFile();
    return fileContent.find((obj) => obj.code === code);
  }

  async getProducts() {
    const fileContent = await this.#readFile();

    try {
      if (fileContent.length === 0) throw new Error("No hay productos");
      else console.log(fileContent);
    } catch (error) {
      console.log("No hay productos");
    }
  }

  async addProduct(obj) {
    const fileContent = await this.#readFile();
    if (await this.#checkProductCode(obj.code))
      return console.log(`Producto con codigo ${obj.code} no encontrado`);

    try {
      if (fileContent.length !== 0)
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify([...fileContent])
        );
      else
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify([{ ...obj, id: 1 }]),
          "utf-8"
        );
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const fileContent = await this.#readFile();

      if (!fileContent.find((obj) => obj.id === id))
        throw new Error(`Producto con id ${obj.id}  no encontrado`);
      else console.log(fileContent.find((obj) => obj.id === id));
    } catch {
      console.log(`Producto con id numero ${id} no encontrado`);
    }
  }

  async updateProduct(id, obj) {
    try {
    const fileContent = await this.#readFile();
    const updated = fileContent.map((product) => product.id === id ? { ...product, ...obj } : product)


    if (!fileContent.find((obj) => obj.id === id)) throw new Error(`producto con id ${obj.id} no encontrado`)
    else await fs.promises.writeFile(this.filepath, JSON.stringify(updated, null, 2))
  } catch(error) {
    console.log(`producto con id ${id} no encontrado`)
  }
}

  async deleteProductById(id){
    try {
    const fileContent = await this.#readFile();
    const productsFiltered = fileContent.filter((product)=> product.id !== id)

    if(!fileContent.find((obj)=> obj.id === id)) throw new Error(`producto con id ${id} no encontrado`)
    else await fs.promises.writeFile(this.filepath, JSON.stringify(productsFiltered, null, 2))
  } catch (error){
     console.log(error)
  }
}

async deleteAll(){
    await fs.promises.writeFile(this.filepath, JSON.stringify([]), "utf-8")
}

}

module.exports = ProductManager;
