class ProductManager {
  static id = 0;
   products;

  constructor(code, title, description, price, thumbnail, stock, id) {
    ProductManager.id += 1;
    this.products=[]
    this.code = code;
    this.title = title;
    this.description = description
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.id = ProductManager.id
  }
            
 addProduct(code, title, price, description, thumbnail, stock){
    let finder = this.products.find((product) => product.code === code);
          
    if(finder){
      return console.log("El producto ya existe")
    } else {
      this.products.push( {id: ProductManager.id, code: code, title: title, description:description, price: price, thumbnail:thumbnail, stock})
    }
  } 
    
  getProducts() {
    return this.products
  }
  
  getProductById(id) {
    let finder = this.products.find((product) => product.id === id);
    
    if(finder){
      return finder 
    } else {
      return "Producto no encontrado"
    }
  }
  
}

//Se creará una instancia de la clase “ProductManager”
let p1 = new ProductManager()

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("Array vacio", p1.getProducts())

//Se llamará al método “addProduct”
p1.addProduct("abc123","producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25)

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log("Console Log Test N°2",p1.getProducts())

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido
p1.addProduct("abc123","producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25)
console.log("Console Log Test N°3",p1.getProducts())

//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log("Console Log Test N°3 Producto encontrado",p1.getProductById(1))
console.log("Console Log Test N°3 Producto no encontrado",p1.getProductById(5))