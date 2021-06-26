const { create } = require("./RoomController")
const Database = require('../db/config')

module.exports = {
    
    async index(req, res){
        const room = req.params.room
        const question = req.params.question
        const action = req.params.action

        const pass = req.body.password
        
        console.log('index')
        console.log(room, question, action, pass)

        //verifica senha
        const db = await Database()
        const sala = await db.get(`SELECT * FROM rooms WHERE id = ${room}`)
        
        
        if (sala.pass == pass) {
            console.log('senha correta')

            if (action == 'delete'){
                await db.run(`DELETE FROM questions WHERE id = ${question}`)
            } else {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${question}`)
            }
        } else {
            res.render('passincorrect', {roomId: room})
        }

        await db.close()
        res.redirect(`/room/${room}`)
    },

    async create(req, res){

        const db = await Database()

        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (room, titulo, read) VALUES (${parseInt(roomId)}, "${question}", 0)`)

        res.redirect(`/room/${roomId}`)
    }
}