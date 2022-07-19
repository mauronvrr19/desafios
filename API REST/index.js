// servidor

const { response } = require('express');
const express = require('express');
const path = require('path');
const Contener = require("./contenedor")

const nombreArchivo =  new Contener("./productos.json")

const app = express();
app.use(express.static("public"))

// router
const router = express.Router()
 app.use ("/api", router)
 router.use(express.json())

const puerto = process.env.PORT || 8080;
const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

// rutas

router.get ("/productos", async (req, res)=>{
  let prod
    try {
      prod = await nombreArchivo.getAll()
        } 
            catch (error) {
                 error
    }
res.send(prod)
  })


  router.get ("/productos/:id", async(req, res)=>{
    const id = req.params.id
    let idnumerico = parseInt(id)
    let producto
     try {
      producto = await nombreArchivo.getById(idnumerico)
     } catch (error) {
       error
     }
   res.send(producto)
   })
  
   router.post("/productos", async(req, res)=> {
    const miObjeto = req.body;
    let productoAgregado
    try {
      productoAgregado = await nombreArchivo.save(miObjeto)
     } catch (error) {
       error
     }
    //  console.log(productoAgregado)
    res.send(productoAgregado)
  
})

router.put('/productos/:id', async(req, res) => {
  const id = req.params.id;
  let productoNuevo = req.body;
  let producto 
  try {
    producto = await nombreArchivo.updateProducto(id, productoNuevo)
  } catch (error) {
    error
  }
  res.send(producto)
  ;})  
  


router.delete("/productos/:id", async(req, res)=> {
  const id = req.params.id
    let idnumerico = parseInt(id)
    let producto
     try {
      producto = await nombreArchivo.deleteById(idnumerico)
     } catch (error) {
       error
     }
     res.send(producto)
})