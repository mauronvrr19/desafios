// servidor

const { response } = require('express');
const express = require('express');
const path = require('path')
const Contener = require("./contenedor")

const nombreArchivo =  new Contener("./productos.txt")

const app = express();

const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

// rutas

app.get ("/", async (req, res)=>{
  res.send ("bienvenidos")
})

app.get ("/productos", async (req, res)=>{
  let prod
    try {
      prod = await nombreArchivo.getData()
        } 
            catch (error) {
console.log(error)
    }
res.send(prod)
  })


  app.get ("/productosRandom", async(req, res)=>{
    let producto_azar
     try {
         const azar = Math.floor(Math.random()*3);
      producto_azar = await nombreArchivo.getById(azar)
     } catch (error) {
       console.log(error)
     }
   res.send(producto_azar)
   })
  
