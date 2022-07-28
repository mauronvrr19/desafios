// servidor
const express = require('express');
const Contener = require("./contenedor")
const handlebars = require("express-handlebars");

const nombreArchivo =  new Contener("./productos.json")

const app = express();
app.use(express.urlencoded({ extended: true }));

// handlebars
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layout",
  partialsDir: __dirname + "/views/partials/"
});

app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");


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

router.get ("/", async (req, res)=>{
  let prod
    try {
      prod = await nombreArchivo.getAll()
        } 
            catch (error) {
                 error
    }
    res.render("main", {prod})
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
    const producto = req.body;
    console.log(producto)
    let productoAgregado
    try {
      productoAgregado = await nombreArchivo.save(producto)
     } catch (error) {
       error
     }
    res.render("form",{productoAgregado})
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