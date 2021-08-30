// importando express
const express = require('express')

// importando rotas
const route = require('./route')

// importando modulo path para setar endereço da pasta views
const path = require('path')

// criando servidor express
const server = express()

// configurando view engine
server.set('view engine', 'ejs')

// configurando endereço da pasta views
server.set('views', path.join(__dirname, 'views'))

// adicionando a pasta public
server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

// chamando as rotas do route.js
server.use(route);

// configurando porta
server.listen(3000, () => console.log('RODANDO em localhost:3000'))

