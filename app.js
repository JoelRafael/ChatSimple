'use stric'

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = 3000,
    publicDir = express.static(`${__dirname}/public`),
    morgan = require('morgan');

    app.use(publicDir)
       .get('/', (req, res)=>{
        //res.sendFile(`${publicDir}/index.html`)
        //res.se
       })
    app.use(morgan('dev'))
    http.listen(port, ()=>{
      console.log(`localhost:${port}`)
    })

    io.on('connection',(socket)=>{
       // socket.emit('new user', {message:"Ha entrado un usuario al chat"})
       socket.broadcast.emit('new user', {message:"Ha entrado un usuario al chat"})
       socket.on('new message',(message)=>{
           io.emit('user-say', {message:message})
       })
       socket.on('disconnect', ()=>{
           socket.broadcast.emit('disconnect-user', {message:"Se ha desconectado un usuario"})
       })
    })