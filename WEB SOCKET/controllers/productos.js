import fs from 'fs';

class Productos {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(producto) {
              try {
            if (fs.existsSync(this.fileName)) {
                const contenido = fs.readFileSync(this.fileName, 'utf-8');
                const productos = JSON.parse(contenido);
                producto.id = productos.length + 1;
                productos.push(producto);
                fs.writeFileSync(this.fileName, JSON.stringify(productos));
            } else {
                const productos = [];
                producto.id = 1;
                productos.push(producto);
                fs.writeFileSync(this.fileName, JSON.stringify(productos));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    getAll() {
        try {
            const contenido = fs.readFileSync(this.fileName, 'utf-8');
            return JSON.parse(contenido);
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default Productos;
