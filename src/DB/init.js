const Database = require("./config")

const initDb = {
    
    async init(){
        //async roda funcao assincrona
        //await espera o retorno da funcao do db antes de ir pra prox
        try {
            const db = await Database()
            
            await db.exec(`CREATE TABLE rooms (id INTEGER PRIMARY KEY, pass TEXT)`)
            
            await db.exec(`CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, room INT, titulo TEXT, read INT)`)
            
            await db.close()
        
        } catch (error) {
            console.log(error)
        }
    }
}

initDb.init()