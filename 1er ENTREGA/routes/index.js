import { Router } from "express";
import Productos from "../controllers/productos.js";
import Carrito from "../controllers/carrito.js";
import login from "../middleware/middleware.js";


export const routerProducto = Router();
export const routerCarrito = Router();

const productos = new Productos('./controllers/productos.json');
const carrito = new Carrito('./controllers/carritos.json');

routerProducto.
    route('/:id?')
    .get((req, res) => {
        if (req.params.id) {
            productos.getById(req.params.id) ?
                res.status(200).json(productos.getById(req.params.id)) :
                res.status(404).json({ error: 'No existe producto con dicho ID' });
        } else {
            productos.getAll() ? res.status(200).json(productos.getAll()) :
                res.status(404).json({ error: 'No existen productos' });
        }
    })
    .post(login,(req, res) => {
        if (req.params.id) {
            res.status(400).json('no es posible crear un producto con un ID ya que es generado automaticamente');
        } else {
            productos.save(req.body);
            res.status(201).json(`el producto '${req.body.nombre}' se ha creado correctamente`);
        }
    })
    .delete(login,(req, res) => {
        productos.deleteById(req.params.id) ?
            res.status(404).json({ error: 'No existe producto con dicho ID' }) :
            res.status(200).json(`producto con el id:${req.params.id} ha sido eliminado correctamente`)
    })
    .put(login,(req, res) => {
        productos.updateById(req.params.id, req.body) ?
            res.status(201).json(`el producto ${productos.updateById(req.params.id, req.body).nombre} se ha actualizado correctamente`) :
            res.status(404).json({ error: 'No existe producto con dicho ID' })
    })

routerCarrito.
    route('/')
    .post((req, res) => {
        const id = carrito.createCarrito();
        res.status(201).json(`carrito creado con el id: ${id} correctamente`);
    })

routerCarrito.
    route('/:id')
    .delete((req, res) => {
        carrito.deleteById(req.params.id) ?
            res.status(404).json({ error: 'No existe carrito con dicho ID' }) :
            res.status(200).json(`el carrito con el id:${req.params.id} ha sido eliminado correctamente`);

    })

routerCarrito.
    route('/:id/productos')
    .get((req, res) => {
        carrito.getById(req.params.id) ?
            res.status(200).json(carrito.getById(req.params.id).productos) :
            res.status(404).json({ error: 'No existe carrito con dicho ID' });
    })
    .post((req, res) => {
        res.status(200).json(carrito.addProduct(req.params.id, req.body))
    })

routerCarrito.
    route('/:id/productos/:id_prod')
    .delete((req, res) => {
        carrito.deleteProduct(req.params.id, req.params.id_prod) ?
            res.status(200).json(`el producto con el id:${req.params.id_prod} ha sido eliminado correctamente`) :
            res.status(404).json({ error: 'No existe producto con dicho ID' });
    })


