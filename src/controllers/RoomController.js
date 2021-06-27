const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        
        const db = await Database()
        const pass = req.body.password

        let roomId = ''
        let exists = true
        
        do{

            for (let i = 0; i < 6; i++){
                roomId+= Math.floor(Math.random()*10).toString()
            }
            
            console.log(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, ${pass})`)
            
            // verificando se ja existe numero
            const roomsExistId = await db.all(`SELECT id FROM rooms`)
            exists = roomsExistId.some(roomsExistId => (roomsExistId === roomId))
            
            if (!exists) {
                await db.run(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, "${pass}")`)
            }
        
        } while (exists)

        await db.close()
         
        res.redirect(`/room/${roomId}`)
    },

    async open (req, res){
        const roomId = req.params.room
        console.log(`SELECT * FROM questions WHERE room = ${parseInt(roomId)}`)

        const db = await Database()
        let questions
        let questionsRead
        
        try{
            questions = await db.all(`SELECT * FROM questions WHERE room = ${parseInt(roomId)} AND read = 0`)
            questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${parseInt(roomId)} AND read = 1`)
        }
        catch (error){
            console.log(error)
        }
        
        await db.close()       

        let isQuestions = false
        if (questions.length || questionsRead.questions)
            isQuestions = true  

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions})
    },

    async enter(req, res) {

        const roomId = req.body.roomId
        
        const db = await Database()

        const sala = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if (sala){
            console.log("tem sala")
            res.redirect(`/room/${roomId}`)
        }
        else{
            console.log("nao tem sala")
            res.render("index", {page: 'enter-room', mensagem: true})
        }

        await db.close()

    }
}