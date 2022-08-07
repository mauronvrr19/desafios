const express = require('express');
const path = require('path');
const Contener = require("./contenedor")
const ejs = require('ejs');

const nombreArchivo =  new Contener("./productos.json")
 
const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

const server = require('http').Server(app)
const io = require('socket.io')(server)

// router
const router = express.Router()
 app.use ("/api", router)
 router.use(express.json())

// ejs
app.set('views','./views');
app.set('view engine', 'ejs')



router.get ("/productos", async (req, res)=>{
  let prod
    try {
      prod = await nombreArchivo.getAll()
        } 
            catch (error) {
                 error
    }
    res.render("form.ejs",{prod})
  })
  

  // router.get ("/productos/:id", async(req, res)=>{
  //   const id = req.params.id
  //   let idnumerico = parseInt(id)
  //   let producto
  //    try {
  //     producto = await nombreArchivo.getById(idnumerico)
  //    } catch (error) {
  //      error
  //    }
  //    res.send(producto)
  //  })
  
   router.post("/productos", async(req, res)=> {
    const miObjeto = req.body;
    let productoAgregado
    try {
      productoAgregado = await nombreArchivo.save(miObjeto)
     } catch (error) {
       error
     }
     console.log(productoAgregado)
res.redirect("/api/productos")
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


let messages = [];

io.on('connection', function(socket) {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

  socket.on('new-message', function(data) {
      messages.push(data); // agregar mensajes a array 
      io.sockets.emit('messages', messages); //emitir a todos los clientes
  });    
});


// puerto escuchando 
const puerto = process.env.PORT || 8080;
const srv = server.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

srv.on('error', (err) => {
  console.log('ERROR =>', err);
});

