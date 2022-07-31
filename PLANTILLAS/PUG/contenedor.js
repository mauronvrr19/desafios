const fs = require('fs');

 const Contener = class Contener {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
  }

  async getData() {
    const data = await fs.promises.readFile(this.archivo, 'utf-8'); //data = '[]'
    return JSON.parse(data);
  }

  async saveData(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
  }

  async save( miObjeto) {
    const productos = await this.getData();
    const productoNuevo = { ...miObjeto, id: productos.length + 1 };
    productos.push(productoNuevo);
    await this.saveData(productos);
  }

 async updateProducto (id, productoNuevo) {
  const productos = await this.getData();
    const index = productos.filter(prod => prod.id != parseInt(id));

    if (index === -1) {
        return 'no existe el id buscado';}
  
      let actualizado = {
        id : parseInt(id),
        title : productoNuevo.title,
        price : productoNuevo.price,
        thumbnail : productoNuevo.thumbnail
      }
    
    index.push(actualizado);
    await this.saveData(index)

    return `el producto fue actualizado correctamente`;

  }

  async getById(number) {
    const productos = await this.getData();
    const indice = productos.findIndex((unProducto) => {
      if (unProducto.id === number) return true;
      else return false;
    });

    if (indice === -1) return null;

    return productos[indice];
  }

  async getAll() {
    const productos = await this.getData();

    return productos;
  }

  async deleteById(number) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
      (unProducto) => unProducto.id != number
    );

    await this.saveData(nuevoArray);
  }

  async deleteAll() {
    const nuevo = [];

    await this.saveData(nuevo);
  }
}

const nombreArchivo =  new Contener("./productos.json")

// nombreArchivo.getData().then(res=>(console.log(res)))

// nombreArchivo.saveData(  [                                                                                                                                                      
//     {                                                                                                                                                    
//       title: 'Escuadra',                                                                                                                                 
//       price: 123.45,                                                                                                                                     
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
//       id: 1                                                                                                                                              
//     },                                                                                                                                                   
//     {                                                                                                                                                    
//       title: 'Calculadora',                                                                                                                              
//       price: 234.56,                                                                                                                                     
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
//       id: 2                                                                                                                                              
//     },                                                                                                                                                   
//     {                                                                                                                                                    
//       title: 'Globo Terráqueo',                                                                                                                          
//       price: 345.67,                                                                                                                                     
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
//       id: 3                                                                                                                                              
//     }                                                                                                                                                    
//   ]   
// ).then(res=>(console.log(res)))

// const azar = Math.floor(Math.random()*4);
// nombreArchivo.getById(azar).then(res=>(console.log(res)))

// nombreArchivo.deleteById(1).then(res=>(console.log(res)))

// nombreArchivo.deleteAll()


module.exports = Contener
