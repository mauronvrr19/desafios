
import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'http'
import Productos from './controllers/productos.js'
import Mensajes from './controllers/mensajes.js'


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = new Productos('./controllers/productos.json')
const mensajes = new Mensajes('./controllers/mensajes.json')

io.on('connection', async socket => {
  console.log('Usuario conectado')

  socket.emit('productos', await productos.getAll())

  socket.on('agregarProducto', async (producto) => {
    await productos.save(producto)
    io.sockets.emit('productos', await productos.getAll())
  })

  socket.emit('mensajes', await mensajes.getAll())

  socket.on('nuevoMensaje', async (data) => {
    await mensajes.save(data)
    io.sockets.emit('mensajes', await mensajes.getAll())
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))
