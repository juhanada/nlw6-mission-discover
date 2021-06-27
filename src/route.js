// importando expres
const express = require('express')

// pegando o router do express
const route = express.Router()

const questionController = require('./controllers/questionController')
const roomControler = require('./controllers/RoomController')

// definindo as rotas
//     get home
route.get('/', (req, res) => res.render("index", {page: 'enter-room', mensagem: false})) //funciona com .ejs (nao precisa por extensao) 
route.get('/create-pass', (req,res) => res.render('index', {page: 'create-pass', mensagem: false}))

route.post('/create-room', roomControler.create)
route.get('/room/:room', roomControler.open)

route.post('/enter-room', roomControler.enter)

// formato do form da modal 
route.post('/question/:room/:question/:action', questionController.index)
route.post('/question/create/:room', questionController.create)

// exportando router
module.exports = route