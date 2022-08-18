import fs from 'fs';

class Productos {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(producto) {
        try {
            if (fs.existsSync(this.fileName)) {
                const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
                producto.id = productos.map(producto => producto.id).sort().reverse()[0] + 1;
                producto.timestamp = Date.now();
                productos.push(producto);
                fs.writeFileSync(this.fileName, JSON.stringify(productos));
            } else {
                const productos = [];
                producto.id = 1;
                producto.timestamp = Date.now();
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
            if (fs.existsSync(this.fileName)) {
                return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            } else {
                return undefined
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    getById(id) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            return productos.find(producto => producto.id == id);
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteById(id) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const producto = productos.find(producto => producto.id == id);
            const index = productos.indexOf(producto);
            if (index === -1) {
                return undefined;
            }
            productos.splice(index, 1);
            fs.writeFileSync(this.fileName, JSON.stringify(productos));
        }
        catch (error) {
            console.log(error);
        }
    }
    updateById(id, productoNuevo) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const producto = productos.find(producto => producto.id == id);
            const index = productos.indexOf(producto);
            if (index === -1) {
                return undefined;
            } else {
                productos[index].timestamp = Date.now();
                if (productoNuevo.nombre) { productos[index].nombre = productoNuevo.nombre };
                if (productoNuevo.descripcion) { productos[index].descripcion = productoNuevo.descripcion };
                if (productoNuevo.codigo) { productos[index].codigo = productoNuevo.codigo };
                if (productoNuevo.foto) { productos[index].foto = productoNuevo.foto };
                if (productoNuevo.precio) { productos[index].precio = productoNuevo.precio };
                if (productoNuevo.stock) { productos[index].stock = productoNuevo.stock };
                fs.writeFileSync(this.fileName, JSON.stringify(productos));
                return productos[index];
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default Productos;
